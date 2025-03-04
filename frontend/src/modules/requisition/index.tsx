import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import RequisitionList from './pages/RequisitionList';
import RequisitionForm from './pages/RequisitionForm';
import RequisitionDetail from './pages/RequisitionDetail';

const RequisitionModule = () => {
  const { user } = useAuth();

  if (!['GERENTE', 'DIRECTOR_RRHH'].includes(user?.role || '')) {
    return null;
  }

  return (
    <Routes>
      <Route path="/" element={<RequisitionList />} />
      <Route path="/new" element={<RequisitionForm />} />
      <Route path="/:id" element={<RequisitionDetail />} />
    </Routes>
  );
};

export default RequisitionModule; 