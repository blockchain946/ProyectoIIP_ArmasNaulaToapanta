import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Chip,
} from '@mui/material';
import { Vacancy } from '../../../types';

const PublicVacancyList = () => {
  const navigate = useNavigate();
  const vacancies: Vacancy[] = JSON.parse(localStorage.getItem('vacancies') || '[]');
  const publishedVacancies = vacancies.filter(v => v.status === 'PUBLISHED');

  return (
    <Box sx={{ p: 3, maxWidth: 1200, mx: 'auto' }}>
      <Typography variant="h4" gutterBottom>
        Oportunidades Laborales
      </Typography>

      {publishedVacancies.length === 0 ? (
        <Typography>No hay vacantes disponibles en este momento.</Typography>
      ) : (
        <Grid container spacing={3}>
          {publishedVacancies.map((vacancy) => (
            <Grid item xs={12} md={6} key={vacancy.id}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {vacancy.position}
                  </Typography>
                  <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                    {vacancy.department}
                  </Typography>
                  <Typography variant="body2" paragraph>
                    Salario: ${vacancy.salary}
                  </Typography>
                  <Typography variant="body2" paragraph>
                    Requisitos:
                  </Typography>
                  <Box sx={{ mb: 2 }}>
                    {vacancy.requirements.map((req, index) => (
                      <Chip
                        key={index}
                        label={req}
                        size="small"
                        sx={{ mr: 1, mb: 1 }}
                      />
                    ))}
                  </Box>
                </CardContent>
                <CardActions>
                  <Button
                    variant="contained"
                    onClick={() => navigate(`/apply/${vacancy.id}`)}
                  >
                    Postular
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default PublicVacancyList; 