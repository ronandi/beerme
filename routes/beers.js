
/*
 * GET beers
 */

var Mongolian = require('mongolian');
var db = new Mongolian().db('beerme-db');
var BrewApi = require('brewerydb-node');

exports.getBeer = function(req, res){
	if(req.query.beer === undefined){
		res.send({error: "no param provided"});
	}
	else {
		db.collections('beers').find({ $regex: req.query.beer, $options: 'i'}).toArray(function(beers){
			if(!beers){
                //query brewery db with same search


			}
			else {
				res.send(beername);
			}
		});
	}
}
