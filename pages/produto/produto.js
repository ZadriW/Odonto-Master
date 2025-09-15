document.addEventListener('DOMContentLoaded', function() {
    // Initialize product spot functionality
    initProductGallery();
    initVariations();
    initQuantityControls();
    initTabs();
    initShippingCalculator();
    initAddToCart();
    initBuyNow();

    // Load related products
    loadRelatedProducts();
    
    // Load product data from URL parameters
    loadProductFromUrl();
});

// ===== PRODUCT DATA LOADING FROM URL =====
function loadProductFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category');
    const brand = urlParams.get('brand');
    const id = urlParams.get('id');
    
    if (category && brand) {
        // Update product information based on URL parameters
        updateProductInfo(category, brand, id);
        updateBreadcrumb(category, brand);
        updatePageTitle(category, brand);
    }
}

function updateProductInfo(category, brand, id) {
    // Update product title
    const productTitle = document.getElementById('productDetailTitle');
    if (productTitle) {
        productTitle.textContent = `${category} Exemplo - ${brand}`;
    }
    
    // Update product images (using placeholder images for now)
    const mainImage = document.getElementById('mainImage');
    if (mainImage) {
        mainImage.src = `https://via.placeholder.com/600x600/1c5787/ffffff?text=${category.replace(/\s+/g, '+')}`;
        mainImage.alt = `${category} - ${brand}`;
    }
    
    // Update thumbnail images
    const thumbnails = document.querySelectorAll('.thumbnail');
    thumbnails.forEach((thumb, index) => {
        thumb.src = `https://via.placeholder.com/100x100/${getColorForIndex(index)}/ffffff?text=Thumb+${index + 1}`;
        thumb.alt = `Imagem ${index + 1} - ${category}`;
        thumb.dataset.large = `https://via.placeholder.com/600x600/${getColorForIndex(index)}/ffffff?text=${category.replace(/\s+/g, '+')}+${index + 1}`;
    });
    
    // Update pricing based on category and brand
    updatePricing(category, brand);
    
    // Update product variations
    updateVariations(category, brand);
}

function getColorForIndex(index) {
    const colors = ['1c5787', '134a6b', '4CAF50', 'CA69F5', 'dc3545', 'ffc107', '17a2b8', '28a745'];
    return colors[index % colors.length];
}

function updatePricing(category, brand) {
    // Generate different prices based on category
    let price = 199.90;
    let originalPrice = 299.90;
    let discount = 33;
    
    // Category-based pricing
    if (category === "Fio de Sutura") price = 149.90;
    if (category === "Bolsa Termica") price = 89.90;
    if (category === "Curativo Alveolar") price = 79.90;
    if (category === "Hemostasia") price = 129.90;
    if (category === "Lâmina de Bisturi") price = 45.50;
    if (category === "Produtos em Oferta") price = 79.90;
    if (category === "Regeneração Óssea") price = 189.90;
    if (category === "Sugador Cirúrgico") price = 25.00;
    if (category === "Sugador Descartável") price = 15.90;
    
    // Brand-based pricing adjustments
    if (brand === "Dentsply") price *= 1.2;
    if (brand === "FGM") price *= 1.1;
    if (brand === "Ultradent") price *= 0.9;
    if (brand === "Angelus") price *= 0.8;
    if (brand === "Technew") price *= 1.05;
    
    // Calculate discount and original price
    originalPrice = price * 1.5;
    discount = Math.round(((originalPrice - price) / originalPrice) * 100);
    
    // Update price elements in the DOM
    const priceCurrentElement = document.querySelector('.price-current .price-value');
    const priceOriginalElement = document.querySelector('.price-original .price-value');
    const installmentElement = document.querySelector('.installment-text');
    const discountBadge = document.querySelector('.discount-badge');
    
    if (priceCurrentElement) priceCurrentElement.textContent = `R$ ${price.toFixed(2).replace('.', ',')}`;
    if (priceOriginalElement) priceOriginalElement.textContent = `R$ ${originalPrice.toFixed(2).replace('.', ',')}`;
    if (installmentElement) installmentElement.textContent = `10x sem juros de R$ ${(price/10).toFixed(2).replace('.', ',')}`;
    if (discountBadge) discountBadge.textContent = `${discount}% OFF`;
}

