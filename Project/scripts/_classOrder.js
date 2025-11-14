import { toSingularAndCapitalized } from "./classMeal.js";



export class Order {

    orderId;                    // Number           3  
    //                                              The ID of the instance itself & is also automatically 
    //                                              the Index in Order.BASKET (BUT before using the Delete-BTN)
    //
    idOrder;                    // String           "idOrder_3" Element-Id    
    order = [];                 // Array            A List of all *SELECTED* HTML-Inputs-Values of all
    //                                              Restaurant.DIALOGCARD_RECORDS
    //                                              [
    //                                                  "503",
    //                                                  "1002",
    //                                                  "1005",
    //                                                  "101_normal"
    //                                              ]
    //
    coefficient;                // Number           coefficient to multiply Records's sum of a order

    static IDX = 0;             // Number           3
    static DELIVERYFEE;         // String           "free (21 Days)"
    static SUBTOTAL = 0;            // Number           23.00 €
    static BASKET = [];         // Array            All Order-Instances
    static DATAMENU = {}        // Object           From Restaurant.DATAMENU
    //                                              { 
    //                                                 pizzas: [inst1, ...], pastas: [inst1, ...], 
    //                                                 salads: [inst1, ...], drinks: [inst1, ...], 
    //                                                 toppings[inst1, ...] 
    //                                              }

