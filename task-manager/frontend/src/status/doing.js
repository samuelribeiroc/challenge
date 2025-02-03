import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { io } from 'socket.io-client';

import { Box, Paper } from '@mui/material';
import { orange } from '@mui/material/colors';

const socket = io('http://localhost:5000', {
  transports: ['websocket'],
});

function Doing() {
  const [tasks, setTasks] = useState([]);

  const fetchDoingTasks = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/tasks/doing');
      setTasks(response.data);
    } catch (error) {
      console.error('Erro ao buscar tasks em andamento:', error);
    }
  };

  useEffect(() => {
    fetchDoingTasks();

    socket.on('taskUpdated', () => {
      fetchDoingTasks();
    });

    return () => {
      socket.off('taskUpdated');
    };
  }, []);

  return (
    <Paper elevation={3} sx={{ p: 2, gap: 2, width: { md: '100%' } }}>
      {tasks.map(task => (
        <Box sx={{ bgcolor: orange[500] }}>
          {task.title}
        </Box>
      ))}
    </Paper>
  )
}

export default Doing;