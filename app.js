const Sequelize = require("sequelize");
const my_sqlize = new Sequelize({
  dialect: "sqlite",
  storage: "blog.db",
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
    const an_article = await Article.create({
      title: "First Article",
    });
    // turn an_article instance to a JSON representation of the data
    console.log(an_article.toJSON());
  } catch (error) {
    console.error("Error connecting to the database: ", error);
  }
}
dbOperations();
