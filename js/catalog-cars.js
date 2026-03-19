/**
 * i-CAR — Каталог автомобилей
 * Все автомобили с Avito
 */

// Данные автомобилей
const carsData = [
  {
    "name": "BMW 5 серия",
    "year": 2020,
    "price": "4 625 000 ₽",
    "priceNumeric": 4625000,
    "mileage": "89 998 км",
    "engine": "2.0 AT",
    "fuel": "Бензин",
    "transmission": "Автомат",
    "category": "sedan",
    "badge": "Новинка",
    "image": "../../photo/BMW 5 серия 2.0 AT, 2020, 89 998 км.webp"
  },
  {
    "name": "BMW 5 серия",
    "year": 2021,
    "price": "4 850 000 ₽",
    "priceNumeric": 4850000,
    "mileage": "95 000 км",
    "engine": "3.0 AT",
    "fuel": "Бензин",
    "transmission": "Автомат",
    "category": "sedan",
    "badge": null,
    "image": "../photo/BMW 5 серия 3.0 AT, 2021, 95 000 км.webp"
  },
  {
    "name": "Skoda Kodiaq",
    "year": 2021,
    "price": "2 749 000 ₽",
    "priceNumeric": 2749000,
    "mileage": "104 616 км",
    "engine": "1.5 AMT",
    "fuel": "Бензин",
    "transmission": "Робот",
    "category": "suv",
    "badge": "Хит",
    "image": "../photo/Skoda Kodiaq 1.5 AMT, 2021, 104 616 км.UwOQUOqzosrJa22DqFtdXUPaT5cwATk6lXINXbbb5K0"
  },
  {
    "name": "BMW X5",
    "year": 2015,
    "price": "2 890 000 ₽",
    "priceNumeric": 2890000,
    "mileage": "214 137 км",
    "engine": "3.0 AT",
    "fuel": "Дизель",
    "transmission": "Автомат",
    "category": "suv",
    "badge": null,
    "image": "../photo/BMW X5 3.0 AT, 2015, 214 137 км.webp"
  },
  {
    "name": "BMW X5",
    "year": 2016,
    "price": "3 150 000 ₽",
    "priceNumeric": 3150000,
    "mileage": "211 290 км",
    "engine": "3.0 AT",
    "fuel": "Дизель",
    "transmission": "Автомат",
    "category": "suv",
    "badge": null,
    "image": "../photo/BMW X5 3.0 AT, 2016, 211 290 км.VDzD9u5u6dBu2dyGZTb8dQUn4s2xSDGUEwLrTuS0eLE"
  },
  {
    "name": "Kia K3",
    "year": 2020,
    "price": "1 890 000 ₽",
    "priceNumeric": 1890000,
    "mileage": "35 135 км",
    "engine": "1.6 AT",
    "fuel": "Бензин",
    "transmission": "Автомат",
    "category": "sedan",
    "badge": null,
    "image": "../photo/Kia K3 1.6 AT, 2020, 35 135 км.IKWyRcqI45foY7WX2VB0lSlRhmDq2ihxsl1SMlD5J7k"
  },
  {
    "name": "Kia K3",
    "year": 2022,
    "price": "2 100 000 ₽",
    "priceNumeric": 2100000,
    "mileage": "42 523 км",
    "engine": "1.6 CVT",
    "fuel": "Бензин",
    "transmission": "Вариатор",
    "category": "sedan",
    "badge": "Новинка",
    "image": "../photo/Kia K3 1.6 CVT, 2022, 42 523 км.T-U_XOZL6fxtKcRS65ITOyLbvc6CQ3L6r8IQxMAADyc"
  },
  {
    "name": "Skoda Scala",
    "year": 2021,
    "price": "1 590 000 ₽",
    "priceNumeric": 1590000,
    "mileage": "81 366 км",
    "engine": "1.0 AMT",
    "fuel": "Бензин",
    "transmission": "Робот",
    "category": "hatchback",
    "badge": null,
    "image": "../photo/Skoda Scala 1.0 AMT, 2021, 81 366 км.webp"
  },
  {
    "name": "Renault Kangoo",
    "year": 2022,
    "price": "2 499 000 ₽",
    "priceNumeric": 2499000,
    "mileage": "93 000 км",
    "engine": "1.5 MT",
    "fuel": "Дизель",
    "transmission": "Механика",
    "category": "van",
    "badge": null,
    "image": "../photo/Renault Kangoo 1.5 MT, 2022, 93 000 км.webp"
  },
  {
    "name": "BMW 6 серия",
    "year": 2013,
    "price": "2 950 000 ₽",
    "priceNumeric": 2950000,
    "mileage": "141 000 км",
    "engine": "3.0 AT",
    "fuel": "Дизель",
    "transmission": "Автомат",
    "category": "coupe",
    "badge": null,
    "image": "../photo/BMW 6 серия 3.0 AT, 2013, 141 000 км.webp"
  },
  {
    "name": "Mazda 3",
    "year": 2022,
    "price": "2 349 000 ₽",
    "priceNumeric": 2349000,
    "mileage": "38 970 км",
    "engine": "2.5 AT",
    "fuel": "Бензин",
    "transmission": "Автомат",
    "category": "sedan",
    "badge": "Новинка",
    "image": "../photo/Mazda 3 2.5 AT, 2022, 38 970 км.XnGdTCtqZRru52-ixBg6EQPqtk4ZnXJ173JW8xICYMs"
  },
  {
    "name": "Kia Sorento",
    "year": 2020,
    "price": "3 639 000 ₽",
    "priceNumeric": 3639000,
    "mileage": "101 981 км",
    "engine": "2.2 AMT",
    "fuel": "Дизель",
    "transmission": "Робот",
    "category": "suv",
    "badge": null,
    "image": "../photo/Kia Sorento 2.2 AMT, 2020, 101 981 к.Uw7y-hIasMxH7V8J2e44o8OQ3sT_fFGPy2kRqoc9pNE"
  },
  {
    "name": "Mercedes-Benz E-класс",
    "year": 1993,
    "price": "1 490 000 ₽",
    "priceNumeric": 1490000,
    "mileage": "363 350 км",
    "engine": "3.2 AT",
    "fuel": "Бензин",
    "transmission": "Автомат",
    "category": "sedan",
    "badge": null,
    "image": "../photo/Mercedes-Benz E-класс 3.2 AT, 1993, 363 350 км.Y1KejqfdneO8JIS_0kjNiVgHAwvYAnPBE7JsI6XPjvQ"
  },
  {
    "name": "Mercedes-Benz E-класс",
    "year": 2017,
    "price": "2 890 000 ₽",
    "priceNumeric": 2890000,
    "mileage": "156 198 км",
    "engine": "2.0 AT",
    "fuel": "Бензин",
    "transmission": "Автомат",
    "category": "sedan",
    "badge": null,
    "image": "../photo/Mercedes-Benz E-класс 2.0 AT, 2017, 156 198 км.Vtv2_ZaA19Go--cy5dzp8VMQLXzCy6N05_nQtqLAUNw"
  },
  {
    "name": "Porsche Cayenne",
    "year": 2010,
    "price": "2 890 000 ₽",
    "priceNumeric": 2890000,
    "mileage": "192 100 км",
    "engine": "3.0 AT",
    "fuel": "Дизель",
    "transmission": "Автомат",
    "category": "suv",
    "badge": "Премиум",
    "image": "../photo/Porsche Cayenne 3.0 AT, 2010, 192 100 км.q5al7Fe3k-5xUUJEwoqaSfSBfOnWfQZVAufB_Clclkk"
  },
  {
    "name": "BMW 2 серия Gran Coupe",
    "year": 2021,
    "price": "2 549 000 ₽",
    "priceNumeric": 2549000,
    "mileage": "49 556 км",
    "engine": "1.5 AMT",
    "fuel": "Бензин",
    "transmission": "Робот",
    "category": "sedan",
    "badge": null,
    "image": "../photo/BMW 2 серия Gran Coupe 1.5 AMT, 2021, 49 556 км.9vJUaUPAUaRtPP1__U_T4qocX8lvhyvoe-2o15_d4S4"
  },
  {
    "name": "BMW 7 серия",
    "year": 2008,
    "price": "1 849 000 ₽",
    "priceNumeric": 1849000,
    "mileage": "346 990 км",
    "engine": "3.0 AT",
    "fuel": "Бензин",
    "transmission": "Автомат",
    "category": "sedan",
    "badge": null,
    "image": "../photo/BMW 7 серия 3.0 AT, 2008, 346 990 км.ZWMjLLtYns-8IUCb4YYsAGsZbW3r97-s_Po-FDl9p2g"
  },
  {
    "name": "Audi A8",
    "year": 2019,
    "price": "4 790 000 ₽",
    "priceNumeric": 4790000,
    "mileage": "133 754 км",
    "engine": "3.0 AT",
    "fuel": "Дизель",
    "transmission": "Автомат",
    "category": "sedan",
    "badge": "Премиум",
    "image": "../photo/Audi A8 3.0 AT, 2019, 133 754 км.xDSRZa5_tT9-T6-Z6wd39_yT-C9TgaynURXpr89DAok"
  },
  {
    "name": "BMW 7 серия",
    "year": 2004,
    "price": "1 090 000 ₽",
    "priceNumeric": 1090000,
    "mileage": "258 000 км",
    "engine": "3.0 AT",
    "fuel": "Бензин",
    "transmission": "Автомат",
    "category": "sedan",
    "badge": null,
    "image": "../photo/BMW 7 серия 3.0 AT, 2004, 258 000 км.XltOkRWNXkPyi6xQdce0mgoT9JxA6sPTHtfd8wteTw4"
  },
  {
    "name": "Porsche Taycan",
    "year": 2021,
    "price": "9 990 000 ₽",
    "priceNumeric": 9990000,
    "mileage": "63 662 км",
    "engine": "AT",
    "fuel": "Электро",
    "transmission": "Автомат",
    "category": "sport",
    "badge": "Электро",
    "image": "../photo/Porsche Taycan AT, 2021, 63 662 км.webp"
  },
  {
    "name": "BMW X2",
    "year": 2021,
    "price": "3 200 000 ₽",
    "priceNumeric": 3200000,
    "mileage": "61 841 км",
    "engine": "1.5 AT",
    "fuel": "Бензин",
    "transmission": "Автомат",
    "category": "suv",
    "badge": null,
    "image": "../photo/BMW X2 1.5 AT, 2021, 61 841 км.NSLb0Lq-koWE8qg1mcMyqI7Zo79BpYnTmyhF2X37f9g"
  },
  {
    "name": "BMW X3",
    "year": 2004,
    "price": "1 350 000 ₽",
    "priceNumeric": 1350000,
    "mileage": "207 219 км",
    "engine": "2.5 AT",
    "fuel": "Бензин",
    "transmission": "Автомат",
    "category": "suv",
    "badge": null,
    "image": "../photo/BMW X3 2.5 AT, 2004, 207 219 км.xcXDTCMsmXOy8ifJ8WTr1rm5K007CGHcpnaFf-qoLDU"
  },
  {
    "name": "Daihatsu Move",
    "year": 2019,
    "price": "1 200 000 ₽",
    "priceNumeric": 1200000,
    "mileage": "78 000 км",
    "engine": "0.7 CVT",
    "fuel": "Бензин",
    "transmission": "Вариатор",
    "category": "hatchback",
    "badge": null,
    "image": "../photo/Daihatsu Move 0.7 CVT, 2019, 78 000 км.HaPJk7cLt1epxcujq-FxArYKwT-jAHlyoeBEpgXP9CE"
  },
  {
    "name": "Hyundai Creta",
    "year": 2018,
    "price": "2 100 000 ₽",
    "priceNumeric": 2100000,
    "mileage": "213 051 км",
    "engine": "2.0 AT",
    "fuel": "Бензин",
    "transmission": "Автомат",
    "category": "suv",
    "badge": null,
    "image": "../photo/Hyundai Creta 2.0 AT, 2018, 213 051 км.gCvuzqlNsAqyJ3Fb5l19zmktxBqOX6EopQhx-lDheAk"
  },
  {
    "name": "Mercedes-Benz CLA-класс",
    "year": 2022,
    "price": "3 800 000 ₽",
    "priceNumeric": 3800000,
    "mileage": "46 077 км",
    "engine": "1.3 AMT",
    "fuel": "Бензин",
    "transmission": "Робот",
    "category": "coupe",
    "badge": "Премиум",
    "image": "../photo/Mercedes-Benz CLA-класс 1.3 AMT, 2022, 46 077 км.D-G3CUxWRvHpY33McsQTLjQnmgf2VCJEt3u2-fgcKGI"
  }
];

