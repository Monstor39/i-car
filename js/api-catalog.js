/**
 * i-CAR — Загрузка автомобилей из API
 * Интеграция с сервером парсинга
 */

// URL API (по умолчанию localhost, меняется для продакшена)
const API_URL = window.location.hostname === 'localhost' 
    ? 'http://localhost:3000/api' 
    : 'https://icar-server-production.up.railway.app/api';

// Глобальное хранилище данных
let allCars = [];
let filteredCars = [];

// ========== Загрузка данных ==========
async function loadCars() {
    console.log('🚗 Загрузка автомобилей из API...');
    
    try {
        const response = await fetch(`${API_URL}/cars`);
        const result = await response.json();
        
        if (result.success) {
            allCars = result.data;
            filteredCars = [...allCars];
            console.log(`✅ Загружено ${allCars.length} автомобилей`);
            return true;
        } else {
            console.error('❌ Ошибка API:', result.error);
            return false;
        }
    } catch (error) {
        console.error('❌ Ошибка сети:', error.message);
        // Fallback на локальные данные
        console.log('📁 Используем локальные данные из catalog-cars.js');
        return false;
    }
}

// ========== Рендеринг карточки ==========
function renderCarCard(car) {
    const badgeHTML = car.badge ? `<div class="car-badge ${car.badge === 'Хит' ? 'hot' : car.badge === 'Премиум' ? 'premium' : car.badge === 'Электро' ? 'eco' : ''}">${car.badge}</div>` : '';
    
    // Используем первое изображение
    const imageUrl = Array.isArray(car.images) ? car.images[0] : car.image;
    const fallbackImage = `https://placehold.co/600x400/1a1a1a/D90429?text=${encodeURIComponent(car.name)}&font=montserrat`;
    
    return `
        <div class="car-card" data-category="${car.category}" data-price="${car.priceNumeric || 0}" data-id="${car.id}">
            <div class="car-image">
                <img src="${imageUrl}" alt="${car.name}" loading="lazy" onerror="this.src='${fallbackImage}'">
                ${badgeHTML}
                <div class="car-actions">
                    <button class="action-btn" onclick="toggleFavorite(${car.id})"><i class="far fa-heart"></i></button>
                    <button class="action-btn" onclick="openCarModal(${car.id})"><i class="fas fa-expand"></i></button>
                    <button class="action-btn" onclick="shareCar(${car.id})"><i class="fas fa-share"></i></button>
                </div>
            </div>
            <div class="car-info">
                <h3 class="car-name">${car.name}</h3>
                <p class="car-price">${car.price || '—'}</p>
                <div class="car-specs">
                    <span><i class="fas fa-tachometer-alt"></i> ${car.mileage || '—'}</span>
                    <span><i class="fas fa-gas-pump"></i> ${car.fuel || '—'}</span>
                    <span><i class="fas fa-cog"></i> ${car.transmission || '—'}</span>
                </div>
                <button class="btn btn-primary btn-block" onclick="openCarModal(${car.id})">Подробнее</button>
            </div>
        </div>
    `;
}

