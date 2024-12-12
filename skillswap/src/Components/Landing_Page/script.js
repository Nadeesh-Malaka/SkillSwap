const cards = document.querySelectorAll('.swap-card');
const totalCards = cards.length;
let currentIndex = 0;

function showNextCards() {
  // Adjust transform using template literals
  document.querySelector('.swap-cards').style.transform = `translateX(-${currentIndex * 240}px)`;

  // Move to the next set of 3 cards, wrapping around if necessary
  currentIndex = (currentIndex + 3) % totalCards;
}

function toggleMenu() {
  const navLinks = document.querySelector('.nav-links');
  navLinks.classList.toggle('show');
}

// Wait until content is fully loaded
window.onload = () => {
  if (totalCards > 0) {
    showNextCards();
    setInterval(showNextCards, 2000);
  }
};
