import { getLS, menuObjectsList, RESTAURANTS } from "./localStorage.js";
import { capitalizeFirst, Meal } from "./classMeal.js";
import { renderTmpDlgCardPizza } from "../assets/data/templates/tempDlgCardPizza.js";
import { renderTmpDlgCardPasta } from "../assets/data/templates/tempDlgCardPasta.js";
import { renderTmpDlgCardSalad } from "../assets/data/templates/tempDlgCardSalad.js";
import { renderTmpDlgCardDrink } from "../assets/data/templates/tempDlgCardDrink.js";
import { Order } from "./classOrder.js";

// Die Klasse "Restaurant" ist dafür verantwortlich, nur die Grundstruktur der Restaurant-Seite bereitzustellen.
// Sie kümmert sich also um den Aufbau des pageRestaurant.html
// Die eigentlichen Meal-Instanzen (z. B. Pizza, Pasta, Salat, Drinks) werden jedoch
// von einer separaten Klasse namens "Meal" erzeugt.
// 
// Eine Methode innerhalb der Restaurant-Klasse (generateMealInstancesUNDcompletDATAMENU) ruft die Meal-Klasse auf,
// um diese Meal-Instanzen zu generieren und an der richtigen Stelle auf der Seite einzufügen.
// ****** Kurz gesagt: "Restaurant" erstellt die Basis-Struktur, "Meal" fügt die Inhalte ein. ******

// ************************************ Das Ergebnisse von Restaurant *****************************************
/////////////////////////// Abgesehen von Darstellung von Restaurant-Contents sind:
/////////////////////////// 1) Restaurant.RECORDS 
/////////////////////////// 2) Restaurant.RECORDS_COEFFICIENT
////////////////////////////////////// Sie werden durch Basket-Class genommen.

export class Restaurant {
    // #region Attributes
    idx;                                        // Number               Position (index) in Restaurant-List

    // 9 Attributes
    id;                                         // Number               1
    idRestaurant;                               // String               "idRestaurant1"
    name;                                       // String               "Pizza Antarctica"
    picUrl;                                     // String               "./assets/images/restaurants/restaurant-1/restImg-1.jpg"
    rating;                                     // String               "4,9 (320+)"
    minOrder;                                   // String               "Min. 15,00 €"
    delivery;                                   // String               "2,50€ (today)" OR "5€ (21 Days)"
    deliveryImg;                                // String               "./assets/images/icons/horse.svg",
    dataMenu = {};                              // Object (Ids)         { 
    //                                                                      pizzas: [101, 102, 104, 105], 
    //                                                                      pastas: [201, 202], 
    //                                                                      salads: [301, 303], 
    //                                                                      drinks: [501, 503, 504] 
    //                                                                  }
    //
    static DATAMENU = {};                       // Object of Meal       An attribute for the Class-Restaurant itself  
    //                                                                  { 
    //                                                                      pizzas: [inst1, ...], pastas: [inst1, ...], 
    //                                                                      salads: [inst1, ...], drinks: [inst1, ...], 
    //                                                                      toppings[inst1, ...] 
    //                                                                  }
    // dataMenu ---> Ids to Instances ---> DATAMENU (same structure)
    // Jede "id" in this.dataMenu --> ein Instance (class Meal)
    // fuer spaeterern Zugriffe speichern. (Vielleicht nicht noetig)

