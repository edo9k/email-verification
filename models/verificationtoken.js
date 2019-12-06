/** @format */

'use strict'
module.exports = (sequelize, DataTypes) => {
  const VerificationToken = sequelize.define(
    'VerificationToken',
    {
      userId: DataTypes.INTEGER,
      token: DataTypes.STRING
    },
    {
      classMethods: {
        associate: function(models) {
          verificationtoken.belongsTo(models.User, {
            as: 'user',
            foreignKey: 'userId',
            foreignKeyConstraint: true
          })
        }
      }
    }
  )
  return VerificationToken
}
