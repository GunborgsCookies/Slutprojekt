document.addEventListener("DOMContentLoaded", function () {
  const scrollWrapper = document.getElementById("table-scroll-wrapper");

  if (scrollWrapper) {
    OverlayScrollbars(scrollWrapper, {
      className: "os-theme-dark",
      scrollbars: {
        autoHide: "scroll",
        autoHideDelay: 500
      }
    });
  } else {
    console.warn("⚠️ 'table-scroll-wrapper' hittades inte.");
  }
});