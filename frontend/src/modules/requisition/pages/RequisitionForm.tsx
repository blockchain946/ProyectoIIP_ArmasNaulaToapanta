import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Grid,
  MenuItem,
} from '@mui/material';
import { useAuth } from '../../../context/AuthContext';
import { Requisition } from '../../../types';

const validationSchema = Yup.object({
  position: Yup.string().required('El cargo es requerido'),
  department: Yup.string().required('El departamento es requerido'),
  salary: Yup.number().required('El salario es requerido'),
  requirements: Yup.string().required('Los requisitos son requeridos'),
  functions: Yup.string().required('Las funciones son requeridas'),
});

const initialValues = {
  position: '',
  department: '',
  salary: '',
  requirements: '',
  functions: '',
};

const departments = [
  'Tecnología',
  'Recursos Humanos',
  'Finanzas',
  'Marketing',
  'Operaciones',
];

const RequisitionForm = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleSubmit = (values: any) => {
    const newRequisition: Requisition = {
      id: Date.now().toString(),
      position: values.position,
      department: values.department,
      salary: Number(values.salary),
      requirements: values.requirements.split('\n').filter(Boolean),
      functions: values.functions.split('\n').filter(Boolean),
      status: 'PENDING',
      createdAt: new Date().toISOString(),
      createdBy: user?.name,
    };

    // Obtener requisiciones existentes
    const saved = localStorage.getItem('requisitions');
    const requisitions = saved ? JSON.parse(saved) : [];
    
    // Agregar nueva requisición
    const updatedRequisitions = [...requisitions, newRequisition];
    localStorage.setItem('requisitions', JSON.stringify(updatedRequisitions));

    navigate('/requisitions');
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Nueva Requisición de Personal
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
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    name="position"
                    label="Cargo"
                    value={values.position}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.position && Boolean(errors.position)}
                    helperText={touched.position && errors.position}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    select
                    name="department"
                    label="Departamento"
                    value={values.department}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.department && Boolean(errors.department)}
                    helperText={touched.department && errors.department}
                  >
                    {departments.map((dept) => (
                      <MenuItem key={dept} value={dept}>
                        {dept}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    name="salary"
                    label="Salario"
                    type="number"
                    value={values.salary}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.salary && Boolean(errors.salary)}
                    helperText={touched.salary && errors.salary}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    multiline
                    rows={4}
                    name="requirements"
                    label="Requisitos"
                    value={values.requirements}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.requirements && Boolean(errors.requirements)}
                    helperText={touched.requirements && errors.requirements}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    multiline
                    rows={4}
                    name="functions"
                    label="Funciones"
                    value={values.functions}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.functions && Boolean(errors.functions)}
                    helperText={touched.functions && errors.functions}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Box display="flex" gap={2} justifyContent="flex-end">
                    <Button
                      type="button"
                      variant="outlined"
                      onClick={() => navigate('/requisitions')}
                    >
                      Cancelar
                    </Button>
                    <Button type="submit" variant="contained" color="primary">
                      Crear Requisición
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

export default RequisitionForm; 