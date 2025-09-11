// Filters Component JavaScript
document.addEventListener('DOMContentLoaded', function() {
  // Initialize filters component
  initFilters();
});

function initFilters() {
  // Filter toggle functionality
  const filterToggleButtons = document.querySelectorAll('.filter-toggle-btn');
  
  filterToggleButtons.forEach(button => {
    button.addEventListener('click', function() {
      const hiddenGroup = this.parentElement.querySelector('.filter-group__hidden');
      const icon = this.querySelector('.toggle-icon');
      
      if (hiddenGroup) {
        hiddenGroup.classList.toggle('expanded');
        const isExpanded = hiddenGroup.classList.contains('expanded');
        
        // Update button text and icon
        this.querySelector('span').textContent = isExpanded ? 'Ver menos' : 'Ver mais';
        icon.style.transform = isExpanded ? 'rotate(180deg)' : 'rotate(0deg)';
        
        // Update aria-expanded attribute
        this.setAttribute('aria-expanded', isExpanded.toString());
      }
    });
  });
  
  // Clear filters functionality
  const clearFiltersButton = document.querySelector('.clear-filters-btn');
  
  if (clearFiltersButton) {
    clearFiltersButton.addEventListener('click', function() {
      // Clear all checkboxes
      const checkboxes = document.querySelectorAll('.checkbox-filter input[type="checkbox"]');
      checkboxes.forEach(checkbox => {
        checkbox.checked = false;
      });
      
      // Reset price sliders (if applicable)
      const priceSliders = document.querySelectorAll('.price-slider');
      if (priceSliders.length === 2) {
        priceSliders[0].value = priceSliders[0].min;
        priceSliders[1].value = priceSliders[1].max;
        updatePriceDisplay(priceSliders[0].min, priceSliders[1].max);
      }
      
      // Dispatch custom event to notify that filters have been cleared
      document.dispatchEvent(new CustomEvent('filtersCleared'));
    });
  }
  
  // Price slider functionality
  const priceSliders = document.querySelectorAll('.price-slider');
  
  if (priceSliders.length === 2) {
    priceSliders.forEach(slider => {
      slider.addEventListener('input', function() {
        // Ensure min slider doesn't exceed max slider
        if (slider === priceSliders[0] && parseInt(slider.value) > parseInt(priceSliders[1].value)) {
          slider.value = priceSliders[1].value;
        }
        
        if (slider === priceSliders[1] && parseInt(slider.value) < parseInt(priceSliders[0].value)) {
          slider.value = priceSliders[0].value;
        }
        
        updatePriceDisplay(priceSliders[0].value, priceSliders[1].value);
      });
    });
    
    // Initialize price display
    updatePriceDisplay(priceSliders[0].value, priceSliders[1].value);
  }
  
  function updatePriceDisplay(min, max) {
    const priceDisplay = document.querySelector('.price-display');
    if (priceDisplay) {
      priceDisplay.textContent = `R$ ${min} - R$ ${max}`;
    }
  }
  
  // Listen for the custom event and trigger filterProducts if it exists
  document.addEventListener('filtersCleared', function() {
    // Try to call filterProducts function from page-specific JS
    if (typeof filterProducts === 'function') {
      // Small delay to ensure DOM is updated
      setTimeout(filterProducts, 10);
    }
  });
}