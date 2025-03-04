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

interface Selection {
  id: string;
  vacancyPosition: string;
  candidateName: string;
  status: string;
  evaluationScore: number;
  interviewDate: string;
}

const MOCK_SELECTIONS: Selection[] = [
  {
    id: '1',
    vacancyPosition: 'Desarrollador Frontend',
    candidateName: 'Ana López',
    status: 'PENDING_DECISION',
    evaluationScore: 85,
    interviewDate: '2024-03-05T10:00:00Z',
  },
  {
    id: '2',
    vacancyPosition: 'Analista de RRHH',
    candidateName: 'Pedro Martínez',
    status: 'APPROVED',
    evaluationScore: 90,
    interviewDate: '2024-03-04T15:00:00Z',
  },
];

const SelectionList = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const selections = MOCK_SELECTIONS;

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Proceso de Selección
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Cargo</TableCell>
              <TableCell>Candidato</TableCell>
              <TableCell>Puntuación</TableCell>
              <TableCell>Estado</TableCell>
              <TableCell>Fecha Entrevista</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {selections.map((selection) => (
              <TableRow key={selection.id}>
                <TableCell>{selection.vacancyPosition}</TableCell>
                <TableCell>{selection.candidateName}</TableCell>
                <TableCell>{selection.evaluationScore}</TableCell>
                <TableCell>
                  <Chip
                    label={selection.status}
                    color={
                      selection.status === 'APPROVED'
                        ? 'success'
                        : selection.status === 'PENDING_DECISION'
                        ? 'warning'
                        : 'error'
                    }
                  />
                </TableCell>
                <TableCell>
                  {new Date(selection.interviewDate).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => navigate(`/selection/${selection.id}`)}
                  >
                    Ver Detalles
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

export default SelectionList; 