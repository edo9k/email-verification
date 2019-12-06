/** @format */

'use strict'
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface
      .createTable('VerificationTokens', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        userId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          onUpdate: 'cascade',
          onDelete: 'cascade',
          refences: { model: 'Users', key: 'id' }
        },
        token: {
          type: Sequelize.STRING,
          allowNull: false
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE
        }
      })
      .then(() => {
        consle.log('verification table created')
        return queryInterface.sequelize.query(`
        CREATE EVENT expireToken
        ON SCHEDULE AT CURRENT_TIMESTAMP + INTERVAL 1 DAY
        DO
        DELETE FROM verification_tokens WHERE createdAt < DATE_SUB(NOW(), INTERVAL 1 DAY);
      `)
      })
      .then(() => {
        console.log('expireToken event created')
      })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('VerificationTokens').then(() => {
      return queryInterface.sequelize.query(`DROP EVENT IF EXISTS expireToken`)
    })
  }
}
