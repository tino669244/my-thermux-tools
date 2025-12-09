function generateQR() {
  const textInput = document.getElementById("textInput").value.trim();
  const qrImage = document.getElementById("qrImage");

  if (!textInput) {
    alert("Soraty aloha ny texte!");
    return;
  }

  // Mamorona URL QR Code avy amin'ny API
  const qrUrl = "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=" + encodeURIComponent(textInput);

  // Reset animation
  qrImage.classList.remove("show");

  // Ampiditra sary vaovao
  qrImage.src = qrUrl;

  // Ampihetsika animation (scale + fade)
  setTimeout(() => {
    qrImage.classList.add("show");
  }, 50); // 50ms delay mba hahazoana effet smooth
}
