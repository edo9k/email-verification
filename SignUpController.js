/** @format */

import crypto from 'crypto-random-string'
const { sendVerificationEmail } = require('./SendGridEmailHelper.js')

const SignUpController = (req, res, next) => {
  return models.User.findOrCreate({
    where: { email: req.body.email },
    defaults: req.body
  }).spread((user, created) => {
    if (!created) return res.status(409).json('User email address already exists')
    return models.VerificationToken.create({
      userId: user.id,
      token: crypto(16)
    })
      .then(result => {
        sendVerificationEmail(user.email, result.token)
        return res.status(200).json(`${user.email} account created successfully`)
      })
      .catch(e => res.status(500).json(e))
  })
}

export default SignUpController
