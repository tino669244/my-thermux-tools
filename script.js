function generateQR() {
  const text = document.getElementById("textInput").value.trim();

  if (!text) {
    alert("Soraty aloha ny texte!");
    return;
  }

  const qrUrl = "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=" + encodeURIComponent(text);
  document.getElementById("qrImage").src = qrUrl;
}
