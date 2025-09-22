document.addEventListener('DOMContentLoaded', function() {
    // Initialize homepage functionality
    initHomepage();
    
    // Initialize static carousels
    initStaticCarousels();
});

function initHomepage() {
    // Initialize product linking for carousel items
    initCarouselProductLinks();
    
    Logger.info('Homepage inicializada');
}

// ===== STATIC CAROUSEL FUNCTIONALITY =====
function initStaticCarousels() {
    // Initialize all product carousels with static content
    const carousels = [
        { trackId: 'productsTrack', dotsId: 'carouselDots' },
        { trackId: 'productsTrackLancamentos', dotsId: 'carouselDotsLancamentos' },
        { trackId: 'productsTrackEquipamentos', dotsId: 'carouselDotsEquipamentos' }
    ];
    
    carousels.forEach(carousel => {
        const track = document.getElementById(carousel.trackId);
        const dotsContainer = document.getElementById(carousel.dotsId);
        
        if (track && dotsContainer) {
            // Set up carousel navigation
            setupStaticCarouselNavigation(track, dotsContainer);
        }
    });
    
    Logger.info('Carrosséis estáticos inicializados');
}

// ===== INFINITE CAROUSEL FUNCTIONALITY =====
function setupStaticCarouselNavigation(track, dotsContainer) {
    const prevBtn = track.closest('.products-carousel-container').querySelector('.carousel-nav--prev');
    const nextBtn = track.closest('.products-carousel-container').querySelector('.carousel-nav--next');
    
    if (!prevBtn || !nextBtn) return;
    
    // Get the original slides
    const originalSlides = Array.from(track.querySelectorAll('.product-slide'));
    const totalRealSlides = originalSlides.length;
    const itemsPerView = getItemsPerView();
    const totalGroups = Math.ceil(totalRealSlides / itemsPerView);
    
    // For infinite scrolling, we need to create clones
    // We'll clone the first and last few slides
    const clonesNeeded = itemsPerView;
    
    // Clone first few slides and append to end
    for (let i = 0; i < clonesNeeded; i++) {
        const clone = originalSlides[i].cloneNode(true);
        clone.classList.add('clone');
        // Make sure cloned elements don't interfere with interactions
        // Only disable the product card link, not the buttons
        const cloneLink = clone.querySelector('.product-card-link');
        if (cloneLink) {
            cloneLink.setAttribute('aria-hidden', 'true');
            cloneLink.setAttribute('tabindex', '-1');
        }
        // Disable buttons in clones to prevent duplicate cart additions
        const cloneButtons = clone.querySelectorAll('.product-button');
        cloneButtons.forEach(button => {
            button.setAttribute('aria-hidden', 'true');
            button.setAttribute('tabindex', '-1');
            button.disabled = true;
        });
        track.appendChild(clone);
    }
    
    // Clone last few slides and prepend to beginning
    for (let i = totalRealSlides - clonesNeeded; i < totalRealSlides; i++) {
        const clone = originalSlides[i].cloneNode(true);
        clone.classList.add('clone');
        // Make sure cloned elements don't interfere with interactions
        // Only disable the product card link, not the buttons
        const cloneLink = clone.querySelector('.product-card-link');
        if (cloneLink) {
            cloneLink.setAttribute('aria-hidden', 'true');
            cloneLink.setAttribute('tabindex', '-1');
        }
        // Disable buttons in clones to prevent duplicate cart additions
        const cloneButtons = clone.querySelectorAll('.product-button');
        cloneButtons.forEach(button => {
            button.setAttribute('aria-hidden', 'true');
            button.setAttribute('tabindex', '-1');
            button.disabled = true;
        });
        track.insertBefore(clone, track.firstChild);
    }
    
    // Update slides list to include clones
    const allSlides = Array.from(track.querySelectorAll('.product-slide'));
    const totalSlides = allSlides.length;
    
    // Set initial position to show original slides (skip the prepended clones)
    let currentIndex = clonesNeeded;
    let isTransitioning = false;
    
    // Position the carousel initially
    updateCarouselPosition(track, currentIndex, itemsPerView, false);
    
    // Update dots
    updateCarouselDots(dotsContainer, currentIndex, itemsPerView, totalRealSlides);
    
    // Event listeners for navigation
    prevBtn.addEventListener('click', () => {
        if (isTransitioning) return;
        isTransitioning = true;
        
        currentIndex -= itemsPerView;
        updateCarouselPosition(track, currentIndex, itemsPerView, true);
        
        // Check if we need to jump to the end for infinite loop
        if (currentIndex < clonesNeeded) {
            setTimeout(() => {
                currentIndex = totalRealSlides;
                updateCarouselPosition(track, currentIndex, itemsPerView, false);
                isTransitioning = false;
            }, 300);
        } else {
            setTimeout(() => {
                isTransitioning = false;
            }, 300);
        }
    });
    
    nextBtn.addEventListener('click', () => {
        if (isTransitioning) return;
        isTransitioning = true;
        
        currentIndex += itemsPerView;
        updateCarouselPosition(track, currentIndex, itemsPerView, true);
        
        // Check if we need to jump to the beginning for infinite loop
        if (currentIndex >= totalRealSlides + clonesNeeded) {
            setTimeout(() => {
                currentIndex = clonesNeeded;
                updateCarouselPosition(track, currentIndex, itemsPerView, false);
                isTransitioning = false;
            }, 300);
        } else {
            setTimeout(() => {
                isTransitioning = false;
            }, 300);
        }
    });
    
    // Dot navigation
    dotsContainer.addEventListener('click', (e) => {
        if (isTransitioning || !e.target.classList.contains('carousel-dot')) return;
        isTransitioning = true;
        
        const groupIndex = parseInt(e.target.dataset.index);
        // Calculate target index based on real slide count
        const clonesNeeded = itemsPerView;
        const targetIndex = clonesNeeded + (groupIndex * itemsPerView);
        currentIndex = targetIndex;
        updateCarouselPosition(track, currentIndex, itemsPerView, true);
        
        setTimeout(() => {
            isTransitioning = false;
        }, 300);
    });
    
    // Handle window resize
    window.addEventListener('resize', () => {
        const newItemsPerView = getItemsPerView();
        if (newItemsPerView !== itemsPerView) {
            // Reinitialize carousel with new item count
            setupStaticCarouselNavigation(track, dotsContainer);
        }
    });
}

