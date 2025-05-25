  document.addEventListener("DOMContentLoaded", function () {
    new Swiper(".nyhets-swiper", {
      slidesPerView: 1,
      spaceBetween: 30,
      navigation: {
        nextEl: ".nyheter-next",
        prevEl: ".nyheter-prev",
      },
      pagination: {
        el: ".nyheter-pagination",
        clickable: true
      },
      breakpoints: {
        768: { slidesPerView: 2 },
        1024: { slidesPerView: 3 }
      }
    });
  });