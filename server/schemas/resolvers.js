const { Users, ScoredGames, TimedGames } = require("../models");
// const User = require("../models/Users");

const resolvers = {
  Query: {
    users: async () => {
      try {
        const users = await Users.find({});
        return users;
      } catch (error) {
        console.log(error);
      }
    },
    user: async (parent, { _id }) => {
      return User.findOne({ _id: _id }).populate("scoredGame", "timedGame");
    },
    scoredGames: async (parent, { username }) => {
      const params = username ? { username } : {};
      return ScoredGames.find(params).sort({ createdAt: -1 });
    },
    scoredGame: async (parent, { _id }) => {
      return ScoredGames.findOne({ _id: _id });
    },
    timedGames: async (parent, { username }) => {
      const params = username ? { username } : {};
      return TimedGames.find(params).sort({ createdAt: -1 });
    },
    timedGame: async (parent, { _id }) => {
      return TimedGames.findOne({ _id: _id });
    },
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user.id }).populate(
          "scoredGames",
          "timedGame"
        );
      }
      throw new AuthenticationError("You need to be logged in!");
    },
  },

  Mutation: {
    // addUser: async (parent, args) => {
    //   const user = await User.create(args);
    //   const token = signToken(user);

    //   return { token, user };
    // },
    addUser: async (parent, { username, password, userid }) => {
      const user = await User.create({ username, password, userid });
      const token = signToken(User);
      return { token, User };
    },

    login: async (parent, { username, password }) => {
      const user = await User.findOne({ username });

      if (!User) {
        throw new AuthenticationError("No user found with this username");
      }

      const correctPw = await User.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const token = signToken(user);

      return { token, User };
    },

    addGameScore: async (parent, { scoredName, score, userid }) => {
      // Create and return the new School object
      return await ScoredGames.create({ scoredName, score, userid });
    },

    addGameTime: async (parent, { timedName, duration, userid }) => {
      // Create and return the new School object
      return await TimedGames.create({ timedName, duration, userid });
    },

    updateScoredGame: async (parent, { _id, scoredName, score, userid }) => {
      // Find and update the matching class using the destructured args
      const game = await ScoredGames.findOne({ _id: _id });
      console.log(game);
      if (!scoredName) scoredName = game.scoredName;
      if (!score) score = game.score;
      if (!userid) userid = game.userid;
      return await ScoredGames.findOneAndUpdate(
        { _id: _id },
        { scoredName, score, userid },
        //Return the newly updated object instead of the original
        { new: true }
      );
    },

    updateTimedGame: async (parent, { _id, timedName, duration, userid }) => {
      // Find and update the matching class using the destructured args
      const game = await TimedGames.findOne({ _id: _id });
      console.log(game);
      if (!timedName) timedName = game.timedName;
      if (!duration) duration = game.duration;
      if (!userid) userid = game.userid;
      return await TimedGames.findOneAndUpdate(
        { _id: _id },
        { timedName, duration, userid },
        //Return the newly updated object instead of the original
        { new: true }
      );
    },

    // updateUser: async (parent, args, context) => {
    //   if (context.user) {
    //     return User.findByIdAndUpdate(context.user.id, args, {
    //       new: true,
    //     });
    //   }

    //   throw new AuthenticationError("Not logged in");
    // },

    removeScoredGame: async (parent, { _id }) => {
      return ScoredGames.findOneAndDelete({ _id: _id });
    },

    removeTimedGame: async (parent, { _id }) => {
      return TimedGames.findOneAndDelete({ _id: _id });
    },
  },
};
module.exports = resolvers;