function updateVariations(category, brand) {
    // This function would update product variations based on the selected product
    // For now, we'll just update the variation labels
    const variationLabels = document.querySelectorAll('.variation-label');
    if (variationLabels.length >= 2) {
        variationLabels[0].textContent = "Cor:";
        variationLabels[1].textContent = "Tamanho:";
    }
}

function updateBreadcrumb(category, brand) {
    // Update breadcrumb navigation to show category and product name
    const categoryBreadcrumb = document.getElementById('categoryBreadcrumb');
    const productNameBreadcrumb = document.getElementById('productNameBreadcrumb');
    
    if (categoryBreadcrumb) {
        categoryBreadcrumb.textContent = category;
        categoryBreadcrumb.href = `/categoria/${category.toLowerCase().replace(/\s+/g, '-')}/index.html`;
    }
    
    if (productNameBreadcrumb) {
        // Show just the product name (brand) in the breadcrumb, not category + brand
        productNameBreadcrumb.textContent = brand;
    }
}

function updatePageTitle(category, brand) {
    // Update page title
    document.title = `${category} - ${brand} | Odonto Master`;
    
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
        metaDescription.content = `Compre ${category} da marca ${brand} com desconto na Odonto Master. Produto de qualidade para profissionais da odontologia.`;
    }
}

// ===== PRODUCT GALLERY FUNCTIONALITY =====
function initProductGallery() {
    const mainImage = document.getElementById('mainImage');
    const thumbnails = document.querySelectorAll('.thumbnail');
    const prevBtn = document.querySelector('.thumbnail-nav--prev');
    const nextBtn = document.querySelector('.thumbnail-nav--next');
    const thumbnailsTrack = document.querySelector('.thumbnails-track');
    let currentIndex = 0;
    const maxVisible = 4;

    // Thumbnail click event
    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', function() {
            // Update main image
            const largeImage = this.dataset.large;
            mainImage.src = largeImage;
            mainImage.alt = this.alt;

            // Update active state
            thumbnails.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Navigation buttons for thumbnails
    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            if (currentIndex > 0) {
                currentIndex--;
                updateThumbnailsPosition();
            }
        });
    }

    if (nextBtn) {

// ===== PRODUCT GALLERY FUNCTIONALITY =====
function initProductGallery() {
    const mainImage = document.getElementById('mainImage');
    const thumbnails = document.querySelectorAll('.thumbnail');
    const prevBtn = document.querySelector('.thumbnail-nav--prev');
    const nextBtn = document.querySelector('.thumbnail-nav--next');
    const thumbnailsTrack = document.querySelector('.thumbnails-track');
    let currentIndex = 0;
    const maxVisible = 4;

    // Thumbnail click event
    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', function() {
            // Update main image
            const largeImage = this.dataset.large;
            mainImage.src = largeImage;
            mainImage.alt = this.alt;

            // Update active state
            thumbnails.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Navigation buttons for thumbnails
    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            if (currentIndex > 0) {
                currentIndex--;
                updateThumbnailsPosition();
            }
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            if (currentIndex < thumbnails.length - maxVisible) {
                currentIndex++;
                updateThumbnailsPosition();
            }
        });
    }

    function updateThumbnailsPosition() {
        const translateX = -currentIndex * (thumbnails[0].offsetWidth + 15);
        thumbnailsTrack.style.transform = `translateX(${translateX}px)`;
    }
}

// ===== PRODUCT VARIATIONS FUNCTIONALITY =====
function initVariations() {
    const variationOptions = document.querySelectorAll('.variation-option');

    variationOptions.forEach(option => {
        option.addEventListener('click', function() {
            // Get parent group
            const group = this.closest('.variation-group');
            
            // Remove active class from siblings in the same group
            const siblings = group.querySelectorAll('.variation-option');
            siblings.forEach(sibling => sibling.classList.remove('active'));
            
            // Add active class to clicked option
            this.classList.add('active');
            
            // Update product information based on selection
            updateProductInfo();
        });
    });
}

function updateProductInfo() {
    // This function would update the product information based on selected variations
    // In a real implementation, this would fetch updated pricing, availability, etc.
    console.log('Product variations updated');
}

