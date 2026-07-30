(() => {
  "use strict";

  const loadYouTubePlayer = (button) => {
    const player = button.closest(".media-player");
    const videoId = button.dataset.youtubeId;
    const title = button.dataset.youtubeTitle;

    if (!player || !videoId || !title) {
      return;
    }

    const iframe = document.createElement("iframe");
    iframe.src = `https://www.youtube-nocookie.com/embed/${encodeURIComponent(videoId)}`;
    iframe.title = title;
    iframe.allow =
      "accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
    iframe.referrerPolicy = "strict-origin-when-cross-origin";
    iframe.allowFullscreen = true;

    player.replaceChildren(iframe);
    iframe.focus();
  };

  document.querySelectorAll("[data-youtube-id]").forEach((button) => {
    button.addEventListener("click", () => loadYouTubePlayer(button));
    button.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " " || event.key === "Spacebar") {
        event.preventDefault();
        loadYouTubePlayer(button);
      }
    });
  });

  document.documentElement.classList.add("media-enhanced");

  const dialog = document.querySelector("[data-media-lightbox-dialog]");
  if (!dialog) {
    return;
  }

  const dialogImage = dialog.querySelector("[data-media-lightbox-image]");
  const dialogTitle = dialog.querySelector("[data-media-lightbox-title]");
  const dialogCaption = dialog.querySelector("[data-media-lightbox-caption]");
  const dialogFullLink = dialog.querySelector("[data-media-lightbox-full]");
  const closeButton = dialog.querySelector("[data-media-lightbox-close]");
  let activatingLink = null;

  const focusableElements = () =>
    Array.from(dialog.querySelectorAll('button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])'));

  const closeLightbox = () => {
    dialog.hidden = true;
    document.body.classList.remove("media-lightbox-open");
    activatingLink?.focus();
    activatingLink = null;
  };

  document.querySelectorAll("[data-media-lightbox]").forEach((link) => {
    link.addEventListener("click", (event) => {
      if (!dialogImage || !dialogTitle || !dialogCaption || !dialogFullLink || !closeButton) {
        return;
      }

      event.preventDefault();
      activatingLink = link;
      dialogImage.src = link.href;
      dialogImage.alt = link.dataset.lightboxAlt || "";
      dialogTitle.textContent = link.dataset.lightboxTitle || "TowleVision Studio interface";
      dialogCaption.textContent = link.dataset.lightboxCaption || "";
      dialogFullLink.href = link.href;
      dialog.hidden = false;
      document.body.classList.add("media-lightbox-open");
      closeButton.focus();
    });
  });

  closeButton?.addEventListener("click", closeLightbox);

  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) {
      closeLightbox();
    }
  });

  dialog.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      event.preventDefault();
      closeLightbox();
      return;
    }

    if (event.key !== "Tab") {
      return;
    }

    const focusable = focusableElements();
    if (focusable.length === 0) {
      event.preventDefault();
      return;
    }

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  });
})();
