import { gql } from '@apollo/client';

export const GET_VACANCIES = gql`
  query GetVacancies {
    vacancies {
      id
      requisition {
        id
        position
        department
        salary
      }
      status
      publishedAt
      candidates {
        id
        name
      }
    }
  }
`;

export const GET_VACANCY = gql`
  query GetVacancy($id: ID!) {
    vacancy(id: $id) {
      id
      requisition {
        id
        position
        department
        salary
        requirements
        functions
      }
      status
      publishedAt
      candidates {
        id
        name
        email
        status
      }
    }
  }
`; 