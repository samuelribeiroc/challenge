import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { io } from 'socket.io-client';

import { Avatar, List, ListItemAvatar,
  ListItemButton, ListItemText, Paper,
  Modal, Box, Typography,
  ListItemIcon,
  ListItem,
  Button
} from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PendingIcon from '@mui/icons-material/Pending';
import DoneIcon from '@mui/icons-material/Done';

const socket = io('http://localhost:5000');

function ModalTaks({ open, onClose, taskId }) {
  const [task, setTask] = useState(null);

  useEffect(() => {
    if (open && taskId) {
      axios.get(`http://localhost:5000/api/tasks/${taskId}`)
        .then(response => {
          setTask(response.data);
        })
        .catch(error => {
          console.error('Erro ao buscar detalhes da task:', error);
        });

      socket.on(`taskUpdated:${taskId}`, (updatedTask) => {
        setTask(updatedTask);
      });
    }

    return () => {
      if (taskId) {
        socket.off(`taskUpdated:${taskId}`);
      }
    };
  }, [open, taskId]);

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Paper
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          minWidth: '250px',
          minHeight: '150px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          boxShadow: 24,
          p: 4,
        }}
      >
        <List>
          <ListItem disablePadding>
            <ListItemIcon>
              {task?.status === 'pending' && <AccessTimeIcon sx={{ color: 'red' }} />}
              {task?.status === 'doing' && <PendingIcon sx={{ color: 'orange' }} />}
              {task?.status === 'done' && <DoneIcon sx={{ color: 'green' }} />}
            </ListItemIcon>

            <ListItemText
              primary={task?.title}
              secondary={task?.description}
            />
          </ListItem>
        </List>

        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button variant="outlined" color="error">Excluir</Button>
          <Button variant='contained'>Editar</Button>
        </Box>
      </Paper>
    </Modal>
  )
}

export default ModalTaks;