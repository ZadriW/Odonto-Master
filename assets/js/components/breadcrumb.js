// Breadcrumb Component JavaScript
document.addEventListener('DOMContentLoaded', function() {
  // Initialize breadcrumb component
  initBreadcrumb();
});

function initBreadcrumb() {
  // Get current page path
  const currentPagePath = window.location.pathname;
  
  // Define page mappings
  const pageMappings = {
    '/pages/home/index.html': 'Home',
    '/pages/cirurgia/cirurgia.html': 'Cirurgia e Periodontia',
    '/pages/dentistica/dentistica.html': 'Dentística',
    '/pages/odontoverse/odontoverse.html': 'OdontoVerse',
    '/categoria/endodontia/index.html': 'Endodontia',
    '/categoria/equipamentos/index.html': 'Equipamentos',
    '/categoria/instrumental/index.html': 'Instrumental',
    '/categoria/ortodontia/index.html': 'Ortodontia',
    '/categoria/pecas-de-mao/index.html': 'Peças de Mão',
    '/categoria/protese/index.html': 'Prótese'
  };
  
  // Get breadcrumb list element
  const breadcrumbList = document.querySelector('.breadcrumb__list');
  
  // If we don't have a breadcrumb list, exit
  if (!breadcrumbList) return;
  
  // Add current page to breadcrumb
  if (pageMappings[currentPagePath]) {
    const currentPageName = pageMappings[currentPagePath];
    const currentItem = document.createElement('li');
    currentItem.className = 'breadcrumb__item';
    currentItem.innerHTML = `
      <span class="breadcrumb__current">${currentPageName}</span>
    `;
    breadcrumbList.appendChild(currentItem);
  }
}