function getItemsPerView() {
    const width = window.innerWidth;
    if (width <= 480) return 1;
    if (width <= 768) return 1;
    if (width <= 992) return 2;
    if (width <= 1200) return 3;
    return 4;
}

function updateCarouselPosition(track, index, itemsPerView, animate = true) {
    const slideWidth = 100 / itemsPerView;
    const offset = -(index * slideWidth);
    
    // Use a smoother transition curve
    track.style.transition = animate ? 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)' : 'none';
    track.style.transform = `translateX(${offset}%)`;
    
    // Update dots after transition
    setTimeout(() => {
        const dotsContainer = track.closest('.products-carousel-container').querySelector('[id^="carouselDots"]');
        if (dotsContainer) {
            // Calculate the real index (excluding clones)
            const clonesNeeded = itemsPerView;
            const realIndex = index - clonesNeeded;
            const totalRealSlides = track.querySelectorAll('.product-slide:not(.clone)').length;
            updateCarouselDots(dotsContainer, realIndex, itemsPerView, totalRealSlides);
        }
    }, animate ? 300 : 0);
}

function updateCarouselDots(dotsContainer, currentIndex, itemsPerView, totalRealSlides) {
    const dots = dotsContainer.querySelectorAll('.carousel-dot');
    
    // Calculate which group of products we're currently viewing
    // For example, if itemsPerView is 4 and currentIndex is 5,
    // we're viewing products 5, 6, 7, 8, which belongs to group 1 (second group)
    const currentGroup = Math.floor(currentIndex / itemsPerView);
    
    // Calculate the total number of groups
    const totalGroups = Math.ceil(totalRealSlides / itemsPerView);
    
    // Normalize the group index to handle infinite carousel wrapping
    // This ensures the group index is always within bounds
    const normalizedGroup = ((currentGroup % totalGroups) + totalGroups) % totalGroups;
    
    // Update each dot's active state
    dots.forEach((dot, index) => {
        // Check if this dot corresponds to the current group
        const isActive = index === normalizedGroup;
        dot.classList.toggle('active', isActive);
        
        // Update ARIA attributes for accessibility
        dot.setAttribute('aria-selected', isActive);
    });
}

