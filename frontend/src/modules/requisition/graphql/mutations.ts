import { gql } from '@apollo/client';

export const CREATE_REQUISITION = gql`
  mutation CreateRequisition($input: RequisitionInput!) {
    createRequisition(input: $input) {
      id
      position
      department
      salary
      requirements
      functions
      status
      createdAt
    }
  }
`;

export const APPROVE_REQUISITION = gql`
  mutation ApproveRequisition($id: ID!) {
    approveRequisition(id: $id) {
      id
      status
    }
  }
`;

export const REJECT_REQUISITION = gql`
  mutation RejectRequisition($id: ID!, $reason: String!) {
    rejectRequisition(id: $id, reason: $reason) {
      id
      status
    }
  }
`; 