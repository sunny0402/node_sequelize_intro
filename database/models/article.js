const { Sequelize, DataTypes } = require("sequelize");

function articleModelFunction(sqlize_connection_instance) {
  class Article extends Sequelize.Model {}
  Article.init(
    // 1. Attributes object
    {
      // set custom primary key
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Title cannot be null.",
          },
          notEmpty: {
            msg: "Please provide a value for title.",
          },
        },
      },
      author: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: "Alex",
        validate: {
          notNull: {
            msg: "Author cannot be null.",
          },
          notEmpty: {
            msg: "Please provide a value for author.",
          },
        },
      },
      readTime: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 10,
        validate: {
          notNull: {
            msg: "Read time cannot be null.",
          },
          min: {
            args: 3,
            msg: "Read time must be at least 3 minutes.",
          },
        },
      },

      publishDate: {
        type: Sequelize.DATEONLY,
        allowNull: false,
        defaultValue: new Date().toLocaleDateString(),
        validate: {
          notNull: {
            msg: "Publish date cannot be null.",
          },
          notEmpty: {
            msg: "Please provide a value for publish date.",
          },
          isDate: {
            msg: "Only allow date strings.",
          },
          isAfter: {
            args: "2022-01-01",
            msg: 'Please provide a value on or after "2022-01-01".',
          },
        },
      },
      isPublished: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      content: {
        type: Sequelize.TEXT,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Content cannot be null.",
          },
          notEmpty: {
            msg: "Please provide a value for content.",
          },
        },
      },
    },
    // 2. Model options object
    {
      // timestamps: false, // disable timestamps
      //   freezeTableName: true, // disable plural table names
      //   modelName: 'movie', // set model name to 'movie'; table name will be 'movies'
      //      tableName: 'my_movies_table', // table name change
      // soft deletes(paranoid): mark record as deleted instead of actually deleting
      paranoid: "true",
      sequelize: sqlize_connection_instance,
    }
  );
  return Article;
}

module.exports = articleModelFunction;
