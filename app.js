// Стартовая страница
let countQuest = 1

function createMain() {
    const header = createHeader();
    const footer = createFooter();
    const main = document.createElement('main');
    const container = document.createElement('div');
    const section = document.createElement('section');
    const containerSection = document.createElement('div');
    const text = document.createElement('p');
    const startBtn = document.createElement('button');
    const title = document.createElement('h2');

    const svgBlock = document.createElement('div');


    svgBlock.classList.add('svg-block');

    startBtn.textContent = 'Старт';
    title.textContent = 'Добро пожаловать в мир приключений!';


    document.body.classList.add('start-body');
    section.classList.add('section');
    main.classList.add('main');
    container.classList.add('container');
    text.classList.add('text');
    title.classList.add('title'),
    startBtn.classList.add('btn-reset', 'button');
    containerSection.classList.add('section__container');

    text.textContent = 'Готовы ли вы окунуться в увлекательный квест, полный загадок и открытий?»';

    main.append(section);
    section.append(container);

    container.append(containerSection);
    containerSection.append(title, text, startBtn);


    // Событие при клике на Старт

    startBtn.addEventListener('click', (e) => {
        e.preventDefault();
        document.body.innerHTML = '';
        document.body.classList.remove('start-body');
        document.body.append(createRules());

    })

    document.body.append(svgBlock, header, main, footer);
}


// Экран с правилами


function createRules() {
    const main = document.createElement('main');
    const section = document.createElement('section');
    const container = document.createElement('div');
    const title = document.createElement('h2');
    const rulesList = document.createElement('ol');
    const rulesText = document.createElement('p');
    const nextBtn = document.createElement('button');

    const form = document.createElement('form');
    const formBlock = document.createElement('div');
    const policy = document.createElement('a');
    const label = document.createElement('label');
    const input = document.createElement('input');
    const checkbox = document.createElement('span');
    const checkboxText = document.createElement('span');

    input.type = 'checkbox';
    checkboxText.textContent = 'Я подтверждаю, что ознакомлен и согласен с правилами использования данного сервиса';

    policy.textContent = 'Политика конфиденциальности';

    nextBtn.disabled = true;

    input.addEventListener('change', () => {
        if (input.checked) {
            nextBtn.disabled = false;
        } else nextBtn.disabled = true;
    })

   

    // Пункты списка с правилами

    const rulesItems = [
        'Задания могут появляться в разных локациях, связанных с историей артефакта.', 
        'Участники проходят через различные части города, решая загадки и выполняя задания, отображаемые на их телефоне.', 
        'Победителем становится человек, который первым соберёт все фрагменты карты артефакта и разгадает его местонахождение.'
    ];


    // Проходим по каждому элементу массива и создаем li

    rulesItems.forEach(item => {
        const rulesItem = document.createElement('li');
        rulesItem.textContent = item;

        rulesItem.classList.add('rules__item');

        rulesList.append(rulesItem);
    })

    document.body.classList.add('rules-body');
    section.classList.add('section');
    title.classList.add('title', 'title-violet');
    section.classList.add('rules');
    container.classList.add('container');
    nextBtn.classList.add('btn-reset', 'form__button');
    form.classList.add('rules__form', 'form');
    formBlock.classList.add('rules__block');
    rulesList.classList.add('rules__list');
    policy.classList.add('rules__policy');
    checkbox.classList.add('rules__checkbox');
    label.classList.add('rules__label');


    title.textContent = 'Правила';
    rulesText.textContent = 'Приглашаем вас отправиться к первой локации нашего захватывающего квеста!';
    nextBtn.textContent = 'Далее';

    nextBtn.type = 'submit';

    main.append(section);
    section.append(container);
    container.append(form);
    label.append(input, checkbox, checkboxText);
    formBlock.append(title, rulesList, rulesText, policy, label);
    form.append(formBlock, nextBtn);


    // Событие при клике на Далее

    nextBtn.addEventListener('click', (e) => {
        e.preventDefault();
        document.body.innerHTML = '';
        document.body.classList.remove('rules-body');
        document.body.append(createQuestion(1));
    })

    return main;

}



// Экран с вопросом

