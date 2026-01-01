/* ===== MATRIX RAIN ===== */
const c = document.getElementById("matrix");
const ctx = c.getContext("2d");
c.width = innerWidth;
c.height = innerHeight;

const chars = "0123456789";
const size = 14;
const cols = c.width / size;
const drops = Array(Math.floor(cols)).fill(0);

setInterval(()=>{
  ctx.fillStyle="rgba(0,0,0,0.08)";
  ctx.fillRect(0,0,c.width,c.height);
  ctx.fillStyle="#00ff66";
  ctx.font=size+"px monospace";

  drops.forEach((y,i)=>{
    const t = chars[Math.random()*chars.length|0];
    ctx.fillText(t,i*size,y*size);
    if(y*size>c.height && Math.random()>0.98) drops[i]=0;
    drops[i]++;
  });
},50);

/* ===== QR ===== */
function generateQR(){
  const t=qrInput.value;
  qrBox.innerHTML=`<img src="https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(t)}">`;
}
function downloadQR(){
  const img=document.querySelector("#qrBox img");
  if(!img)return;
  const a=document.createElement("a");
  a.href=img.src;
  a.download="qr.png";
  a.click();
}
function quick(u){qrInput.value=u}

/* ===== GLOBE 3D ===== */
const scene=new THREE.Scene();
const camera=new THREE.PerspectiveCamera(45,1,0.1,1000);
const renderer=new THREE.WebGLRenderer({alpha:true,antialias:true});
renderer.setSize(300,300);
document.getElementById("globe").appendChild(renderer.domElement);

const globe=new THREE.Mesh(
  new THREE.SphereGeometry(1,32,32),
  new THREE.MeshBasicMaterial({wireframe:true,color:0x00ff66})
);
scene.add(globe);

/* Madagascar point */
const origin=new THREE.Mesh(
  new THREE.SphereGeometry(0.05),
  new THREE.MeshBasicMaterial({color:0x00ff66})
);
origin.position.set(0.45,-0.25,0.85);
scene.add(origin);

/* Rays */
for(let i=0;i<12;i++){
  const mat=new THREE.LineBasicMaterial({color:0x00ff66});
  const pts=[
    new THREE.Vector3(0.45,-0.25,0.85),
    new THREE.Vector3(
      Math.random()*2-1,
      Math.random()*2-1,
      Math.random()*2-1
    )
  ];
  scene.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts),mat));
}

camera.position.z=3;

/* Interaction */
let down=false,px=0,py=0;
renderer.domElement.onmousedown=e=>{down=true;px=e.x;py=e.y};
onmouseup=()=>down=false;
onmousemove=e=>{
  if(!down)return;
  globe.rotation.y+=(e.x-px)*0.005;
  globe.rotation.x+=(e.y-py)*0.005;
  px=e.x;py=e.y;
};
onwheel=e=>{
  camera.position.z+=e.deltaY*0.001;
  camera.position.z=Math.min(Math.max(camera.position.z,2),6);
};

(function animate(){
  requestAnimationFrame(animate);
  globe.rotation.y+=0.002;
  renderer.render(scene,camera);
})();
