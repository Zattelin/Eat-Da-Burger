var express = require('express');
var router = express.Router();

// Import the model (burger.js) to use its database functions.
var burger = require('../models/burger.js');

// Create all our routes and set up logic within those routes where required.

// Gather all burgers from the database and display them to the client.
router.get("/", function(req, res){
	burger.all(function(sqlBurgerData){
		var hbsBurgerObj = {
			burgers: sqlBurgerData,
		};
		res.render('index', hbsBurgerObj);
	});
});


// creating new burger in burgers table.
router.post("/", function(req, res) {
	console.log(req.body);
  burger.create({
  	name: req.body.name,
  	devoured: false
  }, function() {
    res.redirect("/");
  });
});


// updating burgers to devoured.
router.put("/:id", function(req, res) {
  var condition = "id = " + req.params.id;

  console.log("condition", condition);

  burger.update({
    devoured: req.body.devoured
  }, condition, function() {
    res.redirect("/");
  });
});


// devoured burgers are delete
router.delete("/:id", function(req, res) {
  var condition = "id = " + req.params.id;
console.log("here")
  burger.delete(condition, function() {
    console.log("here 2")
    res.redirect("/");
  });
});

// Export routes for server.js to use.
module.exports = router;