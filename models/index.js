// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');


Category.hasMany(Product , {
  foreignKey: 'category_id',
  onDelete: 'SET NULL',
});

Product.belongsTo(Category, {
  foreignKey: 'category_id',
});

// Products belongToMany Tags (through ProductTag)
// Tags belongToMany Products (through ProductTag)

Tag.belongsToMany(Product, {
  // Define the third table needed to store the foreign keys
  through: ProductTag
});


Product.belongsToMany(Tag, {
  // Define the third table needed to store the foreign keys
  through: ProductTag
});


module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
