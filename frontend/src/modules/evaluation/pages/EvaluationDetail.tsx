import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Button,
  List,
  ListItem,
  ListItemText,
  Divider,
  Chip,
} from '@mui/material';
import { useAuth } from '../../../context/AuthContext';
import { useItemDetails } from '../../../hooks/useItemDetails';
import { Evaluation } from '../../../types';

const EvaluationDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const evaluation = useItemDetails<Evaluation>(id, 'evaluations');

  const handleStartEvaluation = () => {
    console.log('Iniciar evaluación:', id);
  };

  const handleSubmitEvaluation = () => {
    console.log('Enviar evaluación:', id);
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Detalle de Evaluación
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <Typography variant="subtitle2">Candidato</Typography>
                <Typography>{evaluation?.candidateName}</Typography>
              </Grid>
              <Grid item xs={12} md={4}>
                <Typography variant="subtitle2">Cargo</Typography>
                <Typography>{evaluation?.vacancyPosition}</Typography>
              </Grid>
              <Grid item xs={12} md={4}>
                <Typography variant="subtitle2">Estado</Typography>
                <Chip
                  label={evaluation?.status}
                  color={
                    evaluation?.status === 'COMPLETED'
                      ? 'success'
                      : evaluation?.status === 'PENDING'
                      ? 'warning'
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
              Preguntas
            </Typography>
            <List>
              {evaluation?.questions.map((q, index) => (
                <React.Fragment key={q.id}>
                  <ListItem>
                    <ListItemText
                      primary={`${index + 1}. ${q.question}`}
                      secondary={
                        user?.role === 'DIRECTOR_RRHH' && (
                          <Typography variant="body2" color="text.secondary">
                            Respuesta esperada: {q.expectedAnswer}
                          </Typography>
                        )
                      }
                    />
                  </ListItem>
                  {index < evaluation?.questions.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </List>

            {user?.role === 'POSTULANTE' && evaluation?.status === 'PENDING' && (
              <Box display="flex" gap={2} justifyContent="flex-end" sx={{ mt: 3 }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleStartEvaluation}
                >
                  Iniciar Evaluación
                </Button>
              </Box>
            )}

            {user?.role === 'POSTULANTE' && evaluation?.status === 'IN_PROGRESS' && (
              <Box display="flex" gap={2} justifyContent="flex-end" sx={{ mt: 3 }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSubmitEvaluation}
                >
                  Enviar Evaluación
                </Button>
              </Box>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default EvaluationDetail; 