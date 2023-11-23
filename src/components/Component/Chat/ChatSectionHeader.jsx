import { Phone, Search } from '@mui/icons-material'
import { Box, IconButton, Typography } from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import React from 'react'

const ChatSectionHeader = ({ pic, name }) => {
    return (
        <>
            <Box sx={{ px: '12px', py: '4px', bgcolor: '#062b5a' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', py: '8px' }}>
                    <Box sx={{ mx: 2 }}>
                        <img src={pic} alt="myPic" width="55px" height="55px" style={{ borderRadius: '50%' }} />
                    </Box>
                    <Box sx={{ pr: 3, display: 'flex', flexDirection: 'column', flex: 1 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Typography sx={{ fontSize: '20px' }}>{name}</Typography>
                            <Box sx={{ alignItems: 'center' }}>
                                <IconButton color='inherit'>
                                    <Search sx={{ cursor: 'pointer' }} />
                                </IconButton>
                                <IconButton color='inherit'>
                                    <Phone sx={{ cursor: 'pointer' }} />
                                </IconButton>
                                <IconButton color='inherit'>
                                    <MoreVertIcon sx={{ cursor: 'pointer' }} />
                                </IconButton>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </>
    )
}

export default ChatSectionHeader