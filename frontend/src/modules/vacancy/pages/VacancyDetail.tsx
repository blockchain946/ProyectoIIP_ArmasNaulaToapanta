import React from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Chip,
} from '@mui/material';
import { Vacancy } from '../../../types';
import { useItemDetails } from '../../../hooks/useItemDetails';

const VacancyDetail = () => {
  const { id } = useParams();
  const vacancy = useItemDetails<Vacancy>(id, 'vacancies');

  if (!vacancy) {
    return <Typography>Vacante no encontrada</Typography>;
  }

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Detalle de la Vacante
      </Typography>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2">Cargo</Typography>
            <Typography variant="body1">{vacancy.position}</Typography>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2">Departamento</Typography>
            <Typography variant="body1">{vacancy.department}</Typography>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2">Salario</Typography>
            <Typography variant="body1">${vacancy.salary}</Typography>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2">Estado</Typography>
            <Chip
              label={vacancy.status}
              color={
                vacancy.status === 'PUBLISHED'
                  ? 'success'
                  : vacancy.status === 'DRAFT'
                  ? 'warning'
                  : 'error'
              }
            />
          </Grid>

          <Grid item xs={12}>
            <Typography variant="subtitle2">Requisitos</Typography>
            <Box sx={{ mt: 1 }}>
              {vacancy.requirements.map((req, index) => (
                <Chip
                  key={index}
                  label={req}
                  sx={{ mr: 1, mb: 1 }}
                />
              ))}
            </Box>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="subtitle2">Funciones</Typography>
            <Box sx={{ mt: 1 }}>
              {vacancy.functions.map((func, index) => (
                <Chip
                  key={index}
                  label={func}
                  sx={{ mr: 1, mb: 1 }}
                />
              ))}
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default VacancyDetail; 