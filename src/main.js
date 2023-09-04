// new Freezeframe();
// Select all card elements
const cards = document.querySelectorAll(".card");

// Loop through each card
cards.forEach((card) => {
	const cardGif = card.querySelector(".card-gif");
	const cardImg = card.querySelector(".card-img");
	const cardVideo = card.querySelector(".card-video");

	if (cardGif && cardImg) {
		// Handle hovering over the card
		card.addEventListener("mouseenter", () => {
			cardImg.style.opacity = "0"; // Hide the Img
			cardGif.style.opacity = "1"; // Show the GIF
			setTimeout(() => {
				cardGif.style.display = "block";
				cardImg.style.display = "none";
			}, 300);
		});

		// Handle mouseout (if you want to hide the GIF when not hovering)
		card.addEventListener("mouseleave", () => {
			cardGif.style.opacity = "0"; // Hide the GIF
			cardImg.style.opacity = "1"; // Show the Img

			setTimeout(() => {
				cardGif.style.display = "none";
				cardImg.style.display = "block";
			}, 300);
		});
	} else if (cardVideo) {
		card.addEventListener("mouseenter", () => {
			cardVideo.style.opacity = "0";
			setTimeout(() => {
				cardVideo.style.opacity = "1";
			}, 300);
			cardVideo.play();
		});
		card.addEventListener("mouseleave", () => {
			cardVideo.currentTime = 0;
			cardVideo.pause();
		});
	}
});


// JavaScript code to lazy load cards with backdrop filter
const lazyCards = document.querySelectorAll('.lazy-load');

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      // Apply backdrop filter when the card is in the viewport
      entry.target.classList.add('backdrop-filtered');
      observer.unobserve(entry.target); // Stop observing this card
    }
  });
});

lazyCards.forEach((card) => {
  observer.observe(card);
});
