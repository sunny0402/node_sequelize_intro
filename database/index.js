const Sequelize = require("sequelize");

const my_db_connection_instance = new Sequelize({
  dialect: "sqlite",
  storage: "blog.db",
  logging: true,
});

const db_to_export = {
  my_db_connection_instance,
  Sequelize,
  models: {},
};

db_to_export.models.Article = require("./models/article")(
  my_db_connection_instance
);

module.exports = db_to_export;
