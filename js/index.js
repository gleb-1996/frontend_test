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
        extensionСheck(url, imageExtensions);
        //loadingImages(url);
    }
});

// Функция проверки расширения файла

function extensionСheck(url, ext) {
    let regexpJson = /.json/;
    let resultJson = regexpJson.test(url);
    let labelImg = 0;

    for (let i = 0; i < ext.length; i++) {
        let regexpImg = new RegExp(ext[i]);
        let resultImg = regexpImg.test(url);
        if (resultImg) {
            labelImg++;
        }
    }

    if (resultJson) {
        loadingImagesFromJson(url);
    } else if (labelImg === 1) {
        loadingOneImage(url);
    } else {
        alert('Пожалуйста, загрузите изображение или файл с изображениями в формате JSON!');
    }
}

// Функция загрузки изображений из JSON

async function loadingImagesFromJson(url) {
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

        arrImages.forEach(function(el){
            let $container = document.querySelector('.container-gallery');

            let $blockImg = document.createElement('div');
            $blockImg.setAttribute('id', el.id);
            $blockImg.classList.add('block-img');
            let template = `<img src="${el.url}" alt="${'Изображение ' + el.id}" class="block-img__img">`;
            $blockImg.innerHTML = template;

            $container.append($blockImg);
        });
    } else {
        alert('Статус HTTP: ' + response.status);
    }
}

// Функция загрузки одного изображения

// async function loadingOneImage(url) {

// }