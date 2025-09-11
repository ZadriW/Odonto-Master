// Carousel Component JavaScript
document.addEventListener('DOMContentLoaded', function() {
  // Initialize carousel components
  initCarousels();
});

function initCarousels() {
  // Initialize carousels
  const carousels = document.querySelectorAll('.js-product-carousel');
  
  carousels.forEach((carousel, index) => {
    const track = carousel.querySelector('.products-carousel-track');
    const slides = carousel.querySelectorAll('.product-slide');
    const prevBtn = carousel.querySelector('.carousel-nav--prev');
    const nextBtn = carousel.querySelector('.carousel-nav--next');
    const dotsContainer = carousel.querySelector('.carousel-dots');
    
    if (!track || !slides.length) return;
    
    let currentIndex = 0;
    const totalSlides = slides.length;
    const itemsPerView = getItemsPerView();
    let isTransitioning = false;
    
    // Create dots
    if (dotsContainer) {
      const totalGroups = Math.ceil(totalSlides / itemsPerView);
      dotsContainer.innerHTML = Array.from({ length: totalGroups }, (_, i) => `
        <button class="carousel-dot ${i === 0 ? 'active' : ''}" data-index="${i}" aria-label="Ir para grupo ${i + 1}"></button>
      `).join('');
    }
    
    // Navigation functions
    function updateCarousel() {
      if (isTransitioning) return;
      isTransitioning = true;
      
      const slideWidth = 100 / itemsPerView;
      const offset = -(currentIndex * slideWidth);
      track.style.transition = 'transform 0.4s cubic-bezier(0.2, 0.6, 0.2, 1)';
      track.style.transform = `translateX(${offset}%)`;
      
      // Update dots
      if (dotsContainer) {
        const dots = dotsContainer.querySelectorAll('.carousel-dot');
        const currentGroup = Math.floor(currentIndex / itemsPerView);
        dots.forEach((dot, index) => {
          dot.classList.toggle('active', index === currentGroup);
        });
      }
      
      setTimeout(() => {
        isTransitioning = false;
      }, 400);
      
      // Update button states
      if (prevBtn) prevBtn.disabled = currentIndex === 0;
      if (nextBtn) nextBtn.disabled = currentIndex >= totalSlides - itemsPerView;
    }
    
    function next() {
      if (currentIndex < totalSlides - itemsPerView) {
        currentIndex += itemsPerView;
        updateCarousel();
      }
    }
    
    function prev() {
      if (currentIndex > 0) {
        currentIndex -= itemsPerView;
        updateCarousel();
      }
    }
    
    function goToGroup(groupIndex) {
      currentIndex = groupIndex * itemsPerView;
      updateCarousel();
    }
    
    // Event listeners
    if (prevBtn) prevBtn.addEventListener('click', prev);
    if (nextBtn) nextBtn.addEventListener('click', next);
    
    if (dotsContainer) {
      dotsContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('carousel-dot')) {
          const index = parseInt(e.target.dataset.index);
          goToGroup(index);
        }
      });
    }
    
    // Touch/swipe support
    let startX = 0;
    let currentX = 0;
    
    track.addEventListener('touchstart', e => {
      startX = e.touches[0].clientX;
    });
    
    track.addEventListener('touchmove', e => {
      currentX = e.touches[0].clientX;
      const diff = startX - currentX;
      
      if (Math.abs(diff) > 50) {
        if (diff > 0) {
          next();
        } else {
          prev();
        }
        startX = currentX;
      }
    });
    
    // Initial update
    updateCarousel();
  });
  
  function getItemsPerView() {
    const width = window.innerWidth;
    if (width <= 480) return 1;
    if (width <= 768) return 2;
    if (width <= 1200) return 3;
    return 4;
  }
}