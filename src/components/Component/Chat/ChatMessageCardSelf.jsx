import { Box, IconButton, ListItemIcon, MenuItem, Typography } from '@mui/material';
import React, { useState } from 'react';
import { CopyAll, DeleteOutline, FavoriteBorder, ForwardOutlined, MoreHoriz, Replay } from '@mui/icons-material';

const ChatMessageCardSelf = ({  text }) => {
   

 
  return (
    <Box sx={{ mb: '1.25rem', fontSize: '0.875rem', display: 'flex', alignItems: 'flex-start', flexDirection: 'column', ml: 'auto' }}>
      <Box sx={{ p: '1rem 1.25rem', borderRadius: '1.25rem', textAlign: 'left', display: 'inline-block', maxWidth: '25rem', ml: 'auto', mr: '1.25rem', bgcolor: '#062b5a' }}>
        <Typography>
          {text}
        </Typography>
     
      </Box>
    </Box>
  );
};

export default ChatMessageCardSelf;