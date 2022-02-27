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

    //display created rows

    const articlesJSON = articleInstances.map((an_article) =>
      an_article.toJSON()
    );
    // console.log(articlesJSON);
    // console.log(user1.toJSON());
    // console.log(user2.toJSON());

    //find by primary key
    // const articleById = await Article.findByPk(2);
    // console.log(articleById.toJSON());

    //returns first match
    // const articleByReadTime = await Article.findOne({
    //   where: { readTime: 10 },
    // });
    // console.log(articleByReadTime.toJSON());

    // find all entires in table
    // const all_users = await User.findAll();
    // console.log(all_users.map((a_user) => a_user.toJSON()));

    //find all and where
    // const all_articles_where = await Article.findAll({
    //   where: {
    //     author: "sunny-codes",
    //     isPublished: true,
    //   },
    // });
    // console.log(all_articles_where.map((an_article) => an_article.toJSON()));

    const some_attributes = await Article.findAll({
      attributes: ["id", "author", "publishDate", "readTime"],
      where: {
        author: "sunny-codes",
        publishDate: {
          [Op.gte]: "2022-02-24",
        },
        readTime: {
          [Op.gt]: 4,
        },
      },
      // ascending is default
      //   order: [["id", "DESC"]],
      order: [["publishDate", "DESC"]],
    });
    console.log(some_attributes.map((an_article) => an_article.toJSON()));

    //end of try
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
