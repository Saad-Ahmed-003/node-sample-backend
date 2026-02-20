'use strict'
const { Model } = require('sequelize')
const bcrypt = require('bcryptjs')

module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        // call this to check password at login
        async validatePassword(password) {
            return bcrypt.compare(password, this.password)
        }
    }

    User.init({
        name: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        role: DataTypes.ENUM('admin', 'user'),
        authProvider: DataTypes.ENUM('local', 'google', 'saml'),
        providerId: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'User',
        hooks: {
            // automatically hash password before saving
            beforeCreate: async (user) => {
                if (user.password) {
                    user.password = await bcrypt.hash(user.password, 12)
                }
            }
        }
    })

    User.associate = (models) => {
        User.hasMany(models.Product, { foreignKey: 'createdBy' })
    }

    return User
}