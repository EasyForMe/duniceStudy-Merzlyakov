$(document).ready(function() {
    $('.task').focus(function() {
        $('.task').css('outline-color','#ff00ff');
        });
    $(document).on('click', '.but', function(){
    	var Add = $("input[name=mess]").val();
        if ( !$.trim(Add) ) {
         console.log('Введите задачу в поле.');
     }
        else if (Add.length<=50) {
            $('.list').append("<li class='tasks'>"+Add+"</li>");
        }
        else {
            $('.list').append("<li>ТЫ НЕ СМОЖЕШЬ ВЫПОЛНИТЬ ЭТУ ЧУДОВИЩНО ДЛИННУЮ ЗАДАЧУ!</li>");
        }
        $("input[name=mess]").val('');
    });
     $(document).on('click', '.tasks', function(){
            $(this).css('text-decoration','line-through');
            $(this).css('color','#003300');
            });
     $(document).on('click', '.del', function(){
           $('.tasks').remove();
            });
});