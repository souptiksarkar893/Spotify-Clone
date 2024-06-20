import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Typography, Grid, Card, CardActionArea, CardContent } from '@mui/material';

const Album = () => {
  const [topAlbums, setTopAlbums] = useState([]);

  useEffect(() => {
    const fetchTopAlbums = async () => {
      try {
        const response = await axios.get('http://ws.audioscrobbler.com/2.0/', {
          params: {
            method: 'chart.gettopalbums',
            api_key: process.env.REACT_APP_LASTFM_API_KEY,
            format: 'json',
            limit: 10, // Adjust as needed
          },
        });
        setTopAlbums(response.data.albums.album);
      } catch (error) {
        console.error('Error fetching top albums:', error);
      }
    };

    fetchTopAlbums();
  }, []);

  return (
    <div className="album">
      <Typography variant="h2">Top Albums</Typography>
      <Grid container spacing={3}>
        {topAlbums.map((album) => (
          <Grid item key={album.name} xs={12} sm={6} md={4} lg={3}>
            <Card>
              <CardActionArea>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {album.name}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p">
                    Artist: {album.artist.name}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Album;
