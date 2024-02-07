// Стартовая страница
let countQuest = 1

function createMain() {
    const header = document.createElement('header');
    const main = document.createElement('main');
    const containerInHeader = document.createElement('div');
    const containerInSection = document.createElement('div');
    const section = document.createElement('section');
    const headerContainer = document.createElement('div');
    const containerSection = document.createElement('div');
    const text = document.createElement('p');
    const startBtn = document.createElement('button');

    const sectionImg = document.createElement('img');

    startBtn.textContent = 'Старт';

    sectionImg.src = 'img/illustration.jpg';

    const logo1 = document.createElement('img');
    const logo2 = document.createElement('img');
    const logo3 = document.createElement('img');
    const logo4 = document.createElement('img');

    section.classList.add('section');
    main.classList.add('main');
    header.classList.add('header');
    containerInHeader.classList.add('container');
    containerInSection.classList.add('container');
    headerContainer.classList.add('header__container');
    text.classList.add('text');
    startBtn.classList.add('btn-reset', 'button');
    containerSection.classList.add('section__container');

    text.innerHTML = `Добро пожаловать в захватывающий мир приключений! <br><br>
    Готовы ли вы окунуться в увлекательный квест, полный загадок и открытий?»`;


    header.append(containerInHeader);
    containerInHeader.append(headerContainer);
    headerContainer.append(logo1, logo2, logo3, logo4);
    main.append(section);
    section.append(containerInSection);

    containerInSection.append(containerSection);
    containerSection.append(text, sectionImg, startBtn);


    // Событие при клике на Старт

    startBtn.addEventListener('click', (e) => {
        e.preventDefault();
        header.remove();
        main.innerHTML = '';
        main.append(createRules());

        document.body.append(createMenu());
    })

    document.body.append(header, main);
}


// Экран с правилами


function createRules() {
    const section = document.createElement('section');
    const container = document.createElement('div');
    const containerSection = document.createElement('div');
    const title = document.createElement('h2');
    const rulesList = document.createElement('ol');
    const rulesText = document.createElement('p');
    const nextBtn = document.createElement('button');

    // Пункты списка с правилами

    const rulesItems = ['Каждый участник получает доступ к мобильному приложению, где будут появляться задания и загадки.', 'Задания могут появляться в разных локациях, связанных с историей артефакта.', 'Участники проходят через различные части города, решая загадки и выполняя задания, отображаемые на их телефоне.'];


    // Проходим по каждому элементу массива и создаем li

    rulesItems.forEach(item => {
        const rulesItem = document.createElement('li');
        rulesItem.textContent = item;
        rulesList.append(rulesItem);
    })

    section.classList.add('section');
    title.classList.add('title');
    section.classList.add('rules');
    container.classList.add('container');
    containerSection.classList.add('section__container');
    nextBtn.classList.add('btn-reset', 'button');

    title.textContent = 'Правила';
    rulesText.textContent = 'Приглашаем вас отправиться к первой локации нашего захватывающего квеста!';
    nextBtn.textContent = 'Далее';

    section.append(container);
    container.append(containerSection);
    containerSection.append(title, rulesList, rulesText, nextBtn);


    // Событие при клике на Далее

    nextBtn.addEventListener('click', (e) => {
        e.preventDefault();
        document.querySelector('.main').innerHTML = '';
        document.querySelector('.main').append(createQuestion(1));
    })

    return section;

}


// Нижнее меню

function createMenu() {
    const menu = document.createElement('div');
    const menuList = document.createElement('ul');


    // Пункты меню

    const menuItems = ['Вопрос', 'Правила', 'О квесте'];

    menuItems.forEach(item => {
        const menuItem = document.createElement('li');
        const menuItemBtn = document.createElement('button');

        menuItemBtn.textContent = item;

        menuItemBtn.classList.add('btn-reset', 'menu__btn');
        menuItem.classList.add('menu__item');

        menuItem.append(menuItemBtn);
        menuList.append(menuItem);
    })

    menu.classList.add('menu');
    menuList.classList.add('menu__list', 'list-reset');

    menu.append(menuList);

    return menu;

}

// Экран с вопросом

