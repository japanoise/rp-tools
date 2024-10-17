let portGuns = {};
let starboardGuns = {};
let sternGuns = {};
let bowGuns = {};

function getGuns() {
    return [
        document.getElementById("guns").value,
        Number(document.getElementById("num-guns").value),
    ];
}

function clearContainer(containerId) {
    const container = document.getElementById(containerId);
    container.textContent = '';
    return container;
}

function prettyGunType(gunType) {
    const s = gunType.startsWith("0")
          ? gunType.substring(1, gunType.length)
          : gunType.substring(0, gunType.length);
    if (s.endsWith("l")) {
        return `${s.substring(0, s.length - 1)}#`
    } else {
        return `${s.substring(0, s.length - 1)}#C`
    }
}

function fireFactor(numGuns) {
    const remainder = numGuns % 3;
    const integerPart = Math.floor(numGuns / 3);

    if(integerPart == 0) {
        switch (remainder) {
        case 0:
            return "0";
        case 1:
            return "⅓";
        case 2:
            return "⅔";
        }
    }

    switch (remainder) {
    case 0:
        return `${integerPart}`;
    case 1:
        return `${integerPart}⅓`;
    case 2:
        return `${integerPart}⅔`;
    }
}

function appendGun(container, gunType, numGuns, delCallback) {
    container.appendChild(
        document.createElement("div")).textContent = numGuns;

    container.appendChild(
        document.createElement("div")).textContent = prettyGunType(gunType);

    container.appendChild(
        document.createElement("div")).textContent =
        `FF: ${fireFactor(numGuns)}`;

    const buttonContainer = container.appendChild(
        document.createElement("div"));

    const delButton = buttonContainer.appendChild(
        document.createElement("button"));
    delButton.textContent = "Delete";
    delButton.addEventListener('click', delCallback);
}

function renderGuns(containerId, gunList, delCallback) {
    const container = clearContainer(containerId);
    Object.keys(gunList).sort().forEach(
        (gun) => {
            appendGun(
                container,
                gun,
                gunList[gun],
                () => {
                    delCallback(gun);
                    renderGuns(containerId, gunList, delCallback);
                    recountGuns();
                }
            )
        }
    );

    if (container.textContent === '') {
        container.textContent = "None.";
    }
}

function renderPortGuns() {
    renderGuns(
        "port-guns",
        portGuns,
        (gun) => delete portGuns[gun]
    );
}

function renderStarboardGuns() {
    renderGuns(
        "starboard-guns",
        starboardGuns,
        (gun) => delete starboardGuns[gun]
    );
}

function renderSternGuns() {
    renderGuns(
        "stern-guns",
        sternGuns,
        (gun) => delete sternGuns[gun]
    );
}

function renderBowGuns() {
    renderGuns(
        "bow-guns",
        bowGuns,
        (gun) => delete bowGuns[gun]
    );
}

function addUpReducer(acc, elem) {
    return acc + elem;
}

function countGuns(gunList) {
    return Object.values(gunList).reduce(addUpReducer, 0);
}

function recountGuns() {
    const totalGunsNumber =
          countGuns(portGuns) +
          countGuns(starboardGuns) +
          countGuns(sternGuns) +
          countGuns(bowGuns);

    document.getElementById("total-guns").textContent = totalGunsNumber;
}

function resetGuns() {
    document.getElementById("num-guns").value = 1;

    recountGuns();
}

function addPortGun(gunType, numGuns) {
    const existing = portGuns[gunType] ?? 0;

    portGuns[gunType] = existing + numGuns;

    renderPortGuns();
}

function addStarboardGun(gunType, numGuns) {
    const existing = starboardGuns[gunType] ?? 0;

    starboardGuns[gunType] = existing + numGuns;

    renderStarboardGuns();
}

function addBowGun(gunType, numGuns) {
    const existing = bowGuns[gunType] ?? 0;

    bowGuns[gunType] = existing + numGuns;

    renderBowGuns();
}

function addSternGun(gunType, numGuns) {
    const existing = sternGuns[gunType] ?? 0;

    sternGuns[gunType] = existing + numGuns;

    renderSternGuns();
}

function doAddPortGun() {
    const [gunType, numGuns] = getGuns();

    addPortGun(gunType, numGuns);

    resetGuns();
}

function doAddBowGun() {
    const [gunType, numGuns] = getGuns();

    addBowGun(gunType, numGuns);

    resetGuns();
}

function doAddSternGun() {
    const [gunType, numGuns] = getGuns();

    addSternGun(gunType, numGuns);

    resetGuns();
}

function doAddStarboardGun() {
    const [gunType, numGuns] = getGuns();

    addStarboardGun(gunType, numGuns);

    resetGuns();
}

function doAddHalf() {
    const [gunType, totalGuns] = getGuns();

    if (totalGuns % 2 == 0) {
        const numGuns = totalGuns / 2;
        addPortGun(gunType, numGuns);
        addStarboardGun(gunType, numGuns);
    } else {
        const greater = Math.floor(totalGuns / 2) + 1;
        const lesser = Math.floor(totalGuns / 2);

        if (Date.now() % 2 == 0) {
            addPortGun(gunType, greater);
            addStarboardGun(gunType, lesser);
        } else {
            addPortGun(gunType, lesser);
            addStarboardGun(gunType, greater);
        }
    }

    resetGuns();
}

function doAddBoth() {
    const [gunType, numGuns] = getGuns();

    addPortGun(gunType, numGuns);
    addStarboardGun(gunType, numGuns);

    resetGuns();
}

function doClearGuns() {
    portGuns = {};
    starboardGuns = {};
    sternGuns = {};
    bowGuns = {};

    clearContainer("starboard-guns").textContent = 'None.';
    clearContainer("port-guns").textContent = 'None.';
    clearContainer("bow-guns").textContent = 'None.';
    clearContainer("stern-guns").textContent = 'None.';

    recountGuns();
}
