// Стартовая страница
let countQuest = 1;
let langCode;
let phone;
let answer;
let questions;
let rules;
let id;


function createMain(lang) {
    const header = createHeader(lang);
    const footer = createFooter(lang);
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
        title.textContent = 'Welcome to the Adventure World!';
        text.textContent = 'Are you ready to dive into the exciting quest full of mysteries and discoveries?';
    }


    document.body.classList.add('start-body');
    section.classList.add('section');
    main.classList.add('main');
    container.classList.add('container');
    text.classList.add('text');
    title.classList.add('title'), startBtn.classList.add('btn-reset', 'button');
    containerSection.classList.add('section__container');


    main.append(section);
    bottomBlock.append(main, footer);
    section.append(container);

    container.append(containerSection);
    containerSection.append(title, text, startBtn);


    // Событие при клике на Старт

    startBtn.addEventListener('click', (e) => {
        e.preventDefault();
        axios.get('php/get_rule.php', {
            params: {
                langCode: lang,
            }
        })
            .then(function (response) {
                rules = response.data;

                document.body.innerHTML = '';
                document.body.classList.remove('start-body');
                document.body.append(createRules(lang));

            })
            .catch(function (error) {
                console.log(error);
            })

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
    const nextBtn = document.createElement('button');

    const form = document.createElement('form');
    const formBlock = document.createElement('div');
    const policy = document.createElement('a');
    const label = document.createElement('label');
    const input = document.createElement('input');
    const checkbox = document.createElement('span');
    const checkboxText = document.createElement('span');

    input.type = 'checkbox';
    policy.download = true;

    nextBtn.disabled = true;

    input.addEventListener('change', () => {
        if (input.checked) {
            nextBtn.disabled = false;
        } else nextBtn.disabled = true;
    })


    // Пункты списка с правилами


    rules.forEach(el => {
        const rulesItem = document.createElement('li');
        rulesItem.innerHTML = el.text;
        rulesItem.classList.add('rules__item');
        rulesList.append(rulesItem);
    })


    if (lang == 'ru') {
        policy.href = 'files/policy_ru.pdf';
        checkboxText.textContent = 'Я подтверждаю, что ознакомлен и согласен с правилами использования данного сервиса';
        policy.textContent = 'Политика конфиденциальности';

        title.textContent = 'Правила';
        nextBtn.textContent = 'Соглашаюсь';


    } else {
        policy.href = 'files/policy_en.pdf';
        checkboxText.textContent = 'I have read and agree to the privacy policy and service rules';
        policy.textContent = 'Privacy Policy';

        title.textContent = 'Rules';
        nextBtn.textContent = 'I Agree';

    }


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
    formBlock.append(title, rulesList, policy, label);
    form.append(formBlock, nextBtn);


    // Событие при клике на Далее

    nextBtn.addEventListener('click', (e) => {
        e.preventDefault();

        axios.get('php/get_question.php', {
            params: {
                langCode: localStorage.getItem('lang'),
            }
        })
        .then(function (response) {
            questions = response.data;

            document.body.innerHTML = '';
            document.body.classList.remove('rules-body');
            document.body.append(createQuestion(countQuest, lang));
    
            createReadMoreBtn();
        })
        .catch(function (error) {
            console.log(error);
        });

       

    })

    return main;

}

// Функция, которая будет запрашивать данные вопроса

function getQuestion(num) {
    let currentQuest = {}
    questions.find((el, index) => {
        if (el.id === num) {
            currentQuest = el
        }
    })
    return currentQuest
}


// Экран с вопросом

function createQuestion(countQuest, lang) {
    const main = document.createElement('main');
    const section = document.createElement('section');
    const container = document.createElement('div');
    const containerSection = document.createElement('div');
    const num = document.createElement('p');
    const textBlock = document.createElement('div');
    const text = document.createElement('div');
    const title = document.createElement('h2');
    const questionText = document.createElement('div');
    const formBlock = document.createElement('div');

    // Создаем форму с полем ввода ответа и кнопкой Ответить

    const form = document.createElement('form');
    const label = document.createElement('label');
    const input = document.createElement('input');

    input.type = 'text';

    const submit = document.createElement('button');

    const clearButton = document.createElement('button');

    const readMore = document.createElement('button');
    readMore.classList.add('read-more', 'btn-reset');


    clearButton.innerHTML = `
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M15.71 8.29C15.617 8.19627 15.5064 8.12188 15.3846 8.07111C15.2627 8.02034 15.132 7.9942 15 7.9942C14.868 7.9942 14.7373 8.02034 14.6154 8.07111C14.4936 8.12188 14.383 8.19627 14.29 8.29L12 10.59L9.70999 8.29C9.52168 8.1017 9.26629 7.99591 8.99999 7.99591C8.73369 7.99591 8.47829 8.1017 8.28999 8.29C8.10168 8.47831 7.9959 8.7337 7.9959 9C7.9959 9.2663 8.10168 9.5217 8.28999 9.71L10.59 12L8.28999 14.29C8.19626 14.383 8.12187 14.4936 8.0711 14.6154C8.02033 14.7373 7.99419 14.868 7.99419 15C7.99419 15.132 8.02033 15.2627 8.0711 15.3846C8.12187 15.5064 8.19626 15.617 8.28999 15.71C8.38295 15.8037 8.49355 15.8781 8.61541 15.9289C8.73727 15.9797 8.86798 16.0058 8.99999 16.0058C9.132 16.0058 9.26271 15.9797 9.38456 15.9289C9.50642 15.8781 9.61702 15.8037 9.70999 15.71L12 13.41L14.29 15.71C14.383 15.8037 14.4936 15.8781 14.6154 15.9289C14.7373 15.9797 14.868 16.0058 15 16.0058C15.132 16.0058 15.2627 15.9797 15.3846 15.9289C15.5064 15.8781 15.617 15.8037 15.71 15.71C15.8037 15.617 15.8781 15.5064 15.9289 15.3846C15.9796 15.2627 16.0058 15.132 16.0058 15C16.0058 14.868 15.9796 14.7373 15.9289 14.6154C15.8781 14.4936 15.8037 14.383 15.71 14.29L13.41 12L15.71 9.71C15.8037 9.61704 15.8781 9.50644 15.9289 9.38458C15.9796 9.26272 16.0058 9.13201 16.0058 9C16.0058 8.86799 15.9796 8.73729 15.9289 8.61543C15.8781 8.49357 15.8037 8.38297 15.71 8.29ZM19.07 4.93C18.1475 3.9749 17.0441 3.21308 15.824 2.68899C14.604 2.1649 13.2918 1.88904 11.964 1.8775C10.6362 1.86596 9.31941 2.11898 8.09045 2.62179C6.86148 3.1246 5.74497 3.86713 4.80604 4.80605C3.86711 5.74498 3.12458 6.8615 2.62177 8.09046C2.11896 9.31943 1.86595 10.6362 1.87748 11.964C1.88902 13.2918 2.16488 14.604 2.68897 15.824C3.21306 17.0441 3.97489 18.1475 4.92999 19.07C5.85246 20.0251 6.9559 20.7869 8.17594 21.311C9.39598 21.8351 10.7082 22.111 12.036 22.1225C13.3638 22.134 14.6806 21.881 15.9095 21.3782C17.1385 20.8754 18.255 20.1329 19.1939 19.194C20.1329 18.255 20.8754 17.1385 21.3782 15.9095C21.881 14.6806 22.134 13.3638 22.1225 12.036C22.111 10.7082 21.8351 9.396 21.311 8.17596C20.7869 6.95592 20.0251 5.85247 19.07 4.93ZM17.66 17.66C16.352 18.9694 14.6305 19.7848 12.7888 19.9673C10.947 20.1498 9.09899 19.6881 7.55951 18.6608C6.02003 17.6335 4.88435 16.1042 4.34596 14.3335C3.80758 12.5628 3.89979 10.6601 4.6069 8.94979C5.31401 7.23943 6.59226 5.82715 8.22388 4.95356C9.8555 4.07998 11.7395 3.79913 13.555 4.15888C15.3705 4.51862 17.005 5.49669 18.1802 6.92646C19.3554 8.35623 19.9985 10.1492 20 12C20.0036 13.0513 19.7986 14.0928 19.3969 15.0644C18.9953 16.0359 18.4049 16.9182 17.66 17.66Z" fill="#4700B5"/>
    </svg>
    
    `


    // Вызываем функцию, в которой находятся данные вопроса

    const question = getQuestion(countQuest);

    //      Если в массиве картинок больше 1 то делаем слайдшоу

    const imgCount = Object.values(question.image);

    if (imgCount > '1') {
        const carousel = document.createElement('div');
        carousel.classList.add('f-carousel');
        carousel.id = 'myCarousel';
        for (let el in question.image) {
            let value = question.image[el]
            if (value.length) {
                const carouselItem = document.createElement('div');
                const img = document.createElement('img');
                carouselItem.classList.add('f-carousel__slide');

                carouselItem.setAttribute('data-fancybox', 'gallery');
                carouselItem.setAttribute('data-src', `cartoon/materials/${value}`);

                img.src = `cartoon/materials/${value}`;

                carousel.append(carouselItem);
                carouselItem.append(img);
            }


        }
        const options = {
            infinite: false, Dots: {
                maxCount: 1,
            },
        };

        Fancybox.bind('[data-fancybox]', {
            // Your custom options
        });

        carousel.classList.add('question__media');
        textBlock.append(carousel);

        new Carousel(carousel, options);
    }


    //      Если одна картинка в массиве то просто выводим ее

    if (imgCount == '1') {
        const mediaBlock = document.createElement('div');
        const img = document.createElement('img');
        img.src = `cartoon/materials/${question.image.image1}`;
        mediaBlock.append(img);
        mediaBlock.classList.add('question__media');
        textBlock.append(mediaBlock);
    }


    if (lang == 'ru') {
        input.placeholder = 'Введите ответ';
        submit.textContent = 'Ответить';
        readMore.textContent = 'Показать ещё';
    } else {
        input.placeholder = 'Enter your answer';
        submit.textContent = 'Send';
        readMore.textContent = 'Show more';
    }


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
    clearButton.classList.add('clear-btn', 'btn-reset');
    textBlock.classList.add('question__content');
    questionText.classList.add('question__block');
    formBlock.classList.add('form__block');

    num.textContent = `${countQuest}/10`;

    text.innerHTML = question.text;

    title.textContent = question.title;


    main.append(section);
    section.append(container);
    container.append(containerSection);
    containerSection.prepend(num, textBlock);
    label.append(input, clearButton);
    form.append(formBlock, submit);
    textBlock.prepend(title, questionText);
    questionText.append(text, readMore);
    containerSection.append(form);
    formBlock.append(label);

    //  Событие отправки формы

    form.addEventListener('submit', (e) => {
        let validate = validationAnswerForm(input, formBlock, lang, clearButton)
        e.preventDefault();

        if (validate) {
            axios({
                method: 'post',
                url: 'php/post_answer.php',
                data: {
                    paticipant_id: id,
                    question_id: countQuest,
                    text: input.value,
                    langCode: lang,
                }
            })
                .then(function (response) {
                    if (response.data[0].status == 'неверно') {
                        input.classList.add('form__input_incorrect');
                        clearButton.classList.add('clear-btn--incorrect');
                        if (!document.querySelector('.error')) {
                            const error = document.createElement('p');
                            error.textContent = 'Ответ неверный. Попробуйте еще раз';
                            error.classList.add('error');

                            if (lang == 'ru') {
                                error.textContent = 'Ответ неверный. Попробуйте еще раз';
                            } else error.textContent = 'This answer is incorrect. Try again.';

                            formBlock.append(error);

                        } else {
                            clearButton.classList.remove('clear-btn--incorrect');
                        }

                    } else {
                        countQuest += 1;
                        answer = input.value;
                        document.body.innerHTML = '';
                        document.body.classList.remove('question-body');

                        if (countQuest > 10) document.body.append(successWindow(lang));
                        else {

                            document.body.append(createSuccess(countQuest, lang));
                        }
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        } else {

        }

    })

    // Очистка поля с ответом

    input.addEventListener('input', () => {
        clearButton.classList.add('active');
    })

    clearButton.addEventListener('click', (e) => {
        e.preventDefault();
        input.value = '';
        clearButton.classList.remove('active',);
        input.classList.remove('form__input_incorrect')
    })



    return main;
}

// Экран, если ответ положительный

function createSuccess(countQuest, lang) {
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
        subtitle.textContent = `Ты молодец! Ответил правильно. Давай пойдём на задание ${countQuest}.`;
        nextBtn.textContent = 'Следующий вопрос';
    } else {
        subtitle.textContent = `Well done! That's correct. Let's move to Task ${countQuest}.`;
        nextBtn.textContent = 'Next task';
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
            document.body.append(createQuestion(countQuest, lang));

            createReadMoreBtn();
        }

    })

    return main;

}



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
        <img src="img/logo1-desktop.svg">
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


// // Экран авторизации

// function createAuthorization(lang) {
//     const header = createHeader(lang);
//     const footer = createFooter(lang);

//     const main = document.createElement('main');
//     const section = document.createElement('section');
//     const container = document.createElement('div');

//     const form = document.createElement('form');
//     const title = document.createElement('h2');
//     const label = document.createElement('label');
//     const input = document.createElement('input');
//     const submit = document.createElement('button');

//     const signBlock = document.createElement('div');
//     const sign = document.createElement('button');
//     const errorBlock = document.createElement('div');

//     document.body.classList.add('authorization-body');
//     section.classList.add('authorization');
//     container.classList.add('container');
//     form.classList.add('authorization__form', 'form');
//     input.classList.add('form__input', 'authorization__input');
//     submit.classList.add('form__button', 'authorization__button', 'btn-reset');
//     title.classList.add('title');
//     signBlock.classList.add('sign');
//     sign.classList.add('btn-reset', 'sign__btn');
//     label.classList.add('registration__label');
//     errorBlock.classList.add('error-block');

//     if (lang == 'ru') {
//         title.textContent = 'Вход';
//         submit.textContent = 'Войти';
//         input.placeholder = 'Введите свой номер';
//     } else {
//         title.textContent = 'Login';
//         submit.textContent = 'Sign in';
//         input.placeholder = 'Enter your telephone number';
//     }



//     document.body.append(header, main, footer);
//     main.append(section);
//     section.append(container);
//     container.append(form);
//     label.append(input);
//     form.append(title, label, submit, signBlock, errorBlock);
//     signBlock.append(sign);

//     submit.addEventListener('click', (e) => {
//         e.preventDefault();
//         const validation = validationRegistrationForm(input, errorBlock, lang)



//         if (validation) {

//             phone = input.value.replace(/[- )(]/g, '');

//             axios.all([
//                 axios.get('php/get_question.php', {
//                     params: {
//                         langCode: lang,
//                     }
//                 }),
//                 axios.post('php/post_paticipant.php', {
//                     phone: phone, langCode: lang,
//                 })

//             ]).then(axios.spread(function (questionsData, participantData) {

//                 questions = questionsData.data;

//                 localStorage.setItem('phone', phone);
//                 localStorage.setItem('lang', lang);

//                 const language = participantData.data[0].lang.toLowerCase();
//                 id = participantData.data[0].paticipant_id;
//                 if (participantData.data[0].exist == 'yes') {

//                     document.body.innerHTML = '';
//                     document.body.classList.remove('registration-body');
//                     if (participantData.data[0].question == '0') createRules(language)
//                     else {
//                         document.body.append(createQuestion(participantData.data[0].question + 1, language));
//                         createReadMoreBtn();
//                     }

//                 } else {
//                     alert('Пользователь с таким номер не зарегистрирован')
//                 }

//             }))

//         }

//         if (errorBlock.childNodes.length) errorBlock.classList.add('active');


//     })

// }


// Экран с выбором языка

function createLangPage(lang) {
    let header = createHeader(lang);
    let footer = createFooter(lang);

    const main = document.createElement('main');
    const section = document.createElement('section');
    const container = document.createElement('div');

    const form = document.createElement('form');
    const languageBlock = document.createElement('div');
    const languageTitle = document.createElement('h2');
    const labelBlock = document.createElement('div');
    const submit = document.createElement('button');
    const errorBlock = document.createElement('div');

    

    const langs = [{
        id: 1, code: 'ru', name: 'Русский', flag: 'img/rus.svg',
    }, {
        id: 2, code: 'en', name: 'English', flag: 'img/eng.svg',
    }]

    langs.forEach(item => {
        const label = document.createElement('label');
        const radio = document.createElement('input');
        radio.id = 'btn_lang'
        radio.setAttribute('languages', item.code)
        const flagImg = document.createElement('img');
        const langName = document.createElement('span');
        const imgBlock = document.createElement('div');

        languageTitle.textContent = 'Для участия в Квесте выбери язык';
        submit.textContent = 'Далее';
      

        label.classList.add('language');
        radio.classList.add('language__input');

        langName.textContent = item.name;
        flagImg.src = item.flag;

        radio.type = 'radio';
        radio.name = 'lang';

        languageTitle.classList.add('title');
        languageBlock.classList.add('languages');
        labelBlock.classList.add('languages__block');

        langName.classList.add('language__name');
        imgBlock.classList.add('language__img');
        imgBlock.append(flagImg);

    label.append(radio, imgBlock, langName);

    labelBlock.append(label);

        if (langCode == item.code) radio.checked = true;

        // Переключение языка

        radio.addEventListener('change', () => {          
            if (document.querySelector('.error-lang')) document.querySelector('.error-lang').remove();
            errorBlock.classList.remove('active');
            langCode = item.code;
            lang = item.code;
            if (item.code == 'ru') {
                header.remove();
                footer.remove();
                header = createHeader('ru');
                footer = createFooter('ru');
                document.body.prepend(header);
                document.body.append(footer);
                languageTitle.textContent = 'Для участия в Квесте выбери язык';
                submit.textContent = 'Далее';

                if (document.querySelector('.error-lang')) document.querySelector('.error-lang').textContent = 'Выберите свой язык';
            } else {
                header.remove();
                footer.remove();
                header = createHeader('en');
                footer = createFooter('en');
                document.body.prepend(header);
                document.body.append(footer);
                languageTitle.textContent = 'To start the quest, choose your language';
                submit.textContent = 'Next';

                if (document.querySelector('.error-lang')) document.querySelector('.error-lang').textContent = 'Сhoose your language';
            }
        })


       
    })


     // Отправка формы


     submit.addEventListener('click', (e) => {
        e.preventDefault();
        const langs = document.querySelectorAll('.language__input');
        langs.forEach(el => {
            if (el.checked) {          
                document.body.innerHTML = '';               
                createRegistration(lang);
            } else {
                if (!document.querySelector('.error-lang')) {
                    const error = document.createElement('p');
                    error.classList.add('error-lang');
                    if (lang == 'ru') error.textContent = 'Выберите свой язык'
                    else error.textContent = 'Сhoose your language'
                    
                    errorBlock.append(error);
        
                }
            }
        })


        if (errorBlock.childNodes.length) errorBlock.classList.add('active');

    })

    document.body.classList.add('registration-body');
    section.classList.add('registration');
    container.classList.add('container');
    form.classList.add('registration__form', 'form');
    submit.classList.add('form__button', 'registration__button', 'btn-reset');
    languageTitle.classList.add('title');
    languageBlock.classList.add('languages');
    labelBlock.classList.add('languages__block');
    errorBlock.classList.add('error-block');



    document.body.append(header, main, footer);
    main.append(section);
    section.append(container);
    container.append(form);
    languageBlock.append(languageTitle, labelBlock);


    form.append(languageBlock, submit, errorBlock);

}


// Экран регистрации и выбора языка


function createRegistration(lang) {
    let header = createHeader(lang);
    let footer = createFooter(lang);

    const main = document.createElement('main');
    const section = document.createElement('section');
    const container = document.createElement('div');

    const form = document.createElement('form');
    const title = document.createElement('h2');
    const label = document.createElement('label');
    const input = document.createElement('input');
    input.type = 'tel';
    input.name = 'phone';
    const submit = document.createElement('button');

    const labelBlock = document.createElement('div');

    const errorBlock = document.createElement('div');
    const clearButton = document.createElement('button');

    clearButton.innerHTML = `
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M15.71 8.29C15.617 8.19627 15.5064 8.12188 15.3846 8.07111C15.2627 8.02034 15.132 7.9942 15 7.9942C14.868 7.9942 14.7373 8.02034 14.6154 8.07111C14.4936 8.12188 14.383 8.19627 14.29 8.29L12 10.59L9.70999 8.29C9.52168 8.1017 9.26629 7.99591 8.99999 7.99591C8.73369 7.99591 8.47829 8.1017 8.28999 8.29C8.10168 8.47831 7.9959 8.7337 7.9959 9C7.9959 9.2663 8.10168 9.5217 8.28999 9.71L10.59 12L8.28999 14.29C8.19626 14.383 8.12187 14.4936 8.0711 14.6154C8.02033 14.7373 7.99419 14.868 7.99419 15C7.99419 15.132 8.02033 15.2627 8.0711 15.3846C8.12187 15.5064 8.19626 15.617 8.28999 15.71C8.38295 15.8037 8.49355 15.8781 8.61541 15.9289C8.73727 15.9797 8.86798 16.0058 8.99999 16.0058C9.132 16.0058 9.26271 15.9797 9.38456 15.9289C9.50642 15.8781 9.61702 15.8037 9.70999 15.71L12 13.41L14.29 15.71C14.383 15.8037 14.4936 15.8781 14.6154 15.9289C14.7373 15.9797 14.868 16.0058 15 16.0058C15.132 16.0058 15.2627 15.9797 15.3846 15.9289C15.5064 15.8781 15.617 15.8037 15.71 15.71C15.8037 15.617 15.8781 15.5064 15.9289 15.3846C15.9796 15.2627 16.0058 15.132 16.0058 15C16.0058 14.868 15.9796 14.7373 15.9289 14.6154C15.8781 14.4936 15.8037 14.383 15.71 14.29L13.41 12L15.71 9.71C15.8037 9.61704 15.8781 9.50644 15.9289 9.38458C15.9796 9.26272 16.0058 9.13201 16.0058 9C16.0058 8.86799 15.9796 8.73729 15.9289 8.61543C15.8781 8.49357 15.8037 8.38297 15.71 8.29ZM19.07 4.93C18.1475 3.9749 17.0441 3.21308 15.824 2.68899C14.604 2.1649 13.2918 1.88904 11.964 1.8775C10.6362 1.86596 9.31941 2.11898 8.09045 2.62179C6.86148 3.1246 5.74497 3.86713 4.80604 4.80605C3.86711 5.74498 3.12458 6.8615 2.62177 8.09046C2.11896 9.31943 1.86595 10.6362 1.87748 11.964C1.88902 13.2918 2.16488 14.604 2.68897 15.824C3.21306 17.0441 3.97489 18.1475 4.92999 19.07C5.85246 20.0251 6.9559 20.7869 8.17594 21.311C9.39598 21.8351 10.7082 22.111 12.036 22.1225C13.3638 22.134 14.6806 21.881 15.9095 21.3782C17.1385 20.8754 18.255 20.1329 19.1939 19.194C20.1329 18.255 20.8754 17.1385 21.3782 15.9095C21.881 14.6806 22.134 13.3638 22.1225 12.036C22.111 10.7082 21.8351 9.396 21.311 8.17596C20.7869 6.95592 20.0251 5.85247 19.07 4.93ZM17.66 17.66C16.352 18.9694 14.6305 19.7848 12.7888 19.9673C10.947 20.1498 9.09899 19.6881 7.55951 18.6608C6.02003 17.6335 4.88435 16.1042 4.34596 14.3335C3.80758 12.5628 3.89979 10.6601 4.6069 8.94979C5.31401 7.23943 6.59226 5.82715 8.22388 4.95356C9.8555 4.07998 11.7395 3.79913 13.555 4.15888C15.3705 4.51862 17.005 5.49669 18.1802 6.92646C19.3554 8.35623 19.9985 10.1492 20 12C20.0036 13.0513 19.7986 14.0928 19.3969 15.0644C18.9953 16.0359 18.4049 16.9182 17.66 17.66Z" fill="#4700B5"/>
    </svg>
    
    `


    document.body.classList.add('registration-body');
    section.classList.add('registration');
    container.classList.add('container');
    form.classList.add('registration__form', 'form');
    input.classList.add('form__input', 'registration__input');
    submit.classList.add('form__button', 'registration__button', 'btn-reset');
    title.classList.add('title');
    labelBlock.classList.add('languages__block');
    errorBlock.classList.add('error-block');
    label.classList.add('registration__label');
    clearButton.classList.add('clear-btn', 'btn-reset');



    if (lang == 'ru') {
        title.textContent = 'Укажи свой номер телефона';
        submit.textContent = 'Войти';
        input.placeholder = 'Введите свой номер';

    } else {
        title.textContent = 'Enter your phone number';
        submit.textContent = 'Sign in';
        input.placeholder = 'Enter your phone number';
    }


    document.body.append(header, main, footer);
    main.append(section);
    section.append(container);
    container.append(form);
    label.append(input, clearButton);
    form.append(title, label, submit, errorBlock);


   


    // Отправка формы


    submit.addEventListener('click', (e) => {
        e.preventDefault();
        const validation = validationRegistrationForm(input, errorBlock, lang, clearButton)

        if (validation) {
            errorBlock.classList.remove('active');
            phone = input.value.replace(/[- )(]/g, '');

            axios.all([
                axios.get('php/get_question.php', {
                    params: {
                        langCode: lang,
                    }
                }),
                axios.post('php/post_paticipant.php', {
                    phone: phone, langCode: lang,
                })

            ]).then(axios.spread(function (questionsData, participantData) {
                questions = questionsData.data;

                localStorage.setItem('phone', phone);
                localStorage.setItem('lang', lang);

                console.log(participantData.data[0].question)

                const language = participantData.data[0].lang.toLowerCase();
                id = participantData.data[0].paticipant_id;
                if (participantData.data[0].exist == 'yes') {

                    document.body.innerHTML = '';
                    document.body.classList.remove('registration-body');
                    if (participantData.data[0].question == 0) createMain(lang)
                    else
                    if (participantData.data[0].question == 10) document.body.append(successWindow(lang))

                    else {
                        document.body.append(createQuestion(participantData.data[0].question + 1, language));
                        createReadMoreBtn();
                    }

                } else {
                    document.body.innerHTML = '';
                    document.body.classList.remove('registration-body');
                    createMain(lang);
                }

            }))

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


    input.addEventListener('input', () => {
        if (input.classList.contains('form__input_incorrect')) input.classList.remove('form__input_incorrect');
        if (clearButton.classList.contains('clear-btn--incorrect')) clearButton.classList.remove('clear-btn--incorrect');
        clearButton.classList.add('active');
    })


    // Очистка поля номера телефона

    clearButton.addEventListener('click', (e) => {
        e.preventDefault();
        input.value = '';
        clearButton.classList.remove('active');
    })

    if (!input.value) input.value = '+';

    setMask(input);

    input.addEventListener('input', () => {
        setMask(input);
    });

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
    const license = document.createElement('span');


    const sectionImg = document.createElement('img');
    historyBtn.href = 'https://souzmult.ru/about';

    let questSuccess = false


    if (lang == 'ru') {
        license.textContent = 'По лицензии ООО «СМФ»';
        sectionImg.src = 'img/successImg.png';
        giftBtn.textContent = 'Как получить приз';
        historyBtn.textContent = 'Справка об истории анимации';
    } else {
        license.textContent = 'Under LLC SMF license';
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
    license.classList.add('license');


    main.append(section);
    section.append(container);
    container.append(containerSection);
    containerSection.append(sectionImg, subtitle, giftBtn, historyBtn, license);

    giftBtn.addEventListener('click', (e) => {
        e.preventDefault();
        document.body.innerHTML = '';
        const modal = createInstructions(lang);
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
        text.textContent = 'Приз можно получить в зоне 8 - сады у взлетной полосы на пространстве "Союзмультфильм". Спасибо за участие!';
    } else {
        title.textContent = 'How to get a prize';
        text.textContent = 'The prize can be received in zone 8 - Gardens by the Runway in the Soyuzmultfilm space. Thank you for your participation!';
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
        document.body.append(successWindow(lang));
        
    })

    return modal;
}


function validationRegistrationForm(input, container, lang, clear) {

    const radioInputs = document.querySelectorAll(`[name = "lang"]`);

    // Проверка, введено ли поле с номером телефона

    if (input.value == '+') {
        if (document.querySelector('.error-uncorrect')) document.querySelector('.error-uncorrect').remove();
        if (!document.querySelector('.error-phone')) {
            input.classList.add('form__input_incorrect');
            
            const error = document.createElement('p');
            error.textContent = 'Введите телефон';
            error.classList.add('error-phone');

            if (lang == 'ru') {
                error.textContent = 'Введите телефон';
            } else error.textContent = 'Enter your phone number';

            container.append(error);

        }

        return false;

    } else {
        const valid = setMask(input);
        if (!valid) {
            if (document.querySelector('.error-phone')) document.querySelector('.error-phone').remove();
            clear.classList.add('clear-btn--incorrect');
            input.classList.add('form__input_incorrect');
            const error = document.createElement('p');
            error.textContent = 'Введите правильный номер телефона';
            error.classList.add('error-phone');

            if (lang == 'ru') {
                error.textContent = 'Введите правильный номер телефона';
            } else error.textContent = 'Enter a correct phone number';

            container.append(error);
            return false
        }
    }

    if (document.querySelector('.error-phone')) document.querySelector('.error-phone').remove();
    if (document.querySelector('.error-uncorrect')) document.querySelector('.error-uncorrect').remove();


    return true;
}

// Ф-ия валидаии ввода ответа


function validationAnswerForm(input, container, lang, clearButton) {

    input.addEventListener('input', () => {
        if (clearButton.classList.contains('clear-btn--incorrect')) clearButton.classList.remove('clear-btn--incorrect');

        input.classList.remove('form__input_incorrect');
        if (document.querySelector('.error')) document.querySelector('.error').remove();
    })

    // Проверка, введено ли поле с ответом

    if (input.value == '') {
        input.classList.add('form__input_incorrect');
        if (!document.querySelector('.error')) {
            const error = document.createElement('p');
            error.textContent = 'Введите ответ';
            error.classList.add('error');

            if (lang == 'ru') {
                error.textContent = 'Введите ответ';
            } else error.textContent = 'Enter your answer';

            container.append(error);

        }

        return false;

    } else {
        input.classList.remove('form__input_incorrect');
        if (document.querySelector('.error')) document.querySelector('.error').remove();
    }


    return true;
}

function createReadMoreBtn() {
    const readMore = document.querySelector('.read-more');
    const text = document.querySelector('.question__text');

    console.log(text.offsetHeight)

    if ($(text).height() >= 120) {
        readMore.classList.add('active');

        readMore.addEventListener('click', (e) => {
            e.preventDefault();
            text.classList.add('question__text--more');
            readMore.classList.remove('active');
        })
    }
}

let phoneNumber;
let valid;

function setMask(input) {
    let matrix = '+###############';

    maskList.forEach(item => {
        let code = item.code.replace(/[\s#]/g, ''),
            phone = input.value.replace(/[\s#-)(]/g, '');

        if (phone.includes(code)) {
            matrix = item.code;
            phoneNumber = item.code.replace(/[- +)(]/g, '');
        }
    });



    let i = 0,
        val = input.value.replace(/\D/g, '');

    input.value = matrix.replace(/(?!\+)./g, function (a) {
        return /[#\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? '' : a;
    });


    if (!phoneNumber) valid = false
    else {
        if (input.value.replace(/[- +)(]/g, '').length < phoneNumber.length) valid = false
        else valid = true;
    }


    return valid;

}


// const screenHeight = window.innerHeight;

// console.log(screenHeight)

// document.body.style.height = `${screenHeight}px`;


createLangPage('ru')




if (localStorage.getItem('phone') && localStorage.getItem('lang')) {
    axios.all([
        axios.get('php/get_question.php', {
            params: {
                langCode: localStorage.getItem('lang'),
            }
        }),
        axios.post('php/post_paticipant.php', {
            phone: localStorage.getItem('phone'), langCode: localStorage.getItem('lang'),
        })

    ]).then(axios.spread(function (questionsData, participantData) {
        questions = questionsData.data;

        id = participantData.data[0].paticipant_id;
        document.body.innerHTML = '';
        document.body.classList.remove('registration-body');
        if (participantData.data[0].question == '0') createMain(localStorage.getItem('lang'))
        else
        if (participantData.data[0].question == 10) document.body.append(successWindow(localStorage.getItem('lang')))
        else {
            document.body.append(createQuestion(participantData.data[0].question + 1, localStorage.getItem('lang')));
            setTimeout(() => {
                createReadMoreBtn();
            }, 100)

        }

    }))

} else {
    document.body.innerHTML = '';
    createLangPage('ru');
} 



const url = window.location.href;

if (url.includes('?code=')) {
    const length = url.length;
    const code = url.substr(length - 6, length);

    axios.get('php/check_paticipant.php', {
        params: {
            code: code
        }
    })
    .then(function (response) {
        const lang = response.data[0].lang.toLowerCase();
        document.body.classList.remove('registration-body');
        document.body.innerHTML = '';

        localStorage.setItem('phone', response.data[0].paticipant_phone);
        localStorage.setItem('lang', lang);

        createMain(lang);
    })
    .catch(function (error) {
        console.log(error);
    });

}




