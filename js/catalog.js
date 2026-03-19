/**
 * AutoPrime — Каталог
 * JavaScript для страницы каталога
 */

document.addEventListener('DOMContentLoaded', function () {

    // ========== Переключение вида (сетка/список) ==========
    const viewButtons = document.querySelectorAll('.view-btn');
    const carsGrid = document.querySelector('.catalog-grid');

    viewButtons.forEach(btn => {
        btn.addEventListener('click', function () {
            const view = this.dataset.view;

            viewButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            if (view === 'list') {
                carsGrid.classList.add('list-view');
            } else {
                carsGrid.classList.remove('list-view');
            }
        });
    });

    // ========== Сортировка автомобилей ==========
    const sortSelect = document.querySelector('.sort-select');

    if (sortSelect) {
        sortSelect.addEventListener('change', function () {
            const sortType = this.value;
            sortCars(sortType);
        });
    }

    function sortCars(sortType) {
        const cars = Array.from(document.querySelectorAll('.catalog-grid .car-card'));

        cars.sort((a, b) => {
            const priceA = parsePrice(a.querySelector('.car-price').textContent);
            const priceB = parsePrice(b.querySelector('.car-price').textContent);

            switch (sortType) {
                case 'price-asc':
                    return priceA - priceB;
                case 'price-desc':
                    return priceB - priceA;
                case 'popular':
                default:
                    return 0;
            }
        });

        cars.forEach(car => {
            car.style.opacity = '0';
            car.style.transform = 'translateY(20px)';
        });

        setTimeout(() => {
            const grid = document.querySelector('.catalog-grid');
            cars.forEach((car, index) => {
                grid.appendChild(car);
                setTimeout(() => {
                    car.style.opacity = '1';
                    car.style.transform = 'translateY(0)';
                }, index * 50);
            });
        }, 300);
    }

    function parsePrice(priceText) {
        return parseInt(priceText.replace(/\D/g, ''));
    }

    // ========== Фильтры ==========
    const applyFiltersBtn = document.querySelector('.apply-filters');
    const resetFiltersBtn = document.querySelector('.reset-filters');
    const filterCheckboxes = document.querySelectorAll('.filters-sidebar input[type="checkbox"]');
    const filterRadios = document.querySelectorAll('.filters-sidebar input[type="radio"]');

    if (applyFiltersBtn) {
        applyFiltersBtn.addEventListener('click', function () {
            applyFilters();
        });
    }

    if (resetFiltersBtn) {
        resetFiltersBtn.addEventListener('click', function () {
            resetFilters();
        });
    }

    function applyFilters() {
        const selectedBodies = Array.from(document.querySelectorAll('input[name="body"]:checked'))
            .map(cb => cb.value);

        const priceFrom = parseInt(document.querySelector('.price-from').value) || 0;
        const priceTo = parseInt(document.querySelector('.price-to').value) || Infinity;

        const selectedMileage = document.querySelector('input[name="mileage"]:checked')?.value;

        const selectedEngines = Array.from(document.querySelectorAll('input[name="engine"]:checked'))
            .map(cb => cb.value);

        const cars = document.querySelectorAll('.catalog-grid .car-card');
        let visibleCount = 0;

        cars.forEach(car => {
            const category = car.dataset.category;
            const price = parsePrice(car.querySelector('.car-price').textContent);

            let isVisible = true;

            // Фильтр по кузову
            if (selectedBodies.length > 0 && !selectedBodies.includes(category)) {
                isVisible = false;
            }

            // Фильтр по цене
            if (price < priceFrom || price > priceTo) {
                isVisible = false;
            }

            // Фильтр по двигателю (упрощённо)
            if (selectedEngines.length > 0) {
                const carEngine = car.querySelector('.car-specs');
                if (carEngine) {
                    const hasElectric = carEngine.textContent.includes('Электро');
                    const hasDiesel = carEngine.textContent.includes('Дизель');
                    const hasPetrol = carEngine.textContent.includes('Бензин');

                    if (!selectedEngines.includes('electric') && hasElectric) isVisible = false;
                    if (!selectedEngines.includes('diesel') && hasDiesel) isVisible = false;
                    if (!selectedEngines.includes('petrol') && hasPetrol) isVisible = false;
                }
            }

            if (isVisible) {
                car.style.display = 'block';
                setTimeout(() => car.classList.add('show'), 100);
                visibleCount++;
            } else {
                car.classList.remove('show');
                setTimeout(() => car.style.display = 'none', 300);
            }
        });

        // Обновление счётчика
        const resultsCount = document.getElementById('resultsCount');
        if (resultsCount) {
            resultsCount.textContent = visibleCount;
        }

        // Анимация кнопки
        applyFiltersBtn.innerHTML = '<i class="fas fa-check"></i> Применено';
        setTimeout(() => {
            applyFiltersBtn.innerHTML = '<i class="fas fa-filter"></i> Применить фильтры';
        }, 1500);
    }

    function resetFilters() {
        // Сброс чекбоксов
        filterCheckboxes.forEach(cb => {
            if (cb.name === 'body' || cb.name === 'engine') {
                cb.checked = true;
            }
        });

        // Сброс радио
        filterRadios.forEach(radio => {
            if (radio.name === 'mileage' && radio.value === 'all') {
                radio.checked = true;
            }
        });

        // Сброс цен
        document.querySelector('.price-from').value = '1000000';
        document.querySelector('.price-to').value = '15000000';

        // Показать все автомобили
        const cars = document.querySelectorAll('.catalog-grid .car-card');
        cars.forEach(car => {
            car.style.display = 'block';
            setTimeout(() => car.classList.add('show'), 100);
        });

        const resultsCount = document.getElementById('resultsCount');
        if (resultsCount) {
            resultsCount.textContent = cars.length;
        }
    }

    // ========== Ценовой слайдер (упрощённая версия) ==========
    const priceInputs = document.querySelectorAll('.range-inputs input');
    const rangeProgress = document.querySelector('.range-progress');
    const handleLeft = document.querySelector('.handle-left');
    const handleRight = document.querySelector('.handle-right');

    if (rangeProgress && handleLeft && handleRight) {
        priceInputs.forEach(input => {
            input.addEventListener('input', updateRangeSlider);
        });

        function updateRangeSlider() {
            const from = parseInt(document.querySelector('.price-from').value) || 0;
            const to = parseInt(document.querySelector('.price-to').value) || 15000000;

            const min = 0;
            const max = 15000000;

            const leftPercent = ((from - min) / (max - min)) * 100;
            const rightPercent = 100 - ((to - min) / (max - min)) * 100;

            rangeProgress.style.left = `${Math.min(leftPercent, 80)}%`;
            rangeProgress.style.right = `${Math.min(rightPercent, 80)}%`;

            handleLeft.style.left = `${Math.min(leftPercent, 80)}%`;
            handleRight.style.right = `${Math.min(rightPercent, 80)}%`;
        }

        // Инициализация
        updateRangeSlider();
    }

    // ========== Детали автомобиля (модальное окно) ==========
    const detailButtons = document.querySelectorAll('.car-card .btn-primary');

    detailButtons.forEach(btn => {
        btn.addEventListener('click', function () {
            const carCard = this.closest('.car-card');
            const carName = carCard.querySelector('.car-name').textContent;
            const carPrice = carCard.querySelector('.car-price').textContent;

            alert(`Открывается подробная информация об автомобиле:\n${carName}\nЦена: ${carPrice}\n\n(Здесь будет страница с деталями)`);
        });
    });

    // ========== Избранное ==========
    const heartButtons = document.querySelectorAll('.action-btn .fa-heart').forEach(icon => {
        icon.closest('.action-btn').addEventListener('click', function () {
            const icon = this.querySelector('i');

            if (icon.classList.contains('far')) {
                icon.classList.remove('far');
                icon.classList.add('fas');
                this.style.background = 'var(--primary)';
                this.style.color = 'var(--light)';

                // Анимация "лайка"
                this.style.transform = 'scale(1.2)';
                setTimeout(() => {
                    this.style.transform = 'scale(1)';
                }, 200);
            } else {
                icon.classList.remove('fas');
                icon.classList.add('far');
                this.style.background = '';
                this.style.color = '';
            }
        });
    });

    // ========== Плавное появление при скролле ==========
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.car-card').forEach(card => {
        observer.observe(card);
    });

    console.log('i-CAR каталог загружен и готов к работе! 🚗');
});
