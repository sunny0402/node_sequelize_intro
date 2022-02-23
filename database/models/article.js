const Sequelize = require("sequelize");

function articleModelFunction(sqlize_connection_instance) {
  class Article extends Sequelize.Model {}
  Article.init(
    {
      title: Sequelize.STRING,
    },
    {
      sequelize: sqlize_connection_instance,
    }
  );
  return Article;
}

module.exports = articleModelFunction;