    static DLGCARD_HTML_INPUTS_IDS = [];        // Array                A List of all HTML-Inputs-IDs of all DATAMENU's Instances 
    //                                                                  in the Dialog-Card
    //                                                                  [
    //                                                                      "idInputSmall104",
    //                                                                      "idInputNormal104",
    //                                                                      "idInputFamily104",
    //                                                                      "idInputTop1001",
    //                                                                      "idInputTop1002",
    //                                                                      "idInputDrink501",
    //                                                                      "idInputDrink504"
    //                                                                  ]
    //
    static RECORDS = [];                        // Array                Exact like DLGCARD_HTML_INPUTS_IDS, but just *SELECTED* HTML-Inputs-IDs 
    //                                                                  [
    //                                                                      "idInputPizzaSmall104",
    //                                                                      "idInputTop1001",
    //                                                                      "idInputTop1002",
    //                                                                      "idInputDrink501",
    //                                                                      "idInputDrink504"
    //                                                                  ]
    //
    static RECORDS_VALUES = [];                 // Array                Just will be used in the Order-Class
    //                                                                  A List of all *SELECTED* HTML-Inputs-Values of all RECORDS
    //                                                                  [
    //                                                                      "1007_Hot Sauce_null_0.50",
    //                                                                      "101_Frutti di Mare_family, Ø 40 cm_12.50",
    //                                                                      "503_Orange Juice_0.3L_2.20"
    //                                                                  ]
    //
    static RECORDS_COEFFICIENT = 1              // Number               RECORDS_COEFFICIENT to multiply Records's sum
    //
    static RECORDS_SUM = 0;                     // Number               Total-Price of all Records 
    //                                                                  Before multiplication with RECORDS_COEFFICIENT
    //                                                                  10.20
    //
    static DELIVERY = "";                    // String               "2,50€ (today)" OR "5€ (21 Days)"
    //
    static ORDERNAME = "";                      // string               "Pizza Salami" OR 
    //                                                                  "Penne with Cream Sauce" OR 
    //                                                                  "Caprese Salad" OR
    //                                                                  "Coca-Cola"
    //    

    // #endregion Attribute

    constructor(_object, resIndex) { // Params: Restaurant-Object & Object-Index in Restaurant-List

        this.idx = resIndex;   // I take the Index in Array (maybe for ids)

        this.id = _object.id;
        this.idRestaurant = _object.idRestaurant;
        this.name = _object.name;
        this.picUrl = _object.picUrl;
        this.rating = _object.rating;
        this.minOrder = _object.minOrder;
        this.delivery = _object.delivery;
        this.deliveryImg = _object.deliveryImg;
        this.dataMenu = _object.dataMenu;
        Restaurant.DELIVERY = (getLS(RESTAURANTS))[resIndex].delivery;

        // 1) Create DATAMENU
        Object.keys(this.dataMenu).forEach(key => Restaurant.DATAMENU[key] = []);
        // 2) Render the whole restaurant-Structure
        this.renderRestaurant();
        //// then in renderRestaurant(): 
        //// this.renderRestNavBar();
        //// this.renderHighlightsArea();

        this.renderMenuCategories();
        // this.openDlgBasketDesktopView();

    }
    // #region Renders

