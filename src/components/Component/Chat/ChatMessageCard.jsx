import { Box,  Typography } from '@mui/material';
import React from 'react';

const ChatMessageCard = ({ text}) => {
  

  return (
    <Box sx={{ mb: '1.25rem', fontSize: '0.875rem', display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
      <Box sx={{ p: '1rem 1.25rem', ml: '1.25rem', borderRadius: '1.25rem', textAlign: 'left', display: 'inline-block', maxWidth: '25rem', bgcolor: '#163966' }}>
        <Typography>
          {text}
        </Typography>
      </Box>
    </Box>
  );
};

export default ChatMessageCard;