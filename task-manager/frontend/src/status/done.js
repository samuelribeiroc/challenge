import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { io } from 'socket.io-client';

import { Box, Paper } from '@mui/material';
import { green } from '@mui/material/colors';

const socket = io('http://localhost:5000', {
  transports: ['websocket'],
});

function Done() {
  const [tasks, setTasks] = useState([]);

  const fetchDoneTasks = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/tasks/done');
      setTasks(response.data);
    } catch (error) {
      console.error('Erro ao buscar tasks feitas:', error);
    }
  };

  useEffect(() => {
    fetchDoneTasks();

    socket.on('taskUpdated', () => {
      fetchDoneTasks();
    });

    return () => {
      socket.off('taskUpdated');
    };
  }, []);

  return (
    <Paper elevation={3} sx={{ p: 2, gap: 2, width: { md: '100%' } }}>
      {tasks.map(task => (
        <Box sx={{ bgcolor: green[600] }}>
          {task.title}
        </Box>
      ))}
    </Paper>
  )
}

export default Done;