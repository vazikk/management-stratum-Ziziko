// JavaScript код для сайта STRATUM

// Текущий язык (по умолчанию русский)
let currentLanguage = 'ru';

// Функция переключения языка
function switchLanguage(lang) {
    currentLanguage = lang;
    
    // Обновляем активную кнопку
    const langButtons = document.querySelectorAll('.lang-btn');
    langButtons.forEach(btn => {
        if (btn.dataset.lang === lang) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
    
    // Обновляем все элементы с data-ru и data-en атрибутами
    const elementsToTranslate = document.querySelectorAll('[data-ru][data-en]');
    elementsToTranslate.forEach(element => {
        element.textContent = element.dataset[lang];
    });
    
    // Обновляем атрибуты placeholder, если есть
    const inputsWithPlaceholder = document.querySelectorAll('input[data-ru-placeholder][data-en-placeholder], textarea[data-ru-placeholder][data-en-placeholder]');
    inputsWithPlaceholder.forEach(input => {
        input.placeholder = input.dataset[lang + 'Placeholder'];
    });
    
    // Сохраняем выбор языка в localStorage
    localStorage.setItem('stratum-language', lang);
    
    // Обновляем атрибут lang у html
    document.documentElement.lang = lang;
}

// 1. Анимация появления элементов при скролле
function initFadeAnimation() {
    const fadeElements = document.querySelectorAll('.fade-in');
    
    function checkFade() {
        fadeElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100) {
                element.classList.add('visible');
            }
        });
    }
    
    checkFade();
    window.addEventListener('scroll', checkFade);
}

// 2. Обработка кнопки "Открыть бутик"
function initDiscoverButton() {
    const discoverBtn = document.getElementById('discoverBtn');
    
    if (discoverBtn) {
        discoverBtn.addEventListener('click', function() {
            const collectionsSection = document.getElementById('collections');
            if (collectionsSection) {
                collectionsSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
}

// 3. Эффект параллакса для hero секции
function initParallax() {
    const hero = document.querySelector('.hero');
    const heroImage = document.querySelector('.hero-image');
    
    if (hero && heroImage) {
        window.addEventListener('scroll', function() {
            const scrollPosition = window.scrollY;
            if (scrollPosition < hero.offsetHeight) {
                heroImage.style.transform = `translateY(${scrollPosition * 0.1}px)`;
            }
        });
    }
}

// 4. Плавная прокрутка для всех ссылок с якорями
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    const header = document.querySelector('header');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#' || href === '#') return;
            
            const targetId = href.substring(1);
            if (targetId === '') return;
            
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                e.preventDefault();
                const headerHeight = header ? header.offsetHeight : 0;
                const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// 5. Инициализация перевода для элементов без data-атрибутов
function initTranslationFallback() {
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        if (!link.hasAttribute('data-ru') && link.textContent.trim()) {
            const text = link.textContent.trim();
            link.setAttribute('data-ru', text);
            if (text === 'Коллекции') link.setAttribute('data-en', 'Collections');
            if (text === 'Ателье') link.setAttribute('data-en', 'Atelier');
        }
    });
}

// 6. Модальное окно записи
function initBookingModal() {
    const modal = document.getElementById('bookingModal');
    const bookBtn = document.getElementById('bookAppointmentBtn');
    const closeBtn = document.querySelector('.modal-close');
    const bookingForm = document.getElementById('bookingForm');
    
    // Проверяем существование элементов
    if (!modal) {
        console.log('Модальное окно не найдено');
        return;
    }
    
    if (!bookBtn) {
        console.log('Кнопка записи не найдена');
        return;
    }
    
    console.log('Модальное окно и кнопка найдены');
    
    // Открыть модальное окно
    bookBtn.addEventListener('click', function(e) {
        e.preventDefault();
        console.log('Клик по кнопке записи');
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    });
    
    // Закрыть модальное окно (крестик)
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    }
    
    // Закрыть при клике вне окна
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
    
    // Обработка отправки формы
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert(currentLanguage === 'ru' ? 'Спасибо! Мы свяжемся с вами в ближайшее время.' : 'Thank you! We will contact you shortly.');
            bookingForm.reset();
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    }
    
    // Обработка кнопки отправки (на случай если форма не submit)
    const submitBtn = document.getElementById('submitBtn');
    if (submitBtn) {
        submitBtn.addEventListener('click', function(e) {
            e.preventDefault();
            alert(currentLanguage === 'ru' ? 'Спасибо! Мы свяжемся с вами в ближайшее время.' : 'Thank you! We will contact you shortly.');
            if (bookingForm) bookingForm.reset();
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    }
}

// 7. Инициализация языка
function initLanguage() {
    const savedLanguage = localStorage.getItem('stratum-language');
    if (savedLanguage) {
        switchLanguage(savedLanguage);
    } else {
        const browserLang = navigator.language || navigator.userLanguage;
        if (browserLang.startsWith('en')) {
            switchLanguage('en');
        } else {
            switchLanguage('ru');
        }
    }
    
    // Добавляем обработчики для кнопок языка
    const langButtons = document.querySelectorAll('.lang-btn');
    langButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const lang = this.dataset.lang;
            switchLanguage(lang);
        });
    });
}

// ЗАПУСК ВСЕХ ФУНКЦИЙ ПРИ ЗАГРУЗКЕ СТРАНИЦЫ
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM загружен, инициализация...');
    
    initLanguage();
    initFadeAnimation();
    initDiscoverButton();
    initParallax();
    initSmoothScroll();
    initTranslationFallback();
    initBookingModal(); // Важно! Инициализация модального окна
    
    console.log('Все функции инициализированы');
});