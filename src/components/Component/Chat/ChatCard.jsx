import { Box, Typography } from '@mui/material'
import React from 'react'

const ChatCard = ({ pic, name, time, message }) => {
    return (
        <Box sx={{ px: '12px', py: '4px' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', py: '8px', border: '0.8px solid #062b5a', borderRadius: '5px', cursor: 'pointer', ':hover': { bgcolor: '#062b5a' } }}>
                <Box sx={{ mx: 2 }}>
                    <img src={pic} alt="myPic" width="55px" height="55px" style={{ borderRadius: '50%' }} />
                </Box>
                <Box sx={{ pr: 3, display: 'flex', flexDirection: 'column', flex: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Typography sx={{ fontSize: '20px' }}>{name}</Typography>
                        <Typography variant='body2'>{time}</Typography>
                    </Box>
                    <Box>
                        <Typography>{message}</Typography>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default ChatCard