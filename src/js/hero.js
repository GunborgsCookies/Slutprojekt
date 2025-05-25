document.addEventListener("DOMContentLoaded", () => {
  // Hamburger-meny funktionalitet
  const toggleBtn = document.getElementById('menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const hamburger = document.getElementById('hamburger-icon');
  const close = document.getElementById('close-icon');

  if (toggleBtn && mobileMenu && hamburger && close) {
    toggleBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
      hamburger.classList.toggle('hidden');
      close.classList.toggle('hidden');

      
      toggleBtn.setAttribute('aria-expanded', !mobileMenu.classList.contains('hidden'));
    });
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        hamburger.classList.remove('hidden');
        close.classList.add('hidden');
      });
    });
  } else {
    console.warn("⚠️ Kunde inte hitta alla element för hamburgermenyn. Kontrollera att id:n stämmer.");
  }

  // Din fetch och matchinformation
  if (typeof setInnerHTML === 'undefined') {
    function setInnerHTML(el, html) {
      el.innerHTML = html;
    }
  }

  fetch(`./data/data.json?ts=${Date.now()}`)
    .then(res => res.json())
    .then(data => {
      const idag = new Date();
      idag.setHours(0, 0, 0, 0);

      const kommande = data.matcher.find(m => {
        const matchDate = new Date(m.datum);
        return !m.spelad && matchDate >= idag;
      });

      const container = document.getElementById("match-info");

      if (kommande) {
        const datumFormaterat = new Date(kommande.datum).toLocaleDateString("sv-SE", {
          weekday: "long",
          day: "numeric",
          month: "long",
        });

        container.innerHTML = `
          <div class="flex flex-col items-center gap-[12px] mt-[48px] mb-[32px] md:mt-[16px] md:mb-[24px] text-center">
            <div class="text-[#A68F55] text-[40px] md:text-[56px] font-semibold uppercase leading-none">
              Matchdag
            </div>
            <div class="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-[20px]">
              <div class="flex flex-col md:flex-row items-center gap-2 md:gap-4">
                <img src="/assets/fiumelago_logotyp.png" alt="Fiumelago" class="h-16 md:h-20" />
                <div class="text-[32px] md:text-[48px] font-semibold uppercase leading-none">Fiumelago</div>
              </div>
              <div class="text-[28px] md:text-[48px] text-[#A68F55] font-semibold leading-none">vs.</div>
              <div class="flex flex-col md:flex-row items-center gap-2 md:gap-4">
                <div class="text-[32px] md:text-[48px] font-semibold uppercase leading-none">${kommande.motstandare}</div>
                <img src="${kommande.logga}" alt="${kommande.motstandare}" class="h-16 md:h-20" />
              </div>
            </div>
          </div>

          <p class="text-[18px] md:text-[24px] leading-tight text-white mt-[8px] mb-[40px]">
            ${datumFormaterat} – ${kommande.tid} – ${kommande.arena}
          </p>

          <div class="w-full flex justify-center mb-[64px]">
            <a href="#tabellen" class="inline-block w-[168px] text-center py-2 border border-white text-white text-sm uppercase hover:bg-[#A68F55] hover:text-[#0A121A] transition">
              Tabellen
            </a>
          </div>
        `;
      }

      function createMatchCard(match) {
        const { datum, tid, motstandare, resultat, spelad, logga, referat } = match;
        const status = spelad ? "Avslutad match" : "Kommande match";
        const fiumelagoLogo = "/assets/icons/fiumelago.png";

        let resultClass = "";
        if (spelad && resultat) {
          const [fiumelagoMål, motståndareMål] = resultat.split(/[\u2013-]/).map(Number);
          if (fiumelagoMål > motståndareMål) resultClass = "vinst";
          else if (fiumelagoMål < motståndareMål) resultClass = "forlust";
          else resultClass = "oavgjort";
        }

        const baseClass = `match-card${spelad ? ` avslutad ${resultClass}` : ""}`;
        const allClasses = referat ? `${baseClass} referat-card` : baseClass;
        const referatAttr = referat ? `data-referat="${referat}"` : "";

        const mainInfo = spelad
          ? `<div class="match-result-label">Resultat</div><div class="match-result">${resultat}</div>`
          : `<div class="match-result-label">Speldatum</div><div class="match-result">${datum} ${tid}</div>`;

        return `
          <div class="${allClasses} flex flex-col justify-between items-center text-center p-4 h-full" ${referatAttr}>
            <div class="match-status">${status}</div>
            <div class="my-2 flex flex-col items-center">
              <img src="${fiumelagoLogo}" alt="Fiumelago" class="match-logo" />
              <div class="match-teams">Fiumelago</div>
              <div class="vs-only">vs.</div>
              <div class="match-teams">${motstandare}</div>
              <img src="${logga}" alt="${motstandare}" class="match-logo" />
            </div>
            <div class="mt-2">${mainInfo}</div>
          </div>
        `;
      }

      customElements.whenDefined("swiper-container").then(() => {
        const swiperEl = document.querySelector("#matchcards");
Object.assign(swiperEl, {
  slidesPerView: 1,
  spaceBetween: 12,
  centeredSlides: true,
  pagination: {
    el: '.hero-pagination',
    clickable: true,
  },
  breakpoints: {
    640: {
      slidesPerView: 2,
      spaceBetween: 12,
      centeredSlides: false,
    },
    768: {
      slidesPerView: 3,
      spaceBetween: 16,
      centeredSlides: false,
    },
    1024: {
      slidesPerView: 4,
      spaceBetween: 20,
      centeredSlides: false,
    },
    1280: {
      slidesPerView: 5,
      spaceBetween: 24,
      centeredSlides: false,
    },
  },
  virtual: {
    slides: data.matcher.map(createMatchCard),
  },
  navigation: {
    nextEl: '#nextBtn',
    prevEl: '#prevBtn',
  }
});


        swiperEl.initialize();

        const swiper = swiperEl.swiper;
        swiper.on('slideChange', () => {
          document.getElementById("prevBtn").classList.toggle("invisible", swiper.isBeginning);
          document.getElementById("nextBtn").classList.toggle("invisible", swiper.isEnd);
        });
      });
    });

  // Hantera klick på referat-kort
  document.addEventListener("click", function (e) {
    const card = e.target.closest(".referat-card");
    if (card && card.dataset.referat) {
      document.getElementById("referat-content").textContent = card.dataset.referat;
      document.getElementById("referat-modal").classList.remove("hidden");
    }
  });

});
