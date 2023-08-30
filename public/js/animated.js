document.addEventListener("scroll", animateScroll);

function animateScroll () {
  const elementsToAnimate = document.querySelectorAll(".animation-on-scroll");
  elementsToAnimate.forEach((elemento) => {
      const posicaoTop = elemento.getBoundingClientRect().top;

      if (posicaoTop < window.innerHeight * 0.90) {
          elemento.classList.add("show");
      }
  });
}

animateScroll();