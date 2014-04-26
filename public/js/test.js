(function() {
	var fullData;
	var start;
	var max;

	$('window').keypress(function(e) {
		console.log(e.keyCode);
	});


	$('#submit').click(function() {
		$( "#submit" ).slideDown(1000);
		var fields = $('.form-control');
		var result = {
			resturant: $(fields[0]).val()
		}
		for (var i = 1; i < fields.length; i++) {
			var elem1 = fields[i];
			var elem2 = fields[i+1];
			var $elem1 = $(elem1);
			var $elem2 = $(elem2);
			result[elem1.id] = { from: $elem1.val(), to: $elem2.val() };
			i++;
		}
		console.log(result);
		$.ajax({
			type:"POST",
			url:"/data",
			data: result,
			success: function(data) {
				if (!data) {
					alert('that is quite unfortunate');
				} else {
					$('#insert').empty();
					$('.active').removeClass('active');
					fullData = data;
					start = 0;
					max = fullData.length;
					//showElem();
					loadTable();
				}
			}
		});
	});

	function loadTable() {
		$('#data').empty();
		var elem = fullData[start].fields;
		var item = elem.item_name;
		var resturant = elem.brand_name;
		var cals = elem.nf_calories;
		var fat = elem.nf_total_fat;
		var chol = elem.nf_cholesterol;
		var sugar = elem.nf_sugars;
		var sodium = elem.nf_sodium;
		var carb = elem.nf_total_carbohydrate;
		var fib = elem.nf_dietary_fiber;
		var pro = elem.nf_protein;

		var elemTable = "";
		elemTable += "<td>" + item +"</td>";
		elemTable += "<td>" + cals +"</td>";
		elemTable += "<td>" + chol +"</td>";
		elemTable += "<td>" + sodium +"</td>";
		elemTable += "<td>" + carb +"</td>";
		elemTable += "<td>" + fib +"</td>";
		elemTable += "<td>" + pro +"</td>";
		elemTable += "<td>" + sugar +"</td>";
		elemTable += "<td>" + fat +"</td>";
		$('#data').append(elemTable);		
	}

	// show the food item
	function showElem () {
		$('#data').empty();
		var elem = fullData[start].fields;
		console.log(elem);
		var item = elem.item_name;
		var resturant = elem.brand_name;
		var cals = (elem.nf_calories) ? elem.nf_calories : 0;
		var fat = (elem.nf_total_fat) ? elem.nf_total_fat : 0;
		var chol = (elem.nf_cholesterol) ? elem.nf_cholesterol : 0;
		var sugar = (elem.nf_sugars) ? elem.nf_sugars : 0;
		var sodium = (elem.nf_sodium) ? elem.nf_sodium : 0;
		var carb = (elem.nf_total_carbohydrate) ? elem.nf_total_carbohydrate : 0;
		var fib = (elem.nf_dietary_fiber) ? elem.nf_dietary_fiber : 0;
		var pro = (elem.nf_protein) ? elem.nf_protein : 0;
		var elemParagraph = '<p>';
		if (item) elemParagraph += 'Food item ' + item;
		if (resturant) elemParagraph += ' from ' + resturant;
		if (cals) elemParagraph += ' has ' + cals + ' cals';
		if (fat) elemParagraph += ' and ' + fat + ' gram of fat.';
		elemParagraph += '</p>';
		console.log(elemParagraph);
		$('#data').append(elemParagraph);
	}
	// Move to the left data point
	$('#left').click(function() {
		if (start > 0) {
			start--;
			//showElem();
			loadTable();
		}
	});
	// move to the right data point
	$('#right').click(function() {
		if (start < max-1) {
			start++;
			//showElem();
			loadTable();
		}
	})


	// Really bad code
	// Sean does not enjoy front end stuff

	var cal = '<div class="form-group" id="cal"><label for="calorie" class="col-sm-5 control-label">Calories</label><div class="col-sm-1"><input type="text" class="form-control" id="nf_calories" placeholder="From"></div><div class="col-sm-1"><input type="text" class="form-control" placeholder="To"></div></div>';
	var calsee = false;
	$('#calb').click(function() {

		if (calsee) {
			$('#cal').remove();
		} else {
			$('#insert').append(cal);
		}
		$('#calb').toggleClass("active");

		calsee = !calsee;
	});

	var fat = '<div class="form-group" id="fat"><label for="fat" class="col-sm-5 control-label">Fat</label><div class="col-sm-1"><input type="text" class="form-control" id="nf_total_fat" placeholder="From"></div><div class="col-sm-1"><input type="text" class="form-control" placeholder="To"></div></div>';
	var fatsee = false;
	$('#fatb').click(function() {

		if (fatsee) {
			$('#fat').remove();
		} else {
			$('#insert').append(fat);
		}
		$('#fatb').toggleClass("active");
		fatsee = !fatsee;
	});

	var cho = '<div class="form-group" id="cho"><label for="cholesterol" class="col-sm-5 control-label">Cholesterol</label><div class="col-sm-1"><input type="text" class="form-control" id="nf_cholesterol" placeholder="From"></div><div class="col-sm-1"><input type="text" class="form-control" placeholder="To"></div></div>';

	var chosee = false;
	$('#chob').click(function() {

		if (chosee) {
			$('#cho').remove();

		} else {
			$('#insert').append(cho);
		}
		$('#chob').toggleClass("active");
		chosee = !chosee;
	});

	var sod = '<div class="form-group" id="sod"><label for="sodium" class="col-sm-5 control-label">Sodium</label><div class="col-sm-1"><input type="text" class="form-control" id="nf_sodium" placeholder="From"></div><div class="col-sm-1"><input type="text" class="form-control" placeholder="To"></div></div>';
	var sodsee = false;
	$('#sodb').click(function() {

		if (sodsee) {
			$('#sod').remove();
		} else {
			$('#insert').append(sod);
		}
		$('#sodb').toggleClass("active");
		sodsee = !sodsee;
	});

	var sug = '<div class="form-group" id="sug"><label for="sugars" class="col-sm-5 control-label">Sugar</label><div class="col-sm-1"><input type="text" class="form-control" id="nf_sugars" placeholder="From"></div><div class="col-sm-1"><input type="text" class="form-control" placeholder="To"></div></div>'
	var sugsee = false;
	$('#sugb').click(function() {
		if (sugsee) {
			$('#sug').remove();
		} else {
			$('#insert').append(sug);
		}
		$('#sugb').toggleClass("active");
		sugsee = !sugsee;
	});

	var car = '<div class="form-group" id="car"><label for="carbohydrate" class="col-sm-5 control-label">Carbohydrate</label><div class="col-sm-1"><input type="text" class="form-control" id="nf_total_carbohydrate" placeholder="From"></div><div class="col-sm-1"><input type="text" class="form-control" placeholder="To"></div></div>';
	var carsee = false;
	$('#carb').click(function() {

		if (carsee) {
			$('#car').remove();
		} else {
			$('#insert').append(car);
		}
		$('#carb').toggleClass("active");
		carsee = !carsee;
	});

	var fib = '<div class="form-group" id="fib"><label for="fiber" class="col-sm-5 control-label">Fiber</label><div class="col-sm-1"><input type="text" class="form-control" id="nf_dietary_fiber" placeholder="From"></div><div class="col-sm-1"><input type="text" class="form-control" placeholder="To"></div></div>';
	var fibsee = false;
	$('#fibb').click(function() {

		if (fibsee) {
			$('#fib').remove();
		} else {
			$('#insert').append(fib);
		}
		$('#fibb').toggleClass("active");
		fibsee = !fibsee;
	});

	var pro = '<div class="form-group" id="pro"><label for="protein" class="col-sm-5 control-label">Protein</label><div class="col-sm-1"><input type="text" class="form-control" id="nf_protein" placeholder="From"></div><div class="col-sm-1"><input type="text" class="form-control" placeholder="To"></div></div>';
	var prosee = false;
	$('#prob').click(function() {

		if (prosee) {
			$('#pro').remove();
		} else {
			$('#insert').append(pro);
		}
		$('#prob').toggleClass("active");
		prosee = !prosee;
	});
})();