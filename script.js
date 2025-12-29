function generateQR() {
  const input = document.getElementById("inputText").value.trim();
  if (!input) {
    alert("Ampidiro lien aloha");
    return;
  }

  const url =
    "https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=" +
    encodeURIComponent(input);

  const preview = document.getElementById("qrPreview");
  const center = document.getElementById("qrCenter");

  preview.src = url;
  center.src = url;

  preview.style.display = "block";
}

function downloadQR() {
  const img = document.getElementById("qrPreview");
  if (!img.src) return;

  const a = document.createElement("a");
  a.href = img.src;
  a.download = "QR_Tino_Andraina.png";
  a.click();
}
