from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd
import numpy as np
from fuzzywuzzy import fuzz
from typing import List

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "localhost:3000", "http://127.0.0.1:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
)

def clean_value(value):
    if pd.isna(value):
        return None
    return value

def load_data():
    df = pd.read_csv("ctg-studies.csv")
    return df.replace([np.inf, -np.inf], np.nan)

def search_data(query: str, df: pd.DataFrame, threshold: int = 60) -> List[dict]:
    results = []
    for _, row in df.iterrows():
        max_score = max(
            fuzz.partial_ratio(query.lower(), str(value).lower())
            for value in row.values
            if pd.notna(value)
        )
        if max_score >= threshold:
            cleaned_row = {k: clean_value(v) for k, v in row.to_dict().items()}
            results.append(cleaned_row)
    return sorted(results, key=lambda x: max(
        fuzz.partial_ratio(query.lower(), str(value).lower())
        for value in x.values()
        if value is not None
    ), reverse=True)

@app.get("/search")
async def search_endpoint(query: str = Query(...)):
    df = load_data()
    results = search_data(query, df)
    return {"results": results}