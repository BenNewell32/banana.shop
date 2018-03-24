var express = require('express');
var router = express.Router();

var db = require("../models");

router.get('/products', function(req, res, next) {
  db.Product.findAll({
  }).then((products) => {
    res.json(products)
  });
});

router.get('/categories', function(req, res, next) {
  db.Category.findAll({
  }).then((categories) => {
    res.json(categories)
  });
});

router.get('/users', function(req, res, next) {
  db.User.findAll({
  }).then((users) => {
    res.json(users)
  });
});

//localhost:3000/api/clicks
router.get('/clicks', function(req, res){
  db.Click.findAll({
  attributes: ['product_id',[db.sequelize.fn('COUNT', db.sequelize.col('id')), 'clickCount']],
  group: 'product_id'
  }).then((result) => {
    res.json({clicks:result, user: req.user.user_name});

  });
});

//localhost:3000/api/orders
router.get('/orders', function(req, res){
  db.Order.findAll({
  // attributes: ['product_id',[db.sequelize.fn('COUNT', db.sequelize.col('id')), 'clickCount']],
  // group: 'product_id'
  }).then((result) => {
    res.json(result);

  });
});
module.exports = router;
