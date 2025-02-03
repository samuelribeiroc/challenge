import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { io } from 'socket.io-client';

import { Avatar, List, ListItemAvatar,
  ListItemButton, ListItemText, Paper,
} from '@mui/material';
import { red } from '@mui/material/colors';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ModalTaks from '../components/modal';

const socket = io('http://localhost:5000', {
  transports: ['websocket'],
});

function Pending() {
  const [tasks, setTasks] = useState([]);

  //for modal
  const [open, setOpen] = React.useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  
  const handleOpen = (taskId) => {
    setSelectedTaskId(taskId);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedTaskId(null);
  };

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
    <>
      <ModalTaks open={open} onClose={handleClose} taskId={selectedTaskId} />

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
              onClick={() => handleOpen(task.id)}
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
    </>
  )
}

export default Pending;