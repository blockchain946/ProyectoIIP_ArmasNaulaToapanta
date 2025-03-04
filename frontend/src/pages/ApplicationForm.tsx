import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import {
  Box,
  Typography,
  Paper,
  Grid,
  TextField,
  Button,
} from '@mui/material';
import { Vacancy, ApplicationFormValues, User, Candidate } from '../types';

const validationSchema = Yup.object({
  name: Yup.string().required('El nombre es requerido'),
  email: Yup.string().email('Email inválido').required('El email es requerido'),
  phone: Yup.string().required('El teléfono es requerido'),
  experience: Yup.string().required('La experiencia es requerida'),
  about: Yup.string().required('La descripción es requerida'),
  password: Yup.string()
    .min(6, 'La contraseña debe tener al menos 6 caracteres')
    .required('La contraseña es requerida'),
});

const ApplicationForm = () => {
  const { vacancyId } = useParams();
  const navigate = useNavigate();
  const vacancies: Vacancy[] = JSON.parse(localStorage.getItem('vacancies') || '[]');
  const vacancy = vacancies.find((v: Vacancy) => v.id === vacancyId);

  const handleSubmit = (values: ApplicationFormValues) => {
    const newUser: User = {
      id: Date.now().toString(),
      name: values.name,
      email: values.email,
      password: values.password,
      role: 'POSTULANTE',
      status: 'PENDING',
    };

    const newCandidate: Candidate = {
      id: newUser.id,
      name: values.name,
      email: values.email,
      phone: values.phone,
      status: 'PENDING',
      evaluations: [],
      appliedVacancies: [{
        id: vacancyId!,
        position: vacancy?.position || '',
        department: vacancy?.department || '',
        status: 'PENDING'
      }]
    };

    const users: User[] = JSON.parse(localStorage.getItem('users') || '[]');
    const candidates: Candidate[] = JSON.parse(localStorage.getItem('candidates') || '[]');

    localStorage.setItem('users', JSON.stringify([...users, newUser]));
    localStorage.setItem('candidates', JSON.stringify([...candidates, newCandidate]));

    navigate('/application-success');
  };

  if (!vacancy) {
    return <Typography>Vacante no encontrada</Typography>;
  }

  const initialValues: ApplicationFormValues = {
    name: '',
    email: '',
    phone: '',
    experience: '',
    about: '',
    password: '',
  };

  return (
    <Box sx={{ p: 3, maxWidth: 800, mx: 'auto' }}>
      <Typography variant="h5" gutterBottom>
        Postular a: {vacancy.position}
      </Typography>

      <Paper sx={{ p: 3 }}>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, errors, touched, handleChange, handleBlur }) => (
            <Form>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    name="name"
                    label="Nombre completo"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.name && Boolean(errors.name)}
                    helperText={touched.name && errors.name}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    name="email"
                    label="Email"
                    type="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.email && Boolean(errors.email)}
                    helperText={touched.email && errors.email}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    name="phone"
                    label="Teléfono"
                    value={values.phone}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.phone && Boolean(errors.phone)}
                    helperText={touched.phone && errors.phone}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    multiline
                    rows={4}
                    name="experience"
                    label="Experiencia"
                    placeholder="Describe tu experiencia relevante para el cargo..."
                    value={values.experience}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.experience && Boolean(errors.experience)}
                    helperText={touched.experience && errors.experience}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    multiline
                    rows={4}
                    name="about"
                    label="Acerca de ti"
                    placeholder="Cuéntanos sobre ti..."
                    value={values.about}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.about && Boolean(errors.about)}
                    helperText={touched.about && errors.about}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    name="password"
                    label="Contraseña"
                    type="password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.password && Boolean(errors.password)}
                    helperText={touched.password && errors.password}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Box display="flex" gap={2} justifyContent="flex-end">
                    <Button
                      type="button"
                      variant="outlined"
                      onClick={() => navigate('/vacancies')}
                    >
                      Cancelar
                    </Button>
                    <Button type="submit" variant="contained" color="primary">
                      Enviar Postulación
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </Paper>
    </Box>
  );
};

export default ApplicationForm; 