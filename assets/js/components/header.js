// Header Component JavaScript
document.addEventListener('DOMContentLoaded', function() {
  // Initialize header component
  initHeader();
});

function initHeader() {
  // Mobile menu toggle
  const mobileMenuToggle = document.getElementById('mobileMenuToggle');
  const mobileMenuClose = document.getElementById('mobileMenuClose');
  const mainNavigation = document.getElementById('main-navigation');
  
  if (mobileMenuToggle && mobileMenuClose && mainNavigation) {
    mobileMenuToggle.addEventListener('click', function() {
      document.body.classList.add('nav-open');
      mainNavigation.setAttribute('aria-hidden', 'false');
    });
    
    mobileMenuClose.addEventListener('click', function() {
      document.body.classList.remove('nav-open');
      mainNavigation.setAttribute('aria-hidden', 'true');
    });
  }
  
  // Mega menu
  const megaMenuTrigger = document.getElementById('mega-menu-trigger');
  const megaMenuContent = document.getElementById('mega-menu-content');
  const submenuOverlay = document.querySelector('.submenu-overlay');
  const megaMenuClose = document.querySelector('.submenu__close');
  
  if (megaMenuTrigger && megaMenuContent && submenuOverlay) {
    megaMenuTrigger.addEventListener('click', function(e) {
      e.preventDefault();
      megaMenuContent.classList.add('submenu--active');
      submenuOverlay.classList.add('active');
      document.body.classList.add('no-scroll');
    });
    
    megaMenuClose.addEventListener('click', function() {
      megaMenuContent.classList.remove('submenu--active');
      submenuOverlay.classList.remove('active');
      document.body.classList.remove('no-scroll');
    });
    
    submenuOverlay.addEventListener('click', function() {
      megaMenuContent.classList.remove('submenu--active');
      submenuOverlay.classList.remove('active');
      document.body.classList.remove('no-scroll');
    });
  }
  
  // Customer service dropdown
  const customerServiceTrigger = document.querySelector('.customer-service__trigger');
  const customerServiceDropdown = document.querySelector('.customer-service__dropdown');
  
  if (customerServiceTrigger && customerServiceDropdown) {
    customerServiceTrigger.addEventListener('click', function() {
      customerServiceDropdown.classList.toggle('is-active');
    });
    
    document.addEventListener('click', function(e) {
      if (!customerServiceTrigger.contains(e.target) && !customerServiceDropdown.contains(e.target)) {
        customerServiceDropdown.classList.remove('is-active');
      }
    });
  }
  
  // Shopping cart dropdown
  const shoppingCartTrigger = document.querySelector('.shopping-cart__trigger');
  const shoppingCartDropdown = document.querySelector('.shopping-cart__dropdown');
  
  if (shoppingCartTrigger && shoppingCartDropdown) {
    shoppingCartTrigger.addEventListener('click', function() {
      shoppingCartDropdown.classList.toggle('is-active');
    });
    
    document.addEventListener('click', function(e) {
      if (!shoppingCartTrigger.contains(e.target) && !shoppingCartDropdown.contains(e.target)) {
        shoppingCartDropdown.classList.remove('is-active');
      }
    });
  }
}