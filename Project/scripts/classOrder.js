import { toSingularAndCapitalized } from "./classMeal.js";



export class Order {
    // #region Attributes
    orderId;                    // Number           3  
    //                                              The ID of the instance itself & is also automatically 
    //                                              the Index in Order.BASKET (BUT before using the Delete-BTN)
    //
    idOrder;                    // String           "idOrder_3" Element-Id    
    values = [];                 // Array            A List of all *SELECTED* HTML-Inputs-Values of all
    //                                              Restaurant.DIALOGCARD_RECORDS
    //                                              -> ElementID, Name, Size, Price
    //                                              [
    //                                                  "1007_Hot Sauce_null_0.50",
    //                                                  "101_Frutti di Mare_family, Ø 40 cm_12.50",
    //                                                  "503_Orange Juice_0.3L_2.20"
    //                                              ]
    //
    coefficient;                // Number           Coefficient to multiply (Restaurant.RECORDS_COEFFICIENT)
    sum;                        // Number           10.20
    //                                              Records's sum of a order (Restaurant.RECORDS_SUM)
    //
    price;                      // Number           sum * coefficient
    orderName;                  // string           "Pizza Salami" OR 
    //                                              "Penne with Cream Sauce" OR 
    //                                              "Caprese Salad" OR
    //                                              "Coca-Cola"
    //
    pizzaSize;                  // string           For Pizzas -> "normal, Ø 26 cm"
    //                                              For Others -> "" (Nothing for Pastas & Drinks Dialog-Cards)
    //
    orderDesc = [];             // Array           [ "Coca-Cola", Pineapple, Mushrooms ]

    static IDX = 0;             // Number           3
    static DELIVERYFEE;         // String           2.50 from "2.50€ (today)"
    static SUBTOTAL = 0;        // Number           23.00 €
    static BASKET = [];         // Array            All Order-Instances
    static DATAMENU = {}        // Object           From Restaurant.DATAMENU
    //                                              { 
    //                                                 pizzas: [inst1, ...], pastas: [inst1, ...], 
    //                                                 salads: [inst1, ...], drinks: [inst1, ...], 
    //                                                 toppings[inst1, ...] 
    //                                              }

    // #endregion Attribute

    constructor({ _dataMenu, _recordsValues, _coefficient, _records_sum, _orderName, _delivery } = {}) {

        Order.IDX++;

        this.orderId = Order.IDX;                               // 3
        this.idOrder = `idOrder_${Order.IDX}`;                  // "idOrder_3" Element-Id
        this.values = _recordsValues;                           // ["1007_Hot Sauce_null_0.50", ..., "503_Orange Juice_0.3L_2.20"]
        this.coefficient = _coefficient;                        // 3
        this.orderName = _orderName;                            // "Penne with Cream Sauce"
        this.sum = _records_sum;                                // 10.20

        Order.DELIVERYFEE = Number(_delivery.split("€")[0]);    // 2.50 from "2.50€ (today)" OR "5€ (21 Days)"
        Order.DATAMENU = _dataMenu                              // Objects from all Restaurant's Meals-Instances
        Order.BASKET.push(this);                                // Collect all new-Orders of User
        // console.log(Order.BASKET);               // Order.BASKET -> [oredr, order, ...]
        {/* Order.BASKET           
        [
            {
                "orderId": 1,
                "idOrder": "idOrder_1",
                "values": [
                    "503_Orange Juice_0.3L_2.20",
                    "104_Margherita_family, Ø 40 cm_9.50",
                    "1007_Hot Sauce_null_0.50"
                ],
                "coefficient": 2,
                "sum": 12.2,
                "orderName": "Pizza Margherita",
                "orderDesc": []
            },
            {
                "orderId": 1,
                "idOrder": "idOrder_1",
                "values": [
                    "104_Margherita_normal, Ø 26 cm_7.00",
                    "1004_Cheese_null_1.00",
                    "503_Orange Juice_0.3L_2.20"
                ],
                "coefficient": 4,
                "sum": 10.2,
                "orderName": "Pizza Margherita",
                "orderDesc": []
            }
        ]
        */}
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

        document.getElementById("idBasketRestDeliveryFee").textContent = `${Order.DELIVERYFEE.toFixed(2).replace(".", ",")} €`;

        this.createOrderDesc();
        this.renderOrderHtmlAtBegin();
        Order.basketEvents();
    }

    createOrderDesc() {
        // console.log(this.values);        
        //   [
        //       "1007_Hot Sauce_null_0.50",
        //       "101_Frutti di Mare_family, Ø 40 cm_12.50",
        //       "503_Orange Juice_0.3L_2.20"
        //   ]
        //
        this.values.forEach(value => {
            // Order.orderName & Order.sum come from Class-Restaurant
            const [mealIdStr, name, size, priceStr] = value.split("_");
            // "101_Frutti di Mare_family, Ø 40 cm_12.50" -> [ "101", "Frutti di Mare", "family, Ø 40 cm", "12.50" ]
            const mealId = Number(mealIdStr);
            if (mealId >= 100 && mealId < 200) this.pizzaSize = size;
            if (mealId >= 500 && mealId < 600) this.orderDesc.push(name);
            if (mealId >= 1000) this.orderDesc.push(name);
        });
    }