    renderRestaurant() {
        // Where to add Fav-Restaurant --> "idAddFavRest" in pageRestaurant.html
        const ref_idAddFavRest = document.getElementById("idAddFavRest");

        // Create Fav-Restaurant

        /// A) Create a div-Tag for Fav-Restaurant
        const ref_newElDiv = document.createElement("div");

        ref_newElDiv.id = this.idRestaurant; // "idRestaurantX"
        ref_newElDiv.className = "cRestaurants";
        ref_newElDiv.innerHTML = /*html*/`
                <div class="cRestImgArea">
                    <img id="idRestImg" src="${this.picUrl}" alt="Restaurant pic">
                    <img id="idFloatingLogo" src="./assets/images/open.svg" alt="open-wood">
                </div>
                <div class="cRestBody">
                    <div class="cRestHeaderArea">
                        <div class="cRestTitle">
                            <h1>${this.name}</h1>
                            <div class="cRestTitleAbout">
                                <img src="./assets/images/icons/infos.svg" alt="">
                                <p>About Us</p>
                            </div>
                        </div>
                        <div class="cRestInfos">
                            <div class="cRestInfo">
                                <img src="./assets/images/icons/star.svg" alt="">
                                <p>${this.rating}</p>
                            </div>
                            <div class="cRestInfo">
                                <img src="./assets/images/icons/case.svg" alt="">
                                <p>${this.minOrder}</p>
                            </div>
                            <div class="cRestInfo">
                                <img src="${this.deliveryImg}" alt="">
                                <p>${this.delivery}</p>
                            </div>
                        </div>
                    </div>

                    <nav class="cRestNav">
                        <ul id="idRestNavListsContainer">
                            <!-- Add with renderRestNavBar() -->
                        </ul>
                    </nav>

                    <div class="cRestMenu">
                        <div id="idHighlightsArea" class="cHighlightsArea">
                            <!-- renderHighlightsArea() -->

                            <!-- <h2>Highlights</h2> -->
                            <!-- <div id="idThumbsContainer" class="cThumbsContainer"> -->
                                    <!-- Add idThumbX mit generateMealInstancesUNDcompletDATAMENU() -->
                            <!-- </div> -->
                        </div>

                        <div id="idMenuCategoriesContainer" class="cMenuCategories">
                            <!-- Add Menu-Categories with renderMenuCategories() -->
                                
                            <!-- <div id="idCatPizza" class="cCats"> -->
                                <!-- <h2>Pizzas</h2> -->
                                <!-- <div id="idPizzasCardsContainer" class="cCardsArea"> -->
                                    <!-- Add Cards with generateMealInstancesUNDcompletDATAMENU() -->
                                <!-- </div> -->
                            <!-- </div> -->
                        </div>

                    </div>

                </div>
        `;

        // B) Add created div-Tag (ref_newElDiv) to ref_idAddFavRest
        ref_idAddFavRest.appendChild(ref_newElDiv);
        // Now go to:
        this.renderRestNavBar();
        this.renderHighlightsArea();

    }

    renderRestNavBar() {
        const ref_idRestNavListsContainer = document.getElementById("idRestNavListsContainer");

        if (this.isOneOfMealsHighlighted()) {
            ref_idRestNavListsContainer.innerHTML += `
                <li>Highlights</li>
            `;
        }
        // dataMenu = { pizzas: [101, 102, 104, 105], pastas: [201, 202], salads: [301, 303], drinks: [501, 503, 504] }
        Object.keys(this.dataMenu).forEach(cat => {
            if (cat === "toppings") return;
            const Cat = capitalizeFirst(cat);
            ref_idRestNavListsContainer.innerHTML += `
                <li><a href="#idCat${Cat}">${Cat}</a></li>
            `;
        });
    }

    isOneOfMealsHighlighted() {
        // dataMenu = { pizzas: [101, 102, 104, 105], pastas: [201, 202], salads: [301, 303], drinks: [501, 503, 504] }        
        const checkList = []; // Restaurant Instances Ids List -> [101, 102, 104, 105, 201, 202, 301, 303, 501, 503, 504]
        Object.keys(this.dataMenu).forEach(key => this.dataMenu[key].forEach(item => checkList.push(item)));

        for (const resObj of menuObjectsList) {
            for (const obj of getLS(resObj)) {
                if (checkList.includes(obj.id) && obj.highlighted === true) return true; else continue;
            }
        }
        return false;
    }

    renderHighlightsArea() {
        if (this.isOneOfMealsHighlighted()) {
            document.getElementById("idHighlightsArea").innerHTML += `                
                    <h2>Highlights</h2>
                    <div id="idThumbsContainer" class="cThumbsContainer">
                        <!-- Add idThumbX mit generateMealInstancesUNDcompletDATAMENU() -->
                    </div>                
            `;
        }
    }