    constructor(_dataMenu, _recordsValues, _coefficient, _deliveryFee) {

        Order.IDX++;

        this.orderId = Order.IDX;                   // 3
        this.idOrder = `idOrder_${Order.IDX}`;      // "idOrder_3" Element-Id
        this.order = _recordsValues;                // [ 105_family, 1007, 503 ]
        this.coefficient = _coefficient;            // 3

        Order.DELIVERYFEE = _deliveryFee;           // "free (21 Days)"
        Order.BASKET.push(this);                    // Collect all new-Orders of User
        Order.DATAMENU = _dataMenu                  // Objects from all Restaurant's Meals-Instances

        // console.log(Order.BASKET);                  // Order.BASKET -> [oredr, order, ...]
        //                                          [
        //                                              {
        //                                                  "orderId": 1,
        //                                                  "idOrder": "idOrder_1",
        //                                                  "order": [
        //                                                      "102_family",
        //                                                      "1002",
        //                                                      "1005",
        //                                                      "503"
        //                                                  ],
        //                                                  "coefficient": 4
        //                                              },
        //                                              {
        //                                                  "orderId": 2,
        //                                                  "idOrder": "idOrder_2",
        //                                                  "order": [
        //                                                      "104_small",
        //                                                      "1001",
        //                                                      "503"
        //                                                  ],
        //                                                  "coefficient": 4
        //                                              }
        //                                          ]
        //
        // console.log(Order.DATAMENU);                // Order.DATAMENU 
        {/* Order.DATAMENU ->
            {
                "pizzas": [
                    {
                        "id": 101,
                        "idMeal": "idMeal101",
                        "idCard": "idCard101",
                        "idThumb": "idThumb101",
                        "category": "pizzas",
                        "name": "Frutti di Mare",
                        "description": "With seafood, tomato sauce, and mozzarella",
                        "picUrl": "./assets/images/restaurants/pizzas/frutti-di-mare.jpg",
                        "price": {
                            "small": 7.5,
                            "normal": 9.5,
                            "family": 12.5
                        },
                        "vegetarian": false,
                        "highlighted": true,
                        "alcoholic": false,
                        "size": [
                            "small, Ø 32 cm",
                            "normal, Ø 26 cm",
                            "family, Ø 40 cm"
                        ],
                        "toppingsList": [
                            {
                                "id": 1001,
                                "idMeal": null,
                                "idCard": null,
                                "idThumb": null,
                                "category": "toppings",
                                "name": "Pineapple",
                                "description": "With sweet pineapple chunks",
                                "picUrl": null,
                                "price": 1,
                                "vegetarian": true,
                                "highlighted": false,
                                "alcoholic": false,
                                "size": null,
                                "toppingsList": null,
                                "amount": 0
                            },
                            {
                                "id": 1002,
                                "idMeal": null,
                                "idCard": null,
                                "idThumb": null,
                                "category": "toppings",
                                "name": "Mushrooms",
                                "description": "With fresh sliced mushrooms",
                                "picUrl": null,
                                "price": 0.8,
                                "vegetarian": true,
                                "highlighted": false,
                                "alcoholic": false,
                                "size": null,
                                "toppingsList": null,
                                "amount": 0
                            },
                            {
                                "id": 1005,
                                "idMeal": null,
                                "idCard": null,
                                "idThumb": null,
                                "category": "toppings",
                                "name": "Peperoni",
                                "description": "With spicy peperoni slices",
                                "picUrl": null,
                                "price": 1.2,
                                "vegetarian": false,
                                "highlighted": false,
                                "alcoholic": false,
                                "size": null,
                                "toppingsList": null,
                                "amount": 0
                            }
                        ],
                        "amount": 0
                    },
                    {
                        "id": 102,
                        "idMeal": "idMeal102",
                        "idCard": "idCard102",
                        "idThumb": "idThumb102",
                        "category": "pizzas",
                        "name": "Salami",
                        "description": "With spicy salami and mozzarella",
                        "picUrl": "./assets/images/restaurants/pizzas/salami.jpg",
                        "price": {
                            "small": 6.5,
                            "normal": 8,
                            "family": 10.5
                        },
                        "vegetarian": false,
                        "highlighted": true,
                        "alcoholic": false,
                        "size": [
                            "small, Ø 32 cm",
                            "normal, Ø 26 cm",
                            "family, Ø 40 cm"
                        ],
                        "toppingsList": [
                            {
                                "id": 1001,
                                "idMeal": null,
                                "idCard": null,
                                "idThumb": null,
                                "category": "toppings",
                                "name": "Pineapple",
                                "description": "With sweet pineapple chunks",
                                "picUrl": null,
                                "price": 1,
                                "vegetarian": true,
                                "highlighted": false,
                                "alcoholic": false,
                                "size": null,
                                "toppingsList": null,
                                "amount": 0
                            },
                            {
                                "id": 1002,
                                "idMeal": null,
                                "idCard": null,
                                "idThumb": null,
                                "category": "toppings",
                                "name": "Mushrooms",
                                "description": "With fresh sliced mushrooms",
                                "picUrl": null,
                                "price": 0.8,
                                "vegetarian": true,
                                "highlighted": false,
                                "alcoholic": false,
                                "size": null,
                                "toppingsList": null,
                                "amount": 0
                            },
                            {
                                "id": 1005,
                                "idMeal": null,
                                "idCard": null,
                                "idThumb": null,
                                "category": "toppings",
                                "name": "Peperoni",
                                "description": "With spicy peperoni slices",
                                "picUrl": null,
                                "price": 1.2,
                                "vegetarian": false,
                                "highlighted": false,
                                "alcoholic": false,
                                "size": null,
                                "toppingsList": null,
                                "amount": 0
                            }
                        ],
                        "amount": 0
                    },
                    {
                        "id": 104,
                        "idMeal": "idMeal104",
                        "idCard": "idCard104",
                        "idThumb": "idThumb104",
                        "category": "pizzas",
                        "name": "Margherita",
                        "description": "With tomato sauce, mozzarella, and fresh basil",
                        "picUrl": "./assets/images/restaurants/pizzas/margherita.jpg",
                        "price": {
                            "small": 5.5,
                            "normal": 7,
                            "family": 9.5
                        },
                        "vegetarian": true,
                        "highlighted": true,
                        "alcoholic": false,
                        "size": [
                            "small, Ø 32 cm",
                            "normal, Ø 26 cm",
                            "family, Ø 40 cm"
                        ],
                        "toppingsList": [
                            {
                                "id": 1001,
                                "idMeal": null,
                                "idCard": null,
                                "idThumb": null,
                                "category": "toppings",
                                "name": "Pineapple",
                                "description": "With sweet pineapple chunks",
                                "picUrl": null,
                                "price": 1,
                                "vegetarian": true,
                                "highlighted": false,
                                "alcoholic": false,
                                "size": null,
                                "toppingsList": null,
                                "amount": 0
                            },
                            {
                                "id": 1002,
                                "idMeal": null,
                                "idCard": null,
                                "idThumb": null,
                                "category": "toppings",
                                "name": "Mushrooms",
                                "description": "With fresh sliced mushrooms",
                                "picUrl": null,
                                "price": 0.8,
                                "vegetarian": true,
                                "highlighted": false,
                                "alcoholic": false,
                                "size": null,
                                "toppingsList": null,
                                "amount": 0
                            },
                            {
                                "id": 1005,
                                "idMeal": null,
                                "idCard": null,
                                "idThumb": null,
                                "category": "toppings",
                                "name": "Peperoni",
                                "description": "With spicy peperoni slices",
                                "picUrl": null,
                                "price": 1.2,
                                "vegetarian": false,
                                "highlighted": false,
                                "alcoholic": false,
                                "size": null,
                                "toppingsList": null,
                                "amount": 0
                            }
                        ],
                        "amount": 0
                    }
                ],
                    "pastas": [
                        {
                            "id": 201,
                            "idMeal": "idMeal201",
                            "idCard": "idCard201",
                            "idThumb": "idThumb201",
                            "category": "pastas",
                            "name": "Penne 4 Formaggi",
                            "description": "With creamy four-cheese sauce",
                            "picUrl": "./assets/images/restaurants/pastas/penne-4formaggi.jpg",
                            "price": 8,
                            "vegetarian": true,
                            "highlighted": false,
                            "alcoholic": false,
                            "size": null,
                            "toppingsList": null,
                            "amount": 0
                        }
                    ],
                        "salads": [
                            {
                                "id": 302,
                                "idMeal": "idMeal302",
                                "idCard": "idCard302",
                                "idThumb": "idThumb302",
                                "category": "salads",
                                "name": "Caesar Salad",
                                "description": "With romaine lettuce, chicken breast, parmesan, and Caesar dressing",
                                "picUrl": "./assets/images/restaurants/salads/caesar.jpg",
                                "price": 7,
                                "vegetarian": false,
                                "highlighted": false,
                                "alcoholic": false,
                                "size": null,
                                "toppingsList": null,
                                "amount": 0
                            }
                        ],
                            "drinks": [
                                {
                                    "id": 503,
                                    "idMeal": "idMeal503",
                                    "idCard": "idCard503",
                                    "idThumb": "idThumb503",
                                    "category": "drinks",
                                    "name": "Orange Juice",
                                    "description": "With freshly squeezed orange flavor and natural sweetness",
                                    "picUrl": "./assets/images/restaurants/drinks/orange-juice.jpg",
                                    "price": 2.2,
                                    "vegetarian": true,
                                    "highlighted": true,
                                    "alcoholic": false,
                                    "size": "0.3L",
                                    "toppingsList": null,
                                    "amount": 0
                                }
                            ],
                                "toppings": [
                                    {
                                        "id": 1001,
                                        "idMeal": null,
                                        "idCard": null,
                                        "idThumb": null,
                                        "category": "toppings",
                                        "name": "Pineapple",
                                        "description": "With sweet pineapple chunks",
                                        "picUrl": null,
                                        "price": 1,
                                        "vegetarian": true,
                                        "highlighted": false,
                                        "alcoholic": false,
                                        "size": null,
                                        "toppingsList": null,
                                        "amount": 0
                                    },
                                    {
                                        "id": 1002,
                                        "idMeal": null,
                                        "idCard": null,
                                        "idThumb": null,
                                        "category": "toppings",
                                        "name": "Mushrooms",
                                        "description": "With fresh sliced mushrooms",
                                        "picUrl": null,
                                        "price": 0.8,
                                        "vegetarian": true,
                                        "highlighted": false,
                                        "alcoholic": false,
                                        "size": null,
                                        "toppingsList": null,
                                        "amount": 0
                                    },
                                    {
                                        "id": 1005,
                                        "idMeal": null,
                                        "idCard": null,
                                        "idThumb": null,
                                        "category": "toppings",
                                        "name": "Peperoni",
                                        "description": "With spicy peperoni slices",
                                        "picUrl": null,
                                        "price": 1.2,
                                        "vegetarian": false,
                                        "highlighted": false,
                                        "alcoholic": false,
                                        "size": null,
                                        "toppingsList": null,
                                        "amount": 0
                                    }
                                ]
            }
        */}
        
        
        document.getElementById("idBasketRestDeliveryFee").innerText = Order.DELIVERYFEE.split("(")[0];

        Order.renderOrdersHtmlFromOrderInstsInBASKET();
    }

