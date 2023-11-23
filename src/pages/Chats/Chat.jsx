import { Box } from '@mui/material'
import React, { useEffect, useState } from 'react'
import NavBar from '../../components/Component/Chat/NavBar'
import SideBar from '../../components/Component/Chat/SideBar'
import ChatSection from '../../components/Component/Chat/ChatSection'



const Chat = () => {
    const [recipient, setRecipient] = useState('')
    const [user, setUser] = useState('');

    const handleUpdateData = (newData,user) => {
        setRecipient(newData);
        setUser(user);
        console.log("Data and User"+newData+" "+user)
        
      };
     
      
  return (
    <Box sx={{ display: 'flex', flexDirection: 'row', height: '100vh' }}>
        <NavBar/>
        <ChatSection recipient={ recipient } name={user}/>
    </Box>
  )
}

export default Chat