import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Paper,
  Grid,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';

const EvaluationForm = () => {
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí iría la lógica para enviar la evaluación
    console.log('Evaluación enviada');
    navigate('/evaluations');
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Realizar Evaluación
      </Typography>

      <Paper sx={{ p: 3 }}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Tipo de Evaluación</InputLabel>
                <Select
                  label="Tipo de Evaluación"
                  defaultValue="TECHNICAL"
                >
                  <MenuItem value="TECHNICAL">Técnica</MenuItem>
                  <MenuItem value="PSYCHOLOGICAL">Psicológica</MenuItem>
                  <MenuItem value="ENGLISH">Inglés</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={4}
                label="Preguntas/Ejercicios"
                placeholder="Ingrese las preguntas o ejercicios de la evaluación..."
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                type="number"
                label="Tiempo Límite (minutos)"
                defaultValue={60}
              />
            </Grid>

            <Grid item xs={12}>
              <Box display="flex" gap={2} justifyContent="flex-end">
                <Button
                  type="button"
                  variant="outlined"
                  onClick={() => navigate('/evaluations')}
                >
                  Cancelar
                </Button>
                <Button type="submit" variant="contained" color="primary">
                  Guardar Evaluación
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  );
};

export default EvaluationForm; 