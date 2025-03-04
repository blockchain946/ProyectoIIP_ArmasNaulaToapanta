import React from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Chip,
  List,
  ListItem,
  ListItemText,
  Divider,
} from '@mui/material';
import { useItemDetails } from '../../../hooks/useItemDetails';
import { Candidate } from '../../../types';

const CandidateDetail = () => {
  const { id } = useParams();
  const candidate = useItemDetails<Candidate>(id, 'candidates');

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Detalle del Candidato
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Información Personal
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle2">Nombre</Typography>
                <Typography>{candidate?.name}</Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle2">Email</Typography>
                <Typography>{candidate?.email}</Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle2">Teléfono</Typography>
                <Typography>{candidate?.phone}</Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle2">Estado</Typography>
                <Chip
                  label={candidate?.status}
                  color={
                    candidate?.status === 'IN_PROCESS'
                      ? 'primary'
                      : 'default'
                  }
                />
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Evaluaciones
            </Typography>
            <List>
              {candidate?.evaluations.map((evaluation, index) => (
                <React.Fragment key={evaluation.id}>
                  <ListItem>
                    <ListItemText
                      primary={`Evaluación ${evaluation.type}`}
                      secondary={
                        <>
                          <Typography variant="body2">
                            Puntuación: {evaluation.score}
                          </Typography>
                          <Typography variant="body2">
                            Feedback: {evaluation.feedback}
                          </Typography>
                          <Typography variant="body2">
                            Fecha: {new Date(evaluation.date).toLocaleDateString()}
                          </Typography>
                        </>
                      }
                    />
                  </ListItem>
                  {index < candidate.evaluations.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </List>
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Postulaciones
            </Typography>
            <List>
              {candidate?.appliedVacancies.map((vacancy, index) => (
                <React.Fragment key={vacancy.id}>
                  <ListItem>
                    <ListItemText
                      primary={vacancy.position}
                      secondary={
                        <>
                          <Typography variant="body2">
                            Departamento: {vacancy.department}
                          </Typography>
                          <Typography variant="body2">
                            Estado: {vacancy.status}
                          </Typography>
                        </>
                      }
                    />
                  </ListItem>
                  {index < candidate.appliedVacancies.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CandidateDetail; 