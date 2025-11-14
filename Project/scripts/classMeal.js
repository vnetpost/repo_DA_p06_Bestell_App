
export class Meal {
    // #region Attributes

    // idx;            // Number               Position (index) in Meals-List

    // 14 Attributes
    id;                         // Number                       101
    idMeal;                     // String                       "idMeal101"
    idCard;                     // String                       "idCard101"
    idThumb;                    // String                       "idThumb101"
    category;                   // String                       "pizza"
    name;                       // String
    description;                // String
    picUrl;                     // String                       "./assets/images/cards/pizzas/pizza-frutti-di-mare.jpg"
    price;                      // Number | Object              {small: 6.5, normal: 8.0, family: 10.5}
    vegetarian;                 // Boolean
    highlighted;                // Boolean
    alcoholic;                  // Boolean
    size;                       // null | String | []           "0.3L" / ["small, Ø 32 cm", "normal, Ø 26 cm", "family, Ø 40 cm"]
    toppingsList;               // null | [Meal]                Just for Pizza [Meal, Meal, ...]
    amount = 0;                 // Number                       0 (Default)

    static BUCKET = [];         // Array                        [ "idThumb102", "idThumb501", "idCard102", "idCard301", "idCard503", ... ]
    //                                                          All Element-IDs of Meal-Instances with card or thumb (EXECPT Toppings)
    //                                                          For addEventListener in Restaurant

    // #endregion Attributes

    constructor(_object) { // Params: Meal-Object & Object-Index in Meal-List

        // this.idx = index; // I take the Index in Array (maybe for idCard & idDlgCard)

        this.id = _object.id;
        this.idMeal = _object.idMeal;
        this.idCard = _object.idCard;
        this.idThumb = _object.idThumb;
        this.category = _object.category;
        this.name = _object.name;
        this.description = _object.description;
        this.picUrl = _object.picUrl;
        this.price = _object.price;
        this.vegetarian = _object.vegetarian;
        this.highlighted = _object.highlighted;
        this.alcoholic = _object.alcoholic;
        this.size = _object.size;
        this.toppingsList = _object.toppingsList;
        this.amount = _object.amount

        if (this.id < 1000) { // Toppings have NO Thumb or Card or Dialog
            this.renderThumb();
            this.renderCard();
        }
    }

    getPrice(size = "small") { // Default-Param -> if (size === undefined) size = "small";
        return typeof this.price === 'object' ? this.price[size].toFixed(2) : this.price.toFixed(2);
    }

    getSize(sizeIdx) {
        return Array.isArray(this.size) ? this.size[sizeIdx] : this.size;
    }

    // #region Renders
    renderThumb() {
        if (!this.highlighted) return false;

        const ref_idThumbsContainer = document.getElementById("idThumbsContainer");
        // Wenn das Restaurant kein Element mit der ID "idThumbsContainer" hat
        // (z. B. weil im restaurantObject keine IDs vorkommen, deren zugehörige Meal-Objekte
        // in dataMenu.js als highlighted markiert sind), darf renderThumb() nicht ausgeführt werden,
        // da sonst null.appendChild() fehlschlägt.
        if (!ref_idThumbsContainer) return;

        // 1) Create article-Tag
        const ref_newElArticle = document.createElement("article");
        ref_newElArticle.id = this.idThumb; // "idThumb101"
        Meal.BUCKET.push(this.idThumb);
        ref_newElArticle.className = "cThumbs";
        // 2) Add body to ref_newElArticle
        ref_newElArticle.innerHTML = ` 
            <img class="cThumbImgs" src="${this.picUrl}" alt="${this.name} Pic">
            <div class="cThumbInfos">
                <h4>${getCategoryEmoji(this.category)} ${this.name}</h4>
                <p>from ${this.getPrice().replace(".", ",")}€</p>
            </div>
        `;

        // 3) Add ref_newElArticle to ref_idThumbsContainer 
        ref_idThumbsContainer.appendChild(ref_newElArticle);
        // 4) Add Event-Click to open the Dialog
        // ref_newElArticle.addEventListener("click", this.openDlgCard.bind(this));

    }

    renderCard() {
        const Category = capitalizeFirst(this.category);
        const ref_idCategoryCardsContainer = document.getElementById(`id${Category}CardsContainer`); // Add Card here
        // id${capitalizeFirst(this.category)}CardsContainer -> idPizzaCardsContainer

        // 1) Create article-Tag
        const ref_newElArticle = document.createElement("article");
        ref_newElArticle.id = this.idCard; // "idCard101"
        Meal.BUCKET.push(this.idCard);
        ref_newElArticle.className = "cCards";
        // 2) Add body to ref_newElArticle
        ref_newElArticle.innerHTML = `
                <div class="cCardInfos" >
                    <div class="cCardInfoHeaders">
                        <h3>${this.name}</h3>
                        <a href="">Item Info</a>
                    </div>
                    <div class="cCardInfoPrices">
                        <span>from</span>
                        <strong>${this.getPrice().replace(".", ",")}€</strong>
                    </div>
                    <p class="cCardInfoDescs">${this.description}</p>
                </div >
                <div class="cCardMedias">
                    <img src="${this.picUrl}" alt="${this.name} Card Pic">
                    <button id="idCardBtn${this.id}" class="cCardBtns" type="button">
                        <img src="./assets/images/icons/red-plus.svg" alt="red-plus.svg">
                    </button>
                </div>
        `;

        // 3) Add ref_newElArticle to ref_idCategoryCardsContainer
        ref_idCategoryCardsContainer.appendChild(ref_newElArticle);
        // 4) Add Event-Click to open the Dialog
        // ref_newElArticle.addEventListener("click", this.openDlgCard.bind(this));
    }

    // #endregion Renders

    //##################################################################
}

// #region Extra Funcs
export function capitalizeFirst(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export function toSingularAndCapitalized(str) {
    const singular = str.slice(0, -1);
    return singular.charAt(0).toUpperCase() + singular.slice(1);
}

export function isVegetarian(bool) {
    return bool ? "Vegetarian" : "Not Vegetarian";
}

export function getCategoryEmoji(category) {
    if (category === "pizzas") return "🍕";
    if (category === "pastas") return "🍝";
    if (category === "salads") return "🥗";
    if (category === "drinks") return "🍹";
    return "🍽️";
}


// #endregion Extra Funcs
