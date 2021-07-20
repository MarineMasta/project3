const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    password: String!
  }

  type ScoredGame {
    _id: ID
    scoredName: String
    score: String
    createdAt: String
  }

  type TimedGame {
    _id: ID
    timedName: String
    duration: String
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
    timedGame(timedGameId: ID!): TimedGame
    scoredGames(username: String): [ScoredGame]
    scoredGame(scoredGameId: ID!): ScoredGame
    me: User
  }

  type Mutation {
    addUser(username: String!, password: String!): Auth
    login(username: String!, password: String!): Auth
    addScoredGame(scoredGame: String!): ScoredGame
    addTimedGame(timedGame: String!): TimedGame
    removeScoredGame(scoredGameId: ID!): ScoredGame
    removeTimedGame(timedGameId: ID!): TimedGame
  }
`;

module.exports = typeDefs;
