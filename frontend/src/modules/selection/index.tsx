import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SelectionList from './pages/SelectionList';
import SelectionDetail from './pages/SelectionDetail';

const SelectionModule = () => {
  return (
    <Routes>
      <Route path="/" element={<SelectionList />} />
      <Route path="/:id" element={<SelectionDetail />} />
    </Routes>
  );
};

export default SelectionModule; 