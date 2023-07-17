import React from 'react';

const SearchGrid = ({ searchResults }) => {
  return (
    <div>
      {searchResults.map((result) => (
        <div key={result.id}>
          <h3>{result.title}</h3>
          <p>{result.description}</p>
        </div>
      ))}
    </div>
  );
};

export default SearchGrid;