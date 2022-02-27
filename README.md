## About

Backend for a blog using Node.js and Sequelize.

https://sequelize.org/v3/

Based on: https://teamtreehouse.com/library/using-sql-orms-with-nodejs

## Notes

Data Types

```
//https://sequelize.org/master/manual/model-basics.html

DATE: yyyy-mm-dd hh:mm:ss
DATEONLY: yyyy-mm-dd
```

Universally Unique Identifier

```
//https://sequelize.org/v3/api/datatypes/
sequelize.define('model', {
uuid: {
type: DataTypes.UUID,
defaultValue: function() {
return generateMyId()
},
primaryKey: true
}
})

```

Validation

```
//https://sequelize.org/master/manual/validations-and-constraints.html#allowing-disallowing-null-values

isEmail: true,
 notEmpty: true,
 len: [2,10],
isDate: true,

isInt: {
  msg: "Must be an integer number of pennies"
}
or if arguments need to also be passed add an args property:

isIn: {
  args: [['en', 'zh']],
  msg: "Must be English or Chinese"
}
```

```
//Example of custom validation
class User extends Model {}
User.init({
  age: Sequelize.INTEGER,
  name: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      customValidator(value) {
        if (value === null && this.age !== 10) {
          throw new Error("name can't be null unless age is 10");
        }
      })
    }
  }
}, { sequelize });
```

Validator.js
https://github.com/validatorjs/validator.js

build() then save() allows to modify data before saving to database
create() does build() and save() in one step

```
const newArticle = await Article.build({
  title: 'My Notes',
  author: "sunny-codes",
  readTime: 5,
});

newArticle.title = 'Updated Title';
await newArticle.save();

```

Operators
https://sequelize.org/master/manual/model-querying-basics.html

```
[Op.between]: [6, 10],
[Op.startsWith]: 'hat',
[Op.endsWith]: 'hat',

Foo.findAll({
  where: {
    rank: {
      [Op.or]: {
        [Op.lt]: 1000,
        [Op.eq]: null
      }
    },
    // rank < 1000 OR rank IS NULL

    {
      createdAt: {
        [Op.lt]: new Date(),
        [Op.gt]: new Date(new Date() - 24 * 60 * 60 * 1000)
      }
    },
    // createdAt < [timestamp] AND createdAt > [timestamp]

    {
      [Op.or]: [
        {
          title: {
            [Op.like]: 'Boat%'
          }
        },
        {
          description: {
            [Op.like]: '%boat%'
          }
        }
      ]
    }
    // title LIKE 'Boat%' OR description LIKE '%boat%'
  }
});

```

Ordering

order: [['publishDate', 'ASC']],

Incrementing

```
const jane = await User.create({ name: "Jane", age: 100, cash: 5000 });
await jane.increment({
  'age': 2,
  'cash': 100
});

// If the values are incremented by the same amount, you can use this other syntax as well:
await jane.increment(['age', 'cash'], { by: 2 });
```

Associations
https://sequelize.org/master/manual/assocs.html

Sequelize CLI
https://github.com/sequelize/cli
