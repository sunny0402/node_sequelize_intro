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
