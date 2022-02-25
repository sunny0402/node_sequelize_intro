const { Sequelize, DataTypes } = require("sequelize");

function userModel(sqlize_connection_instance) {
  class User extends Sequelize.Model {}
  User.init(
    // attributes object
    {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      firstName: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "firstName cannot be null." },
          notEmpty: { msg: "Please provide a value for firstName." },
        },
      },
      lastName: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "lastName cannot be null." },
          notEmpty: { msg: "Please provide a value for lastName." },
        },
      },
      email: {
        //Constraints are rules defined at SQL level.
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        //Validations are checks performed in the Sequelize level, in pure JavaScript.
        validate: {
          isEmail: {
            msg: "Please enter a valid email",
          },
        },
      },
    },
    // model options object
    { sequelize: sqlize_connection_instance }
  );
  return User;
}

module.exports = userModel;
