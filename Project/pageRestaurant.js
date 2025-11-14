import { Restaurant } from "./scripts/classRestaurant.js";
import { getLS, RESTAURANTS } from "./scripts/localStorage.js";

// Select a favorie Restaurant (1 or 2)

const restaurantsObjects = getLS(RESTAURANTS);
const whichRestaurant = Number(localStorage.getItem("keyWhichRestaurant"));

new Restaurant(restaurantsObjects[whichRestaurant], whichRestaurant);

/////////////////////////////////////////////////////////////////////
document.addEventListener("DOMContentLoaded", () => {
    const dlg = document.getElementById("idDlgBasket");
    const btn = document.getElementById("idCartBtnBarOpenBasket");

    const mq = window.matchMedia("(min-width: 951px)");

    function setDesktop() {
        btn.style.display = "none";
        dlg.classList.remove("cBasketMobileView");
        dlg.classList.add("cBasketDesktopView");

        if (dlg.matches(":modal")) dlg.close();
        if (!dlg.open) dlg.show();
    }

    function setMobile() {
        btn.style.display = "flex";
        dlg.classList.remove("cBasketDesktopView");
        dlg.classList.add("cBasketMobileView");

        if (dlg.open) dlg.close();
    }

    function apply() {
        if (mq.matches) {
            setDesktop();
        } else {
            setMobile();
        }
    }

    // Initial
    apply();

    // Actice Switch for Desktop/Mobile
    mq.addEventListener("change", apply);

    // Button oeffnet NUR im Mobile-Modus den Basket
    btn.addEventListener("click", () => {
        if (!mq.matches && !dlg.open) {
            dlg.showModal();
        }
    });
});


