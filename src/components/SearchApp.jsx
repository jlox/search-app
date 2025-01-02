"use client";
import { useState } from 'react';

const SearchApp = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const columns = ['NCT Number', 'Study URL', 'Acronym', 'Study Status', 'Brief Summary', 'Study Results', 'Conditions', 'Interventions', 'Primary Outcome Measures', 'Secondary Outcome Measures', 'Other Outcome Measures', 'Sponsor', 'Collaborators', 'Sex', 'Age', 'Phases', 'Enrollment', 'Funder Type', 'Study Type', 'Study Design', 'Other IDs', 'Start Date', 'Primary Completion Date', 'Completion Date', 'First Posted', 'Results First Posted', 'Last Update Posted', 'Locations', 'Study Documents'];
  const [isLoading, setIsLoading] = useState(false);
  const [visibleResults, setVisibleResults] = useState(10);

  const handleSearch = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`http://localhost:8000/search?query=${encodeURIComponent(query)}`);
      const data = await response.json();
      if (data.results.length > 0) {
        // setColumns(Object.keys(data.results[0]));
        setResults(data.results);
        setVisibleResults(10);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const showMore = () => {
    setVisibleResults(prev => prev + 10);
  };

  return (
    <div className="max-w-6xl mx-auto mt-8 p-6 bg-white rounded-lg shadow">
      <div className="mb-6 relative">
        <input
          type="text"
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
          disabled={isLoading}
        />
        {isLoading && (
          <div className="absolute right-3 top-2">
            <div className="animate-spin h-6 w-6 border-2 border-blue-500 rounded-full border-t-transparent"></div>
          </div>
        )}
      </div>
      
      <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  {columns.map((column) => (
                    <th key={column} className="p-3 text-left border">{column}</th>
                  ))}
                </tr>
              </thead>
      {results.length > 0 && (

              <tbody>
                {results.slice(0, visibleResults).map((row, i) => (
                  <tr key={i}>
                    {columns.map((column) => (
                      <td key={column} className="p-3 border"><div style={{height: "300px", overflow: "scroll"}}>{row[column]}</div></td>
                    ))}
                  </tr>
                ))}
              </tbody>
      )}
            </table>
      </div>
        {results.length > visibleResults && (
          <button
            onClick={showMore}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Show More
          </button>
        )}
    </div>
  );
};

export default SearchApp;
