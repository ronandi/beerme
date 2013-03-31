
/*
 * GET beers
 */

var Mongolian = require('mongolian');
var db = new Mongolian().db('beerme-db');

exports.getBeer = function(req, res){
	if(req.query.beer === undefined){
		res.send({error: "no param provided"});
	}
	else{
		db.collections('beers').findOne({name: req.query.beer}, function(beername){
			if(!beername){
				
			}
			else{
				res.send(beername);
			}
		})
	}
}