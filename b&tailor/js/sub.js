let observer = new IntersectionObserver((e) => {});
let div = document.querySelectorAll("div");

observer.observe(div[0]);
observer.observe(div[1]);
observer.observe(div[2]);
observer.observe(div[3]);
