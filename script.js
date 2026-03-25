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
    const inputsWithPlaceholder = document.querySelectorAll('input[data-ru-placeholder][data-en-placeholder]');
    inputsWithPlaceholder.forEach(input => {
        input.placeholder = input.dataset[lang + 'Placeholder'];
    });
    
    // Сохраняем выбор языка в localStorage
    localStorage.setItem('stratum-language', lang);
    
    // Обновляем атрибут lang у html
    document.documentElement.lang = lang;
}

// 1. Анимация появления элементов при скролле
document.addEventListener('DOMContentLoaded', function() {
    // Инициализация языка из localStorage или браузера
    const savedLanguage = localStorage.getItem('stratum-language');
    if (savedLanguage) {
        switchLanguage(savedLanguage);
    } else {
        // Определяем язык браузера
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
    
    // Анимация появления
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
});

// 2. Обработка кнопки "Открыть бутик"
document.addEventListener('DOMContentLoaded', function() {
    const discoverBtn = document.getElementById('discoverBtn');
    
    if (discoverBtn) {
        discoverBtn.addEventListener('click', function() {
            const collectionsSection = document.getElementById('collections');
            if (collectionsSection) {
                collectionsSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
});

// 3. Эффект параллакса для hero секции
document.addEventListener('DOMContentLoaded', function() {
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
});

// 4. Плавная прокрутка для всех ссылок с якорями
document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('a[href^="#"]');
    const header = document.querySelector('header');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            if (targetId === '') return;
            
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const headerHeight = header ? header.offsetHeight : 0;
                const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// 5. Добавляем data-атрибуты для элементов, которые должны переводиться
// (Этот код запускается автоматически при загрузке страницы)
document.addEventListener('DOMContentLoaded', function() {
    // Для ссылок в навигации
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        if (!link.hasAttribute('data-ru')) {
            const text = link.textContent;
            link.setAttribute('data-ru', text);
            // Примерный перевод на английский
            if (text === 'Коллекции') link.setAttribute('data-en', 'Collections');
            if (text === 'Ателье') link.setAttribute('data-en', 'Atelier');
        }
    });
    
    // Для заголовков и текстов
    const elements = document.querySelectorAll('h1 span, h2, h3, p, .btn-primary, .segment-card h3, .segment-card p, .footer-col h4, .footer-col a, .footer-col p, .footer-col li:not(:has(a))');
    elements.forEach(el => {
        if (!el.hasAttribute('data-ru') && el.textContent.trim() && !el.querySelector('a')) {
            const text = el.textContent.trim();
            el.setAttribute('data-ru', text);
            // Здесь можно добавить логику для перевода, но проще уже в HTML все прописать
        }
    });
});