    renderOrderHtmlAtBegin() {
        const ref_idSecOrdersContainer = document.getElementById("idSecOrdersContainer");

        // console.log(this);
        //         {
        //             "orderId": 1,
        //             "idOrder": "idOrder_1",
        //             "values": [
        //                 "503_Orange Juice_0.3L_2.20",
        //                 "104_Margherita_family, Ø 40 cm_9.50",
        //                 "1007_Hot Sauce_null_0.50"
        //             ],
        //             "coefficient": 2,
        //             "sum": 12.2,
        //             "orderName": "Pizza Margherita",
        //             "orderDesc": []
        //         }
        //
        ref_idSecOrdersContainer.innerHTML += `
                <div id="${this.idOrder}" class="cOrders">
                    <div class="cOrderdMeals">
                        <strong>${this.orderName}<div class="cOrderTotalPrices" id="idOrderTotalPrice_${this.orderId}">0,00 €</div></strong>
                        <div class="cOrderdMealInfos">
                            <p>${this.pizzaSize || " "}</p>
                            <p>${this.orderDesc.join() || " "}</p>
                        </div>
                        <div class="cOrderdMealsBtnsArea">
                            <div class="cOrderdMealsBtnsPlusMinus">
                                <button id="idDlgBasketBtnMinus_${this.orderId}" type="button"><img src="./assets/images/icons/minus.svg"
                                    alt="Minus Icon"></button>
                                <b id="idDlgBasketCoefficient_${this.orderId}">${this.coefficient}</b>
                                <button id="idDlgBasketBtnPlus_${this.orderId}" type="button"><img src="./assets/images/icons/plus.svg"
                                    alt="Plus Icon"></button>
                            </div>
                            <div class="cOrderdMealsBtnDelete">
                                <button id="idDlgBasketBtnDelete_${this.orderId}" type="button"><img src="./assets/images/icons/delete.svg"
                                    alt="Plus Icon"></button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        this.put_orderPrice_and_coefficient();
        Order.orderEvents();
        Order.calBasketEndPrice();
    }

    static renderDlgFeedback() {
        const ref_idDlgFeedbackContainer = document.getElementById("idDlgFeedbackContainer");
        ref_idDlgFeedbackContainer.innerHTML = /*html*/`
            <dialog id="idDlgFeedback">
                <button id="idDlgFeedbackCloseBtn" type="button">
                    <img class="cDlgFeedbackCloseIcon" src="./assets/images/icons/close.svg" alt="close Icon">
                </button>
                <img src="./assets/images/cook_logo.svg" alt="Logo Pic">
                <strong>Your Orders is Underway!</strong>
            </dialog>
        `;

        const ref_idDlgFeedback = document.getElementById("idDlgFeedback");
        ref_idDlgFeedback.style.display = "flex";
        ref_idDlgFeedback.showModal();

        const ref_idDlgFeedbackCloseBtn = document.getElementById("idDlgFeedbackCloseBtn");
        ref_idDlgFeedbackCloseBtn.addEventListener("click", () => {
            ref_idDlgFeedback.close();
            ref_idDlgFeedback.remove();
            window.location.assign("./pageRestaurant.html");
        });

        ref_idDlgFeedback.addEventListener("click", (e) => {
            if (e.target == ref_idDlgFeedback && ref_idDlgFeedback.matches(":modal")) {
                ref_idDlgFeedback.style.display = "none"
                ref_idDlgFeedback.close();
                window.location.assign("./pageRestaurant.html");
            };
        });
    }

    put_orderPrice_and_coefficient() {
        const orderPrice = (this.sum * this.coefficient).toFixed(2);
        // document.getElementById(`idDlgBasketCoefficient_${this.orderId}`).textContent = `${this.coefficient}`;
        const ref_coefficient = document.getElementById(`idDlgBasketCoefficient_${this.orderId}`);
        if (ref_coefficient) {
            ref_coefficient.textContent = `${this.coefficient}`;
        }

        const ref_totalPrice = document.getElementById(`idOrderTotalPrice_${this.orderId}`);
        if (ref_totalPrice) {
            ref_totalPrice.textContent = `${orderPrice.replace(".", ",")} €`;
        }
    }

    static orderEvents() {
        // console.log(Order.BASKET);
        Order.BASKET.forEach(orderInst => {
            // BTN (Delete) 
            document.getElementById(`idDlgBasketBtnDelete_${orderInst.orderId}`).addEventListener("click", () => {
                // 1) Remove orderInst-HTML
                document.getElementById(orderInst.idOrder).remove();
                // 2) Remove the orderInst itself from Order.BASKET
                Order.BASKET = Order.BASKET.filter(inst => inst.orderId !== orderInst.orderId);
                Order.calBasketEndPrice();
            });

            // BTN (-) 
            document.getElementById(`idDlgBasketBtnMinus_${orderInst.orderId}`).addEventListener("click", () => {
                if (orderInst.coefficient > 1) {
                    orderInst.coefficient--;
                } else {
                    // 1) Remove orderInst-HTML
                    document.getElementById(orderInst.idOrder).remove();
                    // 2) Remove the orderInst itself from Order.BASKET
                    Order.BASKET = Order.BASKET.filter(inst => inst.orderId !== orderInst.orderId);
                    Order.calBasketEndPrice();
                }
                orderInst.put_orderPrice_and_coefficient();
                Order.calBasketEndPrice();
            });

            // BTN (+)
            document.getElementById(`idDlgBasketBtnPlus_${orderInst.orderId}`).addEventListener("click", () => {
                orderInst.coefficient++;
                orderInst.put_orderPrice_and_coefficient();
                Order.calBasketEndPrice();
            });
        });
    }

    static calBasketEndPrice() {
        Order.SUBTOTAL = 0;
        Order.BASKET.forEach(orderInst => {

            const orderTotalPriceText = document.getElementById(`idOrderTotalPrice_${orderInst.orderId}`).textContent; // A text -> "20.30€"
            const orderTotalPriceFloat = parseFloat(orderTotalPriceText.replace("€", "").trim()); // A float-Number -> 20.30 
            Order.SUBTOTAL += orderTotalPriceFloat;
        });
        document.getElementById("idSubPrice").textContent = `${Order.SUBTOTAL.toFixed(2).replace(".", ",")} €`;

        document.getElementById("idCartSubPrice").textContent = `${Order.SUBTOTAL.toFixed(2).replace(".", ",")} €`;
        document.getElementById("idCartOrdersNumber").textContent = Order.BASKET.length;

        const selectedDelivery = document.getElementById("idBasketRestDeliveryFee").textContent;

        if (Order.SUBTOTAL === 0) {
            document.getElementById("idEndPrice").textContent = "0,00 €";
        } else {
            if (selectedDelivery === "free") {
                document.getElementById("idEndPrice").textContent = `${Order.SUBTOTAL.toFixed(2).replace(".", ",")} €`;
            } else {
                document.getElementById("idEndPrice").textContent =
                    `${(Order.SUBTOTAL + Order.DELIVERYFEE).toFixed(2).replace(".", ",")} €`;
            }
        }

    }

    static basketEvents() {

        // Backdrop Click -> Close Modal (Just Mobile)
        const ref_idDlgBasket = document.getElementById("idDlgBasket");
        ref_idDlgBasket.addEventListener("click", (e) => {
            if (e.target == ref_idDlgBasket && ref_idDlgBasket.matches(":modal")) {
                ref_idDlgBasket.style.display = "none"
                ref_idDlgBasket.close();
            };
        });

        // Close BTN
        ref_idDlgBasket.addEventListener("click", (e) => {
            if (e.target == ref_idDlgBasket && ref_idDlgBasket.matches(":modal")) {
                ref_idDlgBasket.close();
            };
        });

        document.getElementById("idDlgBasketDelivery").addEventListener("click", () => {
            document.getElementById("idBasketRestDeliveryFee").textContent = `${Order.DELIVERYFEE.toFixed(2).replace(".", ",")} €`;
            Order.calBasketEndPrice();
        });
        document.getElementById("idDlgBasketPickUp").addEventListener("click", () => {
            document.getElementById("idBasketRestDeliveryFee").textContent = "free";
            Order.calBasketEndPrice();
        });

        // To Pay
        document.getElementById("idDlgBasketSubmit").addEventListener("click", () => {
            if (Order.BASKET.length === 0) return;

            Order.IDX = 0;             // Number           3
            Order.SUBTOTAL = 0;        // Number           23.00 €
            Order.BASKET = [];         // Array            All Order-Instances
            Order.DATAMENU = {};       // Object           From Restaurant.DATAMENU

            document.getElementById("idSecOrdersContainer").innerHTML = "";
            document.getElementById("idSubPrice").textContent = "0,00 €";
            document.getElementById("idEndPrice").textContent = "0,00 €";
            document.getElementById("idCartSubPrice").textContent = "0,00 €";
            document.getElementById("idCartOrdersNumber").textContent = "0";


            ref_idDlgBasket.style.display = "none";
            ref_idDlgBasket.close();

            Order.renderDlgFeedback();

        });

        document.getElementById("idCartBtnBarOpenBasket").addEventListener("click", () => {
            ref_idDlgBasket.showModal();
            ref_idDlgBasket.style.display = "flex";
        });
    }
}
