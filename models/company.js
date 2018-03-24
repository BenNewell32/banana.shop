module.exports = function(sequelize, DataTypes) {
  var Company = sequelize.define("Company", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,      
      validate: {
        len: [1]
      }
    },
    company_name: {
      type: DataTypes.STRING,
      allowNull: false,
      len: [1]
    },
    company_desc: {
      type: DataTypes.STRING,
      allowNull: false,
      len: [1]
    }

  });

  // Company.associate = function(models) {
  //   Company.hasMany(models.User, {
  //     foreignKey: 'company_id',
  //     targetKey: 'id'
  //   });
  // };

  return Company;
};