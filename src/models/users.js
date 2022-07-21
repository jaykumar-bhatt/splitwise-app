/* eslint-disable func-names */
/* eslint-disable no-unused-vars */
module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define(
    'Users',
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      contactNumber: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
  );

  Users.associate = function (models) {
    Users.hasMany(models.Friends, {
      as: 'Users',
      foreignKey: 'userId',
    });
    Users.hasMany(models.Friends, {
      as: 'Friends',
      foreignKey: 'friendId',
    });
  };
  return Users;
};
