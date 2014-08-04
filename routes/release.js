var users = require('../data/user');
var Release = require('../data/models/release');
var Feature = require('../data/models/feature');
var moment = require('moment')
var attach = require('../data/models/attachment')
module.exports = function(app) 
{
	//This is called from the user page by create release button passing product id
	app.post('/release/create', function(req, res){
	  console.log("DEBUG:/RELEASE/CREATE:Inside  This is Suppose to Render Views from /views/releases/release");
	  console.log("DEBUG:/GET/release/create: Release Product Number "+ req.body.productnumber);
	  
	  // query db for all todo items
	  Release.find().exec( function ( err, releases ){
	    if( err ) return next( err );
	    res.render('releases/release', {title: 'Create a New Release ' + req.session.user, Listrelease: releases,
		Productnumber :  req.body.productnumber
		});
	  });
	});
	
	//This is called from the user page by create release button passing product id
	app.post('/release/delete', function(req, res){
	  console.log("DEBUG:/RELEASE/delete:Inside  This is Suppose to Render Views from /views/releases/release");
	  console.log("DEBUG:/GET/release/delete: Release releasenumber "+ req.body.releasenumber);
	  Feature.find({releasenumber: req.body.releasenumber }).exec( function ( err,features ){
	   Release.find({ releasenumber: req.body.releasenumber}).remove().exec( 
	    Feature.find({ releasenumber: req.body.releasenumber}).remove().exec( 
		features.forEach( function ( feature ){
		attach.find({featurenumber: req.body.featurenumber }).exec( function ( err,files ){
		  attach.find({featurenumber: feature.featurenumber}).remove().exec( function ( err, test ){
			files.forEach( function ( file ){
			
			var path= 'C:\\Users\\SANCHEZ\\Documents\\GitHub\\Node_code\\Realease_project\\routes\\feature\\'+file.filename;
			  fs.unlink(path, function (err) {
			    if (err) throw err;
				console.log('successfully deleted '+ path);
			 });
			})
			 if( err ) return next( err );
		  	  console.log("DEBUG:/RELEASE/delete:Inside  This is " + test);
		  	});
			});
			})
		 )
		 );   		  
	    res.redirect('/users')
		});
	  	});
	//This is called by the submitting release button for creation of a new release 
	app.post('/release', function(req, res) {
      console.log("DEBUG:/POST/release:Release Name " + req.body.releasename );
	  console.log("DEBUG:/POST/release:Release Number "+ req.body.releasenumber);
	  console.log("DEBUG:/POST/release:Start Date "+ new Date(req.body.startDate).toDateString());
	  console.log("DEBUG:/POST/release:End Date"+ req.body.endDate);
	  console.log("DEBUG:/POST/release:Product name "+req.body.productname);
      
	  var lpost
	  Release.findOne({}, {}, { sort: { 'releasenumber' : -1 } }, function(err, post) {
	    if(post){
	    lpost = post.releasenumber;}
	    console.log( "DEBUG:/POST/release: last old release Number" + post  + lpost)
	    
	    if(lpost){
	    	lpost = lpost + 1;
	    }else{
	    	lpost=1
	    }
	    console.log( "DEBUG:/POST/release: last Updated Release Number "   + lpost)	
        
	    if (req.body.releasename) {
	      var thor = new Release({
	        releasename: req.body.releasename,
	        releasenumber: lpost,
	        productnumber: req.body.productnumber,
	        Startdate: new Date(req.body.startDate).toString(),
	        EndDate: req.body.endDate,
	        ReleaseType: req.body.type,
	      });
        
	      thor.save(function(err, thor) {
	        if (err) return console.error(err);
	    	console.dir(thor);
	      });
	    }
	    res.redirect('/users')
	  });
	});
	
	//This is called from the user page by view release button passing product id
	app.post('/release/info', function(req, res) {
		console.log("DEBUG:/post/release/info:Inside session This will Render Views from /views/session/new");
		Feature.find().exec( function ( err,features ){
		  if( err ) return next( err );
		  res.render('releases/release_details', {title:  'Details of Release ' + req.body.releasenumber, 
		    ReleaseNumber: req.body.releasenumber,FeatureList : features,moment:moment
		  });
	    });
	});
	
	//This is called from the user page by view release button passing product id
	app.get('/release/info', function(req, res) {
		console.log("DEBUG:/post/release/info:Inside session This will Render Views from /views/session/new");
		Feature.find().exec( function ( err,features ){
		  if( err ) return next( err );
		  res.render('releases/release_details', {title:  'Details of Release ' + req.body.releasename, 
		    ReleaseNumber: req.body.releasenumber,FeatureList : features,moment:moment
		  });
	    });
	});
	
};
