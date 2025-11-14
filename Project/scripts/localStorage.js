
import { pizzas, pastas, salads, drinks, toppings } from "../assets/data/dataMenu.js";
import { restaurants } from "../assets/data/dataRestaurants.js";

// Resource-Objects
export const PIZZAS = { LSKey: "keyPizzas", payload: pizzas };
export const PASTAS = { LSKey: "keyPastas", payload: pastas };
export const SALADS = { LSKey: "keySalads", payload: salads };
export const DRINKS = { LSKey: "keyDrinks", payload: drinks };
export const TOPPINGS = { LSKey: "keyToppings", payload: toppings };

export const RESTAURANTS = { LSKey: "keyRestaurant", payload: restaurants }

export const menuObjectsList = [PIZZAS, PASTAS, SALADS, DRINKS, TOPPINGS]; // Without RESTAURANTS

// Functions
export function getLS(OBJ) {
    const jsonString = localStorage.getItem(OBJ.LSKey); // Load as a string
    return jsonString ? JSON.parse(jsonString) : []; // Send as a object
}

export function initLS(OBJ) {
    return !localStorage.getItem(OBJ.LSKey) ? localStorage.setItem(OBJ.LSKey, JSON.stringify(OBJ.payload)) : false;
}
menuObjectsList.forEach(initLS);     // Init one time

menuObjectsList.forEach(OBJ => {     // Every time
    localStorage.setItem(OBJ.LSKey, JSON.stringify(OBJ.payload));
});

localStorage.setItem(RESTAURANTS.LSKey, JSON.stringify(RESTAURANTS.payload));


// console.log(getLS(PIZZAS));