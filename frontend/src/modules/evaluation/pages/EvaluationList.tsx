import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Chip,
} from '@mui/material';
import { useAuth } from '../../../context/AuthContext';

const MOCK_EVALUATIONS = [
  {
    id: '1',
    candidateId: '1',
    candidateName: 'Ana López',
    vacancyPosition: 'Desarrollador Frontend',
    status: 'PENDING',
    scheduledDate: '2024-03-10T14:00:00Z',
    type: 'TECHNICAL',
  },
  {
    id: '2',
    candidateId: '2',
    candidateName: 'Pedro Martínez',
    vacancyPosition: 'Desarrollador Frontend',
    status: 'COMPLETED',
    scheduledDate: '2024-03-05T10:00:00Z',
    type: 'TECHNICAL',
    score: 85,
  },
];

const EvaluationList = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const filteredEvaluations = user?.role === 'POSTULANTE'
    ? MOCK_EVALUATIONS.filter(evaluation => evaluation.candidateId === user.id)
    : MOCK_EVALUATIONS;

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Evaluaciones
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Candidato</TableCell>
              <TableCell>Cargo</TableCell>
              <TableCell>Estado</TableCell>
              <TableCell>Fecha</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredEvaluations.map((evaluation) => (
              <TableRow key={evaluation.id}>
                <TableCell>{evaluation.candidateName}</TableCell>
                <TableCell>{evaluation.vacancyPosition}</TableCell>
                <TableCell>
                  <Chip
                    label={evaluation.status}
                    color={
                      evaluation.status === 'COMPLETED'
                        ? 'success'
                        : evaluation.status === 'PENDING'
                        ? 'warning'
                        : 'default'
                    }
                  />
                </TableCell>
                <TableCell>
                  {new Date(evaluation.scheduledDate).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => navigate(`/evaluations/${evaluation.id}`)}
                  >
                    {user?.role === 'POSTULANTE' && evaluation.status === 'PENDING'
                      ? 'Realizar'
                      : 'Ver Detalles'}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default EvaluationList; 