
/*
 * GET beers
 */
var KEY = "7ba3a56166ec88f283a107f9b8f070d8";
var Mongolian = require('mongolian');
var db = new Mongolian().db('beerme-db');
var Brewery = require('brewery-api-node');
var brewery = new Brewery(KEY);

exports.getBeer = function(req, res){
	if(req.query.beer === undefined){
		res.send({error: "no param provided"});
	}
	else {
		db.collection('beers').find({ $regex: req.query.beer, $options: 'i'}).toArray(function(beers){
			if(!beers){
                //query brewery db with same search
                brewery.searchBeer(req.query.beer, function(err, val){
                	if(err){
                		console.log(err);
                		res.send({error: "problem searching breweryDB"});
                	}
                	var valArr = [];
                	val.forEach(function(value, index){
                		var info = {
                			name: value.name,
                			description: value.description,
                			style: value.style,
                			abv: value.abv,
                			breweries: value.breweries,
                			label: value.label
                		}
                		valArr.push(info);
                		db.collection('beers').insert(info);
                	});
                	res.send(valArr);
                });

			}
			else {
				res.send(beername);
			}
		});
	}
}
