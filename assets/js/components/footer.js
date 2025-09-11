// Footer Component JavaScript
document.addEventListener('DOMContentLoaded', function() {
  // Initialize footer component
  initFooter();
});

function initFooter() {
  // Script para newsletter
  const newsletterForm = document.getElementById('newsletterForm');
  
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const email = this.querySelector('input[type="email"]').value;
      
      if (email) {
        alert('Obrigado por assinar nossa newsletter!');
        this.reset();
      }
    });
  }
}