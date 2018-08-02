var orm = require('../config/orm.js');

var burger = {

    all: function (callback) {
        orm.selectAll("burgers", function (res) {
            callback(res);
        });
    },

    create: function (vals, callback) {
        orm.insertOne("burgers", vals, function (res) {
            callback(res);
        });
    },

    update: function (objColVals, condition, callback) {
        orm.updateOne("burgers", objColVals, condition, function (res) {
            callback(res);
        });
    },

    delete: function (condition, callback) {
        orm.delete("burgers", condition, function (res) {
            callback(res);
        });
    }
};

module.exports = burger;