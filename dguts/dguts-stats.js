let crew = 21;
let crewFactor = 1;
let crewFactorValue = 0;
let sailFactorValue = 0;
let tenPercentLosses = 0;
let seventyPercent = "";
let eightyPercent = "";
let ninetyPercent = "";
let tonnage = 100;
let shipClass = 1;

function prettyPrintClass() {
    switch (shipClass) {
    case 1:
        return "Class I: Brig/Gunboat";
    case 2:
        return "Class II: Sloop/Corvette";
    case 3:
        return "Class III: Ship-sloop/Frigate";
    case 4:
        return "Class IV: Large Frigate/Razee/Small SOTL";
    case 5:
        return "Class V: Ship of the Line";
    }
}

function renderValues() {
    document.getElementById("sail-factor-value").textContent =
        shipClass == 1
        ? `${sailFactorValue} (${sailFactorValue * 3}; ${sailFactorValue * 6})`
        : `${sailFactorValue} (${sailFactorValue * 3}; ${
             sailFactorValue * 6}; ${sailFactorValue * 9})`;

    document.getElementById("crew-factor").textContent = crewFactor;
    document.getElementById("crew-factor-value").textContent =
        crewFactorValue;
    document.getElementById("ten-percent").textContent =
        tenPercentLosses;
    document.getElementById("seventy-percent").textContent =
        seventyPercent;
    document.getElementById("eighty-percent").textContent =
        eightyPercent;
    document.getElementById("ninety-percent").textContent =
        ninetyPercent;
    document.getElementById("ship-class").textContent =
        prettyPrintClass();
}

function recalculateValues() {
    if (tonnage < 300) {
        shipClass = 1;
    } else if (tonnage < 500) {
        shipClass = 2;
    } else if (tonnage < 1000) {
        shipClass = 3;
    } else if (tonnage < 1500) {
        shipClass = 4;
    } else {
        shipClass = 5;
    }

    seventyPercent =
        `${Math.round(tonnage * 0.7)} pts; ${
                 shipClass/4} CFs to maintain or sink in 16 turns`;

    eightyPercent =
        `${Math.round(tonnage * 0.8)} pts; ${
                 shipClass/2} CFs to maintain or sink in 8 turns`;

    ninetyPercent =
        `${Math.round(tonnage * 0.9)} pts; ${
                 shipClass} CFs to maintain or sink in 4 turns`;

    sailFactorValue = shipClass == 1
        ? Math.round(tonnage / 12)
        : Math.round(tonnage / 20);

    crewFactor = Math.round(crew/21);
    crewFactorValue = (tonnage / crewFactor).toPrecision(3);
    tenPercentLosses = (crewFactorValue * (crewFactor / 10)).toPrecision(3);

    renderValues();
}

function doUpdateTonnage() {
    tonnage = Number(document.getElementById("tonnage").value);

    recalculateValues();
}

function doUpdateCrew() {
    crew = Number(document.getElementById("crew").value);

    recalculateValues();
}