function createQuestion() {
    const section = document.createElement('section');
    const container = document.createElement('div');
    const containerSection = document.createElement('div');
    const title = document.createElement('h2');
    const text = document.createElement('p');

    // Создаем форму с полем ввода ответа и кнопкой Ответить

    const form = document.createElement('form');
    const input = document.createElement('input');
    const submit = document.createElement('button');


    // Вызываем функцию, в которой находятся данные вопроса
    const question = getQuestion(countQuest);

    // Проверяем то лежит в массиве
    console.log(question)

        //      Есть ли в массиве АУДИО

    if (question.audio.length) {
        let audioWrap = document.createElement('div')
        let audioElem = document.createElement('audio')
        audioElem.setAttribute('controls', '')
        audioElem.addEventListener("canplaythrough", (event) => {
            audioElem.play();
        });
        audioWrap.append(audioElem);
        containerSection.append(audioWrap)
        audioElem.src = question.audio[0].URL
    } else {

        //      Ели в массиве картинок больше 1 то делаем слайдшоу

        if (question.images.length > 1) {
            const carousel = document.createElement('div');
            carousel.classList.add('f-carousel');
            carousel.id = 'myCarousel';
            question.images.forEach(el => {
                const carouselItem = document.createElement('div');
                const img = document.createElement('img');
                carouselItem.classList.add('f-carousel__slide');

                carouselItem.setAttribute('data-fancybox', 'gallery');
                carouselItem.setAttribute('data-src', el);

                img.src = el.path;

                carousel.append(carouselItem);
                carouselItem.append(img);
            });

            const options = {
                infinite: false,
                Dots: {
                    maxCount: 1,
                },
            };

            Fancybox.bind("[data-fancybox]", {
                // Your custom options
            });


            containerSection.append(carousel);

            new Carousel(carousel, options);

        }

        //      Если одна картинка в массиве то просто выводим ее

        else if (question.images.length === 1) {
            const img = document.createElement('img');
            img.src = question.images[0].path;
            containerSection.append(img);
        }

        //      Есть ли в массиве видео

        else if (question.video.length > 1) {
            const video = document.createElement('video')
            video.src = question.video[0].URL
            containerSection.append(video)
        }
    }
    submit.textContent = 'Ответить';

    section.classList.add('question', 'section');
    container.classList.add('container');
    form.classList.add('form');
    input.classList.add('form__input');
    submit.classList.add('form__btn', 'btn-reset', 'button');
    containerSection.classList.add('section__container');

    title.textContent = `Вопрос ${countQuest} из 10`;
    text.textContent = question.text;


    section.append(container);
    container.append(containerSection);
    containerSection.prepend(title, text);
    containerSection.append(form);
    form.append(input, submit);

    //  Событие отправки формы

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        document.querySelector('.main').innerHTML = '';
        document.querySelector('.main').append(createSuccess(countQuest));
    })

    return section;
}

// Экран, если ответ положительный

function createSuccess() {
    const container = document.createElement('div');
    const containerSection = document.createElement('div');
    const section = document.createElement('section');
    const text = document.createElement('p');
    const nextBtn = document.createElement('button');

    const sectionImg = document.createElement('img');

    sectionImg.src = 'img/illustration.jpg';

    section.classList.add('section');
    container.classList.add('container');
    text.classList.add('text');
    nextBtn.classList.add('btn-reset', 'button');
    containerSection.classList.add('section__container');

    text.textContent = `Ты молодец. Ответил правильно. Давай пойдём на локацию ${countQuest + 1}`;
    nextBtn.textContent = 'Следующий вопрос';

    section.append(container);
    container.append(containerSection);
    containerSection.append(text, sectionImg, nextBtn);


    nextBtn.addEventListener('click', (e) => {
        e.preventDefault();
        document.querySelector('.main').innerHTML = '';
        document.querySelector('.main').append(createQuestion(countQuest++));
    })
    return section;

}

// Функция, которая будет запрашивать данные вопроса

function getQuestion(num) {
    let currentQuest = {}
    questDB.find((el, index) => {
        if (el.id === num) {
            currentQuest = el
        }
    })
    return currentQuest

}

const questDB = [
    {
        id: 1,
        text: 'Кто из персонажей всегда ходит с молоточком и представляет собой неотъемлемую часть команды.',
        images: [
            {name: 'image1', path: 'img/illustration.jpg'},
            {name: 'image2', path: 'img/illustration.jpg'},
            {name: 'image3', path: 'img/illustration.jpg'},
            {name: 'image4', path: 'img/illustration.jpg'},
        ],
        audio: [
            {name: 'image1', URL: 'http://www.sousound.com/music/healing/healing_01.mp'},
        ],
        video: [
            {name: 'video1', URL: 'http://www.sousound.com/music/healing/healing_01.mp'},
        ],
        answers:{}
    },
    {
        id: 2,
        text: 'Кто из персонажей всегда ходит с молоточком и представляет собой неотъемлемую часть команды.',
        images: [],
        audio: [],
        video: [
            {name: 'video2', URL: 'http://www.sousound.com/music/healing/healing_01.mp'},
        ],
        answers:{}
    },
    {
        id: 3,
        text: 'Кто из персонажей всегда ходит с молоточком и представляет собой неотъемлемую часть команды?',
        images: [
            {name: 'image1', path: 'img/illustration.jpg'},
            {name: 'image2', path: 'img/illustration.jpg'},
            {name: 'image3', path: 'img/illustration.jpg'},
            {name: 'image4', path: 'img/illustration.jpg'},
        ],
        audio: [],
        video: [
            {name: 'video3', URL: 'http://www.sousound.com/music/healing/healing_01.mp'},
        ],
        answers:{}
    },
    {
        id: 4,
        text: 'Кто из персонажей всегда ходит с молоточком и представляет собой неотъемлемую часть команды.',
        images: [],
        audio: [
            {name: 'image1', URL: 'http://www.sousound.com/music/healing/healing_01.mp'},
        ],
        video: [
            {name: 'video4', URL: 'http://www.sousound.com/music/healing/healing_01.mp'},
        ],
        answers:{}
    },
    {
        id: 5,
        text: 'Кто из персонажей всегда ходит с молоточком и представляет собой неотъемлемую часть команды.',
        images: [
            {name: 'image1', path: 'img/illustration.jpg'},
            {name: 'image2', path: 'img/illustration.jpg'},
            {name: 'image3', path: 'img/illustration.jpg'},
            {name: 'image4', path: 'img/illustration.jpg'},
        ],
        audio: [],
        video: [
            {name: 'video5', URL: 'http://www.sousound.com/music/healing/healing_01.mp'},
        ],
        answers:{}
    },
    {
        id: 6,
        text: 'Кто из персонажей всегда ходит с молоточком и представляет собой неотъемлемую часть команды.',
        images: [
            {name: 'image1', path: 'img/illustration.jpg'},
            {name: 'image2', path: 'img/illustration.jpg'},
            {name: 'image3', path: 'img/illustration.jpg'},
            {name: 'image4', path: 'img/illustration.jpg'},
        ],
        audio: [],
        video: [
            {name: 'video6', URL: 'http://www.sousound.com/music/healing/healing_01.mp'},
        ],
        answers:{}
    },
    {
        id: 7,
        text: 'Кто из персонажей всегда ходит с молоточком и представляет собой неотъемлемую часть команды.',
        images: [
            {name: 'image1', path: 'img/illustration.jpg'},
            {name: 'image2', path: 'img/illustration.jpg'},
            {name: 'image3', path: 'img/illustration.jpg'},
            {name: 'image4', path: 'img/illustration.jpg'},
        ],
        audio: [],
        video: [
            {name: 'video7', URL: 'http://www.sousound.com/music/healing/healing_01.mp'},
        ],
        answers:{}
    },
    {
        id: 8,
        text: 'Кто из персонажей всегда ходит с молоточком и представляет собой неотъемлемую часть команды.',
        images: [
            {name: 'image1', path: 'img/illustration.jpg'},
            {name: 'image2', path: 'img/illustration.jpg'},
            {name: 'image3', path: 'img/illustration.jpg'},
            {name: 'image4', path: 'img/illustration.jpg'},
        ],
        audio: [],
        video: [
            {name: 'video8', URL: 'http://www.sousound.com/music/healing/healing_01.mp'},
        ],
        answers:{}
    },
    {
        id: 9,
        text: 'Кто из персонажей всегда ходит с молоточком и представляет собой неотъемлемую часть команды.' ,
        images: [
            {name: 'image1', path: 'img/illustration.jpg'},
            {name: 'image2', path: 'img/illustration.jpg'},
            {name: 'image3', path: 'img/illustration.jpg'},
            {name: 'image4', path: 'img/illustration.jpg'},
        ],
        audio: [],
        video: [
            {name: 'video9', URL: 'http://www.sousound.com/music/healing/healing_01.mp'},
        ],
        answers:{}
    },
    {
        id: 10,
        text: 'Кто из персонажей всегда ходит с молоточком и представляет собой неотъемлемую часть команды.',
        images: [
            {name: 'image1', path: 'img/illustration.jpg'},
            {name: 'image2', path: 'img/illustration.jpg'},
            {name: 'image3', path: 'img/illustration.jpg'},
            {name: 'image4', path: 'img/illustration.jpg'},
        ],
        audio: [],
        video: [
            {name: 'video10', URL: 'http://www.sousound.com/music/healing/healing_01.mp'},
        ],
        answers:{}
    },
]

createMain();