    renderMenuCategories() {
        // dataMenu: { pizzas: [101, 102, 104, 105], pastas: [201, 202], salads: [301, 303], drinks: [501, 503, 504] }

        // console.log(`Restaurant.renderThumb() --> Rendering Categories ...`);
        const ref_idMenuCategoriesContainer = document.getElementById("idMenuCategoriesContainer");

        // <div id="idMenuCategoriesContainer" class="cMenuCategories">
        //     <!-- Add Menu-Categories with renderMenuCategories() -->
        //
        //     <div id="idCatPizzas" class="cCats">
        //         <h2>Pizzas</h2>
        //         <div id="idPizzasCardsContainer" class="cCardsArea">
        //             <!-- Add Cards with generateMealInstancesUNDcompletDATAMENU() -->
        //         </div>
        //     </div>
        //
        // </div>

        Object.keys(this.dataMenu).forEach(cat => {
            if (cat === "toppings") return;
            let Cat = capitalizeFirst(cat);
            const ref_newElDiv = document.createElement("div");
            ref_newElDiv.id = `idCat${cat}`; // "idCatPizzas"
            ref_newElDiv.className = "cCats";
            ref_newElDiv.innerHTML = ` 
                    <h2>${Cat}</h2>
                    <div id="id${Cat}CardsContainer" class="cCardsArea">
                        <!-- Add Cards with generateMealInstancesUNDcompletDATAMENU() -->
                    </div>
            `;
            ref_idMenuCategoriesContainer.appendChild(ref_newElDiv);
        });
        // At the End Create Meal-Instances (die HTMLs werden auch mithergestellt)
        this.generateMealInstancesUNDcompletDATAMENU();
    }

    renderDlgCard(id) {
        const ref_idDlgCardContainer = document.getElementById("idDlgCardContainer");

        if (id >= 100 && id < 200) renderTmpDlgCardPizza(id);
        else if (id >= 200 && id < 300) renderTmpDlgCardPasta(id);
        else if (id >= 300 && id < 400) renderTmpDlgCardSalad(id);
        else if (id >= 500 && id < 600) renderTmpDlgCardDrink(id);

        this.dlgCardEvents();
    }

    // #endregion Renders

    generateMealInstancesUNDcompletDATAMENU() {
        // dataMenu: { pizzas: [101, 102, 104, 105], pastas: [201, 202], salads: [301, 303], drinks: [501, 503, 504] }
        const idsList = []; // Restaurant-Instances-Ids List -> [101, 102, 104, 105, 201, 202, 301, 303, 501, 503, 504]
        Object.keys(this.dataMenu).forEach(key => this.dataMenu[key].forEach(item => idsList.push(item)));

        // 1) Fill Meal-Instances in Restaurant.DATAMENU without extra put toppings in toppingsList of pizzas
        //// Because i have to first fill the toppings in Restaurant.DATAMENU.toppings
        //// Then in second step use Restaurant.DATAMENU.toppings to fill Restaurant.DATAMENU.pizzas[X].toppingsList
        menuObjectsList.forEach(resObj => {
            getLS(resObj).forEach(MealObj => {
                if (idsList.includes(MealObj.id)) {
                    const MealInst = new Meal(MealObj)
                    Restaurant.DATAMENU[MealInst.category].push(MealInst);
                }
            });
        });

        // 2) complete Restaurant.DATAMENU
        //// put Restaurant.DATAMENU.toppings in Restaurant.DATAMENU.pizzas[X].toppingsList
        if (Restaurant.DATAMENU.toppings && Restaurant.DATAMENU.toppings.length > 0 && Restaurant.DATAMENU.pizzas && Restaurant.DATAMENU.pizzas.length > 0) {
            Restaurant.DATAMENU.toppings.forEach(toppingInst => {
                Restaurant.DATAMENU.pizzas.forEach(pizzaInst => {
                    pizzaInst.toppingsList.push(toppingInst);
                });

            });
        }

        // 3) Add Event-Click to All cards & thumbs to open the Dialog-Card
        Meal.BUCKET.forEach(elId => {
            if (!elId.startsWith("idThumb")) return; // alles ignorieren, was nicht "idThumb" ist
            const ref_TargetEl = document.getElementById(elId);
            const instId = parseInt(elId.match(/\d+$/)[0]); // z.B. 102
            ref_TargetEl.addEventListener("click", () => this.openDlgCard(instId));
        });

        // Suche alle Buttons mit ID, die mit "idCardBtn" beginnt:
        document.querySelectorAll('[id^="idCardBtn"]').forEach(btn => {
            const instId = btn.id.replace("idCardBtn", ""); // extrahiere 101, 102, 503, ...
            btn.addEventListener("click", () => this.openDlgCard(instId));
        });

    }

