import { capitalizeFirst, isVegetarian, toSingularAndCapitalized } from "../../../scripts/classMeal.js";
import { Restaurant } from "../../../scripts/classRestaurant.js";

export function renderTmpDlgCardSalad(id) { // id -> 102, 502, ...
    let targetInst;
    Object.keys(Restaurant.DATAMENU).forEach(key => {
        Restaurant.DATAMENU[key].forEach(inst => {
            if (inst.id == id) {
                targetInst = inst;
            }
        });
    });

    const ref_idDlgCardContainer = document.getElementById("idDlgCardContainer");
    ref_idDlgCardContainer.innerHTML = `
            <dialog id="idDlgCard" class="cDlgCard">

                <section class="cSecDlgVisiblePart">
                    <div class="cDlgMedias">
                        <img class="cDlgCardMainImg" style=""
                            src="${targetInst.picUrl}" alt="">
                        <button id="cDlgCardCloseBtn" type="button">
                            <img class="cDlgCardCloseIcon" src="./assets/images/icons/close.svg" alt="">
                        </button>
                    </div>

                    <div class="cDlgHeader">
                        <h2>${targetInst.name}</h2>
                        <b>from <span style="font-weight: 400;">${targetInst.getPrice()} €</span></b>
                        <p style="color: #0000007b;">${targetInst.description}</p>
                    </div>

                    <div class="cOptionsArea">

                        <div class="cOptionsHeader">
                            <div class="cOptionsHeaderTitle">
                                <p></p>
                                <b>${toSingularAndCapitalized(targetInst.category)} ${targetInst.name}:</b>
                            </div>
                            <div class="cOptionsHeaderToggledInfos">
                                <b></b>
                                <!-- <img src="./assets/images/icons/check.svg" alt="check Icon"> -->
                                <p>1 Required</p>
                            </div>
                        </div>

                        <fieldset class="cOptionsArea">
                            ${renderSaladOptions()}
                        </fieldset>
                    </div>
                </section>

                <section class="cSecDlgHiddenPart">                    
                    </div>
                    <!-- Drinks -->
                    <div class="cOptionsArea">
                        <div class="cOptionsHeader">
                            <div class="cOptionsHeaderTitle">
                                <!-- <p>(Family, Ø 40cm)?</p> -->
                                <b>Drinks:</b>
                            </div>
                            <div class="cOptionsHeaderToggledInfos">
                                <!-- <b>+2,00 €</b> -->
                                <p>Optional</p>
                            </div>
                        </div>

                        <fieldset class="cOptionsArea">
                            ${renderPastaDrinksOptions()}
                        </fieldset>
                    </div>
                </section>

                <section class="cSecCalculateRecords">
                    <div class="cIncDecBtnsArea">
                        <button id="idDlgCardBtnMinus" type="button"><img src="./assets/images/icons/minus.svg" alt="Minus Icon"></button>
                        <b id="idDlgCardCoefficient">1</b>
                        <button id="idDlgCardBtnPlus"  type="button"><img src="./assets/images/icons/plus.svg"  alt="Plus  Icon"></button>
                    </div>
                    <div class="cCalResult">
                        <button id="idDlgCardBtnSubmit" type="submit"><b>Add</b></button>
                        <b id="idDlgCardRecordsSum">0,00 €</b>
                    </div>
                </section>

            </dialog>
        `;

    // Catch Infos from Target-Instance
    function renderSaladOptions() {
        let htmlText = "";
        const elId = `idInputPasta${targetInst.id}`;
        const priceTag = targetInst.getPrice();
        const elValue = `${targetInst.id}_${targetInst.name}_${targetInst.size}_${priceTag}`;

        htmlText += `
                <div class="cOptions">
                    <label for="${elId}">
                        <input id="${elId}" value="${elValue}" type="radio" name="sizes">
                        <span>${targetInst.name}</span>
                    </label>
                    <b>${priceTag.replace(".", ",")} €</b>
                </div>
            `;
        Restaurant.DLGCARD_HTML_INPUTS_IDS.push(elId);
        Restaurant.ORDERNAME = targetInst.name;
        return htmlText;
    }

    // Infos from Restaurant.DATAMENU.drinks
    function renderPastaDrinksOptions() {
        let htmlText = "";
        Restaurant.DATAMENU.drinks.forEach(dirInst => {
            const elId = `idInputDrink${dirInst.id}`;
            const priceTag = dirInst.getPrice();
            const elValue = `${dirInst.id}_${dirInst.name}_${dirInst.size}_${priceTag}`;
            htmlText += `
                <div class="cOptions">
                    <label for="${elId}">
                        <input id="${elId}" value="${elValue}" type="checkbox" name="drinks" >
                        <span>${dirInst.name}, ${dirInst.size}</span>
                    </label>
                    <b>${priceTag.replace(".", ",")} €</b>                    
                </div>
            `;
            Restaurant.DLGCARD_HTML_INPUTS_IDS.push(elId);
        });
        return htmlText;
    }
}

