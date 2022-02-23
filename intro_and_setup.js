/**
 * Notes:
 * DB Browser for SQLite
 */

const Sequelize = require("sequelize");
const my_sqlize = new Sequelize({
  dialect: "sqlite",
  storage: "blog.db",
  logging: true,
});

class Article extends Sequelize.Model {}
Article.init(
  {
    title: Sequelize.STRING,
  },
  {
    sequelize: my_sqlize,
  }
); //define a new table in the db

async function dbOperations() {
  // sync articles table
  //   await Article.sync();

  // sync() issues a CREATE TABLE IF NOT EXISTS
  // force: true issues DROP TABLE IF EXISTS before creating table again with sync()
  await my_sqlize.sync({ force: true });
  try {
    await my_sqlize.authenticate();
    console.log("Connection to the database successful!");

    // instance of article class represents a row in db
    // returns promise object based on success/failure
    const article1 = await Article.create({
      title: "First Article",
    });
    // turn an_article instance to a JSON representation of the data
    console.log(article1.toJSON());

    const article2 = await Article.create({
      title: "Second Article",
    });
    console.log(article2.toJSON());

    //create row entry without variable
    await Article.create({ title: "Article Three" });
  } catch (error) {
    console.error("Error connecting to the database: ", error);
  }
}
dbOperations();
