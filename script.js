/* ===== MATRIX RAIN ===== */
const canvas = document.getElementById("matrix");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const chars = "0123456789";
const fontSize = 14;
const columns = canvas.width / fontSize;
const drops = Array(Math.floor(columns)).fill(0);

function drawMatrix(){
  ctx.fillStyle = "rgba(0,0,0,0.05)";
  ctx.fillRect(0,0,canvas.width,canvas.height);

  ctx.fillStyle = "#00ff66";
  ctx.font = fontSize+"px monospace";

  for(let i=0;i<drops.length;i++){
    const text = chars[Math.floor(Math.random()*chars.length)];
    ctx.fillText(text, i*fontSize, drops[i]*fontSize);
    if(drops[i]*fontSize > canvas.height && Math.random() > 0.975)
      drops[i]=0;
    drops[i]++;
  }
}
setInterval(drawMatrix, 50);

/* ===== QR ===== */
function generateQR(){
  const text = qrInput.value;
  qrBox.innerHTML =
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

/* ===== 3D GLOBE ===== */
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({alpha:true, antialias:true});
renderer.setSize(300,300);
document.getElementById("globe").appendChild(renderer.domElement);

const globe = new THREE.Mesh(
  new THREE.SphereGeometry(1, 32, 32),
  new THREE.MeshBasicMaterial({
    wireframe:true,
    color:0x00ff66
  })
);
scene.add(globe);

// Madagascar point
const point = new THREE.Mesh(
  new THREE.SphereGeometry(0.05),
  new THREE.MeshBasicMaterial({color:0x00ff66})
);
point.position.set(0.4,-0.2,0.9);
scene.add(point);

camera.position.z = 3;

function animate(){
  requestAnimationFrame(animate);
  globe.rotation.y += 0.003;
  renderer.render(scene,camera);
}
animate();
