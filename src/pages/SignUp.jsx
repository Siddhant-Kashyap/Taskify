import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import { Button, Grid, TextField, Typography } from "@mui/material";
import {useNavigate} from 'react-router-dom'
import { authService, productivityServices } from "../Services/Api";



const SignUp = () => {
  const paperStyle = {padding: 30,minHeight: "60vh",width: 300,margin: "40px auto",backgroundColor: "rgb(165 204 255)",};
  const btnstyle = { margin: "8px 0" };
  const navigate= useNavigate();

  const [success,setSuccess]=useState("");

  const [errors, setErrors] = useState({});

  const [User, setUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '', 
  });

  const createUserProductivity = async (email)=>{
    try {
      const response  = await productivityServices.setProductivity(email);
      console.log("Created Productivity",response.data)
      return response.data;
    } catch (error) {
      console.error(error)
    }
  
  }


  const handleRegister = async () => {
    setErrors({});
    try {
      if (User.password !== User.confirmPassword) {
        setErrors({ ...errors, confirmPassword: "Passwords do not match" });
        return;
      }
      await authService.signup(User);
      console.log("Successfully registered");
      console.log("UserEmail",User.email)
      createUserProductivity(User.email)
      setSuccess("Successfully registered");
      setUser({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
      });

        navigate("/login");
      
    } catch (error) {
      if (Array.isArray(error.response.data.errors)) {
        const errorObj = {};
        
        error.response.data.errors.forEach(errorMessage => {
          const fieldName = errorMessage.split(" ")[0]; 
          const errorMessageWithFieldName = errorMessage.split(","); 
          errorObj[fieldName] = errorMessageWithFieldName;
        });
      
        setErrors(errorObj);
      }     
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  
    // Reset the error message for the specific field
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: '',
    }));
  };
  


  return (
    <>
      
      {success && <Typography color="success" sx={{alignItems:'center',justifyContent:'center'}}>{success}</Typography>}
      <Grid>
        <Paper elevation={20} style={paperStyle}>
          <Grid align="center">
            <h2>Sign Up</h2>
          </Grid>

          <TextField
            sx={{ marginTop: 2 }}
            label="first Name"
            placeholder="Enter First Name"
            spacing={3}
            fullWidth
            required
            name="firstName"
            value={User.firstName}
            onChange={handleInputChange}
            error={errors.First && errors.First.length > 0} 
            helperText={errors.First } 
            />
            
          <TextField
            sx={{ marginTop: 2 }}
            label="last Name"
            placeholder="Enter Last Name"
            spacing={3}
            fullWidth
            required
            name="lastName"
            value={User.lastName}
            onChange={handleInputChange}
            error={errors.Last && errors.Last.length > 0} 
            helperText={errors.Last } 
          />
         
          <TextField
            sx={{ marginTop: 2 }}
            label="Email"
            placeholder="example@gmail.com"
            spacing={3}
            type="email"
            fullWidth
            required
            name="email"
            value={User.email}
            onChange={handleInputChange}
            error={errors.Email && errors.Email.length > 0} 
            helperText={errors.Email } 
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
            value={User.password}
            onChange={handleInputChange}
            error={errors.Password && errors.Password.length > 0} 
            helperText={errors.Password } 
          />
          
          <TextField
            sx={{ marginTop: 2 }}
            label="Confirm Password"
            placeholder="Confirm password"
            spacing={3}
            type="password"
            fullWidth
            required
            name="confirmPassword"
            value={User.confirmPassword}
            onChange={handleInputChange}
            error={Boolean(errors.confirmPassword)}
          />
          {errors.confirmPassword && (
          <Typography variant="body2" color="error">
           {errors.confirmPassword}
          </Typography>
          )}
          
          <Button
            type="submit"
            color="primary"
            variant="contained"
            style={btnstyle}
            fullWidth
            onClick={handleRegister}
          >
            Register
          </Button>
          <Typography>
            Already Have an Account ?{" "}
            <span onClick={()=>navigate("/login")} style={{ cursor: "pointer", color: "blue", textDecoration: "underline" }}>
              Sign In
            </span>
          
          </Typography>
        </Paper>
      </Grid>
    </>
  );
  
}

export default SignUp