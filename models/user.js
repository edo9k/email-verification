/** @format */

'use strict'

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      isVerified: DataTypes.BOOLEAN
    },
    {
      classMethods: {
        associate: function(models) {
          User.hasOne(models.VerificationToken, {
            as: 'verificationtoken',
            foreignKey: 'userId',
            foreignKeyConstraint: true
          })
        }
      }
    }
  )

  return User
}
