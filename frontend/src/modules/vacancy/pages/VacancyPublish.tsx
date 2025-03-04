import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Paper,
  Grid,
  TextField,
  Button,
} from '@mui/material';
import { useAuth } from '../../../context/AuthContext';

const VacancyPublish = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const handlePublish = () => {
    console.log('Publicar vacante:', id);
    navigate(`/vacancies/${id}`);
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Publicar Vacante
      </Typography>

      <Paper sx={{ p: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              rows={4}
              label="Descripción Adicional"
              placeholder="Añade información adicional para la publicación..."
            />
          </Grid>
          <Grid item xs={12}>
            <Box display="flex" gap={2} justifyContent="flex-end">
              <Button
                variant="outlined"
                onClick={() => navigate(`/vacancies/${id}`)}
              >
                Cancelar
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handlePublish}
              >
                Publicar
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default VacancyPublish; 