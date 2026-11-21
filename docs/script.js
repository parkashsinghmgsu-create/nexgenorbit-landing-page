// Central logo cursor-following script with click/tap interaction
document.addEventListener('DOMContentLoaded', function() {
  const centralLogo = document.getElementById('centralLogo');
  const cursorFollower = document.createElement('div');
  cursorFollower.className = 'cursor-follower';
  document.body.appendChild(cursorFollower);

  let mouseX = 0;
  let mouseY = 0;
  let logoX = 0;
  let logoY = 0;

  // Cursor follower position
  function updateCursorFollower() {
    cursorFollower.style.left = mouseX + 'px';
    cursorFollower.style.top = mouseY + 'px';
  }

  // Smooth follow for central logo
  function followLogo() {
    const rect = centralLogo.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Move logo towards mouse with smoothing
    logoX += (mouseX * 0.01 + centerX - 50 - logoX) * 0.1;
    logoY += (mouseY * 0.01 + centerY - 50 - logoY) * 0.1;
    
    centralLogo.style.transform = `translate(${logoX - 50}px, ${logoY - 50}px)`;
    
    requestAnimationFrame(followLogo);
  }

  // Mouse tracking
  document.addEventListener('mousemove', function(e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
    updateCursorFollower();
  });

  // Click/tap interaction - add ripple effect
  centralLogo.addEventListener('click', function(e) {
    // Add clicked class for ripple animation
    centralLogo.classList.add('clicked');
    
    // Remove after animation completes
    setTimeout(() => {
      centralLogo.classList.remove('clicked');
    }, 600);
    
    // Optional: haptic feedback on mobile
    if (navigator.vibrate) {
      navigator.vibrate(10);
    }
  });

  // Touch support for mobile
  centralLogo.addEventListener('touchstart', function(e) {
    e.preventDefault();
    centralLogo.classList.add('clicked');
  }, { passive: false });

  centralLogo.addEventListener('touchend', function(e) {
    e.preventDefault();
    setTimeout(() => {
      centralLogo.classList.remove('clicked');
    }, 600);
    
    if (navigator.vibrate) {
      navigator.vibrate(10);
    }
  }, { passive: false });

  // Initialize
  followLogo();
});