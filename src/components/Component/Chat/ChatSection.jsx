import { Box} from '@mui/material'
import React, { useState,useEffect } from 'react'
import ChatBody from './ChatBody'
import { AvatarGenerator } from 'random-avatar-generator'
import io from 'socket.io-client'
import jwtDecode from 'jwt-decode';





const ChatSection = ({recipient,name}) => {
  const generator = new AvatarGenerator();
  const [messages,setMsg]=useState([
    {
      sender: '',
      recipient: '',
      message: ''
    }
  ]);
  const [username,setUserName]=useState('___');
  const socket = io('https://taskifychat.onrender.com');
    useEffect(() => {
        socket.on('chat history',(history) => {
            setMsg(history);
            console.log("Chat History :",history);
            return()=>{
                socket.disconnect();
            }
           
            
        })
    },[socket])
    useEffect(()=>{
      socket.emit('chat history',jwtDecode(localStorage.getItem('token')).email)
      
      
  },[])
  

  useEffect(()=>{
    setUserName(name)
  },[name])
  
    
  return (
    <>
    <Box sx={{flex:1,borderLeft:'0.7px solid #ffffff78',borderRight:'0.7px solid #ffffff78'}}>
     <ChatBody recipient={recipient} msg={messages}/>
    </Box>
    
    </>
  )
}

export default ChatSection