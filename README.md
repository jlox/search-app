This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run Python server (in /backend):
```bash
uvicorn search_api:app --reload
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```


Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## TODO
NSCLC has many different representations in the dataset. For example, it could be “non
small cell lung cancer”, “non small cell lung carcinoma”, “NSCLC”, “carcinoma of the lungs, non small cell”, etc. How do we capture all the relevant clinical trials for searches on any disease?
  - My first thought would be to create a database of "relevant terms" for each disease/condition. On any search, if one of these "relevant terms" is used to search, the other terms could also be included on the backend so that those results would also be captured, even if the search term used doesn't directly match.
    
How do we allow her to search for NSCLC trials -AND- immunotherapy related drugs?
  - Add both sets of information to a database and query each. Depending on use, you could also JOIN information so that trial data could automatically bring up relevant drugs
    
How would you deploy your software?
  - I would use Render and Vercel to deploy frontend and backend.
    
What are the alternatives to loading the dataset into memory, and why would you want to use those alternatives?
  - I would rather use a true database like postgres (due to familiarity). More complex searches could be conducted with a more robust DB.
