import './TaskPage.css'
import { Box, Grid, Card, CardContent, Button, Typography,TextField,Modal,Paper } from '@mui/material'
import { Add, Delete, Update, ArrowBack } from '@mui/icons-material';
import React ,{useEffect, useState}from 'react'
import DoneIcon from '@mui/icons-material/Done';
import jwtDecode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { productivityServices, taskManagement } from '../../../Services/Api';



const TaskPage = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [updateTask, setUpdateTask] = useState({
    
      email: "",
      category: "",
      title: "",
      desc: "",
      time: "",
      taskId: ""
    }
  );
  const [isModalOpen, setIsModalOpen] = useState(false);


 

  const getTasks = async () => {
    try {
        const result = await taskManagement.getAll(jwtDecode(localStorage.getItem('token')).email);
        setTasks(result.tasks); // Assuming `result` is an array of tasks.
        console.log("My tasks is",tasks);
    } catch (error) {
        console.error(error);
    }
}

useEffect(() => {
    getTasks();
}, []);

  
  const handleBack=()=>{
    navigate('/')
  }
  const handleAddTask =()=>{
    navigate('/addtask')
  }
  const handleProductivity =async()=>{
    const email = jwtDecode(localStorage.getItem('token')).email;
    var date = new Date();
    date = date.toISOString().substring(0,10);
    const response = await productivityServices.setProductivity(email,date,1);
    console.log("Productivity ---->",response);
  }

  const handleDelete=async(taskId)=>{
    await taskManagement.deleteTask(taskId);
    getTasks();
    handleProductivity();
  }

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const handleUpdate=async(task)=>{
    setUpdateTask({
      email: jwtDecode(localStorage.getItem('token')).email,
      category:task.category ,
      title: task.title,
      desc: task.desc,
      time: task.time,
      taskId: task.taskId,
    })
    
    getTasks();
    setIsModalOpen(true);
  }
  useEffect(() => {
     handleSave(updateTask);
  }, [updateTask]);
 
  const handleSave = async (task) => {
    
    await taskManagement.updateTask(task.taskId, {
      email: task.email,
      category: updateTask.category,
      title: updateTask.title,
      desc: updateTask.desc,
      time: updateTask.time,
      taskId: task.taskId,
    });
    // setIsModalOpen(false)

  
    getTasks();
    
  };
 
  
  return (
    <>
    {tasks.length===0?navigate('/'):
    <Box>
      <Modal
            open={isModalOpen}
            onClose={handleCloseModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Paper sx={{margin:'3px', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', border: '2px solid #000', boxShadow: 24, p: 4 }}>
              <Typography variant="h6" component="h2" gutterBottom>
                Update Task
              </Typography>
              <TextField
                label="Category"
                fullWidth
                value={updateTask.category}
                onChange={(e) => setUpdateTask({ ...updateTask, category: e.target.value })}
              />
              <TextField
                label="Title"
                fullWidth
                value={updateTask.title}
                onChange={(e) => setUpdateTask({ ...updateTask, title: e.target.value })}
              />
              <TextField
                label="Description"
                fullWidth
                value={updateTask.desc}
                onChange={(e) => setUpdateTask({ ...updateTask, desc: e.target.value })}
              />
              <TextField
                label="ETA"
                fullWidth
                type='datetime-local'
                value={updateTask.time}
                onChange={(e) => setUpdateTask({ ...updateTask, time: e.target.value })}
              />
              <Button onClick={handleSave}>Save</Button>
              <Button onClick={()=>{setIsModalOpen(false)}}>Close</Button>
            </Paper>
          </Modal>
      <Box

        sx={{
          width: "90vw",
          height: "85vh",
          backgroundColor: "#2878bd",
          margin: "auto",
          borderRadius: "12px",
          boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          marginTop: "10px"
        }}>

        <Typography variant='h5'>Hello {jwtDecode(localStorage.getItem('token')).email}</Typography>

        <Box
          sx={{
            width: "100%",
            height: "60vh", // Set a fixed height
            overflowY: "auto", // Make the container scrollable if needed
          }}
        >
          
          <Grid container spacing={2} sx={{ width: "100%" }}>
            
            {tasks.length > 0 ? tasks.map((task, index) => (
                    <Grid item xs={12} sm={6} md={3} sx={{ flexGrow: 1 }} key={index}>
                        <Card variant="outlined" sx={{ width: "100%" }}>
                            <CardContent>
                                <Typography variant='h6'>Title: {task.title}</Typography>
                                <Typography>Category: {task.category}</Typography>
                                <Typography>ETA: {task.time}</Typography>
                                <Box sx={{ display: 'flex', justifyContent: 'center', mt: '8px'}}>
                                    <Button sx={{m:'8px'}} variant='contained' size="small" onClick={()=>{handleUpdate(task)}} startIcon={<Update/>}></Button>
                                    <Button sx={{m:'8px'}} variant='contained' size="small" onClick={()=>handleDelete(task.taskId)}  startIcon={<DoneIcon/>}></Button>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                )) : null}
          </Grid>
        </Box>

      </Box>
      <Box sx={{
        marginTop: "10px",
        borderRadius: "12px",
      
        widhth: "90vw",
        height: "8vh",
        backgroundColor: "#ffffff",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        position: "relative",
        overflow: "hidden",
        border: "2px solid rgba(0, 0, 255, 0.7)",
       

      }}
      className="neon-border"
      >
        
        <Grid container spacing={2} sx={{ marginTop: "10px", justifyContent: "space-around", alignItems:"center" }}>
          <Button variant="contained" color="secondary" startIcon={<Add/>} onClick={handleAddTask}>
            Add Task
          </Button>
          <Button variant="contained" color="secondary" startIcon={<ArrowBack/>} onClick={handleBack}>
           Back
          </Button>
        </Grid>
      </Box>
      </Box>
}
    </>
  )
}

export default TaskPage