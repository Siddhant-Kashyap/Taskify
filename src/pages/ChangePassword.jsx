import React, { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import { Button, Checkbox, FormControlLabel, Grid, TextField, Typography, } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { MuiOtpInput } from "mui-one-time-password-input";
import { authService } from "../Services/Api"
import jwtDecode from "jwt-decode";


const ChangePassword = () => {
  const paperStyle = { padding: 30, minHeight: "45vh", width: 400, margin: "40px auto", backgroundColor: 'rgb(165 204 255)' };
  const btnstyle = { margin: "8px 0" };

  const navigate = useNavigate();


  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState("");
  const [_password, _setPassword] = useState("")




  const handleChange = (value) => {
    const sanitizedValue = value.slice(0, 6);
    setOtp(sanitizedValue);
    console.log(otp);
  };
  const enterPassword = (e) => {
    setPassword(e.target.value)
  }
  const ReenterPassword = (e) => {
    _setPassword(e.target.value)
  }

  const handlePasswordChange = async () => {
    if (password === _password) {
      try {
        const data = authService.resetPassword(localStorage.getItem('email'), otp, password)
        console.log(data);
        if (data) {
          navigate("/sucesspasswordchanged")
        }
      } catch (error) {

      }

    } else {
      console.log("Not same password")
    }

  }

  return (
    <>
      <Grid>
        <Paper elevation={20} style={paperStyle}>
          <Grid align="center">
            <h2>Change Password</h2>
          </Grid>
          <MuiOtpInput length={6} value={otp} onChange={handleChange} />
          <TextField
            sx={{ marginTop: 2 }}
            label="Password"
            placeholder="Enter New Password"
            spacing={3}
            fullWidth
            required
            type="password"  // Specify the type as "password"
            name="password"
            value={password}
            onChange={enterPassword}
          />

          <TextField
            sx={{ marginTop: 2 }}
            label="Re Enter Password"
            placeholder="Re-Enter password"
            spacing={3}
            type="password"  // Specify the type as "password"
            fullWidth
            required
            name="repassword"  // Correct the name attribute to "repassword"
            value={_password}
            onChange={ReenterPassword}
          />



          <Button
            type="submit"
            color="primary"
            variant="contained"
            style={btnstyle}
            fullWidth
            onClick={handlePasswordChange}

          >
            Change Password
          </Button>

        </Paper>
      </Grid>
    </>
  )
}

export default ChangePassword