import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Typography from '@mui/material/Typography';
import Slide from '@mui/material/Slide';
import { useNavigate } from 'react-router-dom';
import { Box, TextField } from '@mui/material';
import jwtDecode from 'jwt-decode';
import { taskManagement } from '../../../Services/Api';




const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const AddTask = () => {
  const [open, setOpen] = React.useState(false);
  const [task, setTask] = React.useState({
    email:jwtDecode(localStorage.getItem('token')).email ,
    title: '',
    category: '',
    desc: '',
    time: ''
  })
  const navigate = useNavigate();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask(prevTask => ({
      ...prevTask,
      [name]: value
    }));
  };
  const SubmitTask= async (t)=>{
     await taskManagement.add(t);
    console.log(t);
  }
  const handleClose = () => {
    SubmitTask(task);
    setOpen(false);
    navigate('/taskpage')

  };
  const handleSubmit = (e) => { }
  React.useEffect(() => {
    handleClickOpen();
  })

  return (
    <React.Fragment>

      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >

        <Box
          sx={{
            width: '100vw',
            height: '100vh',
            backgroundColor: '#08365C'
          }}
        >


          <Box
            sx={{
              maxWidth: 500,

              margin: '0 auto',
              padding: 2,
              border: '1px solid #ccc',
              borderRadius: 4,
              backgroundColor: "#2878BD",

            }}
          >
            <Typography variant="h5" mb={2}>Add Task</Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                label="Email"

                variant="outlined"
                fullWidth
                margin="normal"
                name="email"
                value={jwtDecode(localStorage.getItem('token')).email}

              />
              <TextField
                label="Title"
                variant="outlined"
                autoComplete="off"
                fullWidth
                margin="normal"
                name="title"
                value={task.title}
                onChange={handleChange}
              />
              <TextField
                label="Category"
                variant="outlined"
                autoComplete="off"
                fullWidth
                margin="normal"
                name="category"
                value={task.category}
                onChange={handleChange}
              />
              <TextField
                label="Description"
                variant="outlined"
                fullWidth
                margin="normal"
                autoComplete="off"
                multiline
                rows={4}
                name="desc"
                value={task.desc}
                onChange={handleChange}
              />
              <TextField
                label="Time"
                variant="outlined"
                fullWidth
                margin="normal"
                name="time"
                type="datetime-local" // Set the type to "datetime-local"
                InputLabelProps={{
                  shrink: true,
                }}
              
                value={task.time}
                onChange={handleChange}
              />
              <Button variant="contained" color="primary" mt={2} onClick={handleClose}>Add</Button>
            </form>
          </Box>
        </Box>

      </Dialog>
    </React.Fragment>
  )
}

export default AddTask