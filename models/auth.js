module.exports = (sequelize, DataTypes) => {
    return sequelize.define('auth', {
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        passwordhash: {
            type: DataTypes.STRING,
            allowNull: false
        }
    })
};