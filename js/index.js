/* 

Ссылка на файл JSON

https://raw.githubusercontent.com/gleb-1996/test-db/main/gallery-images.json
https://docs.google.com/document/d/1jVU6m5qKcgXpSd0jCawymUqeqc2D3x-hD22bKzhLOzc/edit

*/

/* МАССИВЫ И ЭЛЕМЕНТЫ */

let arrImages = [];
let imageExtensions = [
    '.jpg', '.jpeg',
    '.jpe', '.jfif',
    '.tiff', '.webp',
    '.svg', '.png'
];
let dropEvents = [
    'dragenter', 'dragover',
    'dragleave', 'drop'
];
let $containerGallery = document.querySelector('.container-gallery');
let $gallerySettings = document.querySelector('.gallery-settings');
let $dropArea = document.querySelector('.drop-area');
let $settingsOpenBtn = document.querySelector('.header__settings-btn');
let $settingsOpenStr = document.querySelector('.message-gallery__add');
let $settingsCloseBtn = document.querySelector('.gallery-settings__close-btn');
let $loadingBtn = document.querySelector('.upload-form__button');

/* ОБРАБОТКА СОБЫТИЙ */

$containerGallery.addEventListener('click', deleteImage);

$settingsOpenBtn.addEventListener('click', openSettings);

$settingsOpenStr.addEventListener('click', openSettings);

$settingsCloseBtn.addEventListener('click', closeSettings);

$loadingBtn.addEventListener('click', startLoadingForm);

dropEvents.forEach(function(eventName){
    $dropArea.addEventListener(eventName, preventDefaults, false);
});

$dropArea.addEventListener('drop', handleDrop, false);

/* ФУНКЦИИ */

function openSettings() {
    $gallerySettings.classList.remove('hide');
}

function closeSettings() {
    $gallerySettings.classList.add('hide');
}

function startLoadingForm(event) {
    event.preventDefault();

    let url = document.querySelector('.upload-form__input').value;

    if (url === '') {
        alert('Пожалуйста, введите данные!');
    } else {
        extensionСheck(url, imageExtensions);
    }
}

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

async function loadingImagesFromJson(url) {
    let response = await fetch(url);

    if (response.ok) {
        let json = await response.json();
        let id;

        if (arrImages.length === 0) {
            id = 1;
        } else {
            id = arrImages.length + 1;
        }

        for (let i = 0; i < json.galleryImages.length; i++) {
            let obj = {
                id: id,
                url: json.galleryImages[i].url
            };
            arrImages.push(obj); 
            id++;
        }

        monitorGallery(arrImages);
    } else {
        alert('Статус HTTP: ' + response.status);
    }
}

function loadingOneImage(url) {
    let id;

    if (arrImages.length === 0) {
        id = 1;
    } else {
        id = arrImages.length + 1;
    }

    let obj = {
        id: id,
        url: url
    };

    arrImages.push(obj);
    monitorGallery(arrImages);
}

function upgradeId(arr) {
    let id = 1;
    arr.forEach(function(el){
        el.id = id;
        id++;
    });
}

function deleteImage(event){
    if (event.target.classList.contains('block-img__del')) {
        let $parent = event.target.parentNode;
        let parentId = $parent.getAttribute('id');

        for (let i = 0; i < arrImages.length; i++) {
            if (arrImages[i].id == parentId) {
                arrImages.splice(i, 1);
                break;
            }
        }

        if (arrImages.length > 0) {
            upgradeId(arrImages);
            monitorGallery(arrImages);
        } else {
            monitorGallery(arrImages);
        }
    }
}

function monitorGallery(arr){
    let $message = document.querySelector('.message-gallery');
    let $container = document.querySelector('.container-gallery');

    if (arr.length === 0 && $message.classList.contains('hide')) {
        $message.classList.remove('hide');
        $container.innerHTML = '';
    } else if (arr.length > 0 && $message.classList.contains('hide')) {
        $container.innerHTML = '';
        arr.forEach(function(el){
            let $blockImg = document.createElement('div');
                $blockImg.setAttribute('id', el.id);
                $blockImg.classList.add('block-img');

            let template = `<img src="${el.url}" alt="${'Изображение ' + el.id}" class="block-img__img">
                            <i class="fas fa-times block-img__del"></i>`;

            $blockImg.innerHTML = template;

            $container.append($blockImg);
        });
    } else {
        $message.classList.add('hide');
        $container.innerHTML = '';
        arr.forEach(function(el){
            let $blockImg = document.createElement('div');
                $blockImg.setAttribute('id', el.id);
                $blockImg.classList.add('block-img');

            let template = `<img src="${el.url}" alt="${'Изображение ' + el.id}" class="block-img__img">
                            <i class="fas fa-times block-img__del"></i>`;

            $blockImg.innerHTML = template;

            $container.append($blockImg);
        });
    }
}

function preventDefaults (event) {
    event.preventDefault();
    event.stopPropagation();
}

function handleDrop(event) {
    let dt = event.dataTransfer;
    let files = dt.files;
    handleFiles(files);
}

function previewFile(file) {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = function() {
        loadingOneImage(reader.result);
    }
  }

function handleFiles(files) {
    ([...files]).forEach(previewFile);
}