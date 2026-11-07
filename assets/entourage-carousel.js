(() => {
  const track = document.getElementById("entourage-track");
  const slides = Array.from(track.querySelectorAll(".entourage-slide"));
  const previous = document.getElementById("entourage-previous");
  const next = document.getElementById("entourage-next");
  const dots = Array.from(document.querySelectorAll(".entourage-dot"));
  const status = document.getElementById("entourage-status");
  let activeIndex = 0;

  const updateControls = () => {
    const index = Math.min(
      slides.length - 1,
      Math.max(0, Math.round(track.scrollLeft / track.clientWidth))
    );

    if (index === activeIndex) return;
    activeIndex = index;
    previous.disabled = index === 0;
    next.disabled = index === slides.length - 1;
    status.textContent = `${index + 1} / ${slides.length}`;

    slides.forEach((slide, slideIndex) => {
      slide.setAttribute("aria-hidden", String(slideIndex !== index));
    });

    dots.forEach((dot, dotIndex) => {
      dot.setAttribute("aria-current", String(dotIndex === index));
    });
  };

  const showSlide = (index) => {
    const destination = Math.max(0, Math.min(slides.length - 1, index));
    track.scrollTo({
      left: destination * track.clientWidth,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth"
    });
  };

  previous.addEventListener("click", () => showSlide(activeIndex - 1));
  next.addEventListener("click", () => showSlide(activeIndex + 1));
  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => showSlide(index));
  });
  track.addEventListener("scroll", updateControls, { passive: true });
  window.addEventListener("resize", updateControls);
  track.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      showSlide(activeIndex - 1);
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      showSlide(activeIndex + 1);
    }
  });

  slides.forEach((slide, index) => {
    slide.setAttribute("aria-hidden", String(index !== activeIndex));
  });
})();
