function generateQR() {
  const textInput = document.getElementById("textInput").value.trim();
  const qrImage = document.getElementById("qrImage");

  if (!textInput) {
    alert("Soraty aloha ny URL!");
    return;
  }

  const qrUrl =
    "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=" +
    encodeURIComponent(textInput);

  qrImage.classList.remove("show");
  qrImage.src = qrUrl;

  setTimeout(() => {
    qrImage.classList.add("show");
  }, 50);
}

function downloadQR() {
  const qrImage = document.getElementById("qrImage");

  if (!qrImage.src) {
    alert("Mamorona QR aloha!");
    return;
  }

  const link = document.createElement("a");
  link.href = qrImage.src;
  link.download = "QRCode.png";
  link.click();
}
