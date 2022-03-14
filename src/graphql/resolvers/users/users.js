const User = require('../../../models/user');
const Auth = require('../../../services/auth.service');

module.exports = {
  Query: {
    getUsers: () => User.find(),
  },

  Mutation: {
    signup: async (_, { email, name, mobileNumber, password, country }) => {
      const hashedPassword = await Auth.hashPassword(password);
      const user = new User({ email, name,mobileNumber, country, password: hashedPassword })
      await user.save()
      return 'new user successfully created'
    },

    login: async (_, { email, password }) => {
      if (!password && !email) throw new Error('email or password required');
      const user = await User.findOne(email)
      if (!user) throw new Error('Unknown user', userPayload)

      const correctPassword = await Auth.matchPasswords(password, user.password)
      if (!correctPassword) throw new Error('invalid password')

      return {
        jwt: Auth.generateJwt({
          userId: user.id,
          email: user.email
        })
      }
    },
  }
}