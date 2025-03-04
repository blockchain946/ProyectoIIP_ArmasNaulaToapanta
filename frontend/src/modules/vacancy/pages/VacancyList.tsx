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
import { Vacancy, Requisition } from '../../../types';

const VacancyList = () => {
  const navigate = useNavigate();
  const [vacancies, setVacancies] = useState<Vacancy[]>([]);

  useEffect(() => {
    const requisitions: Requisition[] = JSON.parse(localStorage.getItem('requisitions') || '[]');
    const approvedRequisitions = requisitions.filter(
      (req: Requisition) => req.status === 'APPROVED'
    );

    const savedVacancies: Vacancy[] = JSON.parse(localStorage.getItem('vacancies') || '[]');
    
    const newVacancies = approvedRequisitions
      .filter((req: Requisition) => 
        !savedVacancies.some((v: Vacancy) => v.requisitionId === req.id)
      )
      .map((req: Requisition): Vacancy => ({
        id: Date.now().toString() + Math.random(),
        position: req.position,
        department: req.department,
        salary: req.salary,
        requirements: req.requirements,
        functions: req.functions,
        status: 'DRAFT' as const,
        requisitionId: req.id,
        createdAt: new Date().toISOString(),
      }));

    const allVacancies = [...savedVacancies, ...newVacancies];
    setVacancies(allVacancies);
    localStorage.setItem('vacancies', JSON.stringify(allVacancies));
  }, []);

  const handlePublish = (id: string) => {
    const updatedVacancies = vacancies.map(vacancy =>
      vacancy.id === id
        ? {
            ...vacancy,
            status: 'PUBLISHED' as const,
            publishedAt: new Date().toISOString(),
          }
        : vacancy
    );
    setVacancies(updatedVacancies);
    localStorage.setItem('vacancies', JSON.stringify(updatedVacancies));
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Gestión de Vacantes
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Cargo</TableCell>
              <TableCell>Departamento</TableCell>
              <TableCell>Estado</TableCell>
              <TableCell>Fecha Publicación</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {vacancies.map((vacancy) => (
              <TableRow key={vacancy.id}>
                <TableCell>{vacancy.position}</TableCell>
                <TableCell>{vacancy.department}</TableCell>
                <TableCell>
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
                </TableCell>
                <TableCell>
                  {vacancy.publishedAt
                    ? new Date(vacancy.publishedAt).toLocaleDateString()
                    : '-'}
                </TableCell>
                <TableCell>
                  <Box display="flex" gap={1}>
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => navigate(`/vacancies/${vacancy.id}`)}
                    >
                      Ver Detalles
                    </Button>
                    {vacancy.status === 'DRAFT' && (
                      <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        onClick={() => handlePublish(vacancy.id)}
                      >
                        Publicar
                      </Button>
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

export default VacancyList; 