/*
 * GET beers
 */
var config = require('../config');
var Brewery = require('brewery-api-node');
var brewery = new Brewery(config.breweryApiKey);

module.exports = function(db) {
    return {
        getBeer: function(req, res){
            if(req.query.beer === undefined) {
                res.send({error: "no param provided"});
            }
            else {
                db.collection('beers').find({ $regex: req.query.beer, $options: 'i'}).toArray(function(beers) j{
                    if(!beers) {
                        //query brewery db with same search since we dont have
                        brewery.searchBeer(req.query.beer, function(err, val) {
                            if(err) {
                                console.log(err);
                                res.send({ error: "problem searching breweryDB" });
                            }
                            var valArr = [];
                            val.forEach(function(value, index) {
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
    }
}
