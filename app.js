const db = require("./database");
const { Article, User } = db.models;

async function dbOperations() {
  await db.my_db_connection_instance.sync({ force: true });
  try {
    await db.my_db_connection_instance.authenticate();
    console.log("Connection to the database successful!");

    const articleInstances = await Promise.all([
      //    title, author, readTime(10),publishDate(DATEONLY: yyyy-mm-dd)
      //    isPublished(false), content

      Article.create({
        title: "First Article",
        author: "Alex",
        content: "Testing... Second Article.",
      }),

      Article.create({
        title: "Second Article",
        author: "Alex Alex",
        readTime: 3,
        publishDate: "2022-02-23",
        isPublished: true,
        content: "Testing... Second Article.",
      }),
    ]);

    const user1 = await User.create({
      firstName: "Test Firstname",
      lastName: "Test Lastname",
      email: "TEST@gmail.com",
    });

    //display created rows

    const articlesJSON = articleInstances.map((an_article) =>
      an_article.toJSON()
    );
    console.log(articlesJSON);
    console.log(user1.toJSON());
  } catch (error) {
    if (error.name === "SequelizeValidationError") {
      const errors = error.errors.map((err) => err.message);
      console.error("Validation errors: ", errors);
    } else {
      throw error;
    }
    //console.error("Error connecting to the database: ", error);
  }
}
dbOperations();
