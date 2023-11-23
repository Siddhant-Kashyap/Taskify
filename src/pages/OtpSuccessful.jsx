import Paper from "@mui/material/Paper";
import {Button,Grid,Typography} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";


const OtpSuccessful = () => {
  const paperStyle = {padding: 30,minHeight: "45vh",width: 300,margin: "40px auto",backgroundColor:'rgb(165 204 255)'};
  const btnstyle = { margin: "8px 0" };
  const navigate = useNavigate();
  useEffect(()=>{
    localStorage.clear();
  })
  return (
   
   <>
   <Grid>
        <Paper elevation={20} style={paperStyle}>
          <Grid align="center">
            <h2>Password Changed</h2>
          </Grid>
   
          <Button
            type="submit"
            color="primary"
            variant="contained"
            style={btnstyle}
            fullWidth
            onClick={()=>navigate('/login')}
           
          >
            Go to Login
          </Button>
         
            
        </Paper>
      </Grid>
   </>
  )
}

export default OtpSuccessful