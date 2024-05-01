import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { TextField, InputAdornment, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

import './SearchBar.css';

function SearchBar({  onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (event) => {
    const term = event.target.value;
    setSearchTerm(term);
    onSearch(term); // Pass the search term to the onSearch function
  };

  const filterCourses = (searchTerm) => {
    const filteredCourses = courses.filter(course => {
      return course.title.toLowerCase().includes(searchTerm.toLowerCase());
    });
    onSearch(filteredCourses);
  };

  return (
    <TextField
      className="search-bar" 
      type="text"
      placeholder="Search"
      onChange={handleChange}
      variant="outlined"
      InputProps={{
        style: { fontSize: 'inherit', padding: '0' }, 
        endAdornment: (
          <InputAdornment position="end">
            <IconButton size="small">
              <SearchIcon />
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
}

SearchBar.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

export default SearchBar;
