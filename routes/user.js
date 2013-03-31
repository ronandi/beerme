
/*
 * GET users listing.
 */

exports.list = function(req, res){
    req.query.id
};

exports.createUser = function(req, res) {
	if(req.query.id === undefined){
		
	}
	else{
		db.collection('users').insert({id: req.query.id});
	}
}