    extractInfosfromOrderInstance() {

        let mainOrderName = "";
        let summeryOrderDescMain; // Just for Records with Pizza
        let summeryOrderDescRest = [];
        let sumRecordsPrices = 0;
        // Search records of order in Order.DATAMENU
        // Records's List variety: 
        //                          [ "102_family", "1002", "1005", "503" ]  Accourding to Dialog-Card-Structure: Max. Just -> Pizza/Toppings/Drinks
        //                          [ "202", "502" ]                         Accourding to Dialog-Card-Structure: Max. Just -> Pasta/Drinks
        //                          [ "301", "504" ]                         Accourding to Dialog-Card-Structure: Max. Just -> Salad/Drinks
        //                          [ "501"]                                 Accourding to Dialog-Card-Structure: Max. Just -> Drinks

        // 1) First be sure that the record's Records are sorted:
        // console.log(this.order);
        //                                              [
        //                                                  "503",
        //                                                  "1002",
        //                                                  "1005",
        //                                                  "101_normal"
        //                                              ]
        const moveItemWithSizeFirst = arr => { // von chatGPT (Ich weiss nicht, wie das funktioniert, ich musste nur mein Array für die Abgabe schnell sortieren.)
            const textItems = arr.filter(a => /[a-zA-Z]/.test(a));
            const numItems = arr.filter(a => !/[a-zA-Z]/.test(a));
            return [...textItems, ...numItems];
        };
        this.order = moveItemWithSizeFirst(this.order);

        // 2) Is the Records's List contains Pizza?
        // console.log(this.order);
        // console.log(this.order.every(record => !isNaN(Number(record))));
        if (!this.order.every(record => !isNaN(Number(record)))) {
            // Ja
            // For Pizza: (this.order[0] -> "102_family")

            const [mealIdStr, size] = this.order[0].split("_"); // 102_family -> [ "102", "family" ] OR 1005 -> [ "1005" ]
            const mealId = Number(mealIdStr);

            const mealObj = Order.DATAMENU.pizzas.find(obj => obj.id === mealId);

            mainOrderName = `${toSingularAndCapitalized(mealObj.category)}${mealObj.name}`
            if (size === "small") summeryOrderDescMain = "small, Ø 32 cm";
            if (size === "normal") summeryOrderDescMain = "normal, Ø 26 cm";
            if (size === "family") summeryOrderDescMain = "family, Ø 40 cm";
            sumRecordsPrices += mealObj.price[size];

            // For others:
            for (let i = 1; i < this.order.length; i++) {
                const mealId = Number(this.order[i]);

                if (mealId >= 500 && mealId < 600) { // Drinks
                    const mealObj = Order.DATAMENU.drinks.find(obj => obj.id === mealId);

                    summeryOrderDescRest.push(mealObj.name);
                    sumRecordsPrices += mealObj.price;
                }

                if (mealId >= 1000) { // Toppings
                    const mealObj = Order.DATAMENU.toppings.find(obj => obj.id === mealId);

                    summeryOrderDescRest.push(mealObj.name);
                    sumRecordsPrices += mealObj.price;
                }
            }

        } else {
            const mealId = Number(this.order[0]);

            if (mealId >= 200 && mealId < 300) { // Pasta
                const mealObj = Order.DATAMENU.pastas.find(obj => obj.id === mealId);

                mainOrderName += mealObj.name;
                sumRecordsPrices += mealObj.price;
            }

            if (mealId >= 300 && mealId < 400) { // Salad
                const mealObj = Order.DATAMENU.salads.find(obj => obj.id === mealId);

                mainOrderName += mealObj.name;
                sumRecordsPrices += mealObj.price;
            }

            if (mealId >= 500 && mealId < 600) { // Drinks
                const mealObj = Order.DATAMENU.drinks.find(obj => obj.id === mealId);

                mainOrderName += mealObj.name;
                sumRecordsPrices += mealObj.price;
            }

            for (let i = 1; i < this.order.length; i++) {
                const mealId = Number(this.order[i]);

                if (mealId >= 500 && mealId < 600) { // Drinks
                    const mealObj = Order.DATAMENU.drinks.find(obj => obj.id === mealId);

                    summeryOrderDescRest.push(mealObj.name);
                    sumRecordsPrices += mealObj.price;
                }
            }
        }
        return [mainOrderName, summeryOrderDescMain, summeryOrderDescRest, sumRecordsPrices.toFixed(2), this.coefficient];
    }

