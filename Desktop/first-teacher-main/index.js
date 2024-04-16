document.addEventListener("DOMContentLoaded", function () {
  const parallaxContainer = document.getElementById("parallaxContainer");
  const parallaxContainer1 = document.getElementById("parallaxContainer1");
  const parallaxContainer2 = document.getElementById("parallaxContainer2");
  const parallaxImage = document.getElementById("parallaxImage");

  window.addEventListener("scroll", function () {
    const scrollY = window.scrollY;
    parallaxContainer.style.transform = `translateY(-${scrollY * 1}px)`;
    parallaxContainer1.style.transform = `translateY(-${scrollY * 0.8}px)`;
    parallaxContainer2.style.transform = `translateY(-${scrollY * 0.8}px)`;
    parallaxImage.style.top = `-${scrollY}px`;
  });
});
document.addEventListener("DOMContentLoaded", function () {
  const navbar = document.getElementById("navbar");

  window.addEventListener("scroll", function () {
    if (window.scrollY > 100) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });
});
const inputFields = document.querySelectorAll(".input-field");

inputFields.forEach((input) => {
  input.addEventListener("focus", () => {
    input.parentElement.firstElementChild.classList.add("focused");
  });

  input.addEventListener("blur", () => {
    input.parentElement.firstElementChild.classList.remove("focused");
  });

  input.addEventListener("input", () => {
    if (input.value) {
      input.parentElement.classList.add("has-content");
    } else {
      input.parentElement.classList.remove("has-content");
    }
  });
});
