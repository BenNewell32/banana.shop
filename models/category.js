module.exports = function(sequelize, DataTypes) {
  var Category = sequelize.define("Category", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,     
      validate: {
        len: [1]
      }
    },
    category_name: {
      type: DataTypes.STRING,
      allowNull: false,
      len: [1]
    }
  });
  Category.associate = function(models) {
    Category.hasMany(models.Product, {
      foreignKey: 'category_id',
      targetKey: 'id',
      underscored: true
    });
  };
  return Category;
};