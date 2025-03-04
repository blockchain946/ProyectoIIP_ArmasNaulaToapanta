import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Chip,
  Button,
} from '@mui/material';
import { useAuth } from '../../../context/AuthContext';
import { useItemDetails } from '../../../hooks/useItemDetails';
import { Requisition } from '../../../types';

const RequisitionDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const requisition = useItemDetails<Requisition>(id, 'requisitions');

  const handleApprove = () => {
    if (!requisition || !id) return;

    const requisitions = JSON.parse(localStorage.getItem('requisitions') || '[]');
    const updatedRequisitions = requisitions.map((req: Requisition) =>
      req.id === id ? { ...req, status: 'APPROVED' } : req
    );
    localStorage.setItem('requisitions', JSON.stringify(updatedRequisitions));
    navigate('/requisitions');
  };

  const handleReject = () => {
    if (!requisition || !id) return;

    const requisitions = JSON.parse(localStorage.getItem('requisitions') || '[]');
    const updatedRequisitions = requisitions.map((req: Requisition) =>
      req.id === id ? { ...req, status: 'REJECTED' } : req
    );
    localStorage.setItem('requisitions', JSON.stringify(updatedRequisitions));
    navigate('/requisitions');
  };

  if (!requisition) {
    return <Typography>Requisición no encontrada</Typography>;
  }

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Detalle de Requisición
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle2">Cargo</Typography>
                <Typography>{requisition.position}</Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle2">Departamento</Typography>
                <Typography>{requisition.department}</Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle2">Salario</Typography>
                <Typography>${requisition.salary}</Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle2">Estado</Typography>
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
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle2">Requisitos</Typography>
                <Box sx={{ mt: 1 }}>
                  {Array.isArray(requisition.requirements) && requisition.requirements.map((req, index) => (
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
                  {Array.isArray(requisition.functions) && requisition.functions.map((func, index) => (
                    <Typography key={index}>• {func}</Typography>
                  ))}
                </Box>
              </Grid>
            </Grid>

            {user?.role === 'DIRECTOR_RRHH' && requisition.status === 'PENDING' && (
              <Box display="flex" gap={2} justifyContent="flex-end" sx={{ mt: 3 }}>
                <Button
                  variant="contained"
                  color="success"
                  onClick={handleApprove}
                >
                  Aprobar
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  onClick={handleReject}
                >
                  Rechazar
                </Button>
              </Box>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default RequisitionDetail; 