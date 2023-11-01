const messageElement = document.getElementById("message");

document.addEventListener("keydown", function(event) {
    if (/^[a-öA-Ö0-9]$/.test(event.key)) {
        messageElement.textContent = "No, there is no more...";
    } else if (event.key === "Backspace") {
        messageElement.textContent = "";
    }
});