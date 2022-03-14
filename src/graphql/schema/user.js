const User = `
  type User {
    id: ID!
    email: String!
    name: String!
    password: String!
    mobileNumber: String!
    country: String!
  }
  type Token {
    jwt: ID!
  }
  type Query {
    getUser(id: ID!): User
    getUsers: [User]
  }
  type Mutation {
    signup(email: String!, name: String!, password: String!, mobileNumber: String!, country: String!): String!,
    login(email: String,  password: String!): Token!,
}`

module.exports = User;