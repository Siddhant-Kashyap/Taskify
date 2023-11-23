import { Avatar, Typography, Box, Button } from "@mui/material";
import jwt_decode from "jwt-decode";
import { AvatarGenerator } from 'random-avatar-generator';
import { useNavigate } from "react-router-dom";
import { useAuth } from "../utils/Auth";


const Profile = ({username, description, followers, following}) => {
  //const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const auth = useAuth();
  try{
    var token = localStorage.getItem('token')
  }catch(e){
    console.log(e)
  }
 
  var navigate = useNavigate();
  //to handle logout
  const logout =()=>{
    localStorage.removeItem('token');
    auth.logout();
    navigate('/login');
    
  }
  const handleProfile=()=>{
    console.log(localStorage.getItem('token'))
    if(localStorage.getItem('token') ===''){
      navigate('/login')
    }
  }
  try{
    var decoded = jwt_decode(token);
    var profileName = decoded.name;

  }catch(e){
    console.log(e)
  }
 
  const generator = new AvatarGenerator();

  
  return (
    
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: '2rem' }}>
      {handleProfile}
      <Avatar
        src={generator.generateRandomAvatar()} 
        alt="Profile Avatar"
        sx={{ width: 250, height: 250, borderRadius: '50%', mb: '20px' }}
      />
      <Typography variant="h5" sx={{ marginBottom: '5px' }}>
        {profileName}
      </Typography>
      <Button variant="contained" onClick={logout}>Logout</Button>
      
    </Box>
  );
};

export default Profile;