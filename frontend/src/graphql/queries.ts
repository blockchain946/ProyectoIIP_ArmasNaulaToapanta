import { gql } from '@apollo/client';

export const GET_VACANCIES = gql`
  query GetVacancies($status: VacancyStatus) {
    vacancies(status: $status) {
      id
      requisition {
        position
        department
      }
      status
      candidates {
        id
      }
    }
  }
`;

export const GET_VACANCY = gql`
  query GetVacancy($id: ID!) {
    vacancy(id: $id) {
      id
      requisition {
        position
        department
        requirements
        functions
      }
      status
      candidates {
        id
        name
        status
      }
    }
  }
`;

export const GET_CANDIDATES = gql`
  query GetCandidates($vacancyId: ID!) {
    candidates(vacancyId: $vacancyId) {
      id
      name
      email
      status
      evaluations {
        id
        type
        score
      }
    }
  }
`; 