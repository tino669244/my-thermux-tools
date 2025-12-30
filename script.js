function generateQR(){
  const t=document.getElementById("textInput").value;
  const img=document.getElementById("qrImage");
  if(!t){alert("Ampidiro lien aloha");return;}
  img.src="https://api.qrserver.com/v1/create-qr-code/?size=250x250&data="+encodeURIComponent(t);
  img.style.display="block";
}

function downloadQR(){
  const img=document.getElementById("qrImage");
  if(!img.src)return;
  const a=document.createElement("a");
  a.href=img.src;
  a.download="QR_Tino_Andraina.png";
  a.click();
}

function quick(url){
  document.getElementById("textInput").value=url;
}
