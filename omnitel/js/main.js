let mainText = document.querySelector("h2");

window.addEventListener("scroll", function () {
  let value = window.scrollY;
  console.log("scrollY", value);
  if (value > 800) {
    mainText.style.animation = "disappear 2s ease-out forwards";
  } else {
    mainText.style.animation = "slide 2s ease-out forwards";
  }
});

$(document).ready(function () {
  $(".typing").typed({
    strings: ["DEVELOPERS;"],
    typeSpeed: 300,
    startDelay: 0,
    backSpeed: 60,
    backDelay: 2000,
    loop: true,
    cursorChar: "|",
    contentType: "html",
  });
});
let observer = new IntersectionObserver((e) => {
  e.forEach((박스) => {
    박스.target.style.opacity = 1;
  });
});
let div = document.querySelectorAll("div");

observer.observe(div[0]);
observer.observe(div[1]);
observer.observe(div[2]);
observer.observe(div[3]);
