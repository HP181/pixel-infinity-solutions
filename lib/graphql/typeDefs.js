export const typeDefs = /* GraphQL */ `
  type Appointment {
    _id: ID!
    id: Int!
    name: String!
    email: String!
    date: String!
    subject: String!
    desc: String!
    status: String!
    isVerifiedByAdmin: Boolean!
  }

  type ActionResult {
    message: String
    status: Int
    error: String
  }

  type MutationResult {
    message: String!
    statusCode: Int!
    error: String
  }

  type Query {
    appointments: [Appointment!]!
  }

  type Mutation {
    updateAppointmentStatus(
      _id: ID!
      email: String!
      name: String!
      status: String!
      date: String!
    ): MutationResult!

    createAppointment(
      name: String!
      email: String!
      date: String!
      subject: String!
      desc: String!
    ): ActionResult!

    createContact(
      name: String!
      email: String!
      message: String!
    ): ActionResult!
  }
`;
