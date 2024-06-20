import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import axios from 'axios';
import Player from './components/Player';
import Playlist from './components/Playlist';
import Search from './components/Search';
import Album from './components/Album'
import Genre from './components/Genre';
import { AppBar, Toolbar, Typography, Container, Link as MuiLink } from '@mui/material';
import './App.css';

const App = () => {
  const [topTracks, setTopTracks] = useState([]);

  useEffect(() => {
    const fetchTopTracks = async () => {
      try {
        const response = await axios.get('http://ws.audioscrobbler.com/2.0/', {
          params: {
            method: 'chart.gettoptracks',
            api_key: process.env.REACT_APP_LASTFM_API_KEY, 
            format: 'json',
            limit: 10, 
          },
        });
        setTopTracks(response.data.tracks.track);
      } catch (error) {
        console.error('Error fetching top tracks:', error);
      }
    };

    fetchTopTracks();
  }, []);

  return (
    <Router>
      <div className="App">
        <AppBar position="static" sx={{ backgroundColor: '#1DB954' }}>
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Spotify 2.0 Clone
            </Typography>
            <nav>
              <MuiLink component={Link} to="/" color="inherit" sx={{ marginRight: 2 }}>
                Home
              </MuiLink>
              <MuiLink component={Link} to="/search" color="inherit" sx={{ marginRight: 2 }}>
                Search
              </MuiLink>
              <MuiLink component={Link} to="/album" color="inherit" sx={{ marginRight: 2 }}>
                Album
              </MuiLink>
              <MuiLink component={Link} to="/genres" color="inherit">
                Genres
              </MuiLink>
            </nav>
          </Toolbar>
        </AppBar>

        <Container sx={{ marginTop: 4 }}>
          <Routes>
            <Route path="/" element={<Playlist playlists={topTracks} />} />
            <Route path="/search" element={<Search />} />
            <Route path="/album" element={<Album />} />
            <Route path="/genres" element={<Genre />} />
          </Routes>
        </Container>

        <Player />
      </div>
    </Router>
  );
}

export default App;
