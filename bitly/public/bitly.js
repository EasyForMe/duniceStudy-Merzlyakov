$(function() {

	$(document).on('click', '#but', function() {
		var add = $("input[name=mess]").val();

		function getUrl(longUrl, login, apiKey, func) {
    	
    	$.ajax({
        dataType: "jsonp",
        url: "http://api.bitly.com/v3/shorten?", 
        data: { 
            "apiKey": apiKey,
            "login": login,
            "longUrl": longUrl
        },
        success: function(response)
        {
            func(response.data.url);
        }
    });
	}

	var login = "easyforme";
	var apiKey = "R_6bf079fb4b1244c3a5088a24005e7d34";

	getUrl(add, login, apiKey, function(shortUrl) {
        console.log(shortUrl);
        $('.spisok').append('<li class="short"><a href="'+shortUrl+'">'+shortUrl+'</a></li>');
	});
		
	});



})