// ===== QUANTITY CONTROLS =====
function initQuantityControls() {
    const decreaseBtn = document.getElementById('decreaseQty');
    const increaseBtn = document.getElementById('increaseQty');
    const quantityInput = document.getElementById('quantity');

    if (decreaseBtn && increaseBtn && quantityInput) {
        decreaseBtn.addEventListener('click', function() {
            let value = parseInt(quantityInput.value);
            if (value > 1) {
                quantityInput.value = value - 1;
            }
        });

        increaseBtn.addEventListener('click', function() {
            let value = parseInt(quantityInput.value);
            if (value < 10) { // Max quantity of 10
                quantityInput.value = value + 1;
            }
        });

        quantityInput.addEventListener('change', function() {
            let value = parseInt(this.value);
            if (isNaN(value) || value < 1) {
                this.value = 1;
            } else if (value > 10) {
                this.value = 10;
            }
        });
    }
}

// ===== PRODUCT TABS FUNCTIONALITY =====
function initTabs() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabPanes = document.querySelectorAll('.tab-pane');

    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabId = this.dataset.tab;

            // Remove active class from all buttons and panes
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanes.forEach(pane => pane.classList.remove('active'));

            // Add active class to clicked button and corresponding pane
            this.classList.add('active');
            document.getElementById(tabId).classList.add('active');
        });
    });
}

// ===== SHIPPING CALCULATOR =====
function initShippingCalculator() {
    const cepInput = document.getElementById('cepInput');
    const calculateBtn = document.getElementById('calculateShippingBtn');
    const shippingResults = document.getElementById('shippingResults');

    if (cepInput) {
        // Format CEP input
        cepInput.addEventListener('input', function() {
            let value = this.value.replace(/\D/g, '');
            if (value.length > 5) {
                value = value.substring(0, 5) + '-' + value.substring(5, 8);
            }
            this.value = value;
        });
    }

    if (calculateBtn) {
        calculateBtn.addEventListener('click', function() {
            const cep = cepInput ? cepInput.value : '';
            
            if (cep && cep.replace(/\D/g, '').length === 8) {
                // Simulate shipping calculation
                simulateShippingCalculation();
            } else {
                alert('Por favor, informe um CEP válido com 8 dígitos.');
            }
        });
    }
}

function simulateShippingCalculation() {
    const shippingResults = document.getElementById('shippingResults');
    
    if (shippingResults) {
        // Show loading state
        shippingResults.innerHTML = '<p>Calculando frete...</p>';
        shippingResults.style.display = 'block';
        
        // Simulate API delay
        setTimeout(() => {
            shippingResults.innerHTML = `
                <div class="shipping-option">
                    <div class="shipping-details">
                        <strong>Entrega Standard</strong>
                        <span>3 a 5 dias úteis</span>
                    </div>
                    <div class="shipping-price">
                        <span>R$ 15,90</span>
                    </div>
                </div>
                <div class="shipping-option">
                    <div class="shipping-details">
                        <strong>Entrega Expressa</strong>
                        <span>1 a 2 dias úteis</span>
                    </div>
                    <div class="shipping-price">
                        <span>R$ 29,90</span>
                    </div>
                </div>
                <div class="shipping-option free-shipping">
                    <div class="shipping-details">
                        <strong>Retirar na Loja</strong>
                        <span>Salvador/BA - Caminho das Árvores</span>
                    </div>
                    <div class="shipping-price">
                        <span class="free-text">GRÁTIS</span>
                    </div>
                </div>
            `;
        }, 1500);
    }
}

// ===== ADD TO CART FUNCTIONALITY =====
function initAddToCart() {
    const addToCartBtn = document.getElementById('addToCartBtn');
    
    if (addToCartBtn) {
        addToCartBtn.addEventListener('click', function() {
            const quantity = document.getElementById('quantity').value;
            
            // Add loading state
            const originalText = this.innerHTML;
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Adicionando...';
            this.disabled = true;
            
            // Simulate adding to cart
            setTimeout(() => {
                // Restore button
                this.innerHTML = originalText;
                this.disabled = false;
                
                // Show success feedback
                showNotification('Produto adicionado ao carrinho!', 'success');
                
                // Update cart count (in a real implementation)
                updateCartCount(1);
            }, 1000);
        });
    }
}

