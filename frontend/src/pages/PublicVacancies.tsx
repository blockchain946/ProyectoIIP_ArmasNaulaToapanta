import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Button,
  Card,
  CardContent,
  CardActions,
  Chip,
} from '@mui/material';
import { Vacancy } from '../types';

const PublicVacancies = () => {
  const navigate = useNavigate();
  const vacancies: Vacancy[] = JSON.parse(localStorage.getItem('vacancies') || '[]');

  return (
    <Box sx={{ p: 3, maxWidth: 1200, mx: 'auto' }}>
      <Typography variant="h4" gutterBottom>
        Oportunidades Laborales
      </Typography>

      <Grid container spacing={3}>
        {vacancies
          .filter((v: Vacancy) => v.status === 'PUBLISHED')
          .map((vacancy: Vacancy) => (
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
                    {vacancy.requirements.map((requirement: string, index: number) => (
                      <Chip
                        key={index}
                        label={requirement}
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
    </Box>
  );
};

export default PublicVacancies; 