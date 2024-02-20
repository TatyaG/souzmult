// Стартовая страница
let countQuest = 1
let langCode

function createMain(lang) {
    const header = createHeader();
    const footer = createFooter();
    const main = document.createElement('main');
    const container = document.createElement('div');
    const section = document.createElement('section');
    const containerSection = document.createElement('div');
    const text = document.createElement('p');
    const startBtn = document.createElement('button');
    const title = document.createElement('h2');

    const bottomBlock = document.createElement('div');
    bottomBlock.classList.add('bottom-block');

    const picture = document.createElement('picture');


    picture.innerHTML = `
    <source srcset="img/background.webp" media="(max-width: 767px)">
    <source srcset="img/background-tablet.webp" media="(max-width: 1023px)">
    <source srcset="img/background-desktop.webp" media="(max-width: 1919px)">
    <img src="img/background-desktop.webp">
    `

    if (lang == 'ru') {
        startBtn.textContent = 'Старт';
        title.textContent = 'Добро пожаловать в мир приключений!';
        text.textContent = 'Готовы ли вы окунуться в увлекательный квест, полный загадок и открытий?';
    } else {
        startBtn.textContent = 'Start';
        title.textContent = 'Welcome to the world of adventure!';
        text.textContent = 'Are you ready to plunge into an exciting quest full of mysteries and discoveries?';
    }


    document.body.classList.add('start-body');
    section.classList.add('section');
    main.classList.add('main');
    container.classList.add('container');
    text.classList.add('text');
    title.classList.add('title'),
        startBtn.classList.add('btn-reset', 'button');
    containerSection.classList.add('section__container');



    main.append(section);
    bottomBlock.append(main, footer);
    section.append(container);

    container.append(containerSection);
    containerSection.append(title, text, startBtn);


    // Событие при клике на Старт

    startBtn.addEventListener('click', (e) => {
        e.preventDefault();
        document.body.innerHTML = '';
        document.body.classList.remove('start-body');
        document.body.append(createRules(lang));

    })

    document.body.append(header, picture, bottomBlock);
}


// Экран с правилами


function createRules(lang) {
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


    nextBtn.disabled = true;

    input.addEventListener('change', () => {
        if (input.checked) {
            nextBtn.disabled = false;
        } else nextBtn.disabled = true;
    })


    // Пункты списка с правилами

    let rulesItems = []

    if (lang == 'ru') {
        checkboxText.textContent = 'Я подтверждаю, что ознакомлен и согласен с правилами использования данного сервиса';
        policy.textContent = 'Политика конфиденциальности';

        title.textContent = 'Правила';
        rulesText.textContent = 'Приглашаем вас отправиться к первой локации нашего захватывающего квеста!';
        nextBtn.textContent = 'Соглашаюсь';

        rulesItems = [
            'Задания могут появляться в разных локациях, связанных с историей артефакта.',
            'Участники проходят через различные части города, решая загадки и выполняя задания, отображаемые на их телефоне.',
            'Победителем становится человек, который первым соберёт все фрагменты карты артефакта и разгадает его местонахождение.'
        ];
    } else {
        checkboxText.textContent = 'I have read and agree to the privacy policy and service rules';
        policy.textContent = 'Privacy Policy';

        title.textContent = 'Rules';
        rulesText.textContent = 'Приглашаем вас отправиться к первой локации нашего захватывающего квеста!';
        nextBtn.textContent = 'I Agree';

        rulesItems = [
            'Hello, World',
            'Hello, World',
            'Hello, World'
        ];
    }




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
        document.body.append(createQuestion(lang));
    })

    return main;

}


// Экран с вопросом

