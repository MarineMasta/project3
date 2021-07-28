const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    password: String
    userid: Int
  }

  input UserInput {
    username: String!
    password: String!
  }

  type ScoredGame {
    _id: ID
    scoredName: String
    score: Int
    userid: Int
    createdAt: String
  }

  type TimedGame {
    _id: ID
    timedName: String
    duration: String
    userid: Int
    createdAt: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(username: String!): User
    timedGames(username: String): [TimedGame]
    timedGame(_id: ID!): TimedGame
    scoredGames(username: String): [ScoredGame]
    scoredGame(_id: ID!): ScoredGame
    me: User
  }

  type Mutation {
    addUser(username: String!, password: String!, userid: Int!): Auth
    login(username: String!, password: String!): Auth
    addGameScore(scoredName: String!, score: Int!, userid: Int!): ScoredGame
    addGameTime(timedName: String!, duration: String!, userid: Int!): TimedGame
    updateGameScore(scoredName: String!, score: Int!, userid: Int!): ScoredGame
    updateTimedGame(
      _id: ID!
      timedName: String
      duration: String
      userid: Int
    ): TimedGame
    updateScoredGame(
      _id: ID!
      scoredName: String
      score: Int
      userid: Int
    ): ScoredGame
    removeTimedGame(_id: ID!): TimedGame
    removeScoredGame(_id: ID!): ScoredGame
  }
`;

module.exports = typeDefs;
