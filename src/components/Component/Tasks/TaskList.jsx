import { Box, Button, Card, CardContent, Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { taskManagement } from '../../../Services/Api';
import jwtDecode from 'jwt-decode';

const TaskList = () => {
    const [tasks, setTasks] = useState([]);

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

    return (
        <Box
            sx={{
                width: "100%",
                height: "60vh",
                overflowY: "auto",
                display: "flex",
                flexDirection: "column"
            }}
        >
            <Grid container spacing={2} sx={{ width: "100%" }}>
                {tasks.length > 0 ? tasks.map((task, index) => (
                    <Grid item xs={12} sm={12} md={12} sx={{ flexGrow: 1 }} key={index}>
                        <Card variant="outlined" sx={{ width: "100%" }}>
                            <CardContent>
                                <Typography variant='h6'>Title: {task.title}</Typography>
                                <Typography>Category: {task.category}</Typography>
                                <Typography>ETA: {task.time}</Typography>
                              
                            </CardContent>
                        </Card>
                    </Grid>
                )) : null}
            </Grid>
        </Box>
    )
}

export default TaskList;
