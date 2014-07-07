$(document).ready(function() {
    $('.task').focus(function() {
        $('.task').css('outline-color','#ff00ff');
        });
    $(document).on('click', '.but', function(){
        var Add = input['name=mess'].val();
    	$('body').css('background-color', Add)
    });
});