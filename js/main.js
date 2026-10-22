// ================================
// Модальное окно с формой заявки
// ================================
const orderDialog = document.getElementById('order-dialog');
const orderButtons = document.querySelectorAll('.product-card__button');
const closeDialogButton = document.getElementById('close-order-dialog');
const selectedProductInput = document.getElementById('selected-product');

if (orderButtons.length > 0 && orderDialog) {
    orderButtons.forEach((button) => {
        button.addEventListener('click', () => {
            const productName = button.dataset.product;
            if (selectedProductInput) selectedProductInput.value = productName;
            orderDialog.showModal();
        });
    });
}

if (closeDialogButton && orderDialog) {
    closeDialogButton.addEventListener('click', () => {
        orderDialog.close();
    });
}

const orderForm = document.getElementById('order-form');
const successMessage = document.getElementById('success-message');

if (orderForm) {
    orderForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const formElements = Array.from(orderForm.elements);

        formElements.forEach((element) => {
            if (element.willValidate) element.removeAttribute('aria-invalid');
        });

        if (!orderForm.checkValidity()) {
            formElements.forEach((element) => {
                if (element.willValidate && !element.checkValidity()) {
                    element.setAttribute('aria-invalid', 'true');
                }
            });
            orderForm.reportValidity();
            return;
        }

        if (successMessage) successMessage.hidden = false;
        orderForm.reset();
        if (orderDialog) orderDialog.close();
    });
}

// ==========================================
// Логика для страницы подробного товара
// ==========================================
const productTitle = document.getElementById('product-title');
const productPrice = document.getElementById('product-price');
const productDesc = document.getElementById('product-desc');
const productCategory = document.getElementById('product-category');
const productTablePrice = document.getElementById('product-table-price');
const productImage = document.getElementById('product-image');

if (productTitle) {
    // Читаем URL (например, product.html?id=2)
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id') || '1'; // По умолчанию 1

    const products = {
        '1': {
            title: 'Товар 1 (Учебный)',
            price: '1000 руб.',
            desc: 'Это базовый учебный товар, который идеально подходит для демонстрации возможностей веб-разработки. Он отличается надежностью, простотой использования и доступной ценой. Отличный выбор для начинающих пользователей.',
            cat: 'Базовые',
            img: 'images/item1.jpg'
        },
        '2': {
            title: 'Товар 2 (Продвинутый)',
            price: '1500 руб.',
            desc: 'Продвинутая версия учебного товара с улучшенными характеристиками. Включает в себя расширенный функционал и повышенную производительность. Рекомендуется для тех, кто уже знаком с базовой версией.',
            cat: 'Продвинутые',
            img: 'images/item2.jpg'
        },
        '3': {
            title: 'Товар 3 (Со скидкой)',
            price: '2000 руб.',
            desc: 'Лучшее предложение месяца! Этот товар сочетает в себе премиальное качество и эксклюзивный дизайн. Специальная скидка действует ограниченное время, поэтому успейте оформить заявку по самой выгодной цене.',
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