    static renderOrdersHtmlFromOrderInstsInBASKET() {
        const ref_idSecOrdersContainer = document.getElementById("idSecOrdersContainer");
        ref_idSecOrdersContainer.innerHTML = "";

        // console.log(Order.BASKET);                  // Order.BASKET -> [oredr, order, ...]
        //                                          [
        //                                              {
        //                                                  "orderId": 1,
        //                                                  "idOrder": "idOrder_1",
        //                                                  "order": [
        //                                                      "102_family",
        //                                                      "1002",
        //                                                      "1005",
        //                                                      "503"
        //                                                  ],
        //                                                  "coefficient": 4
        //                                              },
        //                                              {
        //                                                  "orderId": 2,
        //                                                  "idOrder": "idOrder_2",
        //                                                  "order": [
        //                                                      "104_small",
        //                                                      "1001",
        //                                                      "503"
        //                                                  ],
        //                                                  "coefficient": 4
        //                                              }
        //                                          ]
        //
        Order.BASKET.forEach(order => { // From Order-Class
            // const orderId = Number(order.idOrder.split("_")[1]);

            const orderInfos = order.extractInfosfromOrderInstance();
            // console.log(orderInfos);    // 
            //                              [
            //                                  "PizzaSalami",
            //                                  "normal, Ø 26 cm",
            //                                  [
            //                                      "Pineapple",
            //                                      "Mushrooms",
            //                                      "Peperoni",
            //                                      "Orange Juice"
            //                                  ],
            //                                  13.2
            //                              ]

            // ${orderInfos[]}

            ref_idSecOrdersContainer.innerHTML += `
                    <div id="${order.idOrder}" class="cOrders">
                        <div class="cOrderdMeals">
                            <strong>${orderInfos[0]}<span id="idOrderTotalPrice_${order.orderId}">${(orderInfos[3] * order.coefficient).toFixed(2)}€</span></strong>
                            <div class="cOrderdMealInfos">
                                <small>${orderInfos[1] || " "}</small>
                                <small>${orderInfos[2].join() || " "}</small>
                            </div>
                            <div class="cOrderdMealsBtnsArea">
                                <div class="cOrderdMealsBtnsPlusMinus">
                                    <button id="idDlgBasketBtnMinus_${order.orderId}" type="button"><img src="./assets/images/icons/minus.svg"
                                        alt="Minus Icon"></button>
                                    <b id="idDlgBasketCoefficient">${orderInfos[4]}</b>
                                    <button id="idDlgBasketBtnPlus_${order.orderId}" type="button"><img src="./assets/images/icons/plus.svg"
                                        alt="Plus Icon"></button>
                                </div>
                                <div class="cOrderdMealsBtnDelete">
                                    <button id="idDlgBasketBtnDelete_${order.orderId}" type="button"><img src="./assets/images/icons/delete.svg"
                                        alt="Plus Icon"></button>
                                </div>
                            </div>
                        </div>
                    </div>
            `;
        });
        Order.calBasketEndPrice();
        Order.orderEvents();
        Order.basketEvents();
    }

