const canvas = document.getElementById("background-animation");

function resizeCanvas() {
  canvas.width = window.innerWidth - 15;
  drawAnimation();
}

resizeCanvas();
window.addEventListener("resize", resizeCanvas);

function drawAnimation() {
  const context = canvas.getContext("2d");
  context.lineWidth = 0.21;

  const numberOfStars = Math.floor((canvas.width * canvas.height) / 5000);
  const minDistanceForLine = 120;

  const stars = [];

  for (let star = 0; star < numberOfStars; star++) {
    stars.push({
      posX: Math.random() * canvas.width,
      posY: Math.random() * canvas.height,
      velocityX: (Math.random() - 0.5) * 1,
      velocityY: (Math.random() - 0.5) * 1,
      color: `rgba(255, 255, 255, ${Math.random() * 0.8 + 0.2})`,
    });
  }

  function draw() {
    context.clearRect(0, 0, canvas.width, canvas.height);

    stars.forEach((star) => {
      star.posX += star.velocityX;
      star.posY += star.velocityY;

      if (star.posX < 0 || star.posX > canvas.width) {
        star.velocityX *= -1;
      }
      if (star.posY < 0 || star.posY > canvas.height) {
        star.velocityY *= -1;
      }

      star.posX = Math.max(0, Math.min(canvas.width, star.posX));
      star.posY = Math.max(0, Math.min(canvas.height, star.posY));

      context.beginPath();
      context.arc(star.posX, star.posY, 1, 0, Math.PI * 2);
      context.fillStyle = "#d9d9d9";
      context.fill();
      context.closePath();
    });

    stars.forEach((star, index) => {
      for (let i = index + 1; i < stars.length; i++) {
        const otherStar = stars[i];
        const distance = Math.sqrt(
          (star.posX - otherStar.posX) ** 2 + (star.posY - otherStar.posY) ** 2
        );

        if (distance <= minDistanceForLine) {
          const opacity = 1 - (distance / minDistanceForLine) * 0.9;

          context.strokeStyle = `rgba(255, 215, 0, ${opacity})`;
          context.beginPath();
          context.moveTo(star.posX, star.posY);
          context.lineTo(otherStar.posX, otherStar.posY);
          context.stroke();
        }
      }
    });

    requestAnimationFrame(draw);
  }

  draw();
}
