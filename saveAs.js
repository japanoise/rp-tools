const saveAs = (filename, data) => {
    const blob = new Blob(
        [JSON.stringify(data, undefined, 2)],
        { type: "text/json" }
    );
    const link = document.createElement("a");

    link.download = filename;
    link.href = window.URL.createObjectURL(blob);
    link.dataset.downloadurl =
        ["text/json", link.download, link.href].join(":");

    const evt = new MouseEvent("click", {
        view: window,
        bubbles: true,
        cancelable: true,
    });

    link.dispatchEvent(evt);
    link.remove()
};