// ===== BUY NOW FUNCTIONALITY =====
function initBuyNow() {
    const buyNowBtn = document.getElementById('buyNowBtn');
    
    if (buyNowBtn) {
        buyNowBtn.addEventListener('click', function() {
            const quantity = document.getElementById('quantity').value;
            
            // Add loading state
            const originalText = this.innerHTML;
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processando...';
            this.disabled = true;
            
            // Simulate checkout process
            setTimeout(() => {
                // Restore button
                this.innerHTML = originalText;
                this.disabled = false;
                
                // Redirect to checkout (in a real implementation)
                alert('Redirecionando para o checkout...');
                // window.location.href = '/checkout';
            }, 1500);
        });
    }
}

// ===== RELATED PRODUCTS =====
function initRelatedProducts() {
    // Initialize carousel for related products
    const container = document.querySelector('.related-products-carousel');
    const prevBtn = container ? container.querySelector('.carousel-nav--prev') : null;
    const nextBtn = container ? container.querySelector('.carousel-nav--next') : null;
    const track = document.getElementById('relatedProductsTrack');
    const dotsContainer = document.getElementById('relatedProductsDots');
    
    if (prevBtn && nextBtn && track) {
        let currentIndex = 0;
        const slides = track.querySelectorAll('.product-slide');
        const totalSlides = slides.length;
        const itemsPerView = getItemsPerView();
        const totalGroups = Math.ceil(totalSlides / itemsPerView);
        
        // Create dots
        if (dotsContainer) {
            dotsContainer.innerHTML = Array.from({ length: totalGroups }, (_, i) => `
                <button class="carousel-dot ${i === 0 ? 'active' : ''}" data-index="${i}" aria-label="Ir para grupo ${i + 1}"></button>
            `).join('');
        }
        
        // Update button states
        function updateButtons() {
            prevBtn.disabled = currentIndex === 0;
            nextBtn.disabled = currentIndex >= totalSlides - itemsPerView;
        }
        
        // Update dots
        function updateDots() {
            if (dotsContainer) {
                const dots = dotsContainer.querySelectorAll('.carousel-dot');
                const currentGroup = Math.floor(currentIndex / itemsPerView);
                dots.forEach((dot, index) => {
                    if (index === currentGroup) {
                        dot.classList.add('active');
                    } else {
                        dot.classList.remove('active');
                    }
                });
            }
        }
        
        prevBtn.addEventListener('click', function() {
            if (currentIndex > 0) {
                currentIndex = Math.max(0, currentIndex - itemsPerView);
                updateCarousel();
            }
        });
        
        nextBtn.addEventListener('click', function() {
            if (currentIndex < totalSlides - itemsPerView) {
                currentIndex = Math.min(totalSlides - itemsPerView, currentIndex + itemsPerView);
                updateCarousel();
            }
        });
        
        // Dot click events
        if (dotsContainer) {
            dotsContainer.addEventListener('click', function(e) {
                if (e.target.classList.contains('carousel-dot')) {
                    const index = parseInt(e.target.dataset.index);
                    currentIndex = index * itemsPerView;
                    updateCarousel();
                }
            });
        }
        
        function updateCarousel() {
            const slideWidth = 100 / itemsPerView;
            const offset = -currentIndex * (slideWidth / itemsPerView);
            track.style.transition = 'transform 0.4s cubic-bezier(0.2, 0.6, 0.2, 1)';
            track.style.transform = `translateX(${offset}%)`;
            
            updateButtons();
            updateDots();
        }
        
        // Initialize
        updateButtons();
        updateDots();
        
        // Handle window resize
        window.addEventListener('resize', function() {
            const newItemsPerView = getItemsPerView();
            if (newItemsPerView !== itemsPerView) {
                // Reinitialize carousel with new items per view
                currentIndex = 0;
                updateCarousel();
            }
        });
    }
}

function getItemsPerView() {
    const width = window.innerWidth;
    if (width <= 480) return 1;
    if (width <= 768) return 2;
    if (width <= 1200) return 3;
    return 4;
}

