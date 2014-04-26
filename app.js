var express = require('express'),
	constants = require('./config/constants')
	ntr	= require('nutritionix')({
		appId: '8ae35b74',
		appKey: '50ecf8955bce7909ca4ff6843e2f9b87'
	}, true), // set true to help debug
	path  = require('path'),
	app = express();

var stuff = ["brand_name", "nf_calories", "nf_total_fat", "nf_cholesterol", "nf_sodium", "nf_total_carbohydrate", "nf_sugars", "nf_dietary_fiber", "nf_protein"]

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
	var data = req.body;
	var restaurant = data.resturant;
	var filters = {item_type: 1};
	console.log(data);
	for (var i in stuff) {
		var field = stuff[i];
		if (data[field]) {
			var amount = data[field].split('-');

			filters[field] = {
				from: parseInt(amount[0]),
				to: parseInt(amount[1])
			};
		}
	}
	var poo = ['item_name','brand_name','item_description','nf_calories','nf_total_fat','nf_cholesterol', 'nf_sugars', 'nf_sodium','nf_total_carbohydrate','nf_dietary_fiber','nf_protein'];
	ntr.v1_1.search.advanced({
    	fields: poo,
    	query: restaurant,
    	limit: 20,
    	offset: 0,
	    filters: filters
	}, function (err, results) {
	    if (err) console.log(err);
	    if (results.total) {
	    	console.log(results);
	    	
	    	var potential = results.hits.filter(function(elem) { return elem._score > 1});
	    	console.log(potential);

	    	res.send(potential);
	    } else {
	    	console.log('No results...');
	    }
	});
});

// start the server
app.listen(app.get('port'), function () {
	console.log('I love boobies so I run on port ' + app.get('port'));
});
