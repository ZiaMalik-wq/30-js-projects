function playSound(key) {
  const upperKey = key.toUpperCase();
  const audio = document.querySelector(`audio[data-key="${upperKey}"]`);
  const keyDiv = document.querySelector(`.key[data-key="${upperKey}"]`);
  if (!audio || !keyDiv) return;

  keyDiv.classList.add('playing');
  audio.currentTime = 0;
  audio.play();
}

function removeTransition(e) {
  if (e.propertyName !== 'transform') return;
  e.target.classList.remove('playing');
}

const keysContainer = document.querySelector('.keys');

// Listen for keyboard presses on the whole window
window.addEventListener('keydown', (e) => {
  playSound(e.key);
});

// Use event delegation for clicks on the keys
keysContainer.addEventListener('click', e => {
  const keyDiv = e.target.closest('.key');
  if (!keyDiv) return;
  playSound(keyDiv.dataset.key);
});

const keys = document.querySelectorAll('.key');
keys.forEach(key => {
  key.addEventListener('transitionend', removeTransition);

  // Optional: For full accessibility with tabindex
  key.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
          // Prevent spacebar from scrolling the page
          e.preventDefault(); 
          playSound(key.dataset.key);
      }
  });
});