function loadRelatedProducts() {
    const track = document.getElementById('relatedProductsTrack');
    
    if (track) {
        // Mock related products data
        const relatedProducts = [
            {
                id: 'prod1',
                name: 'Kit Clareamento Dental Whiteness HP',
                price: 189.90,
                discount: 27,
                image: 'https://via.placeholder.com/300x300/1c5787/ffffff?text=Relacionado+1'
            },
            {
                id: 'prod2',
                name: 'Resina Composta Z350 XT',
                price: 245.90,
                discount: 15,
                image: 'https://via.placeholder.com/300x300/134a6b/ffffff?text=Relacionado+2'
            },
            {
                id: 'prod3',
                name: 'Anestésico Mepivacaína 3%',
                price: 89.90,
                discount: 30,
                image: 'https://via.placeholder.com/300x300/4CAF50/ffffff?text=Relacionado+3'
            },
            {
                id: 'prod4',
                name: 'Broca Carbide FG 245',
                price: 34.90,
                discount: 10,
                image: 'https://via.placeholder.com/300x300/CA69F5/ffffff?text=Relacionado+4'
            },
            {
                id: 'prod5',
                name: 'Fotopolimerizador LED Radii Plus',
                price: 899.00,
                discount: 20,
                image: 'https://via.placeholder.com/300x300/dc3545/ffffff?text=Relacionado+5'
            },
            {
                id: 'prod6',
                name: 'Cimento de Ionômero de Vidro',
                price: 56.90,
                discount: 18,
                image: 'https://via.placeholder.com/300x300/ffc107/ffffff?text=Relacionado+6'
            },
            {
                id: 'prod7',
                name: 'Kit Endodontia Rotatória Avançado',
                price: 1450.00,
                discount: 25,
                image: 'https://via.placeholder.com/300x300/17a2b8/ffffff?text=Relacionado+7'
            },
            {
                id: 'prod8',
                name: 'Ácido Fosfórico 37% Gel',
                price: 22.90,
                discount: 12,
                image: 'https://via.placeholder.com/300x300/28a745/ffffff?text=Relacionado+8'
            }
        ];
        
        // Render related products
        track.innerHTML = relatedProducts.map(product => `
            <div class="product-slide">
                <article class="product-card" data-product-id="${product.id}">
                    <div class="product-card__image">
                        <img src="${product.image}" alt="${product.name}">
                        <div class="product-badge product-badge--discount">${product.discount}% OFF</div>
                    </div>
                    <div class="product-card__content">
                        <h3 class="product-title">${product.name}</h3>
                        <div class="product-pricing">
                            <span class="product-price--current">${formatPrice(product.price * 100)}</span>
                        </div>
                        <button class="product-button">ADICIONAR AO CARRINHO</button>
                    </div>
                </article>
            </div>
        `).join('');
        
        // Add event listeners to related product buttons
        const productButtons = track.querySelectorAll('.product-button');
        productButtons.forEach(button => {
            button.addEventListener('click', function() {
                const productCard = this.closest('.product-card');
                const productId = productCard.dataset.productId;
                const productName = productCard.querySelector('.product-title').textContent;
                const priceText = productCard.querySelector('.product-price--current').textContent;
                const price = parseFloat(priceText.replace(/[^\d,]/g, '').replace(',', '.'));
                
                // Add to cart
                addToCart(productId, productName, price, 1);
            });
        });
        
        // Small delay to ensure DOM is fully updated before initializing carousel
        setTimeout(() => {
            // Initialize the carousel after products are loaded
            initRelatedProducts();
        }, 100);
    }
}

// ===== UTILITY FUNCTIONS =====
function formatPrice(priceInCents) {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(priceInCents / 100);
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.innerHTML = `
        <div class="notification__content">
            <span class="notification__message">${message}</span>
            <button class="notification__close" aria-label="Fechar notificação">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    // Add to document
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.classList.add('notification--visible');
    }, 100);
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
        notification.classList.remove('notification--visible');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 5000);
    
    // Close button event
    const closeBtn = notification.querySelector('.notification__close');
    closeBtn.addEventListener('click', function() {
        notification.classList.remove('notification--visible');
        setTimeout(() => {
            notification.remove();
        }, 300);
    });
}

function updateCartCount(increment) {
    const cartCountElement = document.querySelector('.shopping-cart__count');
    if (cartCountElement) {
        let currentCount = parseInt(cartCountElement.textContent) || 0;
        cartCountElement.textContent = currentCount + increment;
    }
}

function addToCart(productId, productName, price, quantity) {
    // This would typically make an API call to add the product to the cart
    // For now, we'll just show a notification
    showNotification(`${productName} adicionado ao carrinho!`, 'success');
    updateCartCount(quantity);
}
    }
}