function createQuestion() {
    const main = document.createElement('main');
    const section = document.createElement('section');
    const container = document.createElement('div');
    const containerSection = document.createElement('div');
    const num = document.createElement('p');
    const text = document.createElement('p');
    const title = document.createElement('h2');

    // Создаем форму с полем ввода ответа и кнопкой Ответить

    const form = document.createElement('form');
    const label = document.createElement('label');
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

        audioWrap.classList.add('question__media');

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

            carousel.classList.add('question__media');


            containerSection.append(carousel);

            new Carousel(carousel, options);

        }

        //      Если одна картинка в массиве то просто выводим ее

        else if (question.images.length === 1) {
            const mediaBlock = document.createElement('div');
            const img = document.createElement('img');
            img.src = question.images[0].path;
            mediaBlock.append(img);
            mediaBlock.classList.add('question__media');
            containerSection.append(mediaBlock);
        }

        //      Есть ли в массиве видео

        else if (question.video.length > 1) {
            const video = document.createElement('video')
            video.src = question.video[0].URL
            containerSection.append(video)
        }
    }
    submit.textContent = 'Ответить';

    document.body.classList.add('question-body');

    section.classList.add('question', 'section');
    container.classList.add('container');
    form.classList.add('form', 'question__form');
    input.classList.add('form__input');
    submit.classList.add('form__btn', 'btn-reset', 'form__button');
    containerSection.classList.add('question__container');
    num.classList.add('question__num');
    title.classList.add('title', 'title-violet');
    text.classList.add('question__text');
    label.classList.add('form__label');

    num.textContent = `Вопрос ${countQuest} из 10`;
    text.textContent = question.text;

    title.textContent = question.title;


    main.append(section);
    section.append(container);
    container.append(containerSection);
    containerSection.prepend(num, title, text);
    containerSection.append(form);
    label.append(input);
    form.append(label, submit);

    //  Событие отправки формы

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        document.body.innerHTML = '';
        document.body.classList.remove('question-body');
        document.body.append(createSuccess(countQuest));
    })

    return main;
}

// Экран, если ответ положительный

