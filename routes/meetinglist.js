var Meeting = require('../data/models/meeting');
 var moment = require('moment')
module.exports = function(app) 
{
	

 
 app.get('/meetinglist', function(req, res){
		
		// query db for all todo items
		Meeting.find().exec( function ( err, meetings ){
			
			if( err ) return next( err );
							console.log("DEBUG:/GET/USERS:json Object is " + meetings);
				res.render('releases/meetings', {title: 'Wellcome ' + req.session.user, session: req.session , ListMeetings:meetings,moment:moment});
			
		});
});

};
