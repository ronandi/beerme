
/*
 * GET users listing.
 */

var Mongolian = require('mongolian');
var db = new Mongolian().db('beerme-db');

exports.list = function(req, res){
    res.send(req.query);
};

exports.createUser = function(req, res) {
    if(req.body.id === undefined){
        res.send({error: "No id specified"});
    }
    else{
    	db.collection('users').findOne({id: req.body.id }, function(err, post){
    		if(post === undefined){
    			db.collection('users').insert({id: req.body.id});
        		res.send("Sucessfully created new user");
    		}
    		else{
    			res.send({error: "user already exists"});
    		}
    	})
        
    }
}
