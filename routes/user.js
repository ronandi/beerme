
/*
 * GET users listing.
 */

var Mongolian = require('mongolian');
var db = new Mongolian().db('beerme-db');

exports.list = function(req, res){
    res.send(req.query);
};

exports.getUser = function(req, res) {
    if (req.query.id === undefined) {
        res.send("Error: No id specified");
    } else {
        db.collection('users').findOne({ id: req.query.id }, function(user) {
            if (!user) {
                res.send({ error: "User with that id does not exist" });
            } else {
                res.send(user);
            }
        });
    }
}

exports.createUser = function(req, res) {
    if(req.body.id === undefined) {
        res.send("Error: No id specified");
    }
    else {
        db.collection('users').insert({id: req.body.id});
        res.send("Sucessfully created new user");
    }
}
