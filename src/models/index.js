
/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');

const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
// eslint-disable-next-line import/no-dynamic-require
const config = require(`${__dirname}/../config/config.js`)[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config,
  );
}

fs.readdirSync(__dirname)
  .filter(file => (
    file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
  ))
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// relationships for models

//= ==============================
// Define all relationships here below
//= ==============================
// db.User.hasMany(db.Address);
// db.Address.belongsTo(db.User);


// db.subcategory = require('./subcategory')(sequelize, Sequelize.DataTypes);
// db.brand = require('./brand')(sequelize, Sequelize.DataTypes);

// db.subcategory.belongsToMany(db.brand, {
//   through: 'subcatBrands',
//   as: 'brand',
//   foreignKey: 'subcat_id',
//   onDelete: 'CASCADE',
//   onUpdate: 'CASCADE',

// });

// db.brand.belongsToMany(db.subcategory, {
//   through: 'subcatBrands',
//   as: 'subcategory',
//   foreignKey: 'brand_id',
//   onDelete: 'CASCADE',
//   onUpdate: 'CASCADE',

// });


// db.tmpsub.belongsTo(db.Category, { foreignKey: 'catId' });
// db.Category.hasMany(db.tmpsub, { foreignKey: 'catId' });


module.exports = db;
