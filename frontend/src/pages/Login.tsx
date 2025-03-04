import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
} from '@mui/material';
import { useAuth, UserRole } from '../context/AuthContext';

const MOCK_USERS = [
  {
    email: 'gerente@empresa.com',
    password: '123456',
    id: '1',
    name: 'Juan Pérez',
    role: 'GERENTE' as UserRole,
  },
  {
    email: 'rrhh@empresa.com',
    password: '123456',
    id: '2',
    name: 'María Rodríguez',
    role: 'DIRECTOR_RRHH' as UserRole,
  },
  {
    email: 'postulante@email.com',
    password: '123456',
    id: '3',
    name: 'Carlos González',
    role: 'POSTULANTE' as UserRole,
  },
];

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const user = MOCK_USERS.find(
        (u) => u.email === formData.email && u.password === formData.password
      );

      if (!user) {
        throw new Error('Credenciales inválidas');
      }

      login(user);
      navigate('/');
    } catch (err) {
      setError('Credenciales inválidas');
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        p: 3,
      }}
    >
      <Paper sx={{ p: 4, width: '100%', maxWidth: 400 }}>
        <Typography variant="h5" align="center" gutterBottom>
          Iniciar Sesión
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Email"
            type="email"
            margin="normal"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />

          <TextField
            fullWidth
            label="Contraseña"
            type="password"
            margin="normal"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
          />

          <FormControl fullWidth margin="normal">
            <InputLabel>Rol</InputLabel>
            <Select
              value={formData.role}
              label="Rol"
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              required
            >
              <MenuItem value="GERENTE">Gerente</MenuItem>
              <MenuItem value="DIRECTOR_RRHH">Director RRHH</MenuItem>
              <MenuItem value="POSTULANTE">Postulante</MenuItem>
            </Select>
          </FormControl>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3 }}
          >
            Iniciar Sesión
          </Button>
        </form>
      </Paper>

      <Button
        variant="outlined"
        color="primary"
        sx={{ mt: 2 }}
        onClick={() => navigate('/public/vacancies')}
      >
        Ver Vacantes Disponibles
      </Button>
    </Box>
  );
};

export default Login; 