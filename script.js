// Switch écran 1 → écran 2
document.getElementById("enterBtn").onclick = () => {
    document.getElementById("screen1").classList.add("hidden");
    document.getElementById("screen2").classList.remove("hidden");
};

// Gestion boutons panel
function showPanel(id) {
    document.getElementById("reseau").classList.add("hidden");
    document.getElementById("pays").classList.add("hidden");

    document.getElementById(id).classList.remove("hidden");
}
