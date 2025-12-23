function setPreset(type) {
    const input = document.getElementById("textInput");

    switch(type) {
        case "facebook":
            input.value = "https://www.facebook.com/";
            break;
        case "instagram":
            input.value = "https://www.instagram.com/";
            break;
        case "tiktok":
            input.value = "https://www.tiktok.com/@";
            break;
        case "youtube":
            input.value = "https://www.youtube.com/";
            break;
        case "whatsapp":
            input.value = "https://wa.me/";
            break;
    }
}

function generateQR() {
    const url = document.getElementById("textInput").value.trim();
    const qr = document.getElementById("qrImage");

    if (!url) {
        alert("Ampidiro aloha ny URL!");
        return;
    }

    const qrURL =
      "https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=" +
      encodeURIComponent(url);

    qr.classList.remove("show");
    qr.src = qrURL;

    setTimeout(() => {
        qr.classList.add("show");
    }, 120);
}

function downloadQR() {
    const qr = document.getElementById("qrImage");

    if (!qr.src) {
        alert("Tsy misy QR mbola novokarina!");
        return;
    }

    const link = document.createElement("a");
    link.href = qr.src;
    link.download = "QRCode.png";
    link.click();
}

    const month = new Date().getMonth(); // 0 = Jan, 11 = Dec
    if (month !== 11) {
    document.querySelector(".christmas-banner")?.remove();
    document.querySelector(".snow")?.remove();
}

/* ❄️ SNOW FALLING EFFECT */
const snowContainer = document.querySelector(".snow-container");

function createSnowflake() {
  const snowflake = document.createElement("div");
  snowflake.className = "snowflake";
  snowflake.innerHTML = "❄";

  snowflake.style.left = Math.random() * window.innerWidth + "px";
  snowflake.style.animationDuration = (5 + Math.random() * 5) + "s";
  snowflake.style.fontSize = (8 + Math.random() * 12) + "px";
  snowflake.style.opacity = Math.random();

  snowContainer.appendChild(snowflake);

  setTimeout(() => {
    snowflake.remove();
  }, 10000);
}

setInterval(createSnowflake, 200);
