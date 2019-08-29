// Code for Ajax transfer some data, calls PHP

$(document).ready(function () {

    //Глобальная пременная id для разных элементов

    var id_scales = 0; 

    //Функция показа залогиненного пользователя

    function user_logged() {

        $.ajax({
            url: '/datawork.php',
            type: 'POST',
            data: {'action': 'user_logged'},
            cache: false,
            success: function(response) {
                $("#user_logged").append(response, ' !');
                }
        });
    }

    //Вызов функции залогиненного пользователя

    user_logged();

    //Плавный показ всплывающих окон

    $("div.hidden").fadeIn(500).removeClass('hidden');

    //Привязка функции к кнопке добавления контакта

    $("#btn_add_contact").click( function() {
        
        event.preventDefault();
        
        $("div.hidden_contact").fadeIn(500).removeClass('hidden_contact');
    });

    //Функция выхода с привязкой к кнопке

    $(".login_btn").click( function() {

        $.ajax({
            url: '/datawork.php',
            type: 'POST',
            data: {'action': 'exit'},
            cache: false,
            success: function() {
                location.reload();
                }
        });
    });

    //отправка формы нового контакта

    $("#iwantnewcontact").on("submit", function(event) {

        event.preventDefault();

        $.ajax({
            url: '/datawork.php',
            type: 'POST',
            data: new FormData(this),
            contentType: false,
            cache: false,
            processData: false,
            success: function() {
                location.reload();
                }
        });
    });

    //Показ окна смены пароля с получением глобального id

    $('.data_container_ctrluser').on('click', '.scales_2', function (event) {
        
        event.preventDefault();
        
        id_scales = this.id;
        
        $("div.hidden_newpass").fadeIn(500).removeClass('hidden_newpass');
    });

    //Функция смены пароля, с отправкой формы

    $("#iwantnewpass").on("submit", function(event) {
        
        event.preventDefault();
       
        var formdata = $('#new_pass').serialize();

        $.ajax({
            url: '/datawork.php',
            type: 'POST',
            data: {'id': id_scales.substr(2), 'action': 'update_ctrluser_newpass', 'formdata': formdata.substr(9)},
            cache: false,
            success: function(data) {
                location.reload();
                $('#iwantnewpass').trigger("reset");
                }
        });
    });

    //Функция скрытия и показа записей по нажатию на галочку

    $('.data_container_ctrluser').on('click', '.scales_1', function (event) {
        
        event.preventDefault();
       
        var id = this.id;

        $.ajax({
            url: '/datawork.php',
            type: 'POST',
            data: {'id': id.substr(2), 'action': 'update_ctrluser'},
            cache: false,
            processData: true,
            success: function() {
                $(".data_container_ctrluser").html(update_data_ctrluser());
            }
        });
    });

    //Кнопка закрытия для окон

    $(".close_btn").click(
        
        function() {
            
            $("div.new_pass").fadeOut(500).addClass('hidden_newpass');
            $("div.new_contact").fadeOut(500).addClass('hidden_contact');
        }
    );

    //Функция подгрузки имен из базы пользователей

    function appendlist() {

        $.ajax({
            url: '/datawork.php',
            type: 'POST',
            data: {'action': 'datalist'},
            cache: false,
            processData: true,
            success: function(response) {
                $("#Selector-inp").append(response);
                }
            });
    };

    //Загрузка данных, функция тупой подгрузки всего из представления

    function update_data() {

        $.ajax({
            url: '/datawork.php',
            type: 'POST',
            data: {'action': 'data_download'},
            cache: false,
            processData: true,
            success: function(response) {
                $(".data_container").html(response);
                }
        });
    };

    //Функция подгрузки списка пользователей

    function update_data_ctrluser() {

        $.ajax({
            url: '/datawork.php',
            type: 'POST',
            data: {'action': 'data_download_ctrluser'},
            cache: false,
            processData: true,
            success: function(response) {
                $(".data_container_ctrluser").html(response);
                }
        });

    };

    //Отправка форм по сабмиту

    $('#form_inputs').submit(function (event) {

        event.preventDefault();
        
        $.ajax({
            url: '/datawork.php',
            type: $(this).attr('method'),
            data: new FormData(this),
            contentType: false,
            cache: false,
            processData: false,
            success: function(data) {
                $(".data_container").html(update_data());
                $('#form_inputs').trigger("reset");
            }
        });
    });
    
    //Функция отправки формы нового пользователя

    $('#form_inputs_ctrluser').submit(function (event) {

        event.preventDefault();
        
        $.ajax({
            url: '/datawork.php',
            type: $(this).attr('method'),
            data: new FormData(this),
            contentType: false,
            cache: false,
            processData: false,
            success: function(data) {
                $(".data_container").html(update_data_ctrluser());
                $('#form_inputs_ctrluser').trigger("reset");
            }
        });
    });

    //Отправка данных по нажатию чебокса через мониторинг состояния дива
    
    $('.data_container').on('change', '.scales', function (event) {
        
        event.preventDefault();
        
        var id = this.id;
        var value = this.value;

        if (value == 1) {

            $.ajax({
                url: '/datawork.php',
                type: 'POST',
                data: {'id': id.substr(2), 'action': 'update'},
                cache: false,
                processData: true,
                success: function() {
                    $(".data_container").html(update_data());
                    }
            });

        } else {

            $.ajax({
                url: '/datawork.php',
                type: 'POST',
                data: {'id': id.substr(2), 'action': 'update_unchecked'},
                cache: false,
                processData: true,
                success: function() {
                    $(".data_container").html(update_data());
                    }
            });
        }
    });

    //Показ скрытых записей

    $('#btn_show').click(function (event) {

        event.preventDefault();

        $.ajax({
            url: '/datawork.php',
            type: 'POST',
            data: {'action': 'show'},
            cache: false,
            processData: true,
            success: function (response) {
                $(".data_container").html(response);
            }   
        });
    });
    
    //Показ нескрытых записей

    $('#btn_show_nothidden').click(function (event) {

        event.preventDefault();

        $.ajax({
            url: '/datawork.php',
            type: 'POST',
            data: {'action': 'data_download'},
            cache: false,
            processData: true,
            success: function (response) {
                $(".data_container").html(response);
            } 
        }); 
    });

    //Кнопка обновления

    $('#btn_update').click(function (event) {

        event.preventDefault();

        var num = 1;

        $.ajax({
            url: '/datawork.php',
            type: 'POST',
            data: {'action': 'data_download'},
            cache: false,
            processData: true,
            success: function (response) {
                $(".data_container").html(response);
            }
        }); 
    });

    //Бллок первичной прогрузки страницы

    $(".data_container").html(update_data());
    $(".data_container_ctrluser").html(update_data_ctrluser());

    $(function() {appendlist();});

});