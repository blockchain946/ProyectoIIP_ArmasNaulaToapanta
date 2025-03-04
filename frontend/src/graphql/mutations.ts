import { gql } from '@apollo/client';

export const CREATE_REQUISITION = gql`
  mutation CreateRequisition($input: RequisitionInput!) {
    createRequisition(input: $input) {
      id
      position
      department
      status
    }
  }
`;

export const PUBLISH_VACANCY = gql`
  mutation PublishVacancy($requisitionId: ID!, $channels: [PublicationChannel!]!) {
    publishVacancy(requisitionId: $requisitionId, channels: $channels) {
      id
      status
    }
  }
`;

export const REGISTER_CANDIDATE = gql`
  mutation RegisterCandidate($input: CandidateInput!) {
    registerCandidate(input: $input) {
      id
      name
      email
      status
    }
  }
`; 