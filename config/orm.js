// Import MySQL connection.
var connection = require('../config/connection.js');


// Helper function loops through and creates an array of question marks - ["?", "?", "?"] - and turns it into a string.
// ["?", "?", "?"].toString() => "?,?,?";
function printQuestionMarks(num) {
    var arr = [];

    for (var i = 0; i < num; i++) {
        arr.push("?");
    }

    return arr.toString();
}

// function to convert object key/value pairs to SQL syntax
function objToSql(object) {
    var arr = [];

    // loop through the keys and push the key/value as a string int arr
    for (var key in object) {
            // check to skip hidden properties
        if (Object.hasOwnProperty.call(object, key)) {
            arr.push(key + "=" + object[key]);
        }
    }


      // translate array of strings to a single comma-separated string
    return arr.toString();
}


// Object for all our SQL statement functions.
var orm = {
    

    // selects everything from burgers table
    selectAll: function(tableName, callback) {
        var queryString = "SELECT * FROM " + tableName + ";";
        connection.query(queryString, function(err, resArr) {
            if (err) {
                throw err;
            }
            callback(resArr);
        });
    },

    // creates a new burger in the burgers table
    insertOne: function(tableName, obj, callback) {
        var query = "INSERT INTO " + tableName + " SET ?";

        console.log(query);

        connection.query(query, {
                name: obj.name,
                devoured: false,
            },

            function(err, resArr) {
                if (err) {
                    throw err;
                }
                callback(resArr);
            });
    },


    // updates a burger where the condition (id) is met.
    updateOne: function(tableName, objColVals, condition, callback) {
        var query = "UPDATE " + tableName + " SET " + objToSql(objColVals);
        query += " WHERE " + condition;

        console.log(query);
        connection.query(query, function(err, resArr) {
            if (err) {
                throw err;
            }
            callback(resArr);
        });
    },

    // deletes a burger from the burger table where the condition (ID) is met.
    delete: function(tableName, condition, callback) {
        var query = "DELETE FROM " + tableName + " WHERE " + condition;

        connection.query(query, function(err, resArr) {
            if (err) {
                throw err;
            }
            callback(resArr);
        });
    }
};

// Export the orm object for the model (burger.js).
module.exports = orm;