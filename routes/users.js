var users = require('../data/user');
var Product = require('../data/models/product');
var Release = require('../data/models/release');
var expressValidator = require('express-validator')
var moment = require('moment')
module.exports = function(app) 
{
	 app.get('/users', function(req, res){
		console.log("DEBUG:/GET/USERS:Inside the user List in router This is Suppose to Render Views from /views/user/index");
		console.log("DEBUG:/GET/USERS:json Object is " + require('util').inspect(users, {depth:null}));
		console.log("DEBUG:/GET/USERS:json Object is " + req.session.user);
		console.log("DEBUG:/GET/USERS:******************MODEL USE STARTS***************************************");
		var localProducts
		var localReleases
		// query db for all todo items
		Product.find().exec( function ( err, products ){
			Release.find().exec( function ( err, releases ){
			if( err ) return next( err );
							console.log("DEBUG:/GET/USERS:json Object is " + req.session.user);
				res.render('releases/user', {title: 'Wellcome ' + req.session.user, session: req.session , ListProduct:products,ListReleases:releases,moment:moment});
			});
		});
		

		 
		
  });


};
