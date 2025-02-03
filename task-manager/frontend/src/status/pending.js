import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { io } from 'socket.io-client';

import { Box, Paper } from '@mui/material';
import { red } from '@mui/material/colors';

const socket = io('http://localhost:5000', {
  transports: ['websocket'],
});

function Pending() {
  const [tasks, setTasks] = useState([]);

  const fetchPendingTasks = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/tasks/pending');
      setTasks(response.data);
    } catch (error) {
      console.error('Erro ao buscar tasks pendentes:', error);
    }
  };

  useEffect(() => {
    fetchPendingTasks();

    socket.on('taskUpdated', () => {
      fetchPendingTasks();
    });

    return () => {
      socket.off('taskUpdated');
    };
  }, []);

  return (
    <Paper
      elevation={3}
      sx={{
        p: 2,
        gap: 2,
        minHeight: '60dvh',
        width: { md: '100%' } 
      }}
    >
      {tasks.map(task => (
        <Box sx={{ bgcolor: red[500] }}>
          {task.title}
        </Box>
      ))}
    </Paper>
  )
}

export default Pending;