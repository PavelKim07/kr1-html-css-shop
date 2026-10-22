// ==========================================
// 1. Модальное окно (Главная страница)
// ==========================================
const orderDialog = document.getElementById('order-dialog');
const orderButtons = document.querySelectorAll('.product-card__button');
const closeDialogButton = document.getElementById('close-order-dialog');
const selectedProductInput = document.getElementById('selected-product');

if (orderButtons.length > 0 && orderDialog) {
    orderButtons.forEach((button) => {
        button.addEventListener('click', () => {
            if (selectedProductInput) selectedProductInput.value = button.dataset.product;
            orderDialog.showModal();
        });
    });
}

if (closeDialogButton && orderDialog) {
    closeDialogButton.addEventListener('click', () => orderDialog.close());
}

const orderForm = document.getElementById('order-form');
const successMessage = document.getElementById('success-message');

if (orderForm) {
    orderForm.addEventListener('submit', (event) => {
        event.preventDefault();
        if (!orderForm.checkValidity()) {
            orderForm.reportValidity();
            return;
        }
        if (successMessage) successMessage.hidden = false;
        orderForm.reset();
        if (orderDialog) orderDialog.close();
    });
}

// ==========================================
// 2. Подробная карточка товара (product.html)
// ==========================================
const productTitle = document.getElementById('product-title');
const productPrice = document.getElementById('product-price');
const productDesc = document.getElementById('product-desc');
const productCategory = document.getElementById('product-category');
const productTablePrice = document.getElementById('product-table-price');
const productImage = document.getElementById('product-image');

if (productTitle) {
    // Читаем ID из ссылки (например, ?id=2)
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id') || '1';

    const products = {
        '1': {
            title: 'Товар 1 (Учебный)',
            price: '1000 руб.',
            desc: 'Это базовый учебный товар, который идеально подходит для демонстрации возможностей веб-разработки. Он отличается надежностью и доступной ценой.',
            cat: 'Базовые',
            img: 'images/item1.jpg'
        },
        '2': {
            title: 'Товар 2 (Продвинутый)',
            price: '1500 руб.',
            desc: 'Продвинутая версия учебного товара с улучшенными характеристиками. Включает в себя расширенный функционал и повышенную производительность.',
            cat: 'Продвинутые',
            img: 'images/item2.jpg'
        },
        '3': {
            title: 'Товар 3 (Со скидкой)',
            price: '2000 руб.',
            desc: 'Лучшее предложение месяца! Этот товар сочетает в себе премиальное качество и эксклюзивный дизайн. Специальная скидка действует ограниченное время!',
            cat: 'Акции',
            img: 'images/item3.jpg'
        }
    };

    if (products[productId]) {
        const data = products[productId];
        productTitle.textContent = data.title;
        productPrice.textContent = 'Цена: ' + data.price;
        productDesc.textContent = data.desc;
        productCategory.textContent = data.cat;
        productTablePrice.textContent = data.price;
        if (productImage) productImage.src = data.img;
        document.title = data.title + ' – Учебный магазин';
    }
}