    openDlgCard(id) {
        this.renderDlgCard(id);
        const ref_idDlgCard = document.getElementById("idDlgCard");

        ref_idDlgCard.classList.add("opened");
        ref_idDlgCard.showModal();
    }

    closeDlgCard() {

        Restaurant.DLGCARD_HTML_INPUTS_IDS = [];
        Restaurant.RECORDS = [];
        Restaurant.RECORDS_VALUES = [];
        Restaurant.RECORDS_COEFFICIENT = 1;
        Restaurant.RECORDS_SUM = 0;
        Restaurant.ORDERNAME = "";

        const ref_idDlgCard = document.getElementById("idDlgCard");

        ref_idDlgCard.classList.remove("opened");
        ref_idDlgCard.close();
        ref_idDlgCard.remove(); // clears the dialog window (After config "renderDlgCard")
    }

    static recordsManagement(elId) { // elId -> "idInputTop1001"
        // Restaurant.RECORDS will be Updated (Unique-Checked-Inputs-List)
        // -> [ "idInputDrink503", "idInputPizzaSmall101", "idInputTop1001", "idInputTop1002" ]
        const ref_El = document.getElementById(elId);

        // 1) If Checked -> Put the Element's ID in RECORDS
        if (ref_El.checked) Restaurant.RECORDS.push(elId);

        // 2) Make Records Unique
        Restaurant.RECORDS = [...new Set(Restaurant.RECORDS)];

        // 3) Prove again if all Records in the list are Checked-Inputs-Elements
        // At the end -> Unique-Checked-Elements: [ "idInputDrink503", "idInputPizzaSmall101", "idInputTop1001", "idInputTop1002" ]
        const tmpRcords = Restaurant.RECORDS;
        Restaurant.RECORDS = []; // Make Restaurant.RECORDS empty
        tmpRcords.forEach(elId => {
            const ref_El = document.getElementById(elId);
            if (ref_El.checked) Restaurant.RECORDS.push(elId);
        });
        // console.log(Restaurant.DLGCARD_HTML_INPUTS_IDS);
        // console.log(Restaurant.RECORDS);
        Restaurant.calRecordsSum();
    }

    static calRecordsSum() {
        // console.log(Restaurant.DLGCARD_HTML_INPUTS_IDS);
        // console.log(Restaurant.RECORDS);
        // Restaurant.RECORDS -> [ "idInputDrink503", "idInputPizzaSmall101", "idInputTop1001", "idInputTop1002" ]
        // Restaurant.RECORDS_VALUES -> "101_Frutti di Mare_family, Ø 40 cm_12.50" ,...
        //                          [
        //                              "1007_Hot Sauce_null_0.50",
        //                              "101_Frutti di Mare_family, Ø 40 cm_12.50",
        //                              "503_Orange Juice_0.3L_2.20"
        //                          ]
        //
        // Reset sum before calculation
        Restaurant.RECORDS_SUM = 0;

        // Berechne Summe aller Preise aus den HTML-Inputs
        Restaurant.RECORDS.forEach(elId => {
            const ref_El = document.getElementById(elId);
            if (!ref_El) return; // Falls Element fehlt

            const parts = ref_El.value.split("_");
            // Beispiel: "101_Frutti di Mare_family, Ø 40 cm_12.50"
            // -> [ "101", "Frutti di Mare", "family, Ø 40 cm", "12.50" ]
            const priceStr = parts.at(-1); // nimmt das letzte Element -> "12.50"
            const price = parseFloat(priceStr);

            if (!isNaN(price)) {
                Restaurant.RECORDS_SUM += price;
            }
        });

        // Preis multiplizieren mit Anzahl (Coefficient)
        const total = (Restaurant.RECORDS_SUM * Restaurant.RECORDS_COEFFICIENT).toFixed(2);

        // UI aktualisieren
        document.getElementById("idDlgCardCoefficient").innerText = Restaurant.RECORDS_COEFFICIENT;
        document.getElementById("idDlgCardRecordsSum").innerText = `${total} €`;
    }