// ===== CAROUSEL PRODUCT LINKING FUNCTIONALITY =====
function initCarouselProductLinks() {
    // Add click event listeners to all product cards in carousels
    document.addEventListener('click', function(e) {
        // Check if the clicked element is the product button within a product card in a carousel
        const productButton = e.target.closest('.product-button');
        if (productButton) {
            // Prevent default behavior for links within the product card
            e.preventDefault();
            e.stopPropagation();
            
            // Get product information
            const productCard = productButton.closest('.product-card');
            if (productCard) {
                const productId = productCard.dataset.productId;
                const productTitle = productCard.querySelector('.product-title')?.textContent || 'Produto';
                const priceText = productCard.querySelector('.product-price--current')?.textContent || '0';
                const price = parseFloat(priceText.replace(/[^\d,]/g, '').replace(',', '.')) * 100 || 0;
                
                // Add to cart
                addToCart(productId, productTitle, price, 1);
                
                // Visual feedback
                productButton.classList.add('added');
                productButton.innerHTML = '<i class="fas fa-check"></i> Adicionado';
                
                setTimeout(() => {
                    productButton.classList.remove('added');
                    productButton.innerHTML = 'ADICIONAR AO CARRINHO';
                }, 2000);
            }
        }
        // For product card clicks (not on the button), let the default behavior happen
        // which will follow the link to the product page
    });
    
    Logger.info('Links de produtos nos carrosséis inicializados');
}

function redirectToProductSpot(productId, productTitle) {
    // Extract category and brand from product title (simplified approach)
    // In a real implementation, this would come from actual product data
    const category = extractCategoryFromTitle(productTitle);
    const brand = extractBrandFromTitle(productTitle);
    
    // Create URL parameters
    const params = new URLSearchParams({
        category: category,
        brand: brand,
        id: productId
    });
    
    // Redirect to product spot page
    window.location.href = `/pages/produto/produto.html?${params.toString()}`;
}

function extractCategoryFromTitle(title) {
    // This is a simplified approach - in a real implementation, 
    // this would come from the product data itself
    const categories = [
        'Clareamento Dental', 'Resina Composta', 'Anestésico', 'Broca', 
        'Fotopolimerizador', 'Cimento', 'Kit Endodontia', 'Ácido Fosfórico',
        'Autoclave', 'Cadeira Odontológica', 'Kit', 'Sugador'
    ];
    
    for (const category of categories) {
        if (title.toLowerCase().includes(category.toLowerCase())) {
            return category;
        }
    }
    
    // Default fallback
    return 'Produto';
}

function extractBrandFromTitle(title) {
    // This is a simplified approach - in a real implementation,
    // this would come from the product data itself
    const brands = ['Whiteness', 'Z350', 'Mepivacaína', 'Carbide', 'Radii', 'FGM', 'Ultradent', 'Angelus', 'Dentsply', 'Kavo', 'Vitale'];
    
    for (const brand of brands) {
        if (title.toLowerCase().includes(brand.toLowerCase())) {
            return brand;
        }
    }
    
    // Default fallback
    return 'Marca';
}

// ===== HOMEPAGE SPECIFIC FUNCTIONALITY =====
function initHomepageSpecificFeatures() {
    // Any homepage-specific features can be initialized here
    Logger.info('Recursos específicos da homepage inicializados');
}

// ===== CART FUNCTIONALITY =====
function addToCart(productId, productTitle, price, quantity) {
    try {
        // Get existing cart from localStorage
        let cart = [];
        const cartData = localStorage.getItem('odonto_cart');
        if (cartData) {
            cart = JSON.parse(cartData);
        }
        
        // Check if product already exists in cart
        const existingItemIndex = cart.findIndex(item => item.id === productId);
        
        if (existingItemIndex !== -1) {
            // If item exists, increase quantity
            cart[existingItemIndex].quantity += quantity;
        } else {
            // If item doesn't exist, add it to cart
            cart.push({
                id: productId,
                name: productTitle,
                price: price,
                quantity: quantity
            });
        }
        
        // Save updated cart to localStorage
        localStorage.setItem('odonto_cart', JSON.stringify(cart));
        
        // Update cart count in UI
        updateCartCount(cart.reduce((total, item) => total + item.quantity, 0));
        
        // Dispatch event to notify other parts of the app
        window.dispatchEvent(new CustomEvent('cartUpdated', { detail: cart }));
        
        return true;
    } catch (error) {
        console.error('Error adding to cart:', error);
        return false;
    }
}

function updateCartCount(count) {
    const cartCountElements = document.querySelectorAll('.shopping-cart__count');
    cartCountElements.forEach(element => {
        element.textContent = count;
    });
    
    // Also update the cart dropdown if it exists
    const cartModule = window.app?.modules?.cart;
    if (cartModule) {
        cartModule.render();
    }
    
    console.log('Cart updated with', count, 'items');
}

// ===== EXPORTS FOR DEVELOPMENT =====
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initHomepage,
        initCarouselProductLinks,
        redirectToProductSpot,
        extractCategoryFromTitle,
        extractBrandFromTitle
    };
}