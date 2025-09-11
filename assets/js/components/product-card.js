// Product Card Component JavaScript
document.addEventListener('DOMContentLoaded', function() {
  // Initialize product card component
  initProductCard();
});

function initProductCard() {
  // Add to cart functionality
  const addToCartButtons = document.querySelectorAll('.product-button');
  
  addToCartButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Animation effect
      this.classList.add('added');
      this.innerHTML = '<i class="fas fa-check"></i> Adicionado ao Carrinho';
      
      // Reset after animation
      setTimeout(() => {
        this.classList.remove('added');
        this.innerHTML = '<i class="fas fa-shopping-cart"></i> Adicionar ao Carrinho';
      }, 2000);
    });
  });
}