'use strict'
const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
    class Product extends Model { }

    Product.init({
        name: DataTypes.STRING,
        description: DataTypes.TEXT,
        price: DataTypes.DECIMAL(10, 2),
        quantity: DataTypes.INTEGER,
        createdBy: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'Product'
    })

    Product.associate = (models) => {
        Product.belongsTo(models.User, { foreignKey: 'createdBy' })
    }

    return Product
}