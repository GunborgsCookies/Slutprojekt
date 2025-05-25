 document.addEventListener("DOMContentLoaded", () => {
    const lagetSwiper = new Swiper('.laget-swiper', {
      loop: true,
      loopedSlides: 5, // säker loop-rendering
      centeredSlides: true,
      initialSlide: 3,
      spaceBetween: 5,
      observer: true,
      observeParents: true,
      slidesPerView: 1, // mobil default

      breakpoints: {
        640: { slidesPerView: 3 },
        1024: { slidesPerView: 5 }
      },

      on: {
        init(swiper) {
          updatePlayerInfo(swiper);
          setTimeout(() => swiper.update(), 100); // tvingar rätt layout direkt
        },
        slideChange(swiper) {
          updatePlayerInfo(swiper);
        }
      }
    });

    // Navigeringsknappar
    document.querySelector('.custom-prev').addEventListener('click', () => lagetSwiper.slidePrev());
    document.querySelector('.custom-next').addEventListener('click', () => lagetSwiper.slideNext());

    // Klicka på spelare för att byta direkt
    document.querySelectorAll('.swiper-slide').forEach((slide, index) => {
      slide.addEventListener('click', () => {
        lagetSwiper.slideToLoop(index);
      });
    });

    function updatePlayerInfo(swiperInstance) {
      const slides = swiperInstance.slides;
      const activeIndex = swiperInstance.activeIndex;

      slides.forEach((slide, index) => {
        const img = slide.querySelector(".player-img");
        if (!img) return;

        if (index === activeIndex) {
          // ✅ Skala bara från md: och uppåt
          img.classList.add("md:scale-125", "scale-100", "opacity-100");
          img.classList.remove("opacity-50");
        } else {
          img.classList.remove("md:scale-125", "opacity-100");
          img.classList.add("scale-100", "opacity-50");
        }
      });

      const activeSlide = swiperInstance.slides[activeIndex];
      const img = activeSlide.querySelector("img");
      const name = img?.dataset.player || "";
      const position = img?.dataset.position || "";

      const nameEl = document.getElementById("player-name");
      const posEl = document.getElementById("player-position");

      nameEl.classList.add("opacity-0");
      posEl.classList.add("opacity-0");

      setTimeout(() => {
        nameEl.textContent = name;
        posEl.textContent = position;
        nameEl.classList.remove("opacity-0");
        posEl.classList.remove("opacity-0");
      }, 150);
    }
  });