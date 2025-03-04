import React, { useState, useEffect } from 'react';
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

interface Requisition {
  id: string;
  position: string;
  department: string;
  status: string;
  salary: number;
  requirements: string[];
  functions: string[];
  createdAt: string;
  createdBy: string;
}

// Estado inicial de requisiciones
const INITIAL_REQUISITIONS: Requisition[] = [
  {
    id: '1',
    position: 'Desarrollador Frontend',
    department: 'Tecnología',
    status: 'PENDING',
    salary: 50000,
    requirements: ['React', 'TypeScript', '3 años de experiencia'],
    functions: ['Desarrollo de interfaces', 'Mantenimiento de aplicaciones'],
    createdAt: '2024-03-04T10:00:00Z',
    createdBy: 'Juan Pérez',
  },
];

// Almacenamiento local
const LOCAL_STORAGE_KEY = 'requisitions';

const RequisitionList = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [requisitions, setRequisitions] = useState<Requisition[]>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    return saved ? JSON.parse(saved) : INITIAL_REQUISITIONS;
  });

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(requisitions));
  }, [requisitions]);

  const handleApprove = (id: string) => {
    setRequisitions(requisitions.map((req: Requisition) => 
      req.id === id ? { ...req, status: 'APPROVED' } : req
    ));
  };

  const handleReject = (id: string) => {
    setRequisitions(requisitions.map((req: Requisition) => 
      req.id === id ? { ...req, status: 'REJECTED' } : req
    ));
  };

  const filteredRequisitions = user?.role === 'GERENTE' 
    ? requisitions.filter((req: Requisition) => req.createdBy === user.name)
    : requisitions;

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h5">Requisiciones</Typography>
        {user?.role === 'GERENTE' && (
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate('/requisitions/new')}
          >
            Nueva Requisición
          </Button>
        )}
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Cargo</TableCell>
              <TableCell>Departamento</TableCell>
              <TableCell>Estado</TableCell>
              <TableCell>Fecha</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredRequisitions.map((requisition: Requisition) => (
              <TableRow key={requisition.id}>
                <TableCell>{requisition.position}</TableCell>
                <TableCell>{requisition.department}</TableCell>
                <TableCell>
                  <Chip
                    label={requisition.status}
                    color={
                      requisition.status === 'APPROVED'
                        ? 'success'
                        : requisition.status === 'PENDING'
                        ? 'warning'
                        : 'error'
                    }
                  />
                </TableCell>
                <TableCell>
                  {new Date(requisition.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <Box display="flex" gap={1}>
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => navigate(`/requisitions/${requisition.id}`)}
                    >
                      Ver Detalles
                    </Button>
                    {user?.role === 'DIRECTOR_RRHH' && requisition.status === 'PENDING' && (
                      <>
                        <Button
                          variant="contained"
                          color="success"
                          size="small"
                          onClick={() => handleApprove(requisition.id)}
                        >
                          Aprobar
                        </Button>
                        <Button
                          variant="contained"
                          color="error"
                          size="small"
                          onClick={() => handleReject(requisition.id)}
                        >
                          Rechazar
                        </Button>
                      </>
                    )}
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default RequisitionList; 