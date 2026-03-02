document.addEventListener("DOMContentLoaded", function () {

    const listing = document.querySelector(".listing");
    const listingTitle = listing.querySelector(".listing__title");
    const listContainer = listing.querySelector(".listing__list");
    const templateItem = listing.querySelector(".listing__item--template");

    // Устанавливаем заголовок
    listingTitle.textContent = data.title;

    // Очищаем список полностью
    listContainer.innerHTML = "";

    // Рендер карточек
    data.list.forEach((item) => {

        // Клонируем шаблон
        const clone = templateItem.cloneNode(true);
        clone.classList.remove("listing__item--template");
        clone.style.display = "";

        // ===== ССЫЛКИ =====
        const link = clone.querySelector(".card__link");
        link.href = item.link;

        const calcLink = clone.querySelector(".card__calc-link");
        calcLink.href = "/calc";

        // ===== СЛАЙДЫ =====
        const glideElement = clone.querySelector(".glide");
        const slidesContainer = glideElement.querySelector(".glide__slides");
        const bulletsContainer = glideElement.querySelector(".glide__bullets");

// Очистка перед вставкой
        slidesContainer.innerHTML = "";
        bulletsContainer.innerHTML = "";

        const validImages = item.images.filter(img => img);

        const resizeBtn = glideElement.querySelector(".glide__resize");

        if (validImages.length === 0) {
            const slide = document.createElement("li");
            slide.className = "glide__slide";
            slide.innerHTML = `<div class="card__no-photo">Нет фото</div>`;
            slidesContainer.appendChild(slide);

            const arrows = glideElement.querySelector(".glide__arrows");
            if (arrows) arrows.style.display = "none";

            if (resizeBtn) resizeBtn.style.display = "none";
        } else {
            if (resizeBtn) resizeBtn.style.display = "";

            validImages.forEach((image, i) => {
                const slide = document.createElement("li");
                slide.className = "glide__slide";

                const img = document.createElement("img");
                img.src = `assets/images/${image}`;
                img.alt = item.name;
                img.loading = "lazy";
                slide.appendChild(img);

                slidesContainer.appendChild(slide);

                if (validImages.length > 1) {
                    const bullet = document.createElement("button");
                    bullet.className = "glide__bullet";
                    bullet.setAttribute("data-glide-dir", "=" + i);
                    bulletsContainer.appendChild(bullet);
                }
            });

            if (validImages.length <= 1) {
                const arrows = glideElement.querySelector(".glide__arrows");
                if (arrows) arrows.style.display = "none";
            }

            if (resizeBtn && !resizeBtn.dataset.fancyboxInitialized) {
                resizeBtn.dataset.fancyboxInitialized = "true";
                resizeBtn.addEventListener("click", e => {
                    e.preventDefault();
                    e.stopPropagation();

                    const slides = glideElement.querySelectorAll(
                        ".glide__slides > li:not(.glide__slide--clone) img"
                    );

                    const items = Array.from(slides).map(img => ({
                        src: img.src,
                        type: "image",
                        caption: img.alt || ""
                    }));

                    if (items.length) Fancybox.show(items);
                });
            }
        }

        // ===== ОПИСАНИЕ =====
        const body = clone.querySelector(".card__body");

        const oldDescription = body.querySelector(".card__description");
        if (oldDescription) oldDescription.remove();

        if (item.description && item.description.trim() !== "") {
            const desc = document.createElement("div");
            desc.className = "card__description";
            desc.textContent = item.description;
            body.prepend(desc);
        }

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

        // Добавляем карточку в DOM
        listContainer.appendChild(clone);

        const imagesCount = validImages.length;

        if (imagesCount === 0) {
            return;
        }
        const isMobile = window.innerWidth < 768;
        const hasMultiple = imagesCount > 1;

        new Glide(glideElement, {
            type: hasMultiple ? "carousel" : "slider",
            perView: 1,
            gap: 0,
            animationDuration: 400,
            rewind: false,
            autoplay: (isMobile && hasMultiple) ? 3000 : false,
            swipeThreshold: hasMultiple ? 80 : false,
            dragThreshold: hasMultiple ? 120 : false
        }).mount();
    });
})
;