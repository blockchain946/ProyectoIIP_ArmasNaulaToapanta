import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Layout from '../components/Layout';
import Login from '../pages/Login';
import PublicVacancies from '../pages/PublicVacancies';
import ApplicationForm from '../pages/ApplicationForm';
import ApplicationSuccess from '../pages/ApplicationSuccess';
import PrivateRoute from '../components/PrivateRoute';
import Dashboard from '../pages/Dashboard';
import RequisitionModule from '../modules/requisition';
import VacancyModule from '../modules/vacancy';
import CandidateModule from '../modules/candidate';
import EvaluationModule from '../modules/evaluation';
import SelectionModule from '../modules/selection';
import PublicVacancyList from '../modules/vacancy/pages/PublicVacancyList';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/public/vacancies" element={<PublicVacancyList />} />
      <Route path="/apply/:vacancyId" element={<ApplicationForm />} />
      <Route path="/application-success" element={<ApplicationSuccess />} />
      
      <Route
        path="/*"
        element={
          <Layout>
            <Routes>
              <Route path="/" element={<PrivateRoute element={<Dashboard />} />} />
              <Route
                path="/requisitions/*"
                element={
                  <PrivateRoute
                    element={<RequisitionModule />}
                    allowedRoles={['GERENTE', 'DIRECTOR_RRHH']}
                  />
                }
              />
              <Route
                path="/vacancies/*"
                element={
                  <PrivateRoute
                    element={<VacancyModule />}
                    allowedRoles={['DIRECTOR_RRHH']}
                  />
                }
              />
              <Route
                path="/candidates/*"
                element={
                  <PrivateRoute
                    element={<CandidateModule />}
                    allowedRoles={['DIRECTOR_RRHH']}
                  />
                }
              />
              <Route
                path="/evaluations/*"
                element={
                  <PrivateRoute
                    element={<EvaluationModule />}
                    allowedRoles={['DIRECTOR_RRHH', 'POSTULANTE']}
                  />
                }
              />
              <Route
                path="/selection/*"
                element={
                  <PrivateRoute
                    element={<SelectionModule />}
                    allowedRoles={['DIRECTOR_RRHH']}
                  />
                }
              />
            </Routes>
          </Layout>
        }
      />
    </Routes>
  );
};

export default AppRoutes; 