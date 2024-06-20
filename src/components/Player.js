import React from 'react';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';

const Player = ({ currentSong }) => {
  return (
    <div className="player">
      <Card variant="outlined">
        {currentSong ? (
          <>
            <CardMedia
              component="img"
              height="300"
              image={currentSong.albumArt}
              alt={currentSong.title}
            />
            <CardContent>
              <Typography variant="h5" component="div" gutterBottom>
                {currentSong.title}
              </Typography>
              <Typography variant="subtitle1" color="text.secondary">
                {currentSong.artist}
              </Typography>
            </CardContent>
          </>
        ) : (
          <CardContent>
            <Typography variant="body1" color="text.secondary">
              No song selected
            </Typography>
          </CardContent>
        )}
      </Card>
    </div>
  );
}

export default Player;