    static orderEvents() {
        // console.log(Order.BASKET);

        Order.BASKET.forEach(order => {

            // BTN (Delete) 
            document.getElementById(`idDlgBasketBtnDelete_${order.orderId}`).addEventListener("click", () => {
                // 1) Remove Order-HTML
                document.getElementById(order.idOrder).remove();
                // 2) Remove the order itself from Order.BASKET
                Order.BASKET = Order.BASKET.filter(inst => inst.orderId !== order.orderId);
                Order.calBasketEndPrice();
            });

            // BTN (-) 
            document.getElementById(`idDlgBasketBtnMinus_${order.orderId}`).addEventListener("click", () => {
                if (order.coefficient > 1) order.coefficient--;
                Order.renderOrdersHtmlFromOrderInstsInBASKET();
                Order.calBasketEndPrice();
            });

            // BTN (+)
            document.getElementById(`idDlgBasketBtnPlus_${order.orderId}`).addEventListener("click", () => {
                order.coefficient++;
                Order.renderOrdersHtmlFromOrderInstsInBASKET();
                Order.calBasketEndPrice();
            });


        });
    }

    static calBasketEndPrice() {
        Order.SUBTOTAL = 0;
        Order.BASKET.forEach(order => {

            const orderTotalPriceText = document.getElementById(`idOrderTotalPrice_${order.orderId}`).textContent; // A text -> "20.30€"
            const orderTotalPriceFloat = parseFloat(orderTotalPriceText.replace("€", "").trim()); // A float-Number -> 20.30 
            Order.SUBTOTAL += orderTotalPriceFloat;
        });
        document.getElementById("idSubPrice").textContent = `${Order.SUBTOTAL.toFixed(2)} €`;
        document.getElementById("idEndPrice").textContent = `${(Order.SUBTOTAL + 2.5).toFixed(2)} €`;
    }

    static basketEvents() {

        document.getElementById("idDlgBasketSubmit").addEventListener("click", () => {
            Order.IDX = 0;             // Number           3
            Order.SUBTOTAL = 0;        // Number           23.00 €
            Order.BASKET = [];         // Array            All Order-Instances
            Order.DATAMENU = {};       // Object           From Restaurant.DATAMENU

            document.getElementById("idSecOrdersContainer").innerHTML = "";
            document.getElementById("idSubPrice").textContent = "0.00 €";
            document.getElementById("idEndPrice").textContent = "0.00 €";
        });

    }


}
