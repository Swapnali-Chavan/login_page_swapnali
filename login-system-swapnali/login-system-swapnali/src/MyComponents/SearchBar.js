import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';

const SearchBar = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearch = () => {
    onSearch(searchQuery);
  };

  return (
    <div>
      <TextField
        label="Search"
        value={searchQuery}
        onChange={handleSearchChange}
      />
      <Button variant="contained" onClick={handleSearch}>
        Search
      </Button>
    </div>
  );
};

export default SearchBar;