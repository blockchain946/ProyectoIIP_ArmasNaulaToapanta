import React from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Chip,
  Button,
  List,
  ListItem,
  ListItemText,
  Divider,
} from '@mui/material';
import { useAuth } from '../../../context/AuthContext';

interface Interview {
  date: string;
  interviewer: string;
  notes: string;
  recommendation: 'APPROVE' | 'REJECT';
}

interface Evaluation {
  type: string;
  score: number;
  feedback: string;
  date: string;
}

interface SelectionDetail {
  id: string;
  vacancy: {
    position: string;
    department: string;
    salary: number;
  };
  candidate: {
    name: string;
    email: string;
    phone: string;
  };
  status: string;
  evaluations: Evaluation[];
  interview: Interview;
}

const MOCK_SELECTION: SelectionDetail = {
  id: '1',
  vacancy: {
    position: 'Desarrollador Frontend',
    department: 'Tecnología',
    salary: 50000,
  },
  candidate: {
    name: 'Ana López',
    email: 'ana@email.com',
    phone: '+1234567890',
  },
  status: 'PENDING_DECISION',
  evaluations: [
    {
      type: 'TECHNICAL',
      score: 85,
      feedback: 'Buen conocimiento técnico',
      date: '2024-03-05T10:00:00Z',
    },
    {
      type: 'PSYCHOLOGICAL',
      score: 90,
      feedback: 'Excelente actitud y soft skills',
      date: '2024-03-06T15:00:00Z',
    },
  ],
  interview: {
    date: '2024-03-07T14:00:00Z',
    interviewer: 'María Rodríguez',
    notes: 'Candidato muestra gran potencial y alineación con valores',
    recommendation: 'APPROVE',
  },
};

const SelectionDetail = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const selection = MOCK_SELECTION;

  const handleApprove = () => {
    console.log('Aprobar candidato:', id);
  };

  const handleReject = () => {
    console.log('Rechazar candidato:', id);
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Detalle del Proceso de Selección
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Información del Cargo
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <Typography variant="subtitle2">Posición</Typography>
                <Typography>{selection.vacancy.position}</Typography>
              </Grid>
              <Grid item xs={12} md={4}>
                <Typography variant="subtitle2">Departamento</Typography>
                <Typography>{selection.vacancy.department}</Typography>
              </Grid>
              <Grid item xs={12} md={4}>
                <Typography variant="subtitle2">Salario</Typography>
                <Typography>${selection.vacancy.salary}</Typography>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Información del Candidato
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <Typography variant="subtitle2">Nombre</Typography>
                <Typography>{selection.candidate.name}</Typography>
              </Grid>
              <Grid item xs={12} md={4}>
                <Typography variant="subtitle2">Email</Typography>
                <Typography>{selection.candidate.email}</Typography>
              </Grid>
              <Grid item xs={12} md={4}>
                <Typography variant="subtitle2">Teléfono</Typography>
                <Typography>{selection.candidate.phone}</Typography>
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
              {selection.evaluations.map((evaluation, index) => (
                <React.Fragment key={index}>
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
                  {index < selection.evaluations.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </List>
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Entrevista
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="subtitle2">Fecha</Typography>
                <Typography>
                  {new Date(selection.interview.date).toLocaleString()}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle2">Entrevistador</Typography>
                <Typography>{selection.interview.interviewer}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle2">Notas</Typography>
                <Typography>{selection.interview.notes}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle2">Recomendación</Typography>
                <Chip
                  label={selection.interview.recommendation}
                  color={
                    selection.interview.recommendation === 'APPROVE'
                      ? 'success'
                      : 'error'
                  }
                />
              </Grid>
            </Grid>

            {user?.role === 'DIRECTOR_RRHH' && selection.status === 'PENDING_DECISION' && (
              <Box display="flex" gap={2} justifyContent="flex-end" sx={{ mt: 3 }}>
                <Button
                  variant="contained"
                  color="success"
                  onClick={handleApprove}
                >
                  Aprobar Candidato
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  onClick={handleReject}
                >
                  Rechazar Candidato
                </Button>
              </Box>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SelectionDetail; 