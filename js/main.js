/**
 * i-CAR — Строгий профессиональный сайт
 */

document.addEventListener('DOMContentLoaded', function () {

    // Навигация
    const navbar = document.querySelector('.navbar');
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    window.addEventListener('scroll', function () {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    hamburger.addEventListener('click', function () {
        navMenu.classList.toggle('active');
    });

    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', function () {
            navMenu.classList.remove('active');
        });
    });

    // Плавный скролл
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        });
    });

    // Модальное окно
    const modalOverlay = document.querySelector('.modal-overlay');
    const modalClose = document.querySelector('.modal-close');

    document.querySelectorAll('.btn-outline').forEach(btn => {
        if (btn.textContent.includes('Заказать звонок')) {
            btn.addEventListener('click', function (e) {
                e.preventDefault();
                modalOverlay.classList.add('active');
            });
        }
    });

    modalClose.addEventListener('click', function () {
        modalOverlay.classList.remove('active');
    });

    modalOverlay.addEventListener('click', function (e) {
        if (e.target === modalOverlay) {
            modalOverlay.classList.remove('active');
        }
    });

    // Фильтрация авто
    const filterButtons = document.querySelectorAll('.filter-btn');
    const carCards = document.querySelectorAll('.car-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', function () {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            const filter = this.dataset.filter;
            carCards.forEach(card => {
                const category = card.dataset.category;
                if (filter === 'all' || category === filter) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // Анимация статистики
    const statNumbers = document.querySelectorAll('.stat-number');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.dataset.count);
                if (target) {
                    let current = 0;
                    const increment = target / 50;
                    const timer = setInterval(() => {
                        current += increment;
                        if (current >= target) {
                            entry.target.textContent = target;
                            clearInterval(timer);
                        } else {
                            entry.target.textContent = Math.floor(current);
                        }
                    }, 40);
                }
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(num => observer.observe(num));

    // Форма CTA
    const ctaForm = document.querySelector('.cta-form');
    if (ctaForm) {
        ctaForm.addEventListener('submit', function (e) {
            e.preventDefault();
            alert('Спасибо! Менеджер свяжется с вами в течение 15 минут.');
            this.reset();
        });
    }

    // Маска телефона
    document.querySelectorAll('input[type="tel"]').forEach(input => {
        input.addEventListener('input', function (e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length > 11) value = value.substring(0, 11);
            if (value.length > 0) {
                let formatted = '+7';
                if (value.length > 1) formatted += ' (' + value.substring(1, 4);
                if (value.length > 4) formatted += ') ' + value.substring(4, 7);
                if (value.length > 7) formatted += '-' + value.substring(7, 9);
                if (value.length > 9) formatted += '-' + value.substring(9, 11);
                e.target.value = formatted;
            }
        });
    });

    console.log('✅ i-CAR сайт готов | Калининград, ул. Энергетиков, 23 | +7 (911) 850-88-44');
});
