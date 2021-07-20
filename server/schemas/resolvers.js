const { User, Games } = require("../models");

const resolvers = {
  Query: {
    usernames: async () => {
      return User.find().populate("games");
    },
    username: async (parent, { username }) => {
      return User.findOne({ username }).populate("games");
    },
    scoredGames: async (parent, { username }) => {
      const params = username ? { username } : {};
      return scoredGame.find(params).sort({ createdAt: -1 });
    },
    scoredGame: async (parent, { scoredGameId }) => {
      return ScoredGame.findOne({ _id: scoredGameId });
    },
    timedGames: async (parent, { username }) => {
      const params = username ? { username } : {};
      return timedGame.find(params).sort({ createdAt: -1 });
    },
    timedGame: async (parent, { timedGameId }) => {
      return TimedGame.findOne({ _id: timedGameId });
    },
  },
  Mutation: {
    addUser: async (parent, { username, password }) => {
      const user = await User.create({ username, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { username, password }) => {
      const user = await User.findOne({ username });

      if (!user) {
        throw new AuthenticationError("No user found with this username");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const token = signToken(user);

      return { token, user };
    },
    addScoredGame: async (parent, { scoredGame }, context) => {
      if (context.user) {
        const scoredGame = await ScoredGame.create({
          scoredGame,
          username: context.user.username,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { scoredGames: scoredGame._id } }
        );

        return scoredGame;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    addTimedGame: async (parent, { timedGame }, context) => {
      if (context.user) {
        const timedGame = await TimedGame.create({
          timedGame,
          username: context.user.username,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { timedGames: timedGame._id } }
        );

        return timedGame;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    removeTimedGame: async (parent, { timedGameId }, context) => {
      if (context.user) {
        const timedGame = await TimedGame.findOneAndDelete({
          _id: timedGame,
          username: context.user.username,
        });
        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { timedGames: timedGame._id } }
        );

        return timedGame;
      }
      throw new AuthenicationError("You need to be logged in!");
    },
    removeScoredGame: async (parent, { scoredGameId }, context) => {
      if (context.user) {
        const scoredGame = await ScoredGame.findOneAndDelete({
          _id: scoredGame,
          username: context.user.username,
        });
        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { timedGames: timedGame._id } }
        );

        return scoredGame;
      }
      throw new AuthenicationError("You need to be logged in!");
    },
  },
};
