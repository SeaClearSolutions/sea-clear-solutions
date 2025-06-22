document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.querySelector(".hamburger");
  const leftMenu = document.querySelector(".navbar ul.left");
  const rightMenu = document.querySelector(".navbar ul.right");

  hamburger.addEventListener("click", () => {
    leftMenu.classList.toggle("show");
    rightMenu.classList.toggle("show");
  });
});