    // #region Event-Management

    dlgCardEvents() {

        // BTN (close) 
        document.getElementById("cDlgCardCloseBtn").addEventListener("click", () => {
            this.closeDlgCard()
        });

        // Backdrop Click -> Close
        const ref_idDlgCard = document.getElementById("idDlgCard");
        ref_idDlgCard.addEventListener("click", (e) => {
            if (e.target == ref_idDlgCard) this.closeDlgCard();
        });

        // ESC -> Close
        ref_idDlgCard.addEventListener("keydown", (e) => {
            if (e.key === "Escape") {
                e.preventDefault();
                this.closeDlgCard()
            }
        });


        // Change on User Inputs 
        Restaurant.DLGCARD_HTML_INPUTS_IDS.forEach(elId => {
            // console.log(Restaurant.DLGCARD_HTML_INPUTS_IDS);
            // console.log(Restaurant.RECORDS);
            const ref_El = document.getElementById(elId);
            ref_El.addEventListener("change", () => {
                // console.log(ref_El.id); // "idInputTop1001"             
                Restaurant.recordsManagement(ref_El.id); // ref_El.id = "idInputTop1001" (Update Restaurant.RECORDS)
                // console.log(Restaurant.RECORDS);
            });
        });

        // BTN (-)
        const ref_idDlgCardBtnMinus = document.getElementById("idDlgCardBtnMinus");
        ref_idDlgCardBtnMinus.addEventListener("click", (e) => {
            if (Restaurant.RECORDS_COEFFICIENT === 1) return;
            if (Restaurant.RECORDS_COEFFICIENT > 1) Restaurant.RECORDS_COEFFICIENT--;
            Restaurant.calRecordsSum();
        });

        // BTN (+) 
        const ref_idDlgCardBtnPlus = document.getElementById("idDlgCardBtnPlus");
        ref_idDlgCardBtnPlus.addEventListener("click", (e) => {
            Restaurant.RECORDS_COEFFICIENT++;
            Restaurant.calRecordsSum();
        });

        // BTN (Submit)
        const ref_idDlgCardBtnSubmit = document.getElementById("idDlgCardBtnSubmit");
        ref_idDlgCardBtnSubmit.addEventListener("click", (e) => {
            e.preventDefault();
            // Before close the Dialog the Checked-Inputs-Values will be collected
            Restaurant.RECORDS.forEach(elId => {
                const ref_El = document.getElementById(elId);
                Restaurant.RECORDS_VALUES.push(ref_El.value);
            });

            // [Restaurant.DLGCARD_HTML_INPUTS_IDS,
            // Restaurant.RECORDS,
            // Restaurant.RECORDS_VALUES,
            // Restaurant.RECORDS_COEFFICIENT,
            // Restaurant.RECORDS_SUM,
            // Restaurant.ORDERNAME].forEach(item => console.log(item)
            // );

            const radios = document.querySelectorAll('input[type="radio"]');
            let orderActive = false;
            radios.forEach(radio => {
                if (radio.checked) orderActive = true;
            });

            if (orderActive === true) {
                const newOrder = new Order({
                    _dataMenu: Restaurant.DATAMENU,
                    _recordsValues: Restaurant.RECORDS_VALUES,
                    _coefficient: Restaurant.RECORDS_COEFFICIENT,
                    _records_sum: Restaurant.RECORDS_SUM,
                    _orderName: Restaurant.ORDERNAME,
                    _delivery: Restaurant.DELIVERY,
                });

                this.closeDlgCard();
            };
        });
        // -------------------
    }
    // #endregion Event-Management

    //##################################################################
}

