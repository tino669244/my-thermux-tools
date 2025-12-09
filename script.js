function generateQR() {
  const text = document.getElementById("textInput").value.trim();
  if (!text) { alert("Soraty aloha ny texte!"); return; }

  const qrImage = document.getElementById("qrImage");
  qrImage.src = "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=" + encodeURIComponent(text);

  qrImage.classList.remove("show"); // reset animation
  setTimeout(() => { qrImage.classList.add("show"); }, 50);
}
