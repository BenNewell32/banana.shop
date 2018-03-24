module.exports = function(sequelize, DataTypes) {
  var Product = sequelize.define("Product", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      validate: {
        len: [1]
      }
    },
    short_desc: {
      type: DataTypes.STRING,
      allowNull: false,
      len: [1]
    },
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      len: [1]
    },
    created_by: {
      type: DataTypes.TEXT,
      allowNull: false,
      len: [1]
    },
    company_id: {
      type: DataTypes.TEXT,
      allowNull: false,
      len: [1]
    },
    create_date: {
      type: DataTypes.TEXT,
      allowNull: false,
      len: [1]
    },
    price: {
      type: DataTypes.TEXT,
      allowNull: false,
      len: [1]
    }
  });
  
  Product.associate = function(models) {
    Product.belongsTo(models.Category,{
      foreignKey: 'category_id',
      targetKey: 'id',
      underscored: true
    })
  };

  return Product;
};