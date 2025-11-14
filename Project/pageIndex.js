
// window.location.href returns the href (URL) of the current page
// window.location.hostname returns the domain name of the web host
// window.location.pathname returns the path and filename of the current page
// window.location.protocol returns the web protocol used (http: or https:)
// window.location.assign() loads a new document


// document.getElementById("idAOTform")
//     .addEventListener("submit", (e) => {
//         //------------------------------------------------------
//         // Durch Submit-Button --> "submit"-Event
//         // Default: 1) Das Formular wird abgeschickt,
//         //          2) die Seite wird neu geladen, 
//         // Dadurch wird window.location.assign() abgebrochen.
//         //------------------------------------------------------
//         e.preventDefault(); // Notwendig
//         window.location.assign("./pageRestaurant.html");
//     });
// console.log(document.getElementById("idBtn1"));

["idBtn1", "idBtn2"].forEach((btnId, idx) => {
    document.getElementById(btnId).addEventListener("click", (e) => {
        e.preventDefault(); // Verhindert Standardaktionen (z. B. bei <form>)
        console.log(idx);
        
        localStorage.setItem("keyWhichRestaurant", JSON.stringify(idx));
        //------------------------------------------------------
        // Durch Klick auf Button:
        // - Speichert die gewählte Restaurant-ID (idx)
        // - Leitet zur Restaurant-Seite weiter
        // Hinweis: e.preventDefault() ist hier nicht zwingend nötig,
        //          da <button type="button"> kein Formular abschickt,
        //          aber es schadet nicht.
        //------------------------------------------------------
        window.location.assign("./pageRestaurant.html");
    });
});

