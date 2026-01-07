// Small glowing animation on connection lines
const links = document.querySelectorAll(".link");

links.forEach((line, i) => {
    line.style.strokeDasharray = "10 10";
    let dashOffset = 0;

    setInterval(() => {
        dashOffset += 1.5;
        line.style.strokeDashoffset = dashOffset;
    }, 40);
});
