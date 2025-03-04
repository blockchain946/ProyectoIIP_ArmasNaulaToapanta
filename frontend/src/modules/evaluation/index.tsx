import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import EvaluationList from './pages/EvaluationList';
import EvaluationForm from './pages/EvaluationForm';
import EvaluationDetail from './pages/EvaluationDetail';

const EvaluationModule = () => {
  const { user } = useAuth();

  if (!['POSTULANTE', 'DIRECTOR_RRHH'].includes(user?.role || '')) {
    return null;
  }

  return (
    <Routes>
      <Route path="/" element={<EvaluationList />} />
      <Route path="/new" element={<EvaluationForm />} />
      <Route path="/:id" element={<EvaluationDetail />} />
    </Routes>
  );
};

export default EvaluationModule; 