import { gql } from '@apollo/client';

export const GET_REQUISITIONS = gql`
  query GetRequisitions {
    requisitions {
      id
      position
      department
      status
      salary
      requirements
      functions
      createdAt
      updatedAt
    }
  }
`;

export const GET_REQUISITION = gql`
  query GetRequisition($id: ID!) {
    requisition(id: $id) {
      id
      position
      department
      status
      salary
      requirements
      functions
      createdAt
      updatedAt
    }
  }
`; 