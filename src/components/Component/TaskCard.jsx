import React from 'react';
import { Box } from '@mui/system';
import { Button, alpha } from '@mui/material';
import Typography from '@mui/material/Typography';

const TaskCard = ({category,title,desc,time}) => {
  return (
    <Box sx={{ minWidth: 250, width: 250, height: 280, margin: 2, backgroundColor: alpha('#ffffff', 0.3), my: '1.25rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '1rem', borderRadius: '10px' }}>
      <Typography sx={{ fontSize: 14 }} color="black" gutterBottom>
        {category}
      </Typography>
      <Typography variant="h5" sx={{ color: 'text.secondary', textAlign: 'center', display: '-webkit-box', overflow: 'hidden', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', maxWidth: '100%' }}>
        {title}
      </Typography>
      <Typography sx={{ mb: 1.5 }} color="text.primary">
        {desc}
      </Typography>
      <Typography variant="body2" sx={{ color: 'black' }}>
        {time}
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: '8px'}}>
        <Button sx={{m:'8px'}} variant='contained' size="small">Update</Button>
        <Button sx={{m:'8px'}} variant='contained' size="small">Done</Button>
      </Box>
    </Box>
  );
}

export default TaskCard;