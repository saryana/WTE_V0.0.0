(function() {

	$('#submit').click(function() {
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
				console.log(data);
			}
		});
	});

})();