// Генерация HTML для карточки
function generateCarCard(car) {
  const badgeHTML = car.badge ? `<div class="car-badge ${car.badge === 'Хит' ? 'hot' : car.badge === 'Премиум' ? 'premium' : car.badge === 'Электро' ? 'eco' : ''}">${car.badge}</div>` : '';

  // Используем placeholder если фото не загрузится
  const placeholderText = encodeURIComponent(car.name + ' ' + car.year);

  return `
        <div class="car-card" data-category="${car.category}" data-price="${car.priceNumeric}">
            <div class="car-image">
                <img src="${car.image}" alt="${car.name}" loading="lazy" onerror="this.parentElement.innerHTML='<div style=\'width:100%;height:100%;display:flex;align-items:center;justify-content:center;background:#1a1a1a;color:#fff;font-size:14px;text-align:center;padding:20px;flex-direction:column;gap:10px;\'><i class=\'fas fa-car\' style=\'font-size:40px;opacity:0.5;\'></i><span>${car.name}</span><span style=\'font-size:12px;color:#888;\'>${car.year} г.</span></div>'">
                ${badgeHTML}
                <div class="car-actions">
                    <button class="action-btn"><i class="far fa-heart"></i></button>
                    <button class="action-btn"><i class="fas fa-expand"></i></button>
                    <button class="action-btn"><i class="fas fa-share"></i></button>
                </div>
            </div>
            <div class="car-info">
                <h3 class="car-name">${car.name}</h3>
                <p class="car-price">${car.price}</p>
                <div class="car-specs">
                    <span><i class="fas fa-tachometer-alt"></i> ${car.mileage}</span>
                    <span><i class="fas fa-gas-pump"></i> ${car.fuel}</span>
                    <span><i class="fas fa-cog"></i> ${car.transmission}</span>
                </div>
                <button class="btn btn-primary btn-block">Подробнее</button>
            </div>
        </div>
    `;
}

// Рендеринг каталога
function renderCatalog(cars, filter = 'all') {
  const container = document.querySelector('.cars-grid');
  if (!container) return;

  const filteredCars = filter === 'all' ? cars : cars.filter(car => car.category === filter);

  container.innerHTML = filteredCars.map(generateCarCard).join('');

  // Обновляем счётчик
  const countEl = document.getElementById('resultsCount');
  if (countEl) {
    countEl.textContent = filteredCars.length;
  }
}

// Инициализация при загрузке
document.addEventListener('DOMContentLoaded', function () {
  const carsGrid = document.querySelector('.cars-grid');

  if (carsGrid) {
    renderCatalog(carsData);
  }

  // Фильтрация
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', function () {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      renderCatalog(carsData, this.dataset.filter);
    });
  });

  console.log(`✅ Загружено ${carsData.length} автомобилей i-CAR`);
  console.log('📍 Калининград, ул. Энергетиков, 23');
  console.log('📞 +7 (911) 850-88-44');
});
