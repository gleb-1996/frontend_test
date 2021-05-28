/* 

Ссылка на файл JSON

https://raw.githubusercontent.com/gleb-1996/test-db/main/gallery-images.json
https://docs.google.com/document/d/1jVU6m5qKcgXpSd0jCawymUqeqc2D3x-hD22bKzhLOzc/edit

*/

/* МАССИВ ДЛЯ ИЗОБРАЖЕНИЙ */

let arrImages = [];
let imageExtensions = [
    '.jpg', '.jpeg',
    '.jpe', '.jfif',
    '.tiff', '.webp',
    '.svg', '.png'
];

/* ОБРАБОТКА СОБЫТИЙ */

//открываем/закрываем панель настроек

$('.header__settings-btn').click(function(){
    $('.gallery-settings').css('top', '0');
});

$('.gallery-settings__close-btn').click(function(){
    $('.gallery-settings').css('top', '-130px');
});

// клик по кнопке "Загрузить"

$('.upload-form__button').click(function(event){
    event.preventDefault();

    let url = $('.upload-form__input').val();

    if (url === '') {
        alert('Пожалуйста, введите данные!');
    } else {
        extensionСheck(url, imageExtensions)
        //loadingImages(url);
    }
});

// Функция проверки расширения файла

function extensionСheck(url, ext) {
    console.log(url);
    console.log(ext);
}

// Функция загрузки изображений по URL

async function loadingImages(url) {
    let regexp = /.json/i;
    let result = regexp.test(url);

    if (result) {
        let response = await fetch(url);

        if (response.ok) {
            let json = await response.json();
            let id = 1;

            for (let i = 0; i < json.galleryImages.length; i++) {
                let obj = {
                    id: id,
                    url: json.galleryImages[i].url,
                    width: json.galleryImages[i].width,
                    height: json.galleryImages[i].height
                };
                arrImages.push(obj); 
                id++;
            }

            console.log(arrImages);
        } else {
            console.log('Ошибка!');
        }
    } else {
        console.log('Не JSON!');
    }
}