var utils = require('util');
var users = require('../data/user');
module.exports = function(app) 
{
	app.get('/session/user', function(req, res) {
		console.log("DEBUG:/GET/SESSION_USER:Inside session This will Render Views from /views/session/user");
		res.render('session/index', {title: "Wellcome to Product Release" ,session: req.session});

	});

	
	app.get('/session/new', function(req, res) {
		console.log("DEBUG:/GET/SESSION_NEW:Inside session This will Render Views from /views/session/new");
		res.render('session/new', {title: "Log in" ,session: req.session});

	});
	
	
	app.post('/session', function(req, res) {
	console.log("DEBUG:/POST/SESSION:Check the Request and password");
		if (users[req.body.username] && users[req.body.username].password === req.body.password) {
		console.log("DEBUG:/POST/SESSION:User and password MATCHED"  + req.body.username + req.body.password);
		req.session.user = req.body.username;
		
		res.redirect('/users');
		} 
		else 
		{
		console.log("DEBUG:/POST/SESSION:User and password mismatched or Login Used by someone");
		console.log("DEBUG:/POST/SESSION:User and password" + req.body.username + req.body.password  );
		res.redirect('/session/new')
		}
	});
};
