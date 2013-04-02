/*
 * GET beers
 */
var config = require('../config');
var Brewery = require('brewery-api-node');
var brewery = new Brewery(config.breweryApiKey);

module.exports = function(db) {
    return {
        getBeer: function(req, res) {
            if(req.query.beer === undefined) {
                res.send({error: "no beer param provided"});
            } else {
                //Check if we have the beer in local DB already
                db.collection('beers').find({ name: { $regex: req.query.beer, $options: 'i'}}, { _id: 0 }).toArray(function(err, beers) {
                    if(!beers.length > 0) {
                        console.log("Beer not found in local database");
                        //query brewery db with same search since we dont have
                        brewery.searchBeer(req.query.beer, function(err, foundBeers) {
                            if(err) {
                                res.send({ error: "problem searching breweryDB" });
                            } else {
                                console.log(foundBeers.length + " beers found in breweryDB"); //Possibly more can be found; only ~50 returned by brewery by default...
                                var simpleFoundBeers = [];
                                foundBeers.forEach(function(breweryBeerObj) {
                                    simpleFoundBeers.push(makeSimpleBeer(breweryBeerObj));
                                });
                                res.send(simpleFoundBeers);
                                db.collection('beers').insert(simpleFoundBeers);
                            }
                        });
                    } else {
                        console.log("Beer found in local database.");
                        console.log(beers);
                        res.send(beers);
                    }
                });
            }
        }
    }
}

//Make a simpler beer object from that returned by breweryDB
function makeSimpleBeer(breweryBeer) {
    var simpleBeer = {
        name: breweryBeer.name,
        description: breweryBeer.description,
        abv: breweryBeer.abv,
        breweries: breweryBeer.breweries.map(function(brewery) { return brewery.name; }),
        label: breweryBeer.label
    }
    var styletmp;
    //Not all beers have a category, some have a styleId only
    if (styletmp = (breweryBeer.style ? breweryBeer.style.category.name : breweryBeer.styleId)) {
        simpleBeer.style = styletmp;
    }
    return simpleBeer;
}

