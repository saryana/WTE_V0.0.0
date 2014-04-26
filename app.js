var express = require('express'),
	constants = require('./config/constants')
	ntr	= require('nutritionix')({
		appId: constants.APPID,
		appKey: constants.APP_KEY
	}, true), // set true to help debug
	path  = require('path'),
	app = express();

// set the port I <3 boobs
app.set('port', 8008);
// share the love, make public available
app.use(express.static(path.join(__dirname, 'public')));
// Read the body of the page
app.use(express.bodyParser());
// get the homepage using basic html
app.get('/', function(req, res) {
	res.sendfile('views/index.html', {title:'WTE'});
});

// get the post request and run query
app.post('/data', function(req, res) {
	// Get the fields here
	// restaurant
	console.log(req.body());
	/*var restaurant = res.body.restaurant;
	nutritionix.v1_1.search.advanced({
	    fields: ['item_name','brand_name','item_description','nf_calories','nf_total_fat','nf_cholesterol','nf_sodium','nf_total_carbohydrate','nf_dietary_fiber','nf_protein'],
	    queries: {
	    	brand_name: restaurant
	    },
	    offset:0,
	    limit:20,
	    filters: {
	    	item_type: 1
	    },
	}, function (err, results) {
	    if (err) console.log(err);
	    if (results.total) {
	    	console.log(results);
	    } else {
	    	console.log('No results...');
	    }
	});*/
});

// start the server
app.listen(app.get('port'), function () {
	console.log('I love boobies so I run on port ' + app.get('port'));
});