function createQuestion(lang) {
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
        containerSection.append(audioWrap);
        audioElem.src = question.audio[0].URL;

    } else {

        //      Если в массиве картинок больше 1 то делаем слайдшоу

        if (question.images.length > 1) {
            const carousel = document.createElement('div');
            carousel.classList.add('f-carousel');
            carousel.id = 'myCarousel';
            question.images.forEach(el => {
                const carouselItem = document.createElement('div');
                const img = document.createElement('img');
                carouselItem.classList.add('f-carousel__slide');

                carouselItem.setAttribute('data-fancybox', 'gallery');
                carouselItem.setAttribute('data-src', el.path);

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

            Fancybox.bind('[data-fancybox]', {
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

    if (lang == 'ru') {
        submit.textContent = 'Ответить';
    } else submit.textContent = 'Send';


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

    num.textContent = `${countQuest}/10`;
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

        if (countQuest == 10) {
            document.body.append(successWindow(lang));
            
        } else document.body.append(createSuccess(countQuest, lang));
    })

    return main;
}

// Экран, если ответ положительный

function createSuccess(lang) {
    const main = document.createElement('main');
    const container = document.createElement('div');
    const containerSection = document.createElement('div');
    const section = document.createElement('section');
    const subtitle = document.createElement('p');
    const nextBtn = document.createElement('button');

    const sectionImg = document.createElement('img');

    let questSuccess = false

    sectionImg.src = 'img/success.webp';

    document.body.classList.add('success-body');
    section.classList.add('section', 'success');
    container.classList.add('container');
    subtitle.classList.add('subtitle');
    nextBtn.classList.add('btn-reset', 'button', 'question__button');
    containerSection.classList.add('section__container');
    sectionImg.classList.add('success__img');

    if (lang == 'ru') {
        if (countQuest < 10) {
            subtitle.textContent = `Ты молодец! Ответил правильно. Давай пойдём на задание ${countQuest + 1}.`;
            nextBtn.textContent = 'Следующий вопрос';
        } else {
            questSuccess = true;
        }
    } else {
        if (countQuest < 10) {
            subtitle.textContent = `Well done! That's correct. Let's move to Task ${countQuest + 1}.`;
            nextBtn.textContent = 'Next task';
        } else {
            questSuccess = true;        
        }
    }


    


    main.append(section);
    section.append(container);
    container.append(containerSection);
    containerSection.append(sectionImg, subtitle, nextBtn);


    nextBtn.addEventListener('click', (e) => {
        e.preventDefault();     
        if (!questSuccess) {
            document.body.innerHTML = '';
            document.body.classList.remove('success-body');
            document.body.append(createQuestion(countQuest++, lang));
        }

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
            { name: 'image1', path: 'img/image.jpg' },
            { name: 'image2', path: 'img/image.jpg' },
            { name: 'image3', path: 'img/image.jpg' },
            { name: 'image4', path: 'img/image.jpg' },
        ],
        audio: [
            { name: 'image1', URL: 'http://www.sousound.com/music/healing/healing_01.mp' },
        ],
        video: [
            { name: 'video1', URL: 'http://www.sousound.com/music/healing/healing_01.mp' },
        ],
        answers: {}
    },
    {
        id: 2,
        title: 'Заголовок',
        text: 'Кто из персонажей всегда ходит с молоточком и представляет собой неотъемлемую часть команды.',
        images: [],
        audio: [],
        video: [
            { name: 'video2', URL: 'http://www.sousound.com/music/healing/healing_01.mp' },
        ],
        answers: {}
    },
    {
        id: 3,
        title: 'Заголовок',
        text: 'Кто из персонажей всегда ходит с молоточком и представляет собой неотъемлемую часть команды?',
        images: [
            { name: 'image1', path: 'img/image.jpg' },
            { name: 'image2', path: 'img/image.jpg' },
            { name: 'image3', path: 'img/image.jpg' },
            { name: 'image4', path: 'img/image.jpg' },
        ],
        audio: [],
        video: [
            { name: 'video3', URL: 'http://www.sousound.com/music/healing/healing_01.mp' },
        ],
        answers: {}
    },
    {
        id: 4,
        title: 'Заголовок',
        text: 'Кто из персонажей всегда ходит с молоточком и представляет собой неотъемлемую часть команды.',
        images: [],
        audio: [
            { name: 'image1', URL: 'http://www.sousound.com/music/healing/healing_01.mp' },
        ],
        video: [
            { name: 'video4', URL: 'http://www.sousound.com/music/healing/healing_01.mp' },
        ],
        answers: {}
    },
    {
        id: 5,
        title: 'Заголовок',
        text: 'Кто из персонажей всегда ходит с молоточком и представляет собой неотъемлемую часть команды.',
        images: [
            { name: 'image1', path: 'img/image.jpg' },
            { name: 'image2', path: 'img/image.jpg' },
            { name: 'image3', path: 'img/image.jpg' },
            { name: 'image4', path: 'img/image.jpg' },
        ],
        audio: [],
        video: [
            { name: 'video5', URL: 'http://www.sousound.com/music/healing/healing_01.mp' },
        ],
        answers: {}
    },
    {
        id: 6,
        title: 'Заголовок',
        text: 'Кто из персонажей всегда ходит с молоточком и представляет собой неотъемлемую часть команды.',
        images: [
            { name: 'image1', path: 'img/image.jpg' },
            { name: 'image2', path: 'img/image.jpg' },
            { name: 'image3', path: 'img/image.jpg' },
            { name: 'image4', path: 'img/image.jpg' },
        ],
        audio: [],
        video: [
            { name: 'video6', URL: 'http://www.sousound.com/music/healing/healing_01.mp' },
        ],
        answers: {}
    },
    {
        id: 7,
        title: 'Заголовок',
        text: 'Кто из персонажей всегда ходит с молоточком и представляет собой неотъемлемую часть команды.',
        images: [
            { name: 'image1', path: 'img/image.jpg' },
            { name: 'image2', path: 'img/image.jpg' },
            { name: 'image3', path: 'img/image.jpg' },
            { name: 'image4', path: 'img/image.jpg' },
        ],
        audio: [],
        video: [
            { name: 'video7', URL: 'http://www.sousound.com/music/healing/healing_01.mp' },
        ],
        answers: {}
    },
    {
        id: 8,
        title: 'Заголовок',
        text: 'Кто из персонажей всегда ходит с молоточком и представляет собой неотъемлемую часть команды.',
        images: [
            { name: 'image1', path: 'img/image.jpg' },
            { name: 'image2', path: 'img/image.jpg' },
            { name: 'image3', path: 'img/image.jpg' },
            { name: 'image4', path: 'img/image.jpg' },
        ],
        audio: [],
        video: [
            { name: 'video8', URL: 'http://www.sousound.com/music/healing/healing_01.mp' },
        ],
        answers: {}
    },
    {
        id: 9,
        title: 'Заголовок',
        text: 'Кто из персонажей всегда ходит с молоточком и представляет собой неотъемлемую часть команды.',
        images: [
            { name: 'image1', path: 'img/image.jpg' },
            { name: 'image2', path: 'img/image.jpg' },
            { name: 'image3', path: 'img/image.jpg' },
            { name: 'image4', path: 'img/image.jpg' },
        ],
        audio: [],
        video: [
            { name: 'video9', URL: 'http://www.sousound.com/music/healing/healing_01.mp' },
        ],
        answers: {}
    },
    {
        id: 10,
        title: 'Заголовок',
        text: 'Кто из персонажей всегда ходит с молоточком и представляет собой неотъемлемую часть команды.',
        images: [
            { name: 'image1', path: 'img/image.jpg' },
            { name: 'image2', path: 'img/image.jpg' },
            { name: 'image3', path: 'img/image.jpg' },
            { name: 'image4', path: 'img/image.jpg' },
        ],
        audio: [],
        video: [
            { name: 'video10', URL: 'http://www.sousound.com/music/healing/healing_01.mp' },
        ],
        answers: {}
    },
]

// createMain();


// Хидер с логтипами

function createHeader(lang) {
    const header = document.createElement('header');
    const container = document.createElement('div');
    const headerContainer = document.createElement('div');

    const logo1 = document.createElement('picture');
    const logo2 = document.createElement('picture');
    const logo3 = document.createElement('picture');

    if (lang == 'ru') {
        logo1.innerHTML = `
        <source srcset="img/logo1.svg" media="(max-width: 767px)">
        <source srcset="img/logo1-tablet.svg" media="(max-width: 1023px)">
        <source srcset="img/logo1-desktop.svg" media="(max-width: 1919px)">
        <img src="img/logo1-desktop.svg.webp">
        `

        logo2.innerHTML = `
        <source srcset="img/logo2.svg" media="(max-width: 767px)">
        <source srcset="img/logo2-tablet.svg" media="(max-width: 1023px)">
        <source srcset="img/logo2-desktop.svg" media="(max-width: 1919px)">
        <img src="img/logo2-desktop.svg">
        `

        logo3.innerHTML = `
        <source srcset="img/logo3.svg" media="(max-width: 767px)">
        <source srcset="img/logo3-tablet.svg" media="(max-width: 1023px)">
        <source srcset="img/logo3-desktop.svg" media="(max-width: 1919px)">
        <img src="img/logo3-desktop.svg">
        `
    } else {
        logo1.innerHTML = `
        <source srcset="img/logo1-en.svg" media="(max-width: 767px)">
        <source srcset="img/logo1-tablet-en.svg" media="(max-width: 1023px)">
        <source srcset="img/logo1-desktop-en.svg" media="(max-width: 1919px)">
        <img src="img/logo1-desktop-en.svg">
        `

        logo2.innerHTML = `
        <source srcset="img/logo2-en.svg" media="(max-width: 767px)">
        <source srcset="img/logo2-tablet-en.svg" media="(max-width: 1023px)">
        <source srcset="img/logo2-desktop-en.svg" media="(max-width: 1919px)">
        <img src="img/logo2-desktop-en.svg">
        `

        logo3.innerHTML = `
        <source srcset="img/logo3-en.svg" media="(max-width: 767px)">
        <source srcset="img/logo3-tablet-en.svg" media="(max-width: 1023px)">
        <source srcset="img/logo3-desktop-en.svg" media="(max-width: 1919px)">
        <img src="img/logo3-desktop-en.svg">
        `
    }



    header.classList.add('header');
    container.classList.add('container');
    headerContainer.classList.add('header__container');

    headerContainer.append(logo1, logo2, logo3);
    header.append(container);
    container.append(headerContainer);

    return header;
}


// Футер с логотипами


function createFooter(lang) {
    const footer = document.createElement('footer');
    const container = document.createElement('div');
    const footerContainer = document.createElement('div');

    const logo1 = document.createElement('picture');
    const logo2 = document.createElement('picture');
    const logo3 = document.createElement('picture');

    if (lang == 'ru') {
        logo1.innerHTML = `
        <source srcset="img/logo4.svg" media="(max-width: 767px)">
        <source srcset="img/logo4-tablet.svg" media="(max-width: 1023px)">
        <source srcset="img/logo4-desktop.svg" media="(max-width: 1919px)">
        <img src="img/logo4-desktop.svg">
        `

        logo2.innerHTML = `
        <source srcset="img/logo5.svg" media="(max-width: 767px)">
        <source srcset="img/logo5-tablet.svg" media="(max-width: 1023px)">
        <source srcset="img/logo5-desktop.svg" media="(max-width: 1919px)">
        <img src="img/logo5-desktop.svg">
        `

        logo3.innerHTML = `
        <source srcset="img/logo6.svg" media="(max-width: 767px)">
        <source srcset="img/logo6-tablet.svg" media="(max-width: 1023px)">
        <source srcset="img/logo6-desktop.svg" media="(max-width: 1919px)">
        <img src="img/logo6-desktop.svg">
        `
    } else {
        logo1.innerHTML = `
        <source srcset="img/logo4-en.svg" media="(max-width: 767px)">
        <source srcset="img/logo4-tablet-en.svg" media="(max-width: 1023px)">
        <source srcset="img/logo4-desktop-en.svg" media="(max-width: 1919px)">
        <img src="img/logo4-desktop-en.svg">
        `

        logo2.innerHTML = `
        <source srcset="img/logo5-en.svg" media="(max-width: 767px)">
        <source srcset="img/logo5-tablet-en.svg" media="(max-width: 1023px)">
        <source srcset="img/logo5-desktop-en.svg" media="(max-width: 1919px)">
        <img src="img/logo5-desktop-en.svg">
        `

        logo3.innerHTML = `
        <source srcset="img/logo6-en.svg" media="(max-width: 767px)">
        <source srcset="img/logo6-tablet-en.svg" media="(max-width: 1023px)">
        <source srcset="img/logo6-desktop-en.svg" media="(max-width: 1919px)">
        <img src="img/logo6-desktop-en.svg">
        `
    }



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
        if (confirm('Пользователь зарегистрирован?')) {
            createMain();
        } else {
            createRegistration();
        }


    })

}


// Экран регистрации и выбора языка


function createRegistration(lang) {
    const header = createHeader(lang);
    const footer = createFooter(lang);

    const main = document.createElement('main');
    const section = document.createElement('section');
    const container = document.createElement('div');

    const form = document.createElement('form');
    const title = document.createElement('h2');
    const label = document.createElement('label');
    const input = document.createElement('input');
    const submit = document.createElement('button');

    const languageBlock = document.createElement('div');
    const languageTitle = document.createElement('h2');
    const labelBlock = document.createElement('div');

    const errorBlock = document.createElement('div');
    const clearButton = document.createElement('button');

    clearButton.innerHTML = `
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M15.71 8.29C15.617 8.19627 15.5064 8.12188 15.3846 8.07111C15.2627 8.02034 15.132 7.9942 15 7.9942C14.868 7.9942 14.7373 8.02034 14.6154 8.07111C14.4936 8.12188 14.383 8.19627 14.29 8.29L12 10.59L9.70999 8.29C9.52168 8.1017 9.26629 7.99591 8.99999 7.99591C8.73369 7.99591 8.47829 8.1017 8.28999 8.29C8.10168 8.47831 7.9959 8.7337 7.9959 9C7.9959 9.2663 8.10168 9.5217 8.28999 9.71L10.59 12L8.28999 14.29C8.19626 14.383 8.12187 14.4936 8.0711 14.6154C8.02033 14.7373 7.99419 14.868 7.99419 15C7.99419 15.132 8.02033 15.2627 8.0711 15.3846C8.12187 15.5064 8.19626 15.617 8.28999 15.71C8.38295 15.8037 8.49355 15.8781 8.61541 15.9289C8.73727 15.9797 8.86798 16.0058 8.99999 16.0058C9.132 16.0058 9.26271 15.9797 9.38456 15.9289C9.50642 15.8781 9.61702 15.8037 9.70999 15.71L12 13.41L14.29 15.71C14.383 15.8037 14.4936 15.8781 14.6154 15.9289C14.7373 15.9797 14.868 16.0058 15 16.0058C15.132 16.0058 15.2627 15.9797 15.3846 15.9289C15.5064 15.8781 15.617 15.8037 15.71 15.71C15.8037 15.617 15.8781 15.5064 15.9289 15.3846C15.9796 15.2627 16.0058 15.132 16.0058 15C16.0058 14.868 15.9796 14.7373 15.9289 14.6154C15.8781 14.4936 15.8037 14.383 15.71 14.29L13.41 12L15.71 9.71C15.8037 9.61704 15.8781 9.50644 15.9289 9.38458C15.9796 9.26272 16.0058 9.13201 16.0058 9C16.0058 8.86799 15.9796 8.73729 15.9289 8.61543C15.8781 8.49357 15.8037 8.38297 15.71 8.29ZM19.07 4.93C18.1475 3.9749 17.0441 3.21308 15.824 2.68899C14.604 2.1649 13.2918 1.88904 11.964 1.8775C10.6362 1.86596 9.31941 2.11898 8.09045 2.62179C6.86148 3.1246 5.74497 3.86713 4.80604 4.80605C3.86711 5.74498 3.12458 6.8615 2.62177 8.09046C2.11896 9.31943 1.86595 10.6362 1.87748 11.964C1.88902 13.2918 2.16488 14.604 2.68897 15.824C3.21306 17.0441 3.97489 18.1475 4.92999 19.07C5.85246 20.0251 6.9559 20.7869 8.17594 21.311C9.39598 21.8351 10.7082 22.111 12.036 22.1225C13.3638 22.134 14.6806 21.881 15.9095 21.3782C17.1385 20.8754 18.255 20.1329 19.1939 19.194C20.1329 18.255 20.8754 17.1385 21.3782 15.9095C21.881 14.6806 22.134 13.3638 22.1225 12.036C22.111 10.7082 21.8351 9.396 21.311 8.17596C20.7869 6.95592 20.0251 5.85247 19.07 4.93ZM17.66 17.66C16.352 18.9694 14.6305 19.7848 12.7888 19.9673C10.947 20.1498 9.09899 19.6881 7.55951 18.6608C6.02003 17.6335 4.88435 16.1042 4.34596 14.3335C3.80758 12.5628 3.89979 10.6601 4.6069 8.94979C5.31401 7.23943 6.59226 5.82715 8.22388 4.95356C9.8555 4.07998 11.7395 3.79913 13.555 4.15888C15.3705 4.51862 17.005 5.49669 18.1802 6.92646C19.3554 8.35623 19.9985 10.1492 20 12C20.0036 13.0513 19.7986 14.0928 19.3969 15.0644C18.9953 16.0359 18.4049 16.9182 17.66 17.66Z" fill="#4700B5"/>
    </svg>
    
    `


    languageTitle.textContent = 'Сhoose your language';

    const langs = [
        {
            id: 1,
            code: 'ru',
            name: 'Russian',
            flag: 'img/rus.svg',
        },
        {
            id: 2,
            code: 'en',
            name: 'English',
            flag: 'img/eng.svg',
        }
    ]

    langs.forEach(lang => {
        const label = document.createElement('label');
        const radio = document.createElement('input');
        radio.id = 'btn_lang'
        radio.setAttribute('languages', lang.code)
        const flagImg = document.createElement('img');
        const langName = document.createElement('span');
        const imgBlock = document.createElement('div');

        langName.textContent = lang.name;
        flagImg.src = lang.flag;

        radio.type = 'radio';
        radio.name = 'lang';

        if (langCode == lang.code) radio.checked = true;

        radio.addEventListener('change', () => {
            document.body.innerHTML = '';
            langCode = lang.code;
            createRegistration(lang.code);
        })



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
    input.id = 'phone'
    submit.classList.add('form__button', 'registration__button', 'btn-reset');
    title.classList.add('title');
    languageTitle.classList.add('title');
    languageBlock.classList.add('languages');
    labelBlock.classList.add('languages__block');
    errorBlock.classList.add('error-block');
    label.classList.add('registration__label');
    clearButton.classList.add('clear-btn', 'btn-reset');




    if (lang == 'ru') {
        title.textContent = 'Регистрация';
        submit.textContent = 'Зарегистрироваться';
        input.placeholder = 'Введите свой номер';
    }
    else {
        title.textContent = 'Sign in';
        submit.textContent = 'Sign in';
        input.placeholder = 'Enter your telephone number';
    }


    document.body.append(header, main, footer);
    main.append(section);
    section.append(container);
    container.append(form);
    languageBlock.append(languageTitle, labelBlock);
    label.append(input, clearButton);
    form.append(languageBlock, title, label, submit, errorBlock);


    submit.addEventListener('click', (e) => {
        e.preventDefault();
        const countryData = iti.getSelectedCountryData();
        const validation = validationRegistrationForm(input, errorBlock, countryData);

        if (validation) {
            console.log(input.value.replace(/[- )(]/g, ''))
            document.body.innerHTML = '';
            document.body.classList.remove('registration-body');

            createMain(lang);

        }


        if (errorBlock.childNodes.length) errorBlock.classList.add('active');
    })


    // Запрет на ввод букв в инпуте

    const regex = RegExp('[0-9]');

    input.addEventListener('keypress', (e) => {
        if (!regex.test(e.key)) {
            e.preventDefault();
        }
    })


    // Маска на телефон

    window.intlTelInput(input, {
        utilsScript: "https://cdn.jsdelivr.net/npm/intl-tel-input@19.2.19/build/js/utils.js",
    });

    const iti = intlTelInput(input);
    iti.setCountry("ru");


    input.addEventListener('input', () => {
        clearButton.classList.add('active');
    })


    // Очистка поля номера телефона

    clearButton.addEventListener('click', (e) => {
        e.preventDefault();
        input.value = '';
        clearButton.classList.remove('active');
    })


}


// Завершающий экран

function successWindow(lang) {

    const main = document.createElement('main');
    const container = document.createElement('div');
    const containerSection = document.createElement('div');
    const section = document.createElement('section');
    const subtitle = document.createElement('p');
    const giftBtn = document.createElement('button');
    const historyBtn = document.createElement('a');

    const sectionImg = document.createElement('img');
    historyBtn.href = 'https://souzmult.ru/about';

    let questSuccess = false

    

    if (lang == 'ru') {
        sectionImg.src = 'img/successImg.png';
        giftBtn.textContent = 'Как получить приз';
        historyBtn.textContent = 'Справка об истории анимации';
    } else {
        sectionImg.src = 'img/successImg-en.png';
        giftBtn.textContent = 'How to get a prize';
        historyBtn.textContent = 'History facts about russian animation';
    }



    document.body.classList.add('success-window');
    section.classList.add('section', 'success');
    container.classList.add('container');
    subtitle.classList.add('subtitle');
    giftBtn.classList.add('btn-reset', 'button', 'question__button');
    historyBtn.classList.add('btn-reset', 'button', 'success_button')
    containerSection.classList.add('section__container');
    sectionImg.classList.add('success__img');


    main.append(section);
    section.append(container);
    container.append(containerSection);
    containerSection.append(sectionImg, subtitle, giftBtn, historyBtn);

    giftBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const modal = createInstructions();
        document.body.append(modal);
    })

    return main;

}


function createInstructions(lang) {
    const modal = document.createElement('div');
    const modalWindow = document.createElement('div');
    const modalBody = document.createElement('div');

    const closeBtn = document.createElement('button');
    const title = document.createElement('h2');
    const text = document.createElement('p');
    const img = document.createElement('img');

    img.src = 'img/modal-img-tablet.webp';

    if (lang == 'ru') {
        title.textContent = 'Как получить приз';
        text.textContent = 'Есть над чем задуматься: явные признаки победы институционализации призывают нас к новым свершениям, которые, в свою очередь, должны быть ограничены исключительно образом мышления. Есть над чем задуматься: явные признаки победы институционализации призывают нас к новым свершениям, которые, в свою очередь, должны быть ограничены исключительно образом мышления.';
    } else {
        title.textContent = 'How to get a prize';
        text.textContent = 'Есть над чем задуматься: явные признаки победы институционализации призывают нас к новым свершениям, которые, в свою очередь, должны быть ограничены исключительно образом мышления. Есть над чем задуматься: явные признаки победы институционализации призывают нас к новым свершениям, которые, в свою очередь, должны быть ограничены исключительно образом мышления.';
    }

    

    modal.classList.add('modal');
    modalWindow.classList.add('modal__window');
    modalBody.classList.add('modal__body');
    closeBtn.classList.add('modal__close', 'btn-reset');
    title.classList.add('title', 'title-violet');
    text.classList.add('text');

    modal.append(modalWindow);
    modalWindow.append(closeBtn, modalBody);
    modalBody.append(title, text, img);

    closeBtn.addEventListener('click', (e) => {
        e.preventDefault();
        modal.remove();
    })

    return modal;
}


function validationRegistrationForm(input, container, country) {
    const inputEl = document.querySelector("#phone");
    console.log(country)


    const iti = window.intlTelInput(inputEl, {
        initialCountry: country.iso2,
        utilsScript: "/intl-tel-input/js/utils.js?1707906286003"
    });
    const radioInputs = document.querySelectorAll(`[name = "lang"]`);
    const errorMap = ["Не верно введен номер"];
    const errorMsg = document.createElement("span")
    errorMsg.id = 'error-msg';
    const validMsg = document.createElement('span')
    validMsg.id = "valid-msg";




    // Проверка, введено ли поле с номером телефона

    if (input.value == '') {
        if (document.querySelector('.error-uncorrect')) document.querySelector('.error-uncorrect').remove();
        if (!document.querySelector('.error-phone')) {
            const error = document.createElement('p');
            error.classList.add('error-phone');
            error.textContent = 'Введите телефон';
            container.append(error);

        }

        return false;

    } else if (iti.isValidNumber() == false) {
        if (document.querySelector('.error-phone')) document.querySelector('.error-phone').remove();
        if (!document.querySelector('.error-uncorrect')) {
            const error = document.createElement('p');
            error.classList.add('error-uncorrect');
            error.textContent = 'Введите корректный телефон';
            container.append(error);
        }


        return false;
    }


    else {
        if (document.querySelector('.error-phone')) document.querySelector('.error-phone').remove();
        if (document.querySelector('.error-uncorrect')) document.querySelector('.error-uncorrect').remove();
    }

    // Проверка, выбран ли язык

    if (radioInputs[0].checked !== true && radioInputs[1].checked !== true) {
        if (!document.querySelector('.error-lang')) {
            const error = document.createElement('p');
            error.classList.add('error-lang');
            error.textContent = 'Выберите свой язык';
            container.append(error);

        }
        return false;

    } else {
        if (document.querySelector('.error-lang')) document.querySelector('.error-lang').remove();
    }

    // Проверка по количеству символов согласно выбранной стране,

    const reset = () => {
        input.classList.remove("error");
        errorMsg.textContent = "";
        errorMsg.classList.add("hide");
        validMsg.classList.add("hide");
        container.append(errorMsg);
    };
    reset()
    if (input.value.trim()) {
        console.log(input.value.length)
        if (iti.isValidNumber()) {
            validMsg.classList.remove("hide");
            validMsg.textContent = '✓ Valid'
            container.append(validMsg)
            return true
        } else if (country.iso2 === 'ru' && input.value.length === 9) {
            validMsg.classList.remove("hide");
            validMsg.textContent = '✓ Valid'
            container.append(validMsg)

            return true
        } else {
            input.classList.add("error");
            const errorCode = iti.getValidationError();
            errorMsg.textContent = errorMap[errorCode] || "Не верно введен номер";
            errorMsg.classList.remove("hide");
            container.append(errorMsg);

            return false
        }
    }


    return true;
}

// document.addEventListener('DOMContentLoaded', () => {
//     const input = document.querySelectorAll('#btn_lang')
//     input.forEach((el) => {
//         el.addEventListener('input', (e) => {
//             console.log(el.getAttribute('languages'))
//             langName = el.getAttribute('languages');

//             document.body.innerHTML = '';

//             createRegistration(langName)
//         })
//     })

// })


createRegistration('ru')
// createAuthorization()
// createMain()
