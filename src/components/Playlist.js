import React from 'react';
import { Typography, List, ListItem, ListItemText, Divider } from '@mui/material';

const Playlist = ({ playlists }) => {
  return (
    <div className="playlist">
      <Typography variant="h4" gutterBottom>
        Playlists
      </Typography>
      <List>
        {playlists.map((playlist, index) => (
          <div key={index}>
            <ListItem button>
              <ListItemText primary={playlist.name} />
            </ListItem>
            {index < playlists.length - 1 && <Divider />}
          </div>
        ))}
      </List>
    </div>
  );
};

export default Playlist;
