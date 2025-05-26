export function openReferatModal(match) {
  const modal = document.getElementById("referat-modal");
  const content = document.getElementById("referat-content");

  if (!modal || !content) return;

  if (!match.referat || match.referat.trim() === "") {
    content.innerHTML = "<p>Inget referat tillgängligt.</p>";
  } else {
    content.innerHTML = match.referat;
  }

  modal.classList.remove("hidden");
  modal.setAttribute("tabindex", "-1");
  modal.focus();
}

export function closeModal() {
  const modal = document.getElementById("referat-modal");
  if (modal) {
    modal.classList.add("hidden");
  }
}

export function closeModalIfClickedOutside(event) {
  if (event.target.id === "referat-modal") {
    closeModal();
  }
}

// ESC-stängning
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeModal();
  }
});

// Tillgängliggör för inline onclick i HTML
window.closeModal = closeModal;
window.closeModalIfClickedOutside = closeModalIfClickedOutside;

// Lägg till event listener på stäng-knappen
document.addEventListener("DOMContentLoaded", () => {
  const closeBtn = document.getElementById("closeModalBtn");
  if (closeBtn) {
    closeBtn.addEventListener("click", closeModal);
  }
});
const bullets = document.querySelectorAll('.swiper-pagination-bullet');
console.log("Antal bullets:", bullets.length);