// открываем/закрываем панель настроек

$('.header__settings-btn').click(function(){
    $('.gallery-settings').css('top', '0');
});

$('.gallery-settings__close-btn').click(function(){
    $('.gallery-settings').css('top', '-130px');
});

// 