function createSuccess() {
    const main = document.createElement('main');
    const container = document.createElement('div');
    const containerSection = document.createElement('div');
    const section = document.createElement('section');
    const subtitle = document.createElement('p');
    const nextBtn = document.createElement('button');

    const sectionImg = document.createElement('img');

    sectionImg.src = 'img/success.webp';

    document.body.classList.add('success-body');
    section.classList.add('section', 'success');
    container.classList.add('container');
    subtitle.classList.add('subtitle');
    nextBtn.classList.add('btn-reset', 'button', 'question__button');
    containerSection.classList.add('section__container');
    sectionImg.classList.add('success__img');

    subtitle.textContent = `Ты молодец! Ответил правильно. Давай пойдём на задание ${countQuest + 1}.`;
    nextBtn.textContent = 'Следующий вопрос';

    main.append(section);
    section.append(container);
    container.append(containerSection);
    containerSection.append(sectionImg, subtitle, nextBtn);


    nextBtn.addEventListener('click', (e) => {
        e.preventDefault();
        document.body.innerHTML = '';
        document.body.classList.remove('success-body');
        document.body.append(createQuestion(countQuest++));
    })


    return main;

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
        title: 'Заголовок',
        text: 'Кто из персонажей всегда ходит с молоточком и представляет собой неотъемлемую часть команды.',
        images: [
            {name: 'image1', path: 'img/image.png'},
            {name: 'image2', path: 'img/image.png'},
            {name: 'image3', path: 'img/image.png'},
            {name: 'image4', path: 'img/image.png'},
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
        title: 'Заголовок',
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
        title: 'Заголовок',
        text: 'Кто из персонажей всегда ходит с молоточком и представляет собой неотъемлемую часть команды?',
        images: [
            {name: 'image1', path: 'img/image.png'},
            {name: 'image2', path: 'img/image.png'},
            {name: 'image3', path: 'img/image.png'},
            {name: 'image4', path: 'img/image.png'},
        ],
        audio: [],
        video: [
            {name: 'video3', URL: 'http://www.sousound.com/music/healing/healing_01.mp'},
        ],
        answers:{}
    },
    {
        id: 4,
        title: 'Заголовок',
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
        title: 'Заголовок',
        text: 'Кто из персонажей всегда ходит с молоточком и представляет собой неотъемлемую часть команды.',
        images: [
            {name: 'image1', path: 'img/image.png'},
            {name: 'image2', path: 'img/image.png'},
            {name: 'image3', path: 'img/image.png'},
            {name: 'image4', path: 'img/image.png'},
        ],
        audio: [],
        video: [
            {name: 'video5', URL: 'http://www.sousound.com/music/healing/healing_01.mp'},
        ],
        answers:{}
    },
    {
        id: 6,
        title: 'Заголовок',
        text: 'Кто из персонажей всегда ходит с молоточком и представляет собой неотъемлемую часть команды.',
        images: [
            {name: 'image1', path: 'img/image.png'},
            {name: 'image2', path: 'img/image.png'},
            {name: 'image3', path: 'img/image.png'},
            {name: 'image4', path: 'img/image.png'},
        ],
        audio: [],
        video: [
            {name: 'video6', URL: 'http://www.sousound.com/music/healing/healing_01.mp'},
        ],
        answers:{}
    },
    {
        id: 7,
        title: 'Заголовок',
        text: 'Кто из персонажей всегда ходит с молоточком и представляет собой неотъемлемую часть команды.',
        images: [
            {name: 'image1', path: 'img/image.png'},
            {name: 'image2', path: 'img/image.png'},
            {name: 'image3', path: 'img/image.png'},
            {name: 'image4', path: 'img/image.png'},
        ],
        audio: [],
        video: [
            {name: 'video7', URL: 'http://www.sousound.com/music/healing/healing_01.mp'},
        ],
        answers:{}
    },
    {
        id: 8,
        title: 'Заголовок',
        text: 'Кто из персонажей всегда ходит с молоточком и представляет собой неотъемлемую часть команды.',
        images: [
            {name: 'image1', path: 'img/image.png'},
            {name: 'image2', path: 'img/image.png'},
            {name: 'image3', path: 'img/image.png'},
            {name: 'image4', path: 'img/image.png'},
        ],
        audio: [],
        video: [
            {name: 'video8', URL: 'http://www.sousound.com/music/healing/healing_01.mp'},
        ],
        answers:{}
    },
    {
        id: 9,
        title: 'Заголовок',
        text: 'Кто из персонажей всегда ходит с молоточком и представляет собой неотъемлемую часть команды.' ,
        images: [
            {name: 'image1', path: 'img/image.png'},
            {name: 'image2', path: 'img/image.png'},
            {name: 'image3', path: 'img/image.png'},
            {name: 'image4', path: 'img/image.png'},
        ],
        audio: [],
        video: [
            {name: 'video9', URL: 'http://www.sousound.com/music/healing/healing_01.mp'},
        ],
        answers:{}
    },
    {
        id: 10,
        title: 'Заголовок',
        text: 'Кто из персонажей всегда ходит с молоточком и представляет собой неотъемлемую часть команды.',
        images: [
            {name: 'image1', path: 'img/image.png'},
            {name: 'image2', path: 'img/image.png'},
            {name: 'image3', path: 'img/image.png'},
            {name: 'image4', path: 'img/image.png'},
        ],
        audio: [],
        video: [
            {name: 'video10', URL: 'http://www.sousound.com/music/healing/healing_01.mp'},
        ],
        answers:{}
    },
]

// createMain();


// Хидер с логтипами

function createHeader() {
    const header = document.createElement('header');
    const container = document.createElement('div');
    const headerContainer = document.createElement('div');

    const logo1 = document.createElement('img');
    const logo2 = document.createElement('img');
    const logo3 = document.createElement('img');

    logo1.src = 'img/logo1.svg';
    logo2.src = 'img/logo2.svg';
    logo3.src = 'img/logo3.svg';

    header.classList.add('header');
    container.classList.add('container');
    headerContainer.classList.add('header__container');

    headerContainer.append(logo1, logo2, logo3);
    header.append(container);
    container.append(headerContainer);

    return header;
}


