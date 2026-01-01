function generateQR(){
  const text = document.getElementById("qrInput").value;
  document.getElementById("qrBox").innerHTML =
    `<img src="https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(text)}">`;
}

function downloadQR(){
  const img = document.querySelector("#qrBox img");
  if(!img) return;
  const a = document.createElement("a");
  a.href = img.src;
  a.download = "qr.png";
  a.click();
}
