import React, { useState } from 'react'
import Paper from "@mui/material/Paper";
import {Button,Grid,TextField} from "@mui/material";
import { useNavigate } from 'react-router-dom';
import {authService} from "../Services/Api"
const ResetPassword = () => {
    const paperStyle = {padding: 30,minHeight: "45vh",width: 300,margin: "40px auto",backgroundColor:'rgb(165 204 255)'};
  const btnstyle = { margin: "8px 0" };
  const [email,setEmail] = useState("");
  const navigate = useNavigate();


  const handleSendOtp= async(email)=>{
   const res= await authService.otpforpassword(email);
   console.log(res);
  }
  

  
 
  return (
    <>
    <Grid>
        <Paper elevation={20} style={paperStyle}>
          <Grid align="center">
            <h2>Reset Password</h2>
          </Grid>
          

          <TextField
            sx={{ marginTop: 2}}
            label="Email"
            placeholder="Enter email"
            spacing={3}
            fullWidth
            required
            name="email"
            onChange={(e)=>{
              setEmail(e.target.value);
              
            }}

            />
          <Button
            type="submit"
            color="primary"
            variant="contained"
            style={btnstyle}
            fullWidth
            onClick={()=>{
              handleSendOtp(email);
              localStorage.setItem('email', email);
              navigate('/changepassword')

            }}
           
          >
            Send Link
          </Button>
         
            
        </Paper>
      </Grid>
    </>
  )
}

export default ResetPassword