// Футер с логотипами


function createFooter() {
    const footer = document.createElement('footer');
    const container = document.createElement('div');
    const footerContainer = document.createElement('div');

    const logo1 = document.createElement('img');
    const logo2 = document.createElement('img');
    const logo3 = document.createElement('img');

    logo1.src = 'img/logo4.svg';
    logo2.src = 'img/logo5.svg';
    logo3.src = 'img/logo6.svg';

    footer.classList.add('footer');
    container.classList.add('container');
    footerContainer.classList.add('footer__container');

    footerContainer.append(logo1, logo2, logo3);
    footer.append(container);
    container.append(footerContainer);

    return footer;
}



// Экран авторизации

function createAuthorization() {
    const header = createHeader();
    const footer = createFooter();
    
    const main = document.createElement('main');
    const section = document.createElement('section');
    const container = document.createElement('div');

    const form = document.createElement('form');
    const title = document.createElement('h2');
    const input = document.createElement('input');
    const submit = document.createElement('button');

    document.body.classList.add('authorization-body');
    section.classList.add('authorization');
    container.classList.add('container');
    form.classList.add('authorization__form', 'form');
    input.classList.add('form__input', 'authorization__input');
    submit.classList.add('form__button', 'authorization__button', 'btn-reset');
    title.classList.add('title');

    title.textContent = 'Вход';
    submit.textContent = 'Войти';
    input.placeholder = 'Введите свой номер';

    document.body.append(header, main, footer);
    main.append(section);
    section.append(container);
    container.append(form);
    form.append(title, input, submit);

    submit.addEventListener('click', (e) => {
        e.preventDefault();
        document.body.innerHTML = '';
        document.body.classList.remove('authorization-body');
        createRegistration();
    })

}


// Экран регистрации и выбора языка


function createRegistration() {
    const header = createHeader();
    const footer = createFooter();
    
    const main = document.createElement('main');
    const section = document.createElement('section');
    const container = document.createElement('div');

    const form = document.createElement('form');
    const title = document.createElement('h2');
    const input = document.createElement('input');
    const submit = document.createElement('button');

    const languageBlock = document.createElement('div');
    const languageTitle = document.createElement('h2');
    const labelBlock = document.createElement('div');

    languageTitle.textContent = 'Сhoose your language';

    const langs =  [
        {
            id: 1,
            name: 'Русский',
            flag: 'img/rus.svg',
        },
        {
            id: 2,
            name: 'English',
            flag: 'img/eng.svg',
        }
    ]

    langs.forEach(lang => {
        const label = document.createElement('label');
        const radio = document.createElement('input');
        const flagImg = document.createElement('img');
        const langName = document.createElement('span');
        const imgBlock = document.createElement('div');

        langName.textContent = lang.name;
        flagImg.src = lang.flag;

        radio.type = 'radio';
        radio.name = 'lang';

        label.classList.add('language');
        radio.classList.add('language__input');
        langName.classList.add('language__name');
        imgBlock.classList.add('language__img');
        imgBlock.append(flagImg);

        label.append(radio, imgBlock, langName);

        labelBlock.append(label);
    })

    document.body.classList.add('registration-body');
    section.classList.add('registration');
    container.classList.add('container');
    form.classList.add('registration__form', 'form');
    input.classList.add('form__input', 'registration__input');
    submit.classList.add('form__button', 'registration__button', 'btn-reset');
    title.classList.add('title');
    languageTitle.classList.add('title');
    languageBlock.classList.add('languages');
    labelBlock.classList.add('languages__block');



    title.textContent = 'Регистрация';
    submit.textContent = 'Зарегистрироваться';
    input.placeholder = 'Введите свой номер';

    document.body.append(header, main, footer);
    main.append(section);
    section.append(container);
    container.append(form);
    languageBlock.append(languageTitle, labelBlock);
    form.append(languageBlock, title, input, submit);

    submit.addEventListener('click', (e) => {
        e.preventDefault();
        document.body.innerHTML = '';
        document.body.classList.remove('registration-body');
        createMain();
    })

}

createAuthorization()
// createMain()