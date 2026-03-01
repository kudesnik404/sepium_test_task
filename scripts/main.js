document.addEventListener("DOMContentLoaded", function () {
    const listing = document.querySelector(".listing");
    const listingTitle = listing.querySelector(".listing__title");
    const listContainer = listing.querySelector(".listing__list");
    const templateItem = listing.querySelector(".listing__item--template");

    // Устанавливаем заголовок
    listingTitle.textContent = data.title;

    // Очищаем список (кроме шаблона)
    listContainer.innerHTML = "";
    listContainer.appendChild(templateItem);

    // Рендер карточек
    data.list.forEach((item, index) => {
        const clone = templateItem.cloneNode(true);
        clone.classList.remove("listing__item--template");

        // ===== ССЫЛКИ =====
        const link = clone.querySelector(".card__link");
        link.href = item.link;

        const calcLink = clone.querySelector(".card__calc-link");
        calcLink.href = "/calc";

        // ===== АРТИКУЛ =====
        const articleSpans = clone.querySelectorAll(".card__info .card__text--muted span");
        if (articleSpans[1]) {
            articleSpans[1].textContent = item.article;
        }

        // ===== НАЗВАНИЕ =====
        clone.querySelector(".card__title").textContent = item.name;

        // ===== МАТЕРИАЛЫ =====
        const materialsList = clone.querySelector(".card__material-list");
        materialsList.innerHTML = "";

        item.materials.forEach((material, i) => {
            const materialId = `${item.article}-${material}`;

            const li = document.createElement("li");
            li.className = "card__material-item";

            li.innerHTML = `
                <input type="radio" 
                       id="${materialId}" 
                       name="${item.article}" 
                       value="${material}" 
                       ${i === 0 ? "checked" : ""} />
                <label for="${materialId}">${material}</label>
            `;

            materialsList.appendChild(li);
        });

        // ===== ЦЕНА =====
        clone.querySelector(".card__price").textContent =
            `${item.price.toLocaleString("ru-RU")} ${data.currency}`;

        const metreText = clone.querySelectorAll(".card__price-block .card__text--muted b");
        if (metreText[1]) {
            metreText[1].textContent =
                `${item.mentre.toLocaleString("ru-RU")} ${data.currency}`;
        }

        // ===== ЛАЙКИ =====
        clone.querySelector(".card__likes-count").textContent = item.likes;

        const likeInput = clone.querySelector(".card__likes-input");
        likeInput.id = `${item.article}-like`;

        // ===== СЛАЙДЕР (картинки) =====
        const sliderImages = clone.querySelector(".slider__images");
        sliderImages.innerHTML = "";

        item.images.forEach((image) => {
            if (!image) return;

            const img = document.createElement("img");
            img.src = `./images/${image}`;
            img.alt = item.name;
            img.className = "slider__image";

            sliderImages.appendChild(img);
        });

        // Добавляем карточку в список
        listContainer.appendChild(clone);
    });

    // Удаляем шаблон из DOM
    templateItem.remove();
});