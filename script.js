function preset(type) {
  const input = document.getElementById("inputText");
  const links = {
    facebook: "https://www.facebook.com/",
    instagram: "https://www.instagram.com/",
    tiktok: "https://www.tiktok.com/@",
    youtube: "https://www.youtube.com/",
    whatsapp: "https://wa.me/"
  };
  input.value = links[type];
}

function generateQR() {
  const text = document.getElementById("inputText").value.trim();
  const img = document.getElementById("qrImage");

  if (!text) {
    alert("Ampidiro URL aloha");
    return;
  }

  img.src =
    "https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=" +
    encodeURIComponent(text);

  img.style.display = "block";
}

function downloadQR() {
  const img = document.getElementById("qrImage");
  if (!img.src) return;

  const a = document.createElement("a");
  a.href = img.src;
  a.download = "QRCode.png";
  a.click();
}

/* ❄️ SNOW EFFECT */
const snowContainer = document.querySelector(".snow-container");

setInterval(() => {
  const snow = document.createElement("div");
  snow.className = "snowflake";
  snow.innerHTML = "❄";
  snow.style.left = Math.random() * window.innerWidth + "px";
  snow.style.fontSize = 8 + Math.random() * 12 + "px";
  snow.style.animationDuration = 5 + Math.random() * 5 + "s";

  snowContainer.appendChild(snow);

  setTimeout(() => snow.remove(), 10000);
}, 200);
