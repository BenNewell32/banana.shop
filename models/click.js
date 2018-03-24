module.exports = function(sequelize, DataTypes) {
  var Click = sequelize.define("Click", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      validate: {
        len: [1]
      }
    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      len: [1]
    },
  });

  // Click.associate = function(models) {
  //   Click.belongsTo(models.Product, {
  //     foreignKey: 'product_id',
  //     targetKey: 'id'
  //   });
  // };

  // Product.associate = function(models) {
  //   Product.belongsTo(models.User, {
  //     foreignKey: 'created_by',
  //     targetKey: 'id'
  //   });
  // };

  return Click;
};