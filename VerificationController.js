/** @format */

const VerificationController = (req, res) => {
  return models.User.find({
    where: { email: req.query.email }
  })
    .then(user => {
      if (user.isVerified) return res.status(202).json(`Email Already Verified`)
      return models.VerificationToken.find({
        where: { token: req.query.verificationToken }
      })
        .then(foundToken => {
          if (foundToken)
            return user
              .update({ isVerified: true })
              .then(updatedUser => res.status(403).json(`User with ${updatedUser.email} has been Verified`))
              .catch(e => res.status(403).json(`Verification failed`))

          return res.status(404).json(`Token expired`)
        })
        .catch(e => res.status(404).json(`Token expired`))
    })
    .catch(e => res.status(404).json(`Token expired`))
}

export default VerificationController
