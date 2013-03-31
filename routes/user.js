
/*
 * GET users listing.
 */

var db = require('../database');

exports.list = function(req, res){
    res.send(req.query);
};

exports.createUser = function(req, res) {
	if(req.query.id === undefined){
		
	}
	else{
		db.collection('users').insert({id: req.query.id});
	}
}
