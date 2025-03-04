import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Paper,
  Button,
} from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const ApplicationSuccess = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 3,
      }}
    >
      <Paper sx={{ p: 4, textAlign: 'center', maxWidth: 400 }}>
        <CheckCircleOutlineIcon
          color="success"
          sx={{ fontSize: 64, mb: 2 }}
        />
        <Typography variant="h5" gutterBottom>
          ¡Postulación Exitosa!
        </Typography>
        <Typography color="text.secondary" paragraph>
          Tu postulación ha sido recibida. Te notificaremos por correo electrónico
          cuando tu perfil haya sido revisado.
        </Typography>
        <Button
          variant="contained"
          onClick={() => navigate('/login')}
          sx={{ mt: 2 }}
        >
          Ir al Login
        </Button>
      </Paper>
    </Box>
  );
};

export default ApplicationSuccess; 