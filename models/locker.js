module.exports = (sequelize, DataTypes) => {
    return sequelize.define('locker', {
        itemName: DataTypes.STRING,
        description: DataTypes.STRING,
        weight: DataTypes.STRING,
        quantity: DataTypes.INTEGER,
        owner: DataTypes.INTEGER
    });
};