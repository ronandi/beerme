
/*
 * GET users listing.
 */

module.exports = function(db) {
    return {

        getUser: function(req, res) {
            if (req.query.id === undefined) {
                res.send("Error: No id specified");
            } else {
                db.collection('users').findOne({ id: req.query.id }, { _id:0 }, function(err, user) {
                    if (!user) {
                        res.send({ error: "User with id: " + req.query.id + " does not exist" });
                    } else {
                        res.send(user);
                    }
                });
            }
        },
        createUser: function(req, res) {
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
                });  
            }
        }
    }
}
