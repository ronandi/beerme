var Mongolian = require('mongolian');
var server = new Mongolian({
    log: {
        debug: function(message) {},
        info: function(message) {},
        warn: function(message) {
            console.log(message);
        },
        error: function(message) {
            console.log(message);
        }
    }
});
var db;
exports.init = function() {
    db = server.db('beerme-db');
}
exports.db = db;