// original HTML-Element (idRestaurantX)
{/* <section id="idAddFavRest">
    <!-- Add idRestaurantX -->
    <div id="idRestaurant2" class="cRestaurants">
        <img class="cRestImg" src="./assets/images/restaurants/restaurant_2.jpg" alt="Restaurant pic">

        <div class="cRestBody content">

            <div class="cRestHeaderArea">
                <div class="cRestTitle">
                    <h1>Pasta Aurora</h1>
                    <div class="cRestTitleAbout">
                        <img src="./assets/images/icons/infos.svg" alt="">
                        <p>About Us</p>
                    </div>
                </div>
                <div class="cRestInfos">
                    <div class="cRestInfo">
                        <img src="./assets/images/icons/star.svg" alt="">
                        <p>4,7 (280+)</p>
                    </div>
                    <div class="cRestInfo">
                        <img src="./assets/images/icons/case.svg" alt="">
                        <p>Min. 12,00 €</p>
                    </div>
                    <div class="cRestInfo">
                        <img src="./assets/images/icons/rocket.svg" alt="">
                        <p>2,50 € (today)</p>
                    </div>
                </div>
            </div>

            <nav class="cRestNav">
                <ul id="idRestNavListsContainer">
                    <!-- Add with renderRestNavBar() -->

                    <!-- <li>Highlights</li> -->
                    <!-- <li><a href="#idCatPizza">Pizza</a></li> -->
                    <!-- <li><a href="#idCatPasta">Pasta</a></li> -->
                    <!-- <li><a href="#idCatSalad">Salad</a></li> -->
                    <!-- <li><a href="#idCatDrink">Drink</a></li> -->

                    <li>Highlights</li>

                    <li><a href="#idCatPizzas">Pizzas</a></li>
                </ul>
            </nav>

            <div class="cRestMenu">
                <div id="idHighlightsArea" class="cHighlightsArea">
                    <!-- renderHighlightsArea() -->

                    <!-- <h2>Highlights</h2> -->
                    <!-- <div id="idThumbsContainer" class="cThumbsContainer"> -->
                    <!-- Add idThumbX mit generateMealInstancesUNDcompletDATAMENU() -->
                    <!-- </div> -->


                    <h2>Highlights</h2>
                    <div id="idThumbsContainer" class="cThumbsContainer">
                        <!-- Add idThumbX mit generateMealInstancesUNDcompletDATAMENU() -->
                        <article id="idThumb101" class="cThumbs">
                            <img src="./assets/images/restaurants/pizzas/frutti-di-mare.jpg" alt="Frutti di Mare Pic">
                            <div class="cThumbsInfos">
                                <h4>pizzas</h4>
                                <p>Frutti di Mare</p>
                                <span>from 7.50€</span>
                            </div>
                        </article>
                    </div>
                </div>

                <div id="idMenuCategoriesContainer" class="cMenuCategories">
                    <!-- Add Menu-Categories with renderMenuCategories() -->

                    <!-- <div id="idCatPizza" class="cCats"> -->
                    <!-- <h2>Pizzas</h2> -->
                    <!-- <div id="idPizzasCardsContainer" class="cCardsArea"> -->
                    <!-- Add Cards with generateMealInstancesUNDcompletDATAMENU() -->
                    <!-- </div> -->
                    <!-- </div> -->

                    <div id="idCatpizzas" class="cCats">
                        <h2>Pizzas</h2>
                        <div id="idPizzasCardsContainer" class="cCardsArea">
                            <!-- Add Cards with generateMealInstancesUNDcompletDATAMENU() -->
                            <article id="idCard101" class="cCards">
                                <div class="cCardInfos">
                                    <div class="cCardInfoHeaders">
                                        <h3>Frutti di Mare</h3>
                                        <a href="">Item Info</a>
                                    </div>
                                    <div class="cCardInfoPrices">
                                        <span>from</span>
                                        <strong>7.50€</strong>
                                    </div>
                                    <p class="cCardInfoDescs">With seaMeal, tomato sauce, and mozzarella</p>
                                </div>
                                <div class="cCardMedias">
                                    <img src="./assets/images/restaurants/pizzas/frutti-di-mare.jpg"
                                        alt="Frutti di Mare Card Pic">
                                    <button id="idCardBtn101" class="cCardBtns" type="button">
                                        <img src="./assets/images/icons/red-plus.svg" alt="red-plus.svg">
                                    </button>
                                </div>
                            </article>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    </div>
</section> */}




