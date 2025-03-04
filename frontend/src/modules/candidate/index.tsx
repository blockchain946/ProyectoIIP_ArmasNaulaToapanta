import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import CandidateList from './pages/CandidateList';
import CandidateDetail from './pages/CandidateDetail';
import CandidateForm from './pages/CandidateForm';

const CandidateModule = () => {
  const { user } = useAuth();

  if (user?.role !== 'DIRECTOR_RRHH') {
    return null;
  }

  return (
    <Routes>
      <Route path="/" element={<CandidateList />} />
      <Route path="/new" element={<CandidateForm />} />
      <Route path="/:id" element={<CandidateDetail />} />
    </Routes>
  );
};

export default CandidateModule; 