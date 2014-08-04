var users = require('../data/user');
var Meeting = require('../data/models/meeting');
var attach = require('../data/models/attachment')
fs = require('fs');
var moment = require('moment')
module.exports = function(app) 
{
	
	 app.post('/meetings/meetinglist', function(req, res){
		
		// query db for all todo items
		Meeting.find().exec( function ( err, meetings ){
			
			if( err ) return next( err );
						//	console.log("DEBUG:/GET/USERS:json Object is " + meetings);
				res.render('releases/meetings', {title: 'Wellcome ' + req.session.user, session: req.session , ListMeetings:meetings,moment:moment});
			
		});
	});
	
	//Called by the Button create Link at release Page 

	app.post('/meeting/create', function(req, res){
	  console.log("DEBUG:/POST/meeting/create:Meeting Number ");
	  	// The releasenumber is sent to mapped with Meeting
	    res.render('releases/createmeetings', {title: 'Create a New Meeting '});
	 
	});
	
	
	// Called by the Upload Button in the Meeting details page 
	app.post('/meeting/upload', function(req, res) {
	  var body = '';
	  var header = '';
	  var content_type = req.headers['content-type'];
	  var path = req.files;
	  var boundary = content_type.split('; ')[1].split('=')[1];
	  var content_length = parseInt(req.headers['content-length']);
	  var tmp_path = req.files.test['path'];
	  var origfilename = req.files.test['originalFilename'];
	  
	  console.log('DEBUG:/POST/Meeting/upload File content-type: ' + content_type);
	  console.log('DEBUG:/POST/Meeting/upload File boundary: ' + boundary);
	  console.log('DEBUG:/POST/Meeting/upload File content-length: ' + content_length);
	  console.log("DEBUG:/POST/Meeting/upload File Temporary req.files path " + req.files.test['path']);
	  console.log('DEBUG:/POST/Meeting/upload  Original Fiel Name : ' + origfilename);
	  console.log('DEBUG:/POST/Meeting/upload Meeting number : ' + req.body.Meetingnumber)
      // get the temporary location of the file this is Automatically saved by Node in Windows Location
	  // Then move the File to the Target file path and Update the Filename in the DB
	  var target_path = './routes/meeting/' + origfilename;
	
	  if (origfilename) {
	    var lpost
	    attach.findOne({}, {}, { sort: { 'attachmentnumber' : -1 } }, function(err, post) {
	      if(post){
	        lpost = post.attachmentnumber;
		  }
	      console.log( "DEBUG:/POST/Meeting/upload: last old attachmentnumber"  + lpost)
		  // increment the Attachment Number by 1
		  if(lpost){
		  	lpost = lpost + 1;
		  }else{
		  	lpost=1
		  }	
		  var thor = new attach({
		    filename: origfilename,
		    attachmentnumber: lpost,
		    meetingnumber: req.body.meetingnumber,
		    description: req.body.description,
		  });
		  //Commit hthis creation to the DB 
		  thor.save(function(err, thor) {
		    if (err) return console.error(err);
		  	console.dir(thor);
		  });
		  		
		  // move the file from the temporary location to the intended location
		  fs.rename(tmp_path, target_path, function(err) {
            if (err) throw err;
            // delete the temporary file, so that the explicitly set temporary upload dir does not get filled with unwanted //files
            fs.unlink(tmp_path, function() {
              if (err) throw err;
              //res.redirect('/users')
			   Meeting.findOne({ meetingnumber : req.body.meetingnumber }).exec( function ( err,Meetings ){
		  attach.find().exec( function ( err, attachments ){
		    if( err ) return next( err );
		    console.log("DEBUG:/POST/Meeting/info: Meeting Number "+ req.body.meetingnumber);
		    res.render('releases/meeting_details', {title:  'Details of Meeting:' + Meetings.meetingAgenda, MeetingNumber: req.body.meetingnumber,MeetingList : Meetings,Listattachments:attachments} );
	      });
		});
            });
		  });
        });
      }
    });	
	
	
	//Called by the view button at release Page
	app.post('/meeting/info', function(req, res) {
		console.log("DEBUG:POST/Meeting/info:Inside session This will Render Views from /Meeting/info");
		Meeting.findOne({ meetingnumber : req.body.meetingnumber }).exec( function ( err,Meetings ){
		  attach.find().exec( function ( err, attachments ){
		    if( err ) return next( err );
		    console.log("DEBUG:/POST/Meeting/info: Meeting Number "+ req.body.meetingnumber);
		    res.render('releases/meeting_details', {title:  'Details of Meeting:' + Meetings.meetingAgenda, MeetingNumber: req.body.meetingnumber,MeetingList : Meetings,Listattachments:attachments} );
	      });
		});
	});
	
	//Called by the Create Meeting on the Release details Page
	app.post('/meeting', function(req, res) {
	  console.log("DEBUG:/POST/Meeting:Meetingnumber Name " + req.body.agenda );
	  
	  console.log("DEBUG:/POST/Meeting:meetingnumber "+ req.body.meetingnumber);
	  console.log("DEBUG:/POST/Meeting:attendes "+ req.body.attendes);
	  console.log("DEBUG:/POST/Meeting:Archtecture discussion "+ req.body.discussion);
	  console.log("DEBUG:/POST/Meeting:date "+ new Date(req.body.date).toDateString());
	  console.log("DEBUG:/POST/Meeting:Start Date "+ new Date(req.body.endDate).toDateString());
	  var lpost
	  Meeting.findOne({}, {}, { sort: { 'meetingnumber' : -1 } }, function(err, post) {
	    if(post){
	      lpost = post.meetingnumber;
		}
	    console.log( "DEBUG:POST/Meeting: last old Meeting Number" + post  + lpost)
	    if(lpost){
		  lpost = lpost + 1;
	    }else{
		  lpost=1
	    }
		if (req.body.agenda){
			
		  var thor = new Meeting({
		    meetingAgenda: req.body.agenda,
		    meetingnumber: lpost,
		    discussion: req.body.discussion,
		    attendes: req.body.attendes,
		    mom: req.body.mom,
		    conclusion: req.body.conclusion,
		    date: new Date(req.body.date).toString(),
		    ReleaseType: req.body.ReleaseType,
		    Presenter: req.body.Presenter,
		    MeetingType: req.body.MeetingType,
		  });
          
	      thor.save(function(err, thor) {
		    if (err) return console.error(err);
		    console.dir(thor);
		  });
		}
		  res.redirect('/users')
		 
	  });
	});
	
	// Download of File in Meeting details /files/* is accessed via req.params[0] but here we name it :file
	app.get('/:file(*)', function(req, res, next){
      var file = '/' + req.params.file;
      var  path = __dirname   + file;
      console.log("DEBUG:GET/file in the file dowload file "  + file);
      console.log("DEBUG:GET/file in the file download "+ path	);
	  res.download(path);
	});

    // error handling middleware. Because it's below our routes, you will be able to
    // "intercept" errors, otherwise Connect will respond with 500 "Internal Server Error".
	app.use(function(err, req, res, next){
      // special-case 404s,remember you could render a 404 template here
  
      if (404 == err.status) {
	    res.statusCode = 404;
	    res.send('Cant find that file, sorry!');
	  }
	  else {
	    console.log("File Download is fine");
	    next(err);
      }
	});	
	

	// Called from the delete Button on the Meeting details page and Delets Meetings and its attachments 
	app.post('/Meeting/delete', function(req, res){
	  console.log("DEBUG:/Meeting/delete: Meetings and its attachments Meetingnum " + req.body.meetingnumber);
		Meeting.find({ meetingnumber: req.body.meetingnumber}).remove().exec( 
		  attach.find({meetingnumber: req.body.meetingnumber}).remove().exec( function ( err, Meetings ){
		  	  if( err ) return next( err );
		  	  res.redirect('/users')
		  	})
		 );
	});
	
	// Called from the delete Button on the Meeting details page and Deletes Meetings and its attachments 
	app.post('/Meeting/attachdelete', function(req, res){
	  console.log("DEBUG:/Meeting/attachdelete: xxxxxxxx its attachments Meetingnum " + req.body.attachmentid);
		 attach.find({attachmentnumber: req.body.attachmentid}).remove().exec( function ( err, Meetings ){
		  	  if( err ) return next( err );
			   console.log("DEBUG:Meeting/attachdelete:Inside  This is " + Meetings);
			  var path= 'C:\\Users\\SANCHEZ\\Documents\\GitHub\\Node_code\\Realease_project\\routes\\meetings\\'+req.body.filename;
			  fs.unlink(path, function (err) {
			   // if (err) throw err;
				console.log('successfully deleted '+ path);
			 });
		  	  res.redirect('/users')
		  	})
		});
	
	
	app.get('/Meeting/home', function(req, res){

		  res.redirect('/users')
		  	
		});
};
