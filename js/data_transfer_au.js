//Функция логина

$("#login_form").on("submit", function (event) {
    
    event.preventDefault();
        
        var string = $(this).serialize();
        var href = window.location.href;
        var s = (href.indexOf ('?') > 0) ? href.split ('?') [1] : '';
        
        string = string + "&" + s;

        $.ajax({
            url: '/datawork.php',          
            type: $(this).attr('method'),
            data: string,                 
            success: function(data) {
               if (data == 0) {
                //console.log(data);              
               } else {
                    location.replace(data);
               };
            }
        });
})