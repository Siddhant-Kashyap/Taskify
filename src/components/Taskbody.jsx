import { Button, Grid, Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import Profile from "./Profile";
import {  useNavigate } from "react-router-dom";
import BarGraph from "./Component/Graphs/BarGraph";
import TaskList from "./Component/Tasks/TaskList";



const Taskbody = () => {
const navigate = useNavigate();
const handleClick=() => {
  navigate('/taskpage')
}


  return (
    <Grid container spacing={5}>
      <Grid item xs={12} md={7} lg={8} >
        <Box
          sx={{
            display: "flex",
            width: "100%",
            minHeight: "80vh",
            margin: "20px",
            justifyContent: "center",
          }}
        >

          <Box
            elevation={10}
            sx={{
              minWidth: "100%",
              minHeight: "80vh",
              width: "100%",
              borderRadius: "12px",
              bgcolor: 'rgb(165 204 255/5%)',
              display: "flex",
              flexDirection: 'column',
              justifyContent: "center",
              boxSizing: "border-box",
            }}
          >
            <Box
              elevation={10}
              sx={{
                minWidth: "100%",
                minHeight: "80vh",
                width: "100%",
                borderRadius: "12px",
                bgcolor: 'rgb(165 204 255/5%)',
                display: "flex",
                flexDirection: 'row',
                justifyContent: "space-between",
                boxSizing: "border-box",
                p: '2rem',
              }}
            >
              <Paper
                sx={{
                  m:'5px',
                  flex: 1,
                  minHeight: "60vh",
                  bgcolor: '#2d85d2',
                  p: '1rem',
                  display: "flex",
                  flexDirection: 'column',
                  justifyContent: "space-between",
                  boxSizing: "border-box",
                  alignItems:'center',
                }}
              >
                <BarGraph/>
                <Typography variant="h5" >Productivity Graph</Typography>
              </Paper>

              <Paper
                sx={{
                  m:'5px',
                  flex: 1,
                  minHeight: "60vh",
                  bgcolor: '#2d85d2',
                  p: '1rem',
                  display: "flex",
                  flexDirection: 'column',
                  justifyContent: "space-between",
                  boxSizing: "border-box",
                  alignItems:'center',
                }}
              >
                <TaskList/>
                <span>
                <Button variant="contained" color="secondary" onClick={handleClick} >Go to task</Button>
                <Button sx={{marginLeft:'2px'}} variant="contained" color="inherit" onClick={()=>{navigate('/addtask')}} >Add Task</Button>
        
                </span>
                
              </Paper>
            </Box>

          </Box>
        </Box>
      </Grid>
      <Grid item xs={12} md={5} lg={4}>

        <Box
          elevation={10}
          sx={{
            minWidth: "100%",
            minHeight: "88vh",
            width: "50%",
            borderRadius: "12px",
            bgcolor: 'rgb(165 204 255/5%)',
            display: "flex",
            justifyContent: "center",
            boxSizing: "border-box",
            p: '2rem',

          }}
        >
          <Profile />

        </Box>


      </Grid>
    </Grid>
  );
};

export default Taskbody