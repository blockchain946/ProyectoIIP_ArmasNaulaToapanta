import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import VacancyList from './pages/VacancyList';
import VacancyDetail from './pages/VacancyDetail';
import VacancyPublish from './pages/VacancyPublish';

const VacancyModule = () => {
  const { user } = useAuth();

  if (user?.role !== 'DIRECTOR_RRHH') {
    return null;
  }

  return (
    <Routes>
      <Route path="/" element={<VacancyList />} />
      <Route path="/:id" element={<VacancyDetail />} />
      <Route path="/:id/publish" element={<VacancyPublish />} />
    </Routes>
  );
};

export default VacancyModule; 