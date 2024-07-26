import { gql } from '@apollo/client';

// Query to get all leads
export const GET_LEADS = gql`
  query {
    leads {
      id
      name
      email
      phone
      status
    }
  }
`;

// Mutation to add a new lead
export const ADD_LEAD = gql`
  mutation AddLead($name: String!, $email: String!, $phone:String!, $status: String!) {
    addLead(name: $name, email: $email, phone: $phone, status: $status) {
      id
      name
      email
      phone
      status
    }
  }
`;

 export const UPDATE_LEAD_STATUS = gql`
  mutation UpdateLeadStatus($id: ID!, $status: String!) {
    updateLeadStatus(id: $id, status: $status) {
      id
      status
    }
  }
`;