// ========== Рендеринг каталога ==========
function renderCatalog(cars = filteredCars) {
    const container = document.querySelector('.cars-grid');
    if (!container) return;
    
    if (cars.length === 0) {
        container.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 60px 20px;">
                <i class="fas fa-car-crash" style="font-size: 80px; color: var(--gray); margin-bottom: 20px;"></i>
                <h3 style="font-size: 24px; color: var(--secondary); margin-bottom: 10px;">Ничего не найдено</h3>
                <p style="color: var(--gray);">Попробуйте изменить параметры поиска</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = cars.map(renderCarCard).join('');
    
    // Обновляем счётчик
    const countEl = document.getElementById('resultsCount');
    if (countEl) {
        countEl.textContent = cars.length;
    }
}

// ========== Фильтры ==========
function applyFilters() {
    const searchInput = document.getElementById('searchInput');
    const minPriceInput = document.getElementById('minPrice');
    const maxPriceInput = document.getElementById('maxPrice');
    const yearSelect = document.getElementById('yearFilter');
    const categorySelect = document.getElementById('categoryFilter');
    
    let result = [...allCars];
    
    // Поиск по названию
    if (searchInput && searchInput.value.trim()) {
        const search = searchInput.value.trim().toLowerCase();
        result = result.filter(car => car.name.toLowerCase().includes(search));
    }
    
    // Цена от
    if (minPriceInput && minPriceInput.value) {
        const min = parseInt(minPriceInput.value);
        result = result.filter(car => (car.priceNumeric || 0) >= min);
    }
    
    // Цена до
    if (maxPriceInput && maxPriceInput.value) {
        const max = parseInt(maxPriceInput.value);
        result = result.filter(car => (car.priceNumeric || 0) <= max);
    }
    
    // Год
    if (yearSelect && yearSelect.value) {
        result = result.filter(car => car.year === yearSelect.value);
    }
    
    // Категория
    if (categorySelect && categorySelect.value) {
        result = result.filter(car => car.category === categorySelect.value);
    }
    
    filteredCars = result;
    renderCatalog(filteredCars);
}

// ========== Модальное окно ==========
function openCarModal(carId) {
    const car = allCars.find(c => c.id === carId);
    if (!car) return;
    
    const modal = document.getElementById('carModal');
    if (!modal) return;
    
    // Заполнение данными
    const modalBody = modal.querySelector('.modal-body');
    if (!modalBody) return;
    
    const images = Array.isArray(car.images) ? car.images : [car.image];
    const imagesHTML = images.length > 0 ? `
        <div class="modal-gallery">
            <div class="gallery-main">
                <img id="mainImage" src="${images[0]}" alt="${car.name}">
            </div>
            ${images.length > 1 ? `
                <div class="gallery-thumbs">
                    ${images.map((img, i) => `
                        <img src="${img}" alt="Фото ${i+1}" onclick="document.getElementById('mainImage').src='${img}'" class="${i === 0 ? 'active' : ''}">
                    `).join('')}
                </div>
            ` : ''}
        </div>
    ` : '';
    
    modalBody.innerHTML = `
        ${imagesHTML}
        
        <div class="modal-info">
            <h2>${car.name} ${car.year}</h2>
            <p class="modal-price">${car.price || '—'}</p>
            
            <div class="modal-specs">
                <div class="spec-item">
                    <i class="fas fa-tachometer-alt"></i>
                    <span>Пробег</span>
                    <strong>${car.mileage || '—'}</strong>
                </div>
                <div class="spec-item">
                    <i class="fas fa-gas-pump"></i>
                    <span>Топливо</span>
                    <strong>${car.fuel || '—'}</strong>
                </div>
                <div class="spec-item">
                    <i class="fas fa-cog"></i>
                    <span>КПП</span>
                    <strong>${car.transmission || '—'}</strong>
                </div>
                <div class="spec-item">
                    <i class="fas fa-road"></i>
                    <span>Привод</span>
                    <strong>${car.drive || '—'}</strong>
                </div>
                <div class="spec-item">
                    <i class="fas fa-car"></i>
                    <span>Кузов</span>
                    <strong>${car.body || '—'}</strong>
                </div>
                <div class="spec-item">
                    <i class="fas fa-palette"></i>
                    <span>Цвет</span>
                    <strong>${car.color || '—'}</strong>
                </div>
            </div>
            
            <div class="modal-description">
                <h3>Описание</h3>
                <p>${car.description || 'Описание отсутствует'}</p>
            </div>
            
            <div class="modal-actions">
                <a href="${car.link || '#'}" target="_blank" class="btn btn-primary btn-lg btn-block">
                    <i class="fas fa-external-link-alt"></i> Смотреть на Avito
                </a>
                <a href="tel:+79118508844" class="btn btn-outline btn-lg btn-block">
                    <i class="fas fa-phone"></i> Позвонить
                </a>
            </div>
        </div>
    `;
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeCarModal() {
    const modal = document.getElementById('carModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// ========== Избранное ==========
function toggleFavorite(carId) {
    let favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    const index = favorites.indexOf(carId);
    
    if (index === -1) {
        favorites.push(carId);
        showNotification('Добавлено в избранное', 'success');
    } else {
        favorites.splice(index, 1);
        showNotification('Удалено из избранного', 'info');
    }
    
    localStorage.setItem('favorites', JSON.stringify(favorites));
}

// ========== Поделиться ==========
async function shareCar(carId) {
    const car = allCars.find(c => c.id === carId);
    if (!car) return;
    
    const shareData = {
        title: car.name,
        text: `${car.name} ${car.year} — ${car.price}`,
        url: window.location.href
    };
    
    try {
        if (navigator.share) {
            await navigator.share(shareData);
        } else {
            await navigator.clipboard.writeText(window.location.href);
            showNotification('Ссылка скопирована', 'success');
        }
    } catch (e) {
        console.log('Share cancelled');
    }
}

// ========== Уведомления ==========
function showNotification(message, type = 'info') {
    const existing = document.querySelector('.notification');
    if (existing) existing.remove();
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
        <span>${message}</span>
        <button class="notification-close" onclick="this.parentElement.remove()"><i class="fas fa-times"></i></button>
    `;
    
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? 'linear-gradient(135deg, #00C853 0%, #009624 100%)' : 'linear-gradient(135deg, #2196F3 0%, #1976D2 100%)'};
        color: white;
        padding: 16px 24px;
        border-radius: 12px;
        box-shadow: 0 10px 40px rgba(0,0,0,0.3);
        display: flex;
        align-items: center;
        gap: 12px;
        z-index: 3000;
        animation: slideInRight 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        max-width: 400px;
    `;
    
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 5000);
}

// ========== Инициализация ==========
document.addEventListener('DOMContentLoaded', async function() {
    // Загрузка данных
    const loaded = await loadCars();
    
    if (loaded && allCars.length > 0) {
        // Рендеринг каталога
        renderCatalog();
        
        // Настройка фильтров
        const filterButtons = document.querySelectorAll('.filter-btn');
        filterButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                filterButtons.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                
                const filter = this.dataset.filter;
                if (filter === 'all') {
                    filteredCars = [...allCars];
                } else {
                    filteredCars = allCars.filter(car => car.category === filter);
                }
                renderCatalog(filteredCars);
            });
        });
        
        // Настройка формы фильтров
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.addEventListener('input', applyFilters);
        }
        
        const minPriceInput = document.getElementById('minPrice');
        if (minPriceInput) {
            minPriceInput.addEventListener('input', applyFilters);
        }
        
        const maxPriceInput = document.getElementById('maxPrice');
        if (maxPriceInput) {
            maxPriceInput.addEventListener('input', applyFilters);
        }
        
        // Закрытие модального окна
        document.querySelectorAll('.modal-close, .modal-overlay').forEach(el => {
            el.addEventListener('click', function(e) {
                if (e.target === this) closeCarModal();
            });
        });
        
        // Закрытие по ESC
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') closeCarModal();
        });
    }
    
    console.log('✅ i-CAR каталог инициализирован');
});
