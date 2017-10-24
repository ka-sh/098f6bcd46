const Sequelize = require('sequelize');
const sequelize = new Sequelize('postgres://postgres:postgres@app-db:5432/prenetics');
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully. : )');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = sequelize;
