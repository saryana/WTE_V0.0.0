(function() {

	$('#submit').click(function() {
		var fields = $('.form-control');
		var result = {
			resturant: $(fields[0]).val()
		}
		for (var i = 1; i < fields.length; i++) {
			var elem = fields[i];
			var $elem = $(elem);
			result[elem.id] = $elem.val();
		}
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