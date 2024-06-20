import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Typography, List, ListItem, ListItemText } from '@mui/material';

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get('http://ws.audioscrobbler.com/2.0/', {
        params: {
          method: 'track.search',
          track: searchQuery,
          api_key: process.env.REACT_APP_LASTFM_API_KEY,
          format: 'json',
        },
      });
      setSearchResults(response.data.results.trackmatches.track);
    } catch (error) {
      console.error('Error searching:', error);
    }
  };

  return (
    <div className="search">
      <Typography variant="h2">Search</Typography>
      <TextField
        label="Search for tracks, artists, albums..."
        variant="outlined"
        value={searchQuery}
        onChange={handleSearchInputChange}
        fullWidth
        margin="normal"
        autoFocus
      />
      <Button variant="contained" onClick={handleSearch}>Search</Button>

      <div className="search-results">
        <Typography variant="h3">Search Results:</Typography>
        <List>
          {searchResults.map((result) => (
            <ListItem key={result.url}>
              <ListItemText primary={`${result.name} - ${result.artist}`} />
            </ListItem>
          ))}
        </List>
      </div>
    </div>
  );
};

export default Search;
