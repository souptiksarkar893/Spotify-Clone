import React, { useState, useEffect } from 'react';
import { Typography, Grid, CardActionArea, CardContent } from '@mui/material';
import axios from 'axios';

const Genre = () => {
  const [topGenres, setTopGenres] = useState([]);

  useEffect(() => {
    const fetchTopGenres = async () => {
      try {
        const response = await axios.get('http://ws.audioscrobbler.com/2.0/', {
          params: {
            method: 'tag.getTopTags',
            api_key: process.env.REACT_APP_LASTFM_API_KEY, 
            format: 'json',
            limit: 10, 
          },
        });
        setTopGenres(response.data.toptags.tag);
      } catch (error) {
        console.error('Error fetching top genres:', error);
      }
    };

    fetchTopGenres();
  }, []);

  return (
    <div className="genre">
      <Typography variant="h2">Top Genres</Typography>
      <br></br><br></br><br></br>
      <Grid container spacing={3}>
        {topGenres.map((genre) => (
          <Grid item key={genre.name} xs={12} sm={6} md={4} lg={3}>
            <div style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '10px', textAlign: 'center' }}>
              <CardActionArea>
                <CardContent>
                  <Typography variant="h5">{genre.name}</Typography>
                </CardContent>
              </CardActionArea>
            </div>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Genre;
