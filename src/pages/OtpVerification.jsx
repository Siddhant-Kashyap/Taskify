import React, { useState } from 'react'
import Paper from "@mui/material/Paper";
import {Button,Grid,Typography,TextField} from "@mui/material";
import { MuiOtpInput } from 'mui-one-time-password-input'
const OtpVerification = () => {
    const paperStyle = {padding: 30,minHeight: "45vh",width: 300,margin: "40px auto",backgroundColor:'rgb(165 204 255)'};
    const btnstyle = { margin: "8px 0" };
    const [otp,setOtp] = useState('');
    const handleChange = (newValue) => {
        setOtp(newValue)
      }
  return (
    <>
    <Grid>
        <Paper elevation={20} style={paperStyle}>
          <Grid align="center">
            <h2>OTP Verification</h2>
          </Grid>
          <Typography>Otp has been send to </Typography>

          <MuiOtpInput value={otp} onChange={handleChange} />
         
          <TextField
            sx={{ marginTop: 2}}
            label="Password"
            placeholder="Enter New Password"
            spacing={3}
            fullWidth
            required
            name="password"
          
            />
            

          <TextField
            sx={{ marginTop: 2 }}
            label=" Re Enter Password"
            placeholder=" Re-Enter password"
            spacing={3}
            type="repassword"
            fullWidth
            required
            name=" repassword"
          
          />
          

        
          <Button
            type="submit"
            color="primary"
            variant="contained"
            style={btnstyle}
            fullWidth
            
          >
            Change Password
          </Button>
         
         
         
            
        </Paper>
      </Grid>
    </>
  )
}

export default OtpVerification