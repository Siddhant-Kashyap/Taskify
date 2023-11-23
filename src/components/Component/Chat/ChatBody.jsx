import { Box, Container, IconButton, InputBase, Typography, TextField } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import ChatMessageCard from './ChatMessageCard';
import ChatMessageCardSelf from './ChatMessageCardSelf';
import jwtDecode from 'jwt-decode';
import { AddCircleOutline, ArrowRightAlt, Mood, Search } from '@mui/icons-material';
import io from 'socket.io-client';
import ChatCard from './ChatCard';
import { AvatarGenerator } from 'random-avatar-generator';
import { userServices } from '../../../Services/Api';
import ChatSectionHeader from './ChatSectionHeader';

const socket = io('http://localhost:3001');

const ChatBody = () => {
  const [searchText, setSearchText] = useState('');
  const [selectedUser, setSelectedUser] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [text, setText] = useState('');
  const [recipientMail,setRecipientMail] = useState('');
  const [senderemail, setEmail] = useState('');
  const generator = new AvatarGenerator();
  const [buttonClick, setButtonClick] = useState(false);
  const [messageSent,setMessageSent] = useState(false);


  
  const containerRef = useRef(null);

  //to set the email of sender
  useEffect(() => {
    var x = jwtDecode(localStorage.getItem('token')).email;
    if (x) {
      setEmail(x);
    }
  }, []);

  //to get the email of the recipient
  const handleUser = async () => {
    try {
      const user = await userServices.getUser(searchText);
      setSelectedUser(user.user.name);
      setRecipientMail(user.user.email)
      setButtonClick(!buttonClick);

    } catch (e) {
      setSelectedUser('User not found');
    }
  };

  //to get the all chat between users on click of search button
  useEffect(()=>{
    socket.emit('chat-history', senderemail,recipientMail);
  },[buttonClick])

  //
  useEffect(() => {
   
    socket.on('chat-history', (userChatHistory) => {
      setChatHistory(userChatHistory);
     // console.log("My chat history", chatHistory);
    }); 

  }, [buttonClick,messageSent]);

  const handleSend = () => {
    if (text.trim() !== '') {
      const data = {
        sender: senderemail,
        recipient: recipientMail,
        message: text,
      };
      socket.emit('chat message', data, () => {
        socket.emit('chat-history', senderemail, recipientMail);
       console.log(data.message)
      });
      handleUser();
      setMessageSent(!messageSent)
     
      setText('');
    }
  };


   useEffect(() => {
    containerRef.current?.scrollIntoView({ behavior: "smooth"});
  }, [chatHistory]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'row', height: '100vh' }}>
      {/* SIDEBAR */}
      <Box sx={{ p: '12px', minWidth: '250px' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            Chats
          </Typography>
          <span>
            <TextField
              id="outlined-basic"
              label="Search"
              variant="outlined"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
            <IconButton onClick={handleUser}>
              <Search />
            </IconButton>
          </span>
          <Box sx={{ py: '4px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div onClick={() => setSelectedUser(selectedUser)}>
              <ChatCard pic={generator.generateRandomAvatar()} name={selectedUser ? selectedUser : ' '} />
            </div>
          </Box>
        </Box>
      </Box>

      {/* CHAT AREA */}
      <Box sx={{ flex: 1, borderLeft: '0.7px solid #ffffff78', borderRight: '0.7px solid #ffffff78' }}>
        {selectedUser && (
            <>
          <ChatSectionHeader pic={generator.generateRandomAvatar()} name={selectedUser} />
        
        <Box
          sx={{
            flex: 1,
            position: 'relative',
            maxHeight: 'calc(100vh - 200px)', // Adjust the height as needed
                overflowY: 'auto',
                overflowX: 'hidden',
                p: '12px',
                '&::-webkit-scrollbar': { width: '0.4em' },
          }}
        >
          <Container  sx={{ maxWidth: { md: 1320 }, width: '100%', px: '15px', mx: 'auto' }}>
            {chatHistory.map((m, index) => (
              <React.Fragment key={index}>
                {m.sender === jwtDecode(localStorage.getItem('token')).email ? (
                  <ChatMessageCardSelf sender={m.sender} text={m.message} />
                ) : (
                  <ChatMessageCard sender={m.recipient} text={m.message} />
                )}
                <div ref={containerRef}></div>
              </React.Fragment>
            ))}
          </Container>
          </Box>

          {/* SENDER SECTION */}
          <Box sx={{ position: 'sticky', bottom: 0, borderTop: '0.7px solid #ffffff78', minHeight: 70, display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
            <InputBase
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Type Your Message here ..."
              sx={{ color: 'white', py: '3px', pl: '12px', pr: '12px', width: '100%' }}
              endAdornment={<Mood sx={{ cursor: 'pointer' }} />}
              startAdornment={<AddCircleOutline sx={{ cursor: 'pointer', mr: 2 }} />}
            />

            <IconButton
              color="inherit"
              onClick={handleSend}
              sx={{ mr: 2, bgcolor: '#062b5a', ':hover': { bgcolor: '#031b3a' } }}
            >
              <ArrowRightAlt sx={{ p: 1, fontSize: '30px', fontWeight: 'bold' }} />
            </IconButton>
          </Box>
       
        </> )}
      </Box>
    </Box>
  );
};

export default ChatBody;
