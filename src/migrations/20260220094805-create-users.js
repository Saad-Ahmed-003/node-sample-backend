'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Users', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      password: {
        type: Sequelize.STRING,
        allowNull: true  // null for OAuth/SAML users who don't have a password
      },
      role: {
        type: Sequelize.ENUM('admin', 'user'),
        defaultValue: 'user'
      },
      authProvider: {
        type: Sequelize.ENUM('local', 'google', 'saml'),
        defaultValue: 'local'
      },
      providerId: {
        type: Sequelize.STRING,
        allowNull: true  // stores the Google/SAML user ID
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE
    })
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('Users')
  }
}