var bcrypt = require('bcryptjs');

'use strict';
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    user_name: DataTypes.STRING,
    company_id: DataTypes.INTEGER,
    password: DataTypes.STRING,
    user_type: DataTypes.STRING,
    address: DataTypes.STRING,
    zipcode: DataTypes.STRING,
  });
  // User.associate = function(models) {
  //   User.hasMany(models.Product, {
  //     foreignKey: 'created_by',
  //     sourceKey: 'id'
  //   });
  // };

  // User.associate = function(models) {
  //   User.belongsTo(models.Company, {
  //     foreignKey: 'company_id',
  //     targetKey: 'id'
  //   });
  // };

  User.prototype.generateHash = function(password){
      return bcrypt.hash(password, bcrypt.genSaltSync(8));
  }

  User.prototype.validPassword = function(password){
      return bcrypt.compare(password, this.password);
  }

  return User;
}
