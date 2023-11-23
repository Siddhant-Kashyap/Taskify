import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import { Button, Checkbox, FormControlLabel, Grid, TextField, Typography, } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { authService } from "../Services/Api";
import { useAuth } from "../utils/Auth";
import jwtDecode from "jwt-decode";
import io from 'socket.io-client';

const socket = io('http://localhost:3001'); 



const Login = () => {

  const paperStyle = { padding: 30, minHeight: "45vh", width: 300, margin: "40px auto", backgroundColor: 'rgb(165 204 255)' };
  const btnstyle = { margin: "8px 0" };
  const navigate = useNavigate();
  const [success, setSuccess] = useState('');
  const auth = useAuth();
  const [errors, setErrors] = useState({});
  const [loginRequest, setLoginRequest] = useState({
    email: '',
    password: ''
  });

  const handleLogin = async () => {

    setErrors({});
    try {

      const response = await authService.login(loginRequest);
      const token = response.token;
      localStorage.setItem('token', token);
      var decoded = jwtDecode(localStorage.getItem('token'))
      auth.login(decoded.email);
      console.log("Successfully login");
      setSuccess("Successfully login");
      socket.emit('login', decoded.email);
      setLoginRequest({
        email: '',
        password: ''
      });
      navigate("/");
    } catch (error) {
      setErrors({
        Email: error.response.data.Email ? [error.response.data.Email] : [],
        Password: error.response.data.Password ? [error.response.data.Password] : []
      });
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginRequest((prevloginRequest) => ({
      ...prevloginRequest,
      [name]: value,
    }));

    // Reset the error message for the specific field
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: '',
    }));
  };


  useEffect(() => {
    if (auth.user) {
      navigate("/")
    }
  }, [auth.user, navigate])

  return (
    <>

      {success && <Typography color="success" sx={{ alignItems: 'center', justifyContent: 'center' }}>{success}</Typography>}
      <Grid>
        <Paper elevation={20} style={paperStyle}>
          <Grid align="center">
            <h2>Sign In</h2>
          </Grid>

          <TextField
            sx={{ marginTop: 2 }}
            label="Username"
            placeholder="Enter username"
            spacing={3}
            fullWidth
            required
            name="email"
            value={loginRequest.email}
            onChange={handleInputChange}
            error={errors.Email && errors.Email.length > 0}
            helperText={errors.Email}
          />


          <TextField
            sx={{ marginTop: 2 }}
            label="Password"
            placeholder="Enter password"
            spacing={3}
            type="password"
            fullWidth
            required
            name="password"
            value={loginRequest.password}
            onChange={handleInputChange}
            error={errors.Password && errors.Password.length > 0}
            helperText={errors.Password}
          />


          <FormControlLabel
            control={<Checkbox name="checkedB" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            color="primary"
            variant="contained"
            style={btnstyle}
            fullWidth
            onClick={handleLogin}
          >
            Sign in
          </Button>
          <Typography>Forgot password ? {" "} <span onClick={() => navigate("/resetpassword")} style={{ cursor: "pointer", color: "blue", textDecoration: "underline" }}>
            Reset Password
          </span></Typography>
          <Typography> Do you have an account ? {" "}
            <span onClick={() => navigate("/register")} style={{ cursor: "pointer", color: "blue", textDecoration: "underline" }}>
              Sign Up
            </span></Typography>

        </Paper>
      </Grid>
    </>
  );
}

export default Login