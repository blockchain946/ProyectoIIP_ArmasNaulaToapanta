import { gql } from '@apollo/client';

export const PUBLISH_VACANCY = gql`
  mutation PublishVacancy($id: ID!, $channels: [String!]!) {
    publishVacancy(id: $id, channels: $channels) {
      id
      status
    }
  }
`; 