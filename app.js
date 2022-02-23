const db = require("./database");
const { Article } = db.models;

async function dbOperations() {
  await db.my_db_connection_instance.sync({ force: true });
  try {
    await db.my_db_connection_instance.authenticate();
    console.log("Connection to the database successful!");

    const articleInstances = await Promise.all([
      Article.create({
        title: "First Article",
      }),
      Article.create({
        title: "Second Article",
      }),
      Article.create({ title: "Article Three" }),
    ]);
    const articlesJSON = articleInstances.map((an_article) =>
      an_article.toJSON()
    );
    console.log(articlesJSON);
  } catch (error) {
    console.error("Error connecting to the database: ", error);
  }
}
dbOperations();
