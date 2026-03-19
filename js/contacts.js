/**
 * AutoPrime — Контакты
 * JavaScript для страницы контактов
 */

document.addEventListener('DOMContentLoaded', function () {

    // ========== Форма обратной связи ==========
    const contactForm = document.querySelector('.contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const formData = new FormData(this);
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;

            // Валидация
            const name = this.querySelector('#name').value.trim();
            const phone = this.querySelector('#phone').value.trim();
            const message = this.querySelector('#message').value.trim();
            const agree = this.querySelector('input[name="agree"]').checked;

            if (!name || !phone || !message) {
                showNotification('Пожалуйста, заполните все обязательные поля', 'error');
                return;
            }

            if (!agree) {
                showNotification('Необходимо согласие на обработку данных', 'error');
                return;
            }

            // Отправка
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Отправка...';
            submitBtn.disabled = true;

            // Имитация отправки
            setTimeout(() => {
                showNotification('Сообщение успешно отправлено! Мы ответим вам в ближайшее время.', 'success');
                this.reset();
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 1500);
        });
    }

    // ========== Уведомления ==========
    function showNotification(message, type = 'info') {
        // Удаляем существующие уведомления
        const existing = document.querySelector('.notification');
        if (existing) existing.remove();

        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
            <button class="notification-close"><i class="fas fa-times"></i></button>
        `;

        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${type === 'success' ? 'linear-gradient(135deg, #00C853 0%, #009624 100%)' : type === 'error' ? 'linear-gradient(135deg, #FF3D3D 0%, #E62E2E 100%)' : 'linear-gradient(135deg, #2196F3 0%, #1976D2 100%)'};
            color: white;
            padding: 16px 24px;
            border-radius: 12px;
            box-shadow: 0 10px 40px rgba(0,0,0,0.2);
            display: flex;
            align-items: center;
            gap: 12px;
            z-index: 3000;
            animation: slideInRight 0.3s ease;
            max-width: 400px;
        `;

        document.body.appendChild(notification);

        // Кнопка закрытия
        notification.querySelector('.notification-close').addEventListener('click', () => {
            notification.remove();
        });

        // Автозакрытие
        setTimeout(() => {
            if (notification.parentElement) {
                notification.style.animation = 'slideOutRight 0.3s ease';
                setTimeout(() => notification.remove(), 300);
            }
        }, 5000);
    }

    // Добавляем анимации для уведомлений
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(400px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        @keyframes slideOutRight {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(400px);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    // ========== Маска для телефона ==========
    const phoneInputs = document.querySelectorAll('#phone, input[type="tel"]');

    phoneInputs.forEach(input => {
        input.addEventListener('input', function (e) {
            let value = e.target.value.replace(/\D/g, '');

            if (value.length > 11) {
                value = value.substring(0, 11);
            }

            if (value.length > 0) {
                let formatted = '+7';

                if (value.length > 1) {
                    formatted += ' (' + value.substring(1, 4);
                }
                if (value.length > 4) {
                    formatted += ') ' + value.substring(4, 7);
                }
                if (value.length > 7) {
                    formatted += '-' + value.substring(7, 9);
                }
                if (value.length > 9) {
                    formatted += '-' + value.substring(9, 11);
                }

                e.target.value = formatted;
            }
        });
    });

    // ========== Кнопка "Показать на карте" ==========
    const mapLink = document.querySelector('.contact-link');
    const mapSection = document.querySelector('.contacts-map');

    if (mapLink && mapSection) {
        mapLink.addEventListener('click', function (e) {
            e.preventDefault();
            mapSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    }

    // ========== Копирование контактов ==========
    const contactCards = document.querySelectorAll('.contact-card');

    contactCards.forEach(card => {
        const link = card.querySelector('p a');
        if (link) {
            link.addEventListener('click', function (e) {
                // Копирование при клике на телефон или email
                const text = this.textContent;
                navigator.clipboard.writeText(text).then(() => {
                    showNotification(`${text} скопировано в буфер обмена`, 'success');
                });
            });
        }
    });

    // ========== Анимация появления карточек ==========
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.contact-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.5s ease';
        observer.observe(card);
    });

    // Офисы
    document.querySelectorAll('.office-card').forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `all 0.5s ease ${index * 150}ms`;
        observer.observe(card);
    });

    console.log('i-CAR страница контактов загружена! 📞');
});
