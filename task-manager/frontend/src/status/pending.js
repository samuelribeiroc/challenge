import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { io } from 'socket.io-client';

import { Avatar, List, ListItemAvatar,
  ListItemButton, ListItemText, Paper
} from '@mui/material';
import { red } from '@mui/material/colors';
import PendingIcon from '@mui/icons-material/Pending';

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
        minHeight: '60dvh',
        width: { md: '100%' } 
      }}
    >
      <List sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {tasks.map((task, index) => (
          <ListItemButton
            key={index}
            sx={{
              bgcolor: red[500],
              color: 'white',
              p: 2,

              '&:hover': {
                bgcolor: red[400]
              }
            }}
          >
            <ListItemAvatar>
              <Avatar sx={{ bgcolor: red[700] }}>
                <PendingIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={task.title}
              primaryTypographyProps={{
                noWrap: true,
                style: { overflow: 'hidden', textOverflow: 'ellipsis' }
              }}
            >
              {task.title}
            </ListItemText>
          </ListItemButton>
        ))}
      </List>
    </Paper>
  )
}

export default Pending;