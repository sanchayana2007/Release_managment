var users = require('../data/user');
var Product = require('../data/models/product');
var expressValidator = require('express-validator')

module.exports = function(app) 
{
	 app.get('/Products/create', function(req, res){
		console.log("DEBUG:/GET/USERXXXXXXXXXXXXXXXXXXXXXXX");
		console.log("DEBUG:/PRODUCT/CREATE:Inside the user List in router This is Suppose to Render Views from /views/releases/product");
		// query db for all todo items
		Product.find().
		exec( function ( err, products ){
		if( err ) return next( err );
		
		res.render('releases/product', {title: 'Create a New Product ' + req.session.user, ListProduct: products});
		
		
	});
 });
  app.post('/Products', function(req, res) {
	console.log("DEBUG:/POST/Products:Product Name " + req.body.productname );
	console.log("DEBUG:/POST/Products:Product Description "+ req.body.description);
	var lpost
	Product.findOne({}, {}, { sort: { 'productnumber' : -1 } }, function(err, post) {
	if(post){
	lpost = post.productnumber;}
	console.log( "DEBUG:/PRODUCT/CREATE: last old Product Number" + post  + lpost)
	
	if(lpost)	
	{
		lpost = lpost + 1;
	}else
	{
		lpost=1
	}
			
	console.log( "DEBUG:/PRODUCT/CREATE: last Updated Product Number "   + lpost)
	
		if (req.body.productname) {
			
		var thor = new Product({
			  productname: req.body.productname,
			  //productnumber: req.body.productnumber,
			  productnumber: lpost,
			   description: req.body.description
			
			});

		thor.save(function(err, thor) {
		if (err) return console.error(err);
			console.dir(thor);
			});
		
		
		
		}
		res.redirect('/users')
		
		});
	});
	
	

};
