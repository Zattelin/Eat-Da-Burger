var connection = require('../config/connection.js');

function printQuestionMarks(num) {
    var arr = [];

    for (var i = 0; i < num; i++) {
        arr.push("?");
    }

    return arr.toString();
}

function objToSql(object) {
    var arr = [];

    for (var key in object) {
        if (Object.hasOwnProperty.call(object, key)) {
            arr.push(key + "=" + object[key]);
        }
    }

    return arr.toString();
}

var orm = {
    
    selectAll: function(tableName, callback) {
        var queryString = "SELECT * FROM " + tableName + ";";
        connection.query(queryString, function(err, resArr) {
            if (err) {
                throw err;
            }
            callback(resArr);
        });
    },

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

module.exports = orm;