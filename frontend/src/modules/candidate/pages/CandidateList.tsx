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

const MOCK_CANDIDATES = [
  {
    id: '1',
    name: 'Ana López',
    email: 'ana@email.com',
    status: 'IN_PROCESS',
    appliedVacancies: [
      {
        id: '1',
        requisition: {
          position: 'Desarrollador Frontend',
        },
      },
    ],
  },
  {
    id: '2',
    name: 'Pedro Martínez',
    email: 'pedro@email.com',
    status: 'EVALUATING',
    appliedVacancies: [
      {
        id: '1',
        requisition: {
          position: 'Desarrollador Frontend',
        },
      },
    ],
  },
];

const CandidateList = () => {
  const navigate = useNavigate();
  const mockData = { candidates: MOCK_CANDIDATES };

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Lista de Candidatos
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Estado</TableCell>
              <TableCell>Postulaciones</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {mockData.candidates.map((candidate) => (
              <TableRow key={candidate.id}>
                <TableCell>{candidate.name}</TableCell>
                <TableCell>{candidate.email}</TableCell>
                <TableCell>
                  <Chip
                    label={candidate.status}
                    color={
                      candidate.status === 'IN_PROCESS'
                        ? 'primary'
                        : candidate.status === 'EVALUATING'
                        ? 'warning'
                        : 'default'
                    }
                  />
                </TableCell>
                <TableCell>{candidate.appliedVacancies.length}</TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => navigate(`/candidates/${candidate.id}`)}
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

export default CandidateList; 