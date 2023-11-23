import { Search } from '@mui/icons-material';
import { AvatarGenerator } from 'random-avatar-generator';


import {
  Box,
  IconButton,
  TextField,
  Typography,
} from '@mui/material';
import React,{useState} from 'react';
import ChatCard from './ChatCard';
import { userServices } from '../../../Services/Api';

const SideBar = ( ) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [UserName, setUserName] =useState('');
  const [selectedOption, setSelectedOption] = useState('All Chats');
  const generator = new AvatarGenerator();

  const handleDropdownToggle = () => {
    setShowDropdown(!showDropdown);
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setShowDropdown(false);
  };
  const handleClick=()=>{
    console.log('handleClick');
  }
  const handleUser = async() => {
     try
     {
      const user = await userServices.getUser(searchText);
     setUserName(user.user.name);

     }catch(e){
      setUserName("User not found");
     }
    //  onUpdateData(searchText, UserName)
     
      
  }

  return (
    <Box >
      <Box sx={{ p: '12px' }}>
        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            Chats
          </Typography>
          <TextField
            id="outlined-basic"
            label="Outlined"
            variant="outlined"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <IconButton onClick={handleUser}><Search /></IconButton>
        </Box>
        <Box sx={{ py: '4px', display: 'flex', flexDirection: 'row', alignItems: 'center', }}>


        </Box>
      </Box>
      <Box sx={{ maxHeight: 'calc(100vh - 150px)', overflowY: 'auto', mt: '16px', '&::-webkit-scrollbar': { width: '0.4em', }, }}>
        <div onClick={handleClick}>
        <ChatCard pic={generator.generateRandomAvatar()}  name={UserName} />
        </div>
    
      
      </Box>
    </Box>
  );
};

export default SideBar;