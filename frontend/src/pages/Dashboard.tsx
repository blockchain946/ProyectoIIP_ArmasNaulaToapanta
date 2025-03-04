import React from 'react';
import { Box, Grid, Paper, Typography } from '@mui/material';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const { user } = useAuth();

  const getStats = () => {
    switch (user?.role) {
      case 'GERENTE':
        return [
          { label: 'Requisiciones Pendientes', value: 3 },
          { label: 'Requisiciones Aprobadas', value: 5 },
          { label: 'Requisiciones Rechazadas', value: 1 },
        ];
      case 'DIRECTOR_RRHH':
        return [
          { label: 'Vacantes Activas', value: 8 },
          { label: 'Candidatos en Proceso', value: 15 },
          { label: 'Evaluaciones Pendientes', value: 6 },
        ];
      case 'POSTULANTE':
        return [
          { label: 'Postulaciones Activas', value: 2 },
          { label: 'Evaluaciones Pendientes', value: 1 },
          { label: 'Entrevistas Programadas', value: 1 },
        ];
      default:
        return [];
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      <Grid container spacing={3}>
        {getStats().map((stat, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Paper
              sx={{
                p: 3,
                textAlign: 'center',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}
            >
              <Typography variant="h3" color="primary">
                {stat.value}
              </Typography>
              <Typography variant="subtitle1" color="text.secondary">
                {stat.label}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Dashboard; 