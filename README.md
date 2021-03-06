# Галерея

## О приложении

Настоящее приложение состоит из двух компонентов:

1. Галерея с изображениями
2. Панель настроек галереи

### Галерея с изображениями

Блок галереи имеет шапку (header). В правом углу шапки расположена кнопка открытия панели настроек (будет описана далее).<br />
Если галерея пуста, будет выведено сообщение:<br />
<img src="img/message.jpg"><br />
При клике по **"Добавить"** также открывается панель настроек.<br />
Если же в галерее есть одно изображение и более, сообщение скроется.

Изображения в галерее имеют 3 варианта расположения:

1. В 3 ряда при ширине экрана устройства более 860 пикселей
2. В 2 ряда при ширине экрана устройства от 425 пикселей до 860 пикселей
3. В 1 ряд при ширине экрана устройства менее 425 пикселей

Количество рядов в каждом варианте может быть изменено в файле [style.sass](css/style.sass) в блоке переменных.

За это отвечают переменные:

1. $rowsLaptop: 3
2. $rowsTablet: 2
3. $rowsMobile: 1

Соответственно с приведёнными выше вариантами.

На больших экранах, при наведении курсора на изображение, появится иконка, позволяющая при клике удалить изображение из 
галереи.

На мобильных устройствах эта иконка будет зафиксирована.

Если удалить все изображения, выведется сообщение описанное выше.

### Панель настроек галереи

Панель настроек имеет следующие блоки:

1. Поле ввода + кнопка **"Загрузить"**
2. Область для перетаскивания файлов + кнопка **"Выбрать изображение"**
3. Иконка закрытия панели

Поле ввода принимает для загрузки ссылки на изображения с расширениями: .jpg, .jpeg', .jpe', '.jfif', '.tiff', '.webp', '.svg', '.png'.<br />
И также ссылки на файл формата .json. Данное приложение работает с файлом **https://raw.githubusercontent.com/gleb-1996/test-db/main/gallery-images.json**<br />
Пустое поле не будет обработано.

В область Drag-and-drop можно перетащить изображение из файловой системы или, перейдя по кнопке **"Выбрать изображение"**, выбрать файл в меню загрузки.

В директории [img](/img/) есть изображения которые можно добавить в галерею введя в поле ввода относительный путь, например **"img/img1.jpg".**