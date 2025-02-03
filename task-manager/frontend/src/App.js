import { useState } from 'react';
import Pending from './status/pending';

import { useTheme } from '@mui/material/styles';
import { useMediaQuery, Container, Box,
  Typography, Tabs, Tab
 } from '@mui/material';
import { grey } from '@mui/material/colors';
import Doing from './status/doing';
import Done from './status/done';

function App() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [activeTab, setActiveTab] = useState(0);

  const handleChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <Container maxWidth='xl' sx={{ py: 4 }}>
      <Box>
        <Typography variant='h3'>
          TaskManager
        </Typography>
        <Typography variant='h5' color='grey'>
          Painel
        </Typography>
      </Box>

      <Box sx={{ bgcolor: grey[500], mt: 4, p: 2 }}>
        {isMobile ? (
          <Box>
            <Tabs
              value={activeTab}
              onChange={handleChange}
              sx={{
                mb: 2,

                '& .MuiTab-root': {
                  color: 'white', // Cor do texto das tabs
                  transition: 'background-color 0.3s ease, color 0.3s ease',
                },
              }}
              variant="fullWidth"
              aria-label="task status tabs"
            >
              <Tab label='Pendente' value={0} />
              <Tab label='Em andamento' value={1} />
              <Tab label='Feito' value={2} />
            </Tabs>

            {activeTab === 0 && <Pending />}
            {activeTab === 1 && <Doing />}
            {activeTab === 2 && <Done />}
          </Box>
        ) : (
          <Box>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr 1fr',
                gap: 2,
                mb: 2
              }}
            >
              <Typography
                color='white'
                sx={{
                  textTransform: 'uppercase',
                  textAlign: 'center',
                  py: 1.5,
                  px: 2,
                  fontSize: '1rem'
                }}
              >
                Pendente
              </Typography>

              <Typography
                color='white'
                sx={{
                  textTransform: 'uppercase',
                  textAlign: 'center',
                  py: 1.5,
                  px: 2,
                  fontSize: '1rem'
                }}
              >
                Em andamento
              </Typography>

              <Typography
                color='white'
                sx={{
                  textTransform: 'uppercase',
                  textAlign: 'center',
                  py: 1.5,
                  px: 2,
                  fontSize: '1rem'
                }}
              >
                Feito
              </Typography>
            </Box>

            <Box gap={2} sx={{ display: 'flex' }}>
              <Pending />
              <Doing />
              <Done />
            </Box>
          </Box>
        )}
      </Box>
    </Container>
  );
}

export default App;
