$(function() {
    var ty; 
	$(document).on('click', '#but', function() {
		var add = $("input[name=mess]").val();

            if (add.length<17) {
                alert('NU CHO ZA WUTKI?');
                return;
            }

		function getUrl(longUrl, login, apiKey, func) {
    	
    	$.ajax({
        url: "http://api.bitly.com/v3/shorten?", 
        data: { 
            "apiKey": apiKey,
            "login": login,
            "longUrl": longUrl
        },
        success: function(response) {
            func(response.data.url);
            $.ajax({
            url: "http://localhost:1337/test", 
            data: { 
            "longUrl": add,
            "shortUrl": ty
           },
           success: function() {
            console.log('ALL RIGHT!');
           }
            });
        }
        });
	}
	var login = "easyforme";
	var apiKey = "R_6bf079fb4b1244c3a5088a24005e7d34";

	getUrl(add, login, apiKey, function(shortUrl) {
        ty=shortUrl;
        $('.spisok').append('<li class="short"><a href="'+shortUrl+'">'+shortUrl+'</a></li>');
	});

            
	});
})