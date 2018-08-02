var express = require('express');
var router = express.Router();
var burger = require('../models/burger.js');

router.get("/", function(req, res){
	burger.all(function(sqlBurgerData){
		var hbsBurgerObj = {
			burgers: sqlBurgerData,
		};
		res.render('index', hbsBurgerObj);
	});
});

router.post("/", function(req, res) {
	console.log(req.body);
  burger.create({
  	name: req.body.name,
  	devoured: false
  }, function() {
    res.redirect("/");
  });
});

router.put("/:id", function(req, res) {
  var condition = "id = " + req.params.id;

  console.log("condition", condition);

  burger.update({
    devoured: req.body.devoured
  }, condition, function() {
    res.redirect("/");
  });
});

router.delete("/:id", function(req, res) {
  var condition = "id = " + req.params.id;

  burger.delete(tableName, condition, function() {
    res.redirect("/");
  });
});

module.exports = router;