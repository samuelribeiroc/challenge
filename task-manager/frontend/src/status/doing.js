import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { io } from 'socket.io-client';

import { Avatar, List, ListItemAvatar,
  ListItemButton, ListItemText, Paper
} from '@mui/material';
import { orange } from '@mui/material/colors';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

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
              bgcolor: orange[500],
              color: 'white',
              p: 2,

              '&:hover': {
                bgcolor: orange[400]
              }
            }}
          >
            <ListItemAvatar>
              <Avatar sx={{ bgcolor: orange[700] }}>
                <AccessTimeIcon />
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

export default Doing;