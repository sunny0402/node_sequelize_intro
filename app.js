const db = require("./database");
// const articleModelFunction = require("./database/models/article");
const { Article, User } = db.models;
const { Op } = db.Sequelize;

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
        content: "Testing... First Article. About Python.",
      }),

      Article.create({
        title: "Second Article",
        author: "sunny-codes",
        readTime: 3,
        publishDate: "2022-02-23",
        isPublished: true,
        content: "Testing... Second Article. About Python.",
      }),

      Article.create({
        title: "Third Article",
        author: "sunny-codes",
        readTime: 4,
        publishDate: "2022-02-24",
        isPublished: false,
        content: "Testing third article. About JavaScript.",
      }),

      Article.create({
        title: "Fourth Article",
        author: "sunny-codes",
        readTime: 5,
        publishDate: "2022-02-25",
        isPublished: false,
        content: "Testing fourth article. About JavaScript.",
      }),

      Article.create({
        title: "Fifth Article",
        author: "sunny-codes",
        readTime: 7,
        publishDate: "2022-02-28",
        isPublished: false,
        content: "Testing fifth article. About React.",
      }),
    ]);

    const user1 = await User.create({
      firstName: "Test Firstname",
      lastName: "Test Lastname",
      email: "TEST@gmail.com",
    });

    const user2 = await User.create({
      firstName: "sunny",
      lastName: "codes",
      email: "sunny.codes@gmail.com",
    });

    //update records with save method
    // const articleById = await Article.findByPk(2);
    // console.log(articleById.toJSON());
    // articleById.title = articleById.title + " Updating Title.";
    // await articleById.save();
    // //convert instance or collection of instances to JSON
    // console.log(articleById.get({ plain: true }));

    // update with update method
    // const articleById = await Article.findByPk(2);
    // articleById.update(
    //   {
    //     title: "New title.",
    //     author: "sunny",
    //   },
    //   //fields sets which properties are allowed to be updated
    //   { fields: ["title", "author"] }
    // );
    // console.log(articleById.get({ plain: true }));

    // delete records
    // const first_article = await Article.findByPk(1);
    // await first_article.destroy();
    // const all_articles = await Article.findAll();
    // console.log(all_articles.map((an_article) => an_article.toJSON()));

    // soft deletes: mark record as deleted instead of actually deleting
    const first_article = await Article.findByPk(1);
    await first_article.destroy();
    const all_articles = await Article.findAll();
    console.log(all_articles.map((an_article) => an_article.toJSON()));

    //end of try block
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
