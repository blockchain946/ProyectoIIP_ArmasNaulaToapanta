import { gql } from '@apollo/client';

export const GET_CANDIDATES = gql`
  query GetCandidates {
    candidates {
      id
      name
      email
      status
      appliedVacancies {
        id
        requisition {
          position
        }
      }
    }
  }
`;

export const GET_CANDIDATE = gql`
  query GetCandidate($id: ID!) {
    candidate(id: $id) {
      id
      name
      email
      phone
      status
      resume
      evaluations {
        id
        score
        feedback
      }
      appliedVacancies {
        id
        requisition {
          position
          department
        }
        status
      }
    }
  }
`; 