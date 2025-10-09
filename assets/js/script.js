/**
 * @version 2.1.0
 * @author Odonto Master Development Team
 * =================================================================================
 */

'use strict';

// ===== CONFIGURAÇÕES GLOBAIS =====
const CONFIG = {
    // Animações
    ANIMATION_DURATION: 300,
    ANIMATION_EASING: 'cubic-bezier(0.4, 0, 0.2, 1)',
    
    // Storage
    CART_STORAGE_KEY: 'odonto_cart',
    USER_PREFERENCES_KEY: 'odonto_preferences',
    
    // API
    API_BASE_URL: 'https://api.odontomaster.com.br',
    API_TIMEOUT: 10000,
    
    // UI
    THEME_COLOR: '#1c5787',
    BREAKPOINTS: {
        mobile: 768,
        tablet: 992,
        desktop: 1200
    },
    
    // Carrossel
    CAROUSEL_AUTOPLAY_INTERVAL: 3000,
    CAROUSEL_TRANSITION_DURATION: 400
};

// ===== UTILITÁRIOS =====
const Utils = {
    /**
     * Debounce function para otimizar performance
     * @param {Function} func - Função a ser debounced
     * @param {number} wait - Tempo de espera em ms
     * @returns {Function} - Função debounced
     */
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    /**
     * Throttle function para limitar execução
     * @param {Function} func - Função a ser throttled
     * @param {number} limit - Limite de execução em ms
     * @returns {Function} - Função throttled
     */
    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },

    /**
     * Verifica se o dispositivo é mobile
     * @returns {boolean} - True se for mobile
     */
    isMobile() {
        return window.innerWidth <= CONFIG.BREAKPOINTS.mobile;
    },

    /**
     * Verifica se o elemento está visível na viewport
     * @param {Element} element - Elemento a ser verificado
     * @returns {boolean} - True se estiver visível
     */
    isElementInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    },

    /**
     * Formata preço para exibição
     * @param {number} price - Preço em centavos
     * @returns {string} - Preço formatado
     */
    formatPrice(price) {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(price / 100);
    },

    /** 
     * Gera ID único
     * @returns {string} - ID único
     */
    generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    },
    
    /**
     * Obtém informações do produto do banco de dados
     * @param {string} productId - ID do produto
     * @returns {Object|null} - Informações do produto ou null se não encontrado
     */
    getProductInfo(productId) {
        return window.app.productDB.getProduct(productId);
    }
};

// ===== SISTEMA DE LOGGING =====
const Logger = {
    levels: {
        ERROR: 0,
        WARN: 1,
        INFO: 2,
        DEBUG: 3
    },
    
    currentLevel: 2, // INFO por padrão
    
    log(level, message, data = null) {
        if (level <= this.currentLevel) {
            const timestamp = new Date().toISOString();
            const prefix = `[${timestamp}] [${Object.keys(this.levels)[level]}]`;
            
            if (data) {
                console.log(prefix, message, data);
            } else {
                console.log(prefix, message);
            }
        }
    },
    
    error(message, data) { this.log(this.levels.ERROR, message, data); },
    warn(message, data) { this.log(this.levels.WARN, message, data); },
    info(message, data) { this.log(this.levels.INFO, message, data); },
    debug(message, data) { this.log(this.levels.DEBUG, message, data); }
};

// ===== SISTEMA DE EVENTOS =====
const EventBus = {
    events: {},
    
    /**
     * Registra um listener para um evento
     * @param {string} event - Nome do evento
     * @param {Function} callback - Função callback
     */
    on(event, callback) {
        if (!this.events[event]) {
            this.events[event] = [];
        }
        this.events[event].push(callback);
    },
    
    /**
     * Remove um listener de um evento
     * @param {string} event - Nome do evento
     * @param {Function} callback - Função callback
     */
    off(event, callback) {
        if (this.events[event]) {
            this.events[event] = this.events[event].filter(cb => cb !== callback);
        }
    },
    
    /**
     * Emite um evento
     * @param {string} event - Nome do evento
     * @param {*} data - Dados do evento
     */
    emit(event, data) {
        if (this.events[event]) {
            this.events[event].forEach(callback => {
                try {
                    callback(data);
                } catch (error) {
                    Logger.error(`Erro no evento ${event}:`, error);
                }
            });
        }
    }
};

// ===== SISTEMA DE STORAGE =====
const Storage = {
    /**
     * Salva dados no localStorage
     * @param {string} key - Chave
     * @param {*} value - Valor
     */
    set(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            Logger.error('Erro ao salvar no localStorage:', error);
        }
    },
    
    /**
     * Recupera dados do localStorage
     * @param {string} key - Chave
     * @param {*} defaultValue - Valor padrão
     * @returns {*} - Valor recuperado
     */
    get(key, defaultValue = null) {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : defaultValue;
        } catch (error) {
            Logger.error('Erro ao recuperar do localStorage:', error);
            return defaultValue;
        }
    },
    
    /**
     * Remove dados do localStorage
     * @param {string} key - Chave
     */
    remove(key) {
        try {
            localStorage.removeItem(key);
        } catch (error) {
            Logger.error('Erro ao remover do localStorage:', error);
        }
    },
    
    /**
     * Limpa todo o localStorage
     */
    clear() {
        try {
            localStorage.clear();
        } catch (error) {
            Logger.error('Erro ao limpar localStorage:', error);
        }
    }
};

// ===== SISTEMA DE COOKIES =====
const CookieManager = {
    /**
     * Define um cookie
     * @param {string} name - Nome do cookie
     * @param {string} value - Valor do cookie
     * @param {number} days - Dias para expirar
     * @param {string} domain - Domínio (opcional)
     */
    set(name, value, days = 30, domain = null) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        
        let cookie = `${name}=${value}; expires=${date.toUTCString()}; path=/`;
        
        if (domain) {
            cookie += `; domain=${domain}`;
        }
        
        document.cookie = cookie;
    },
    
    /**
     * Recupera um cookie
     * @param {string} name - Nome do cookie
     * @returns {string|null} - Valor do cookie
     */
    get(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) {
            return parts.pop().split(';').shift();
        }
        return null;
    },
    
    /**
     * Remove um cookie
     * @param {string} name - Nome do cookie
     */
    remove(name) {
        this.set(name, '', -1);
    }
};

// ===== SISTEMA DE NOTIFICAÇÕES =====
class NotificationSystem {
    constructor() {
        this.container = this.createContainer();
        this.notifications = new Map();
    }
    
    createContainer() {
        let container = document.querySelector('.notification-container');
        if (!container) {
            container = document.createElement('div');
            container.className = 'notification-container';
            container.setAttribute('role', 'status');
            container.setAttribute('aria-live', 'polite');
            document.body.appendChild(container);
        }
        return container;
    }
    
    /**
     * Exibe uma notificação
     * @param {string} message - Mensagem da notificação
     * @param {string} type - Tipo da notificação (success, error, warning, info)
     * @param {number} duration - Duração em ms
     * @returns {string} - ID da notificação
     */
    show(message, type = 'info', duration = 5000) {
        const id = Utils.generateId();
        const notification = document.createElement('div');
        
        notification.className = `notification notification--${type}`;
        notification.setAttribute('role', 'alert');
        notification.innerHTML = `
            <div class="notification__content">
                <span class="notification__message">${message}</span>
                <button class="notification__close" aria-label="Fechar notificação">
                    <i class="fas fa-times" aria-hidden="true"></i>
                </button>
            </div>
        `;
        
        // Event listeners
        const closeBtn = notification.querySelector('.notification__close');
        closeBtn.addEventListener('click', () => this.hide(id));
        
        this.container.appendChild(notification);
        this.notifications.set(id, notification);
        
        // Auto-hide
        if (duration > 0) {
            setTimeout(() => this.hide(id), duration);
        }
        
        // Animate in
        requestAnimationFrame(() => {
            notification.classList.add('notification--visible');
        });
        
        return id;
    }
    
    /**
     * Esconde uma notificação
     * @param {string} id - ID da notificação
     */
    hide(id) {
        const notification = this.notifications.get(id);
        if (notification) {
            notification.classList.remove('notification--visible');
            notification.addEventListener('transitionend', () => {
                notification.remove();
                this.notifications.delete(id);
            });
        }
    }
    
    /**
     * Esconde todas as notificações
     */
    hideAll() {
        this.notifications.forEach((notification, id) => {
            this.hide(id);
        });
    }
    
    // Métodos de conveniência
    success(message, duration) { return this.show(message, 'success', duration); }
    error(message, duration) { return this.show(message, 'error', duration); }
    warning(message, duration) { return this.show(message, 'warning', duration); }
    info(message, duration) { return this.show(message, 'info', duration); }
}

// ===== SISTEMA DE CARRINHO =====
class ShoppingCart {
    constructor() {
        this.items = this.loadFromStorage();
        this.dropdownContainer = document.querySelector('.shopping-cart__dropdown');
        this.cartCountElement = document.querySelector('.shopping-cart__count');
        
        this.bindPageEvents();
        this.render();
        this.bindDropdownEvents();
    }

    addItem(productId, name, price, quantity = 1) {
        // Verificar se o produto existe no banco de dados
        const productFromDB = window.app.productDB.getProduct(productId);
        if (productFromDB) {
            // Usar informações do banco de dados para garantir consistência
            const existingItem = this.items.find(item => item.id === productId);
            if (existingItem) {
                existingItem.quantity += quantity;
            } else {
                this.items.push({ 
                    id: productId, 
                    name: productFromDB.name, 
                    price: productFromDB.price, 
                    quantity: quantity,
                    image: productFromDB.image // Adicionando a imagem para uso no carrinho
                });
            }
        } else {
            // Se o produto não estiver no banco de dados, usar os parâmetros passados
            const existingItem = this.items.find(item => item.id === productId);
            if (existingItem) {
                existingItem.quantity += quantity;
            } else {
                this.items.push({ id: productId, name, price, quantity });
            }
        }
        this.update();
    }

    removeItem(productId) {
        this.items = this.items.filter(item => item.id !== productId);
        this.update();
    }

    updateQuantity(productId, newQuantity) {
        const item = this.items.find(i => i.id === productId);
        if (!item) return;

        // Garante que a quantidade seja um número e no mínimo 0
        const quantity = Math.max(0, newQuantity);

        if (quantity === 0) {
            this.removeItem(productId);
        } else {
            item.quantity = quantity;
            this.update();
        }
    }

    update() {
        this.saveToStorage();
        this.render();
        EventBus.emit('cart:updated', this.items);
    }

    render() {
        if (this.cartCountElement) {
            this.cartCountElement.textContent = this.getTotalItems();
        }
        this.renderCartDropdown(this.dropdownContainer);
        
        // Garante que os valores dos inputs sejam atualizados
        setTimeout(() => {
            this.updateInputValues();
        }, 0);
    }
    
    updateInputValues() {
        if (!this.dropdownContainer) return;
        
        const inputs = this.dropdownContainer.querySelectorAll('.cart-item__quantity-input');
        inputs.forEach(input => {
            const cartItem = input.closest('.cart-item');
            if (cartItem) {
                const productId = cartItem.dataset.id;
                const item = this.items.find(i => i.id === productId);
                if (item) {
                    input.value = item.quantity;
                }
            }
        });
    }
    
    renderCartDropdown(container) {
        if (!container) return;
        if (this.items.length === 0) {
            container.innerHTML = `<div class="shopping-cart__empty"><i class="fas fa-shopping-cart"></i><p>Sua sacola de compras está vazia</p></div>`;
        } else {
            container.innerHTML = `
                <div class="shopping-cart__content">
                    <div class="shopping-cart__items">
                        ${this.items.map(item => this.getCartItemHTML(item)).join('')}
                    </div>
                    <div class="shopping-cart__total">
                        <strong>Total: ${Utils.formatPrice(this.getTotalPrice())}</strong>
                    </div>
                    <a href="/pages/checkout/checkout.html">
                    <button class="shopping-cart__checkout" id="cart-checkout-btn">
                        
                        <i class="fas fa-credit-card"></i> Finalizar Compra
                    </button>
                    </a>
                </div>`;
        }
    }

    getCartItemHTML(item) {
        // Obter imagem do produto do banco de dados se não estiver no item
        const productFromDB = window.app.productDB.getProduct(item.id);
        const itemImage = item.image || (productFromDB ? productFromDB.image : '');
        
        return `
            <div class="cart-item" data-id="${item.id}">
                <div class="cart-item__info">
                    <h4>${item.name}</h4>
                    <p>${Utils.formatPrice(item.price)} &times; ${item.quantity}</p>
                </div>
                <div class="cart-item__actions">
                    <button class="cart-item__quantity-btn" data-action="decrease" aria-label="Diminuir"><i class="fas fa-minus"></i></button>
                    <input type="number" class="cart-item__quantity-input" value="${item.quantity}" min="0" aria-label="Quantidade">
                    <button class="cart-item__quantity-btn" data-action="increase" aria-label="Aumentar"><i class="fas fa-plus"></i></button>
                    <button class="cart-item__remove" data-action="remove" aria-label="Remover"><i class="fas fa-trash"></i></button>
                </div>
            </div>`;
    }

    bindDropdownEvents() {
        // Remove listeners anteriores para evitar duplicação
        if (this.dropdownClickHandler) {
            this.dropdownContainer.removeEventListener('click', this.dropdownClickHandler);
        }
        if (this.dropdownChangeHandler) {
            this.dropdownContainer.removeEventListener('change', this.dropdownChangeHandler);
        }

        // Handler para cliques
        this.dropdownClickHandler = (e) => {
            const actionButton = e.target.closest('[data-action]');
            if (actionButton) {
                // Prevent default scroll behavior
                e.preventDefault();
                e.stopPropagation();
                
                const cartItemElement = actionButton.closest('.cart-item');
                if (!cartItemElement) return;
                
                const productId = cartItemElement.dataset.id;
                const item = this.items.find(i => i.id === productId);
                if (!item) return;

                switch (actionButton.dataset.action) {
                    case 'remove': 
                        this.removeItem(productId); 
                        break;
                    case 'increase': 
                        this.updateQuantity(productId, item.quantity + 1); 
                        break;
                    case 'decrease': 
                        this.updateQuantity(productId, item.quantity - 1); 
                        break;
                }
            } else if (e.target.closest('#cart-checkout-btn')) {
                window.checkout();
            }
        };

        // Handler para mudanças no input
        this.dropdownChangeHandler = (e) => {
            if (e.target.classList.contains('cart-item__quantity-input')) {
                const cartItemElement = e.target.closest('.cart-item');
                if (!cartItemElement) return;
                
                const productId = cartItemElement.dataset.id;
                const newQuantity = parseInt(e.target.value, 10);
                
                if (!isNaN(newQuantity) && newQuantity >= 0) {
                    this.updateQuantity(productId, newQuantity);
                } else {
                    // Se o valor for inválido, restaura o valor original
                    const item = this.items.find(i => i.id === productId);
                    if (item) {
                        e.target.value = item.quantity;
                    }
                }
            }
        };

        // Adiciona os novos listeners
        if (this.dropdownContainer) {
            this.dropdownContainer.addEventListener('click', this.dropdownClickHandler);
            this.dropdownContainer.addEventListener('change', this.dropdownChangeHandler);
        }
    }
    
    bindPageEvents() {
        document.addEventListener('click', (e) => {
            const productButton = e.target.closest('.product-button');
            const productCard = e.target.closest('.product-card');
            
            // Handle "Add to Cart" button click
            if (productButton) {
                // Prevent default behavior (redirection)
                e.preventDefault();
                e.stopPropagation();
                
                // Prevent multiple rapid clicks
                if (productButton.classList.contains('added')) {
                    return;
                }

                const productCard = productButton.closest('.product-card');
                if (productCard && productCard.dataset.productId) {
                    const productId = productCard.dataset.productId;
                    
                    // Obter informações do produto do banco de dados para garantir consistência
                    const productFromDB = window.app.productDB.getProduct(productId);
                    
                    if (productFromDB) {
                        // Add item to cart using database information
                        this.addItem(productId, productFromDB.name, productFromDB.price, 1);
                    } else {
                        // Fallback se o produto não estiver no banco de dados
                        const productName = productCard.querySelector('.product-title')?.textContent || 'Produto';
                        // Obter preço do produto do banco de dados ou do elemento HTML
                        const productInfo = window.app ? window.app.productDB.getProduct(productId) : null;
                        let price = 0;
                        
                        if (productInfo && productInfo.price_current) {
                            // Usar preço atual do banco de dados
                            price = productInfo.price_current;
                        } else {
                            // Fallback para extrair do elemento HTML
                            price = parseInt(productCard.querySelector('.product-price--current')?.textContent.replace(/[^\d]/g, '')) || 0;
                        }
                        
                        // Add item to cart
                        this.addItem(productId, productName, price, 1);
                    }
                    
                    // Visual feedback on button
                    productButton.classList.add('added');
                    productButton.innerHTML = `<i class="fas fa-check"></i> Adicionado`;

                    setTimeout(() => {
                        productButton.classList.remove('added');
                        productButton.innerHTML = 'ADICIONAR AO CARRINHO';
                    }, 2000);
                }
            }
            // Handle product card click (redirect to product page)
            else if (productCard && productCard.dataset.productId) {
                // Prevent default behavior only when necessary
                // Allow the click to proceed to the product page
                const productId = productCard.dataset.productId;
                const productName = productCard.querySelector('.product-title')?.textContent || 'Produto';
                
                // If there's a link inside the card, let it handle the navigation
                const productLink = productCard.querySelector('a[href]');
                if (!productLink) {
                    // If no link exists, we can create navigation logic here
                    // For now, we'll let the default behavior happen
                    // In the future, we might want to implement redirectToProductSpot
                }
            }
        });
    }



    getTotalItems() { return this.items.reduce((total, item) => total + item.quantity, 0); }
    getTotalPrice() { return this.items.reduce((total, item) => total + (item.price * item.quantity), 0); }
    saveToStorage() { Storage.set(CONFIG.CART_STORAGE_KEY, this.items); }
    loadFromStorage() { return Storage.get(CONFIG.CART_STORAGE_KEY, []); }

}

// ===== SISTEMA DE BUSCA =====
class SearchSystem {
    constructor() {
        this.form = document.getElementById('searchForm');
        this.input = document.getElementById('searchInput');
        this.autocomplete = document.getElementById('searchAutocomplete');
        this.isSearching = false;
        this.searchSuggestions = [];
        
        if (this.form && this.input && this.autocomplete) {
            this.init();
        }
    }
    
    init() {
        this.bindEvents();
        this.loadSearchSuggestions();
        Logger.info('Sistema de busca inicializado');
    }
    
    bindEvents() {
        // Input events
        this.input.addEventListener('input', Utils.debounce(e => this.handleInput(e), 300));
        this.input.addEventListener('focus', () => this.showAutocomplete());
        this.input.addEventListener('blur', () => {
            setTimeout(() => this.hideAutocomplete(), 200);
        });
        
        // Form submission
        this.form.addEventListener('submit', e => this.handleSubmit(e));
        
        // Click outside
        document.addEventListener('click', e => {
            if (!this.autocomplete.contains(e.target) && !this.input.contains(e.target)) {
                this.hideAutocomplete();
            }
        });
        
        // Keyboard navigation
        this.input.addEventListener('keydown', e => this.handleKeyboard(e));
        this.autocomplete.addEventListener('keydown', e => this.handleKeyboard(e));
    }
    
    async loadSearchSuggestions() {
        // Em produção, isso viria de uma API
        this.searchSuggestions = [
            'Clareador dental',
            'Brocas odontológicas',
            'Cimentos dentários',
            'Anestésico local',
            'Equipamentos odontológicos',
            'Instrumental cirúrgico',
            'Resina composta',
            'Sistema adesivo',
            'Ácido fosfórico',
            'Matriz metálica',
            'Fotopolimerizador',
            'Autoclave',
            'Cadeira odontológica',
            'Kit endodontia',
            'Sugador cirúrgico'
        ];
    }
    
    handleInput(e) {
        const query = e.target.value.trim();
        
        if (query.length >= 2) {
            this.performSearch(query);
        } else {
            this.hideAutocomplete();
        }
    }
    
    async performSearch(query) {
        if (this.isSearching) return;
        
        this.isSearching = true;
        
        try {
            const suggestions = await this.getSearchSuggestions(query);
            this.showSuggestions(suggestions);
        } catch (error) {
            Logger.error('Erro na busca:', error);
            this.hideAutocomplete();
        } finally {
            this.isSearching = false;
        }
    }
    
    async getSearchSuggestions(query) {
        // Simulação de API - em produção seria uma chamada real
        return new Promise(resolve => {
            setTimeout(() => {
                const filtered = this.searchSuggestions.filter(item => 
                    item.toLowerCase().includes(query.toLowerCase())
                );
                // Limitar a 8 sugestões
                resolve(filtered.slice(0, 8));
            }, 100);
        });
    }
    
    showSuggestions(suggestions) {
        if (suggestions.length > 0) {
            this.autocomplete.innerHTML = suggestions.map(suggestion => `
                <div class="search-suggestion" 
                     onclick="searchSystem.selectSuggestion('${suggestion.replace(/'/g, "\\'")}')">
                    <i class="fas fa-search"></i>
                    ${suggestion}
                </div>
            `).join('');
            this.showAutocomplete();
        } else {
            this.hideAutocomplete();
        }
    }
    
    selectSuggestion(suggestion) {
        this.input.value = suggestion;
        this.hideAutocomplete();
        this.form.submit();
    }
    
    showAutocomplete() {
        this.autocomplete.style.display = 'block';
        this.autocomplete.setAttribute('aria-expanded', 'true');
    }
    
    hideAutocomplete() {
        this.autocomplete.style.display = 'none';
        this.autocomplete.setAttribute('aria-expanded', 'false');
    }
    
    handleSubmit(e) {
        const query = this.input.value.trim();
        if (!query) {
            e.preventDefault();
            this.input.focus();
        }
    }
    
    handleKeyboard(e) {
        const suggestions = this.autocomplete.querySelectorAll('.search-suggestion');
        if (suggestions.length === 0) return;
        
        switch (e.key) {
            case 'Enter':
                e.preventDefault();
                // Submit the form with current input value
                this.form.submit();
                break;
            case 'Escape':
                this.hideAutocomplete();
                this.input.blur();
                break;
        }
    }
    
    navigateSuggestions(suggestions, currentIndex, direction) {
        suggestions.forEach(s => s.classList.remove('search-suggestion--active'));
        
        let newIndex = currentIndex + direction;
        if (newIndex < -1) newIndex = suggestions.length - 1;
        if (newIndex >= suggestions.length) newIndex = -1;
        
        if (newIndex >= 0 && suggestions[newIndex]) {
            suggestions[newIndex].classList.add('search-suggestion--active');
            // Scroll to the active suggestion if needed
            suggestions[newIndex].scrollIntoView({ block: 'nearest' });
        }
    }
}

// =================================================================================
// ===== NOVO MÓDULO: GERENCIADOR DE UI DO CARRINHO ================================
// =================================================================================
class CartUIManager {
    constructor() {
        this.cartContainer = document.querySelector('.shopping-cart');
        if (!this.cartContainer) return;

        this.dropdown = this.cartContainer.querySelector('.shopping-cart__dropdown');
        this.hideTimeout = null;

        this.init();
    }

    init() {
        // Eventos para mostrar e esconder o dropdown
        this.cartContainer.addEventListener('mouseenter', () => this.showDropdown());
        this.cartContainer.addEventListener('mouseleave', () => this.startHideTimer());
        
        // Eventos para acessibilidade (navegação por teclado)
        this.cartContainer.querySelector('.shopping-cart__trigger').addEventListener('focus', () => this.showDropdown());
        this.cartContainer.addEventListener('focusout', (e) => {
            // Esconde se o foco sair de dentro do container do carrinho
             if (!window.cart.isUpdating && !this.cartContainer.contains(e.relatedTarget)) {
            this.hideDropdown();
            }
        });
        
        // Mantém o dropdown aberto se o foco estiver dentro dele
        this.dropdown.addEventListener('mouseenter', () => this.cancelHideTimer());

        Logger.info('Gerenciador de UI do Carrinho inicializado');
    }

    showDropdown() {
        this.cancelHideTimer();
        this.dropdown.classList.add('is-active');
    }

    hideDropdown() {
        this.dropdown.classList.remove('is-active');
    }

    startHideTimer() {
        // ATRASO INTELIGENTE: Espera 300ms antes de fechar
        this.hideTimeout = setTimeout(() => {
            this.hideDropdown();
        }, 50);
    }

    cancelHideTimer() {
        // Cancela o fechamento se o mouse voltar para o carrinho ou entrar no dropdown
        clearTimeout(this.hideTimeout);
    }
}

// =================================================================================
// ===== NOVO MÓDULO: GERENCIADOR DE UI DO ATENDIMENTO =============================
// =================================================================================
class CustomerServiceUIManager {
    constructor() {
        this.container = document.querySelector('.customer-service');
        if (!this.container) return;

        this.dropdown = this.container.querySelector('.customer-service__dropdown');
        this.trigger = this.container.querySelector('.customer-service__trigger');
        this.hideTimeout = null;

        this.init();
    }

    init() {
        // Eventos para mostrar e esconder o dropdown
        this.container.addEventListener('mouseenter', () => this.showDropdown());
        this.container.addEventListener('mouseleave', () => this.startHideTimer());

        // Eventos para acessibilidade (navegação por teclado)
        this.trigger.addEventListener('focus', () => this.showDropdown());
        this.container.addEventListener('focusout', (e) => {
             // Esconde se o foco sair de dentro do container
            if (!this.container.contains(e.relatedTarget)) {
                this.hideDropdown();
            }
        });

        // Mantém o dropdown aberto se o mouse/foco estiver dentro dele
        this.dropdown.addEventListener('mouseenter', () => this.cancelHideTimer());

        Logger.info('Gerenciador de UI de Atendimento inicializado');
    }

    showDropdown() {
        this.cancelHideTimer();
        this.dropdown.classList.add('is-active');
    }

    hideDropdown() {
        this.dropdown.classList.remove('is-active');
    }

    startHideTimer() {
        // Atraso inteligente: Espera 300ms antes de fechar
        this.hideTimeout = setTimeout(() => {
            this.hideDropdown();
        }, 50);
    }

    cancelHideTimer() {
        // Cancela o fechamento se o mouse voltar ou entrar no dropdown
        clearTimeout(this.hideTimeout);
    }
}

// ===== SISTEMA DE MENU MOBILE =====
class MobileMenu {
    constructor() {
        this.toggle = document.getElementById('mobileMenuToggle');
        this.navigation = document.getElementById('main-navigation');
        this.isOpen = false;
        
        if (this.toggle && this.navigation) {
            this.init();
        }
    }
    
    init() {
        this.bindEvents();
        Logger.info('Menu mobile inicializado');
    }
    
    bindEvents() {
        this.toggle.addEventListener('click', () => this.toggleMenu());
        
        // Fechar menu ao clicar fora
        document.addEventListener('click', e => {
            if (this.isOpen && !this.navigation.contains(e.target) && !this.toggle.contains(e.target)) {
                this.closeMenu();
            }
        });
        
        // Fechar menu ao redimensionar para desktop
        window.addEventListener('resize', Utils.debounce(() => {
            if (window.innerWidth > CONFIG.BREAKPOINTS.mobile && this.isOpen) {
                this.closeMenu();
            }
        }, 250));
    }
    
    toggleMenu() {
        if (this.isOpen) {
            this.closeMenu();
        } else {
            this.openMenu();
        }
    }
    
    openMenu() {
        this.isOpen = true;
        document.body.classList.add('nav-open');
        this.toggle.setAttribute('aria-expanded', 'true');
        this.navigation.setAttribute('aria-hidden', 'false');
        
        // Animar ícone
        const icon = this.toggle.querySelector('i');
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
        
        Logger.debug('Menu mobile aberto');
    }
    
    closeMenu() {
        this.isOpen = false;
        document.body.classList.remove('nav-open');
        this.toggle.setAttribute('aria-expanded', 'false');
        this.navigation.setAttribute('aria-hidden', 'true');
        
        // Animar ícone
        const icon = this.toggle.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
        
        Logger.debug('Menu mobile fechado');
    }
}

// ===== SISTEMA DE CARROSSEL =====
class Carousel {
    constructor(container) {
        this.container = container;
        this.track = container.querySelector('.carousel-track');
        this.slides = container.querySelectorAll('.carousel-slide');
        // Buscar dots no parent (nav-highlight-carousel) ao invés do container
        const parentSection = container.closest('.nav-highlight-carousel');
        this.dots = parentSection ? parentSection.querySelectorAll('.carousel-dot') : [];
        this.prevBtn = container.querySelector('.carousel-nav--prev');
        this.nextBtn = container.querySelector('.carousel-nav--next');
        
        this.currentSlide = 0;
        this.totalSlides = this.slides.length;
        this.isAnimating = false;
        this.autoplayInterval = null;
        
        if (this.track && this.slides.length > 0) {
            this.init();
        }
    }
    
    init() {
        this.bindEvents();
        this.startAutoplay();
        this.updateDots();
        Logger.info('Carrossel inicializado');
    }
    
    bindEvents() {
        // Botões de navegação
        if (this.prevBtn) {
            this.prevBtn.addEventListener('click', () => this.prev());
        }
        
        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', () => this.next());
        }
        
        // Dots
        this.dots.forEach((dot, index) => {
            dot.addEventListener('click', () => this.goTo(index));
        });
        
        // Keyboard navigation
        this.container.addEventListener('keydown', e => {
            if (e.key === 'ArrowLeft') this.prev();
            if (e.key === 'ArrowRight') this.next();
        });
        
        // Touch/swipe support
        this.setupTouchSupport();
        
        // Pause autoplay on hover
        this.container.addEventListener('mouseenter', () => this.stopAutoplay());
        this.container.addEventListener('mouseleave', () => this.startAutoplay());
    }
    
    setupTouchSupport() {
        let startX = 0;
        let currentX = 0;
        
        this.track.addEventListener('touchstart', e => {
            startX = e.touches[0].clientX;
            this.stopAutoplay();
        });
        
        this.track.addEventListener('touchmove', e => {
            currentX = e.touches[0].clientX;
            const diff = startX - currentX;
            
            if (Math.abs(diff) > 50) {
                if (diff > 0) {
                    this.next();
                } else {
                    this.prev();
                }
            }
        });
        
        this.track.addEventListener('touchend', () => {
            this.startAutoplay();
        });
    }
    
    goTo(index) {
        if (this.isAnimating || index === this.currentSlide) return;
        
        this.isAnimating = true;
        this.currentSlide = index;
        
        const translateX = -index * 100;
        this.track.style.transform = `translateX(${translateX}%)`;
        
        this.updateDots();
        
        setTimeout(() => {
            this.isAnimating = false;
        }, CONFIG.CAROUSEL_TRANSITION_DURATION);
    }
    
    next() {
        const nextIndex = (this.currentSlide + 1) % this.totalSlides;
        this.goTo(nextIndex);
    }
    
    prev() {
        const prevIndex = this.currentSlide === 0 ? this.totalSlides - 1 : this.currentSlide - 1;
        this.goTo(prevIndex);
    }
    
    updateDots() {
        this.dots.forEach((dot, index) => {
            // Remover ambas as classes para garantir
            dot.classList.remove('is-active', 'active');
            dot.setAttribute('aria-selected', 'false');
            
            if (index === this.currentSlide) {
                dot.classList.add('is-active', 'active');
                dot.setAttribute('aria-selected', 'true');
            }
        });
    }
    
    startAutoplay() {
        if (this.autoplayInterval) return;
        
        this.autoplayInterval = setInterval(() => {
            this.next();
        }, CONFIG.CAROUSEL_AUTOPLAY_INTERVAL);
    }
    
    stopAutoplay() {
        if (this.autoplayInterval) {
            clearInterval(this.autoplayInterval);
            this.autoplayInterval = null;
        }
    }
}

// =================================================================================
// ===== CARROSSEL DE PRODUTOS (ATUALIZADO PARA USAR HTML ESTÁTICO) ================
// =================================================================================
class ProductsCarousel {

    constructor(trackId) {
        this.track = document.getElementById(trackId);
        this.container = this.track ? this.track.closest('.products-carousel-container') : null;

        if (!this.container || !this.track) {
            Logger.warn(`Carrossel com trackId '${trackId}' não pôde ser inicializado.`);
            return;
        }

        this.prevBtn = this.container.querySelector('.carousel-nav--prev');
        this.nextBtn = this.container.querySelector('.carousel-nav--next');

        this.currentIndex = 0;
        this.itemsPerView = this.getItemsPerView();
        this.isTransitioning = false;

        this.slides = this.track.querySelectorAll('.product-slide');
        this.totalSlides = this.slides.length;

        // Para loop infinito, duplicamos os slides
        this.duplicateSlides();

        this.init();
    }

    init() {
        this.bindEvents();
        // Removemos a criação de dots e botões de navegação desabilitados
    }

    getItemsPerView() {
        const width = window.innerWidth;
        if (width <= 480) return 1;
        if (width <= 768) return 1;
        if (width <= 992) return 2;
        if (width <= 1200) return 3;
        return 4;
    }

    duplicateSlides() {
        // Duplicar slides originais no início E no final para loop infinito suave
        const originalSlides = Array.from(this.slides);
        this.originalSlidesCount = originalSlides.length;

        // Adicionar clones no início (para voltar suavemente)
        for (let i = originalSlides.length - 1; i >= 0; i--) {
            const clone = originalSlides[i].cloneNode(true);
            clone.classList.add('clone-start');
            this.track.insertBefore(clone, this.track.firstChild);
        }

        // Adicionar clones no final (para avançar suavemente)
        originalSlides.forEach(slide => {
            const clone = slide.cloneNode(true);
            clone.classList.add('clone-end');
            this.track.appendChild(clone);
        });

        // Atualizar lista de slides
        this.slides = this.track.querySelectorAll('.product-slide');
        this.totalSlides = this.slides.length;

        // Começar no primeiro conjunto de slides originais (após os clones iniciais)
        this.currentIndex = this.originalSlidesCount;
        
        // Posicionar inicialmente sem animação
        this.updatePosition(false);
    }

    bindEvents() {
        if (this.prevBtn) {
        this.prevBtn.addEventListener('click', () => this.prev());
        }
        
        if (this.nextBtn) {
        this.nextBtn.addEventListener('click', () => this.next());
        }

        window.addEventListener('resize', Utils.debounce(() => {
            const newItemsPerView = this.getItemsPerView();
            if (newItemsPerView !== this.itemsPerView) {
                this.itemsPerView = newItemsPerView;
            }
            // Recalcular posição após resize
            this.updatePosition(false);
        }, 250));
    }

    prev() {
        if (this.isTransitioning) return;

        this.currentIndex--;

        this.updatePosition(true);

        // Se chegamos aos clones do início, voltar para os slides originais do final
        if (this.currentIndex < this.originalSlidesCount) {
            setTimeout(() => {
                this.currentIndex = this.originalSlidesCount * 2 - 1;
                this.updatePosition(false);
            }, 400);
        }
    }

    next() {
        if (this.isTransitioning) return;

        this.currentIndex++;

        this.updatePosition(true);

        // Se chegamos aos clones do final, voltar para os slides originais do início
        if (this.currentIndex >= this.originalSlidesCount * 2) {
            setTimeout(() => {
                this.currentIndex = this.originalSlidesCount;
                this.updatePosition(false);
            }, 400);
        }
    }

    updatePosition(animate = true) {
        this.isTransitioning = animate;

        // Calcular a largura de cada slide em pixels
        const slideWidth = this.slides[0].offsetWidth;
        const offset = -(this.currentIndex * slideWidth);

        // Aplicar transformação
        this.track.style.transition = animate ? 'transform 0.4s cubic-bezier(0.2, 0.6, 0.2, 1)' : 'none';
        this.track.style.transform = `translateX(${offset}px)`;

        // Sempre liberar o estado de transição após aplicar a transformação
        if (animate) {
            setTimeout(() => {
                this.isTransitioning = false;
            }, 400);
        } else {
            // Para transformações instantâneas, liberar imediatamente após um pequeno delay
            setTimeout(() => {
            this.isTransitioning = false;
            }, 50);
        }
    }

    // Métodos removidos: updateDots() e updateNavButtons()
    // No modo infinito, os dots são removidos e os botões nunca são desabilitados

}



// =================================================================================
// ===== INICIALIZAÇÃO DOS CARROSSÉIS (ATUALIZADA PARA USAR HTML ESTÁTICO) =======
// =================================================================================

// Inicialização dentro do DOMContentLoaded para garantir que os elementos existam
document.addEventListener('DOMContentLoaded', () => {
    new ProductsCarousel('productsTrack');
    new ProductsCarousel('productsTrackLancamentos');
    new ProductsCarousel('productsTrackEquipamentos');
    new ProductsCarousel('equipamentos-track');
});

// ===== SISTEMA DE MEGA MENU =====
class MegaMenu {
    constructor() {
        // Debug: verificar se elementos existem
        console.log('MegaMenu: Iniciando construtor');

        // Usar ID específico para maior precisão
        this.trigger = document.getElementById('mega-menu-trigger');
        this.menu = document.getElementById('mega-menu-content');
        this.overlay = document.querySelector('.submenu-overlay');
        this.closeBtn = this.menu?.querySelector('.submenu__close');
        this.isOpen = false;

        // Debug detalhado
        console.log('MegaMenu elementos encontrados:', {
            trigger: this.trigger,
            menu: this.menu,
            overlay: this.overlay,
            closeBtn: this.closeBtn
        });

        // Verificar se todos os elementos necessários foram encontrados
        if (this.trigger && this.menu && this.overlay) {
            console.log('MegaMenu: Inicializando com sucesso');
            this.init();
        } else {
            console.error('MegaMenu: Falha na inicialização - elementos não encontrados:', {
                trigger: !!this.trigger,
                menu: !!this.menu,
                overlay: !!this.overlay
            });
            Logger.warn('Não foi possível inicializar o MegaMenu. Alguns elementos não foram encontrados:', {
                trigger: !!this.trigger,
                menu: !!this.menu,
                overlay: !!this.overlay
            });
        }
    }
    
    init() {
        this.bindEvents();
        Logger.info('Mega menu inicializado');
    }
    
    bindEvents() {
        console.log('MegaMenu: Configurando event listeners');

        // Trigger events
        this.trigger.addEventListener('click', e => {
            console.log('MegaMenu: Trigger clicado!');
            e.preventDefault();
            this.toggle();
        });
        
        this.trigger.addEventListener('keydown', e => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.toggle();
            }
        });
        
        // Close events
        if (this.closeBtn) {
            this.closeBtn.addEventListener('click', () => this.close());
        }
        
        this.overlay.addEventListener('click', () => this.close());
        
        // Keyboard events
        document.addEventListener('keydown', e => {
            if (e.key === 'Escape' && this.isOpen) {
                this.close();
            }
        });
        
        // Close on outside click
        document.addEventListener('click', e => {
            if (this.isOpen && 
                !this.menu.contains(e.target) && 
                !this.trigger.contains(e.target)) {
                this.close();
            }
        });
    }
    
    toggle() {
        console.log('MegaMenu: Toggle chamado, isOpen:', this.isOpen);
        if (this.isOpen) {
            this.close();
        } else {
            this.open();
        }
    }
    
    open() {
        console.log('MegaMenu: Abrindo menu');
        this.isOpen = true;
        document.body.classList.add('no-scroll');

        this.overlay.classList.add('active');
        this.menu.classList.add('submenu--active');

        this.trigger.setAttribute('aria-expanded', 'true');
        this.menu.setAttribute('aria-hidden', 'false');

        // Focus management
        this.menu.focus();

        // Ajustar layout dinamicamente com base no número de colunas
        this.adjustLayout();

        console.log('MegaMenu: Menu aberto com sucesso');
        Logger.debug('Mega menu aberto');
    }
    
    adjustLayout() {
        // Ajustar layout para acomodar mais colunas
        const columns = this.menu.querySelectorAll('.submenu__column');
        if (columns.length > 4) {
            // Se tivermos mais de 4 colunas, garantir que o layout se adapte corretamente
            this.menu.style.width = '95%';
            this.menu.style.maxWidth = '1200px';
        }
    }
    
    close() {
        this.isOpen = false;
        document.body.classList.remove('no-scroll');
        
        this.overlay.classList.remove('active');
        this.menu.classList.remove('submenu--active');
        
        this.trigger.setAttribute('aria-expanded', 'false');
        this.menu.setAttribute('aria-hidden', 'true');
        
        // Return focus to trigger
        this.trigger.focus();
        
        Logger.debug('Mega menu fechado');
    }
}

// MegaMenu é inicializado dentro da classe OdontoMasterApp
// Removida inicialização duplicada

// ===== SISTEMA DE ANIMAÇÕES =====
class AnimationManager {
    constructor() {
        this.observer = null;
        this.init();
    }
    
    init() {
        this.setupIntersectionObserver();
        Logger.info('Sistema de animações inicializado');
    }
    
    setupIntersectionObserver() {
        const options = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    this.observer.unobserve(entry.target);
                }
            });
        }, options);
        
        // Observe elements
        const elements = document.querySelectorAll('.product-card, .section-title, .home-card');
        elements.forEach(el => this.observer.observe(el));
    }
    
    animateIn(element, animation = 'fadeInUp') {
        element.classList.add(`animate-${animation}`);
    }
    
    animateOut(element, animation = 'fadeOutDown') {
        element.classList.add(`animate-${animation}`);
    }
}

// ===== SISTEMA DE PERFORMANCE =====
class PerformanceMonitor {
    constructor() {
        this.metrics = {};
        this.init();
    }
    
    init() {
        this.measurePageLoad();
        this.measureCoreWebVitals();
        Logger.info('Monitor de performance inicializado');
    }
    
    measurePageLoad() {
        window.addEventListener('load', () => {
            const loadTime = performance.now();
            this.metrics.pageLoadTime = loadTime;
            
            Logger.info('Tempo de carregamento da página:', `${loadTime.toFixed(2)}ms`);
        });
    }
    
    measureCoreWebVitals() {
        // Largest Contentful Paint (LCP)
        new PerformanceObserver((list) => {
            const entries = list.getEntries();
            const lastEntry = entries[entries.length - 1];
            this.metrics.lcp = lastEntry.startTime;
            
            Logger.info('LCP:', `${lastEntry.startTime.toFixed(2)}ms`);
        }).observe({ entryTypes: ['largest-contentful-paint'] });
        
        // First Input Delay (FID)
        new PerformanceObserver((list) => {
            const entries = list.getEntries();
            entries.forEach(entry => {
                this.metrics.fid = entry.processingStart - entry.startTime;
                Logger.info('FID:', `${this.metrics.fid.toFixed(2)}ms`);
            });
        }).observe({ entryTypes: ['first-input'] });
        
        // Cumulative Layout Shift (CLS)
        new PerformanceObserver((list) => {
            let cls = 0;
            list.getEntries().forEach(entry => {
                if (!entry.hadRecentInput) {
                    cls += entry.value;
                }
            });
            this.metrics.cls = cls;
            
            Logger.info('CLS:', cls.toFixed(4));
        }).observe({ entryTypes: ['layout-shift'] });
    }
}

// ===== SISTEMA DE BANCO DE DADOS DE PRODUTOS =====
class ProductDatabase {
    constructor() {
        this.products = {};
        this.loadProducts();
    }

    loadProducts() {
        // Tentar carregar produtos do arquivo JSON primeiro
        try {
            // Em produção, isso seria uma chamada fetch para o arquivo JSON
            // const response = await fetch('/data/products.json');
            // this.products = await response.json();
            
            // Por ora, usar dados fixos replicados do arquivo products.json para evitar problema com fetch síncrono
            // Em implementações futuras, pode-se carregar assíncrono e atualizar quando disponível
            // this.products = await response.json();
            
            this.products = {
                'prod1': { id: 'prod1', name: 'Kit Clareamento Dental Whiteness HP', price: 18990, discount: 27, price_original: 26000, price_current: 18990, installments: { count: 10, value: 1899 }, image: '/images/clareador-whiteness.png', category: 'Clareamento Dental', brand: 'Whiteness' },
                'prod2': { id: 'prod2', name: 'Resina Composta Z350 XT - Solventum', price: 29900, discount: 15, price_original: 29900, price_current: 29900, installments: { count: 10, value: 2990 }, image: '/images/resina-composta.png', category: 'Resina Composta', brand: 'Solventum' },
                'prod3': { id: 'prod3', name: 'Anestésico Mepivalem 3%', price: 22900, discount: 30, price_original: 12900, price_current: 22900, installments: { count: 6, value: 3817 }, image: '/images/anestesico.png', category: 'Anestésico', brand: 'Mepivalem' },
                'prod4': { id: 'prod4', name: 'Broca Carbide FG 245', price: 1450, discount: 10, price_original: 3900, price_current: 1450, installments: { count: 3, value: 483 }, image: '/images/broca.png', category: 'Broca', brand: 'Carbide' },
                'prod5': { id: 'prod5', name: 'Fotopolimerizador LED Radii Plus', price: 390000, discount: 20, price_original: 112500, price_current: 390000, installments: { count: 12, value: 32500 }, image: '/images/fotopolimerizador.png', category: 'Fotopolimerizador', brand: 'Radii' },
                'prod6': { id: 'prod6', name: 'Cimento Endontico Pull Fill Kit - Biodinamica', price: 4990, discount: 18, price_original: 7000, price_current: 4990, installments: { count: 5, value: 998 }, image: 'https://odontomaster.fbitsstatic.net/img/p/cimento-endodontico-pulp-fill-kit-biodinamica-74784/266174.jpg?w=320&h=320&v=202508291601&qs=ignore', category: 'Cimento', brand: 'Biodinamica' },
                'prod7': { id: 'prod7', name: 'Lima Manual Kendo K-File - VDW', price: 3540, discount: 25, price_original: 195000, price_current: 3540, installments: { count: 12, value: 295 }, image: 'https://odontomaster.fbitsstatic.net/img/p/lima-manual-kendo-k-file-vdw-74629/265800-1.jpg?w=320&h=320&v=202508271736&qs=ignore', category: 'Endodontia', brand: 'VDW' },
                'prod8': { id: 'prod8', name: 'Clareador Whiteness Perfect 22% - FGM', price: 7990, discount: 12, price_original: 2600, price_current: 7990, installments: { count: 3, value: 2663 }, image: 'https://odontomaster.fbitsstatic.net/img/p/clareador-whiteness-perfect-22-fgm-72016/260704.jpg?w=320&h=320&v=no-change&qs=ignore', category: 'Clareamento Dental', brand: 'FGM' },
                'prod9': { id: 'prod9', name: 'Autoclave Vitale Class 12L - Cristófoli', price: 7990, discount: 10, price_original: 500000, price_current: 7990, installments: { count: 12, value: 666 }, image: 'https://odontomaster.fbitsstatic.net/img/p/autoclave-vitale-class-12l-cristofoli-70901/258917.jpg?w=420&h=420&v=no-change&qs=ignore', category: 'Autoclave', brand: 'Cristófoli' },
                'prod10': { id: 'prod10', name: 'Autoclave Vitale Class 21L - Cristófoli', price: 1937, discount: 15, price_original: 2950000, price_current: 1937, installments: { count: 12, value: 161 }, image: 'https://odontomaster.fbitsstatic.net/img/p/autoclave-vitale-class-12l-cristofoli-70901/258917.jpg?w=420&h=420&v=no-change&qs=ignore', category: 'Autoclave', brand: 'Cristófoli' },
                'prod11': { id: 'prod11', name: 'Lima Reciprocante Reciproc - VDW', price: 40990, discount: 22, price_original: 160000, price_current: 40990, installments: { count: 12, value: 3416 }, image: 'https://odontomaster.fbitsstatic.net/img/p/lima-reciprocante-reciproc-vdw-70872/258882.jpg?w=320&h=320&v=no-change&qs=ignore', category: 'Endodontia', brand: 'VDW' },
                'prod12': { id: 'prod12', name: 'Resina TPH Spectrum - Dentsply', price: 2370, discount: 18, price_original: 11000, price_current: 2370, installments: { count: 8, value: 296 }, image: 'https://odontomaster.fbitsstatic.net/img/p/resina-tph-spectrum-dentsply-73652/264075.jpg?w=320&h=320&v=no-change&qs=ignore', category: 'Resina Composta', brand: 'Dentsply' },
                'prod13': { id: 'prod13', name: 'Kit Braquete de Aço Advanced Series Roth 022 - Orthometric', price: 2190, discount: 15, price_original: 223000, price_current: 2190, installments: { count: 12, value: 183 }, image: 'https://odontomaster.fbitsstatic.net/img/p/kit-braquete-de-aco-advanced-series-roth-022-orthometric-73253/263482.jpg?w=320&h=320&v=202501241014&qs=ignore', category: 'Ortodontia', brand: 'Orthometric' },
                'prod14': { id: 'prod14', name: 'Ficha Clínica Simples - Preven', price: 41172, discount: 10, price_original: 500000, price_current: 41172, installments: { count: 12, value: 3431 }, image: 'https://odontomaster.fbitsstatic.net/img/p/ficha-clinica-simples-preven-74761/266131.jpg?w=320&h=320&v=202508201217&qs=ignore', category: 'Material de Escritório', brand: 'Preven' },
                'prod15': { id: 'prod15', name: 'Clareador Whiteness Perfect 10% - FGM', price: 7990, discount: 25, price_original: 118000, price_current: 7990, installments: { count: 12, value: 666 }, image: 'https://odontomaster.fbitsstatic.net/img/p/clareador-whiteness-perfect-10-fgm-71914/260561.jpg?w=320&h=320&v=202502211159&qs=ignore', category: 'Clareamento Dental', brand: 'FGM' },
                'prod16': { id: 'prod16', name: 'Localizador Apical Farominal E-Pex Pró - MK Life', price: 15590, discount: 20, price_original: 156000, price_current: 15590, installments: { count: 12, value: 1299 }, image: 'https://odontomaster.fbitsstatic.net/img/p/clareador-whiteness-hp-blue-calcium-35-mini-kit-fgm-72121/260864-1.jpg?w=320&h=320&v=202506141130&qs=ignore', category: 'Endodontia', brand: 'MK Life' },
                'prod17': { id: 'prod17', name: 'Kit Braquete Metálico 100 Casos', price: 890, discount: 15, price_original: 1050, price_current: 890, installments: { count: 2, value: 445 }, image: 'https://odontomaster.fbitsstatic.net/img/p/fotopolimerizador-emitter-a-fit-com-ponteira-shuster-73208/263424.jpg?w=420&h=420&v=202502031032&qs=ignore', category: 'Ortodontia', brand: 'Diversos' },
                'prod18': { id: 'prod18', name: 'Restaurador Provisório Fill Temp 25g - Biodinâmica', price: 185000, discount: 18, price_original: 226000, price_current: 185000, installments: { count: 12, value: 15416.67 }, image: '/images/ultrassom-piezo.png', category: 'Materiais Restauradores', brand: 'Biodinâmica' },
                'prod19': { id: 'prod19', name: 'Kit Corredor de Classe II Iceram Clear Distalizer 23mm/25mm/27mm - Orthometric', price: 25000, discount: 12, price_original: 28500, price_current: 25000, installments: { count: 10, value: 2500.00 }, image: '/images/seringa-carpule.png', category: 'Ortodontia', brand: 'Orthometric' },
                'prod20': { id: 'prod20', name: 'Clareador Whiteness HP Blue Calcium 35% Mini Kit - FGM', price: 12500, discount: 20, price_original: 15600, price_current: 12500, installments: { count: 8, value: 1562.50 }, image: '/images/cimento-resina.png', category: 'Clareamento Dental', brand: 'FGM' },
                'prod21': { id: 'prod21', name: 'Fotopolimerizador Emitter a Fit com Ponteira - SHUSTER', price: 8900, discount: 15, price_original: 10500, price_current: 8900, installments: { count: 6, value: 1483.33 }, image: '/images/fresa-diamantada.png', category: 'Fotopolimerização', brand: 'SHUSTER' },
                'prod22': { id: 'prod22', name: 'Clareador Whiteness HP Maxx 35% 1PAC - FGM', price: 285000, discount: 10, price_original: 317000, price_current: 285000, installments: { count: 12, value: 23750.00 }, image: '/images/raio-x-portatil.png', category: 'Clareamento Dental', brand: 'FGM' },
                'prod23': { id: 'prod23', name: 'Clareador Whiteness HP Maxx 35% Mini Kit - FGM', price: 45000, discount: 25, price_original: 60000, price_current: 45000, installments: { count: 10, value: 4500.00 }, image: '/images/lampada-extra.png', category: 'Clareamento Dental', brand: 'FGM' },
                'prod24': { id: 'prod24', name: 'Clareador Whiteness Perfect 16% - FGM', price: 1250, discount: 10, price_original: 1390, price_current: 1250, installments: { count: 3, value: 416.67 }, image: '/images/moldagem-facial.png', category: 'Clareamento Dental', brand: 'FGM' },
                'prod25': { id: 'prod25', name: 'Clareador Potenza Bianco Pro 35% H202 - PHS', price: 850000, discount: 12, price_original: 968000, price_current: 850000, installments: { count: 12, value: 70833.33 }, image: '/images/unidade-odontologica.png', category: 'Clareamento Dental', brand: 'PHS' },
                'equip1': { id: 'equip1', name: 'Motor Endodôntico E-Connect Pro - MK Life', price: 850000, discount: 12, price_original: 968000, price_current: 850000, installments: { count: 12, value: 70833 }, image: 'https://odontomaster.fbitsstatic.net/img/p/motor-endodontico-e-connect-pro-mk-life-73466/263819-1.jpg?w=320&h=320&v=no-change&qs=ignore', category: 'Equipamentos', brand: 'MK Life' },
                'equip2': { id: 'equip2', name: 'Fotopolimerizador Emitter a Fit com Ponteira - SHUSTER', price: 850000, discount: 12, price_original: 968000, price_current: 850000, installments: { count: 12, value: 70833.33 }, image: '/images/fotopolimerizador-emitter.png', category: 'Equipamentos', brand: 'SHUSTER' },
                'equip3': { id: 'equip3', name: 'Autoclave Vitale Class 12L - Cristófoli', price: 850000, discount: 12, price_original: 968000, price_current: 850000, installments: { count: 12, value: 70833.33 }, image: '/images/autoclave-12l.png', category: 'Equipamentos', brand: 'Cristófoli' },
                'equip4': { id: 'equip4', name: 'Autoclave Vitale Class 21L - Cristófoli', price: 850000, discount: 12, price_original: 968000, price_current: 850000, installments: { count: 12, value: 70833.33 }, image: '/images/autoclave-21l.png', category: 'Equipamentos', brand: 'Cristófoli' },
                'equip5': { id: 'equip5', name: 'Localizador Apical Farominal E-Pex Pró - MK Life', price: 850000, discount: 12, price_original: 968000, price_current: 850000, installments: { count: 12, value: 70833.33 }, image: '/images/localizador-apical.png', category: 'Equipamentos', brand: 'MK Life' },
                'equip6': { id: 'equip6', name: 'Kit Acadêmico Prime - GNATUS', price: 850000, discount: 12, price_original: 968000, price_current: 850000, installments: { count: 12, value: 70833.33 }, image: '/images/kit-academico.png', category: 'Equipamentos', brand: 'GNATUS' },
                'equip7': { id: 'equip7', name: 'Fotopolimerizador Led Grand Valo Sem Fio Black - Ultradent', price: 850000, discount: 12, price_original: 968000, price_current: 850000, installments: { count: 12, value: 70833.33 }, image: '/images/fotopolimerizador-grand-valo.png', category: 'Equipamentos', brand: 'Ultradent' },
                'equip8': { id: 'equip8', name: 'Destilador de Água 5L/h', price: 134000, discount: 14, price_original: 156000, price_current: 134000, installments: { count: 12, value: 11166.67 }, image: '/images/destilador.png', category: 'Equipamentos', brand: 'Diversos' }
            };
        } catch (error) {
            Logger.error('Erro ao carregar produtos:', error);
            // Em caso de erro, usar dados padrão
            this.products = {
                'prod1': { id: 'prod1', name: 'Kit Clareamento Dental Whiteness HP', price: 18990, discount: 27, price_original: 26000, price_current: 18990, installments: { count: 10, value: 1899 }, image: '/images/clareador-whiteness.png', category: 'Clareamento Dental', brand: 'Whiteness' },
                'prod2': { id: 'prod2', name: 'Resina Composta Z350 XT - Solventum', price: 29900, discount: 15, price_original: 29900, price_current: 29900, installments: { count: 10, value: 2990 }, image: '/images/resina-composta.png', category: 'Resina Composta', brand: 'Solventum' },
                'prod3': { id: 'prod3', name: 'Anestésico Mepivalem 3%', price: 22900, discount: 30, price_original: 12900, price_current: 22900, installments: { count: 6, value: 3817 }, image: '/images/anestesico.png', category: 'Anestésico', brand: 'Mepivalem' },
                'prod4': { id: 'prod4', name: 'Broca Carbide FG 245', price: 1450, discount: 10, price_original: 3900, price_current: 1450, installments: { count: 3, value: 483 }, image: '/images/broca.png', category: 'Broca', brand: 'Carbide' },
                'prod5': { id: 'prod5', name: 'Fotopolimerizador LED Radii Plus', price: 390000, discount: 20, price_original: 112500, price_current: 390000, installments: { count: 12, value: 32500 }, image: '/images/fotopolimerizador.png', category: 'Fotopolimerizador', brand: 'Radii' },
                'prod6': { id: 'prod6', name: 'Cimento Endontico Pull Fill Kit - Biodinamica', price: 4990, discount: 18, price_original: 7000, price_current: 4990, installments: { count: 5, value: 998 }, image: 'https://odontomaster.fbitsstatic.net/img/p/cimento-endodontico-pulp-fill-kit-biodinamica-74784/266174.jpg?w=320&h=320&v=202508291601&qs=ignore', category: 'Cimento', brand: 'Biodinamica' },
                'prod7': { id: 'prod7', name: 'Lima Manual Kendo K-File - VDW', price: 3540, discount: 25, price_original: 195000, price_current: 3540, installments: { count: 12, value: 295 }, image: 'https://odontomaster.fbitsstatic.net/img/p/lima-manual-kendo-k-file-vdw-74629/265800-1.jpg?w=320&h=320&v=202508271736&qs=ignore', category: 'Endodontia', brand: 'VDW' },
                'prod8': { id: 'prod8', name: 'Clareador Whiteness Perfect 22% - FGM', price: 7990, discount: 12, price_original: 2600, price_current: 7990, installments: { count: 3, value: 2663 }, image: 'https://odontomaster.fbitsstatic.net/img/p/clareador-whiteness-perfect-22-fgm-72016/260704.jpg?w=320&h=320&v=no-change&qs=ignore', category: 'Clareamento Dental', brand: 'FGM' },
                'prod9': { id: 'prod9', name: 'Autoclave Vitale Class 12L - Cristófoli', price: 7990, discount: 10, price_original: 500000, price_current: 7990, installments: { count: 12, value: 666 }, image: 'https://odontomaster.fbitsstatic.net/img/p/autoclave-vitale-class-12l-cristofoli-70901/258917.jpg?w=420&h=420&v=no-change&qs=ignore', category: 'Autoclave', brand: 'Cristófoli' },
                'prod10': { id: 'prod10', name: 'Autoclave Vitale Class 21L - Cristófoli', price: 1937, discount: 15, price_original: 2950000, price_current: 1937, installments: { count: 12, value: 161 }, image: 'https://odontomaster.fbitsstatic.net/img/p/autoclave-vitale-class-12l-cristofoli-70901/258917.jpg?w=420&h=420&v=no-change&qs=ignore', category: 'Autoclave', brand: 'Cristófoli' },
                'prod11': { id: 'prod11', name: 'Lima Reciprocante Reciproc - VDW', price: 40990, discount: 22, price_original: 160000, price_current: 40990, installments: { count: 12, value: 3416 }, image: 'https://odontomaster.fbitsstatic.net/img/p/lima-reciprocante-reciproc-vdw-70872/258882.jpg?w=320&h=320&v=no-change&qs=ignore', category: 'Endodontia', brand: 'VDW' },
                'prod12': { id: 'prod12', name: 'Resina TPH Spectrum - Dentsply', price: 2370, discount: 18, price_original: 11000, price_current: 2370, installments: { count: 8, value: 296 }, image: 'https://odontomaster.fbitsstatic.net/img/p/resina-tph-spectrum-dentsply-73652/264075.jpg?w=320&h=320&v=no-change&qs=ignore', category: 'Resina Composta', brand: 'Dentsply' },
                'prod13': { id: 'prod13', name: 'Kit Braquete de Aço Advanced Series Roth 022 - Orthometric', price: 2190, discount: 15, price_original: 223000, price_current: 2190, installments: { count: 12, value: 183 }, image: 'https://odontomaster.fbitsstatic.net/img/p/kit-braquete-de-aco-advanced-series-roth-022-orthometric-73253/263482.jpg?w=320&h=320&v=202501241014&qs=ignore', category: 'Ortodontia', brand: 'Orthometric' },
                'prod14': { id: 'prod14', name: 'Ficha Clínica Simples - Preven', price: 41172, discount: 10, price_original: 500000, price_current: 41172, installments: { count: 12, value: 3431 }, image: 'https://odontomaster.fbitsstatic.net/img/p/ficha-clinica-simples-preven-74761/266131.jpg?w=320&h=320&v=202508201217&qs=ignore', category: 'Material de Escritório', brand: 'Preven' },
                'prod15': { id: 'prod15', name: 'Clareador Whiteness Perfect 10% - FGM', price: 7990, discount: 25, price_original: 118000, price_current: 7990, installments: { count: 12, value: 666 }, image: 'https://odontomaster.fbitsstatic.net/img/p/clareador-whiteness-perfect-10-fgm-71914/260561.jpg?w=320&h=320&v=202502211159&qs=ignore', category: 'Clareamento Dental', brand: 'FGM' },
                'prod16': { id: 'prod16', name: 'Localizador Apical Farominal E-Pex Pró - MK Life', price: 15590, discount: 20, price_original: 156000, price_current: 15590, installments: { count: 12, value: 1299 }, image: 'https://odontomaster.fbitsstatic.net/img/p/clareador-whiteness-hp-blue-calcium-35-mini-kit-fgm-72121/260864-1.jpg?w=320&h=320&v=202506141130&qs=ignore', category: 'Endodontia', brand: 'MK Life' },
                'prod17': { id: 'prod17', name: 'Kit Braquete Metálico 100 Casos', price: 890, discount: 15, price_original: 1050, price_current: 890, installments: { count: 2, value: 445 }, image: 'https://odontomaster.fbitsstatic.net/img/p/fotopolimerizador-emitter-a-fit-com-ponteira-shuster-73208/263424.jpg?w=420&h=420&v=202502031032&qs=ignore', category: 'Ortodontia', brand: 'Diversos' },
                'prod18': { id: 'prod18', name: 'Restaurador Provisório Fill Temp 25g - Biodinâmica', price: 185000, discount: 18, price_original: 226000, price_current: 185000, installments: { count: 12, value: 15416.67 }, image: '/images/ultrassom-piezo.png', category: 'Materiais Restauradores', brand: 'Biodinâmica' },
                'prod19': { id: 'prod19', name: 'Kit Corredor de Classe II Iceram Clear Distalizer 23mm/25mm/27mm - Orthometric', price: 25000, discount: 12, price_original: 28500, price_current: 25000, installments: { count: 10, value: 2500.00 }, image: '/images/seringa-carpule.png', category: 'Ortodontia', brand: 'Orthometric' },
                'prod20': { id: 'prod20', name: 'Clareador Whiteness HP Blue Calcium 35% Mini Kit - FGM', price: 12500, discount: 20, price_original: 15600, price_current: 12500, installments: { count: 8, value: 1562.50 }, image: '/images/cimento-resina.png', category: 'Clareamento Dental', brand: 'FGM' },
                'prod21': { id: 'prod21', name: 'Fotopolimerizador Emitter a Fit com Ponteira - SHUSTER', price: 8900, discount: 15, price_original: 10500, price_current: 8900, installments: { count: 6, value: 1483.33 }, image: '/images/fresa-diamantada.png', category: 'Fotopolimerização', brand: 'SHUSTER' },
                'prod22': { id: 'prod22', name: 'Clareador Whiteness HP Maxx 35% 1PAC - FGM', price: 285000, discount: 10, price_original: 317000, price_current: 285000, installments: { count: 12, value: 23750.00 }, image: '/images/raio-x-portatil.png', category: 'Clareamento Dental', brand: 'FGM' },
                'prod23': { id: 'prod23', name: 'Clareador Whiteness HP Maxx 35% Mini Kit - FGM', price: 45000, discount: 25, price_original: 60000, price_current: 45000, installments: { count: 10, value: 4500.00 }, image: '/images/lampada-extra.png', category: 'Clareamento Dental', brand: 'FGM' },
                'prod24': { id: 'prod24', name: 'Clareador Whiteness Perfect 16% - FGM', price: 1250, discount: 10, price_original: 1390, price_current: 1250, installments: { count: 3, value: 416.67 }, image: '/images/moldagem-facial.png', category: 'Clareamento Dental', brand: 'FGM' },
                'prod25': { id: 'prod25', name: 'Clareador Potenza Bianco Pro 35% H202 - PHS', price: 850000, discount: 12, price_original: 968000, price_current: 850000, installments: { count: 12, value: 70833.33 }, image: '/images/unidade-odontologica.png', category: 'Clareamento Dental', brand: 'PHS' },
                'equip1': { id: 'equip1', name: 'Motor Endodôntico E-Connect Pro - MK Life', price: 850000, discount: 12, price_original: 968000, price_current: 850000, installments: { count: 12, value: 70833 }, image: 'https://odontomaster.fbitsstatic.net/img/p/motor-endodontico-e-connect-pro-mk-life-73466/263819-1.jpg?w=320&h=320&v=no-change&qs=ignore', category: 'Equipamentos', brand: 'MK Life' },
                'equip2': { id: 'equip2', name: 'Fotopolimerizador Emitter a Fit com Ponteira - SHUSTER', price: 850000, discount: 12, price_original: 968000, price_current: 850000, installments: { count: 12, value: 70833.33 }, image: '/images/fotopolimerizador-emitter.png', category: 'Equipamentos', brand: 'SHUSTER' },
                'equip3': { id: 'equip3', name: 'Autoclave Vitale Class 12L - Cristófoli', price: 850000, discount: 12, price_original: 968000, price_current: 850000, installments: { count: 12, value: 70833.33 }, image: '/images/autoclave-12l.png', category: 'Equipamentos', brand: 'Cristófoli' },
                'equip4': { id: 'equip4', name: 'Autoclave Vitale Class 21L - Cristófoli', price: 850000, discount: 12, price_original: 968000, price_current: 850000, installments: { count: 12, value: 70833.33 }, image: '/images/autoclave-21l.png', category: 'Equipamentos', brand: 'Cristófoli' },
                'equip5': { id: 'equip5', name: 'Localizador Apical Farominal E-Pex Pró - MK Life', price: 850000, discount: 12, price_original: 968000, price_current: 850000, installments: { count: 12, value: 70833.33 }, image: '/images/localizador-apical.png', category: 'Equipamentos', brand: 'MK Life' },
                'equip6': { id: 'equip6', name: 'Kit Acadêmico Prime - GNATUS', price: 850000, discount: 12, price_original: 968000, price_current: 850000, installments: { count: 12, value: 70833.33 }, image: '/images/kit-academico.png', category: 'Equipamentos', brand: 'GNATUS' },
                'equip7': { id: 'equip7', name: 'Fotopolimerizador Led Grand Valo Sem Fio Black - Ultradent', price: 850000, discount: 12, price_original: 968000, price_current: 850000, installments: { count: 12, value: 70833.33 }, image: '/images/fotopolimerizador-grand-valo.png', category: 'Equipamentos', brand: 'Ultradent' },
                'equip8': { id: 'equip8', name: 'Destilador de Água 5L/h', price: 134000, discount: 14, price_original: 156000, price_current: 134000, installments: { count: 12, value: 11166.67 }, image: '/images/destilador.png', category: 'Equipamentos', brand: 'Diversos' }
            };
        }
    }

    getProduct(productId) {
        return this.products[productId] || null;
    }

    getAllProducts() {
        return this.products;
    }

    getProductsByIds(productIds) {
        return productIds.map(id => this.getProduct(id)).filter(Boolean);
    }

    searchProducts(query) {
        const searchTerm = query.toLowerCase();
        return Object.values(this.products).filter(product => 
            product.name.toLowerCase().includes(searchTerm) ||
            product.category.toLowerCase().includes(searchTerm) ||
            product.brand.toLowerCase().includes(searchTerm)
        );
    }
}

// ===== APLICAÇÃO PRINCIPAL =====
class OdontoMasterApp {
    constructor() {
        this.modules = {};
        // Inicializar banco de dados de produtos
        this.productDB = new ProductDatabase();
        this.isInitialized = false;
    }
    
    /**
     * Inicializa a aplicação
     */
    init() {
        if (this.isInitialized) return;
        
        Logger.info('Iniciando Odonto Master App...');
        
        try {
            this.initializeModules();
            this.setupGlobalFunctions();
            this.hideLoadingScreen();
            this.setupEventListeners();
            
            this.isInitialized = true;
            Logger.info('Odonto Master App inicializado com sucesso!');
            
            // Emitir evento de inicialização
            EventBus.emit('app:initialized');
            
        } catch (error) {
            Logger.error('Erro na inicialização da aplicação:', error);
        }
    }
    
    /**
     * Inicializa todos os módulos
     */
    initializeModules() {
        // Módulos de sistema
        this.modules.notifications = new NotificationSystem();
        this.modules.cart = new ShoppingCart();
        this.modules.search = new SearchSystem();
        this.modules.mobileMenu = new MobileMenu();
        this.modules.megaMenu = new MegaMenu();
        this.modules.animations = new AnimationManager();
        this.modules.performance = new PerformanceMonitor();
        this.modules.cartUI = new CartUIManager();
        this.modules.customerServiceUI = new CustomerServiceUIManager();
        
        // Inicializar carrosséis
        const carousels = document.querySelectorAll('.highlight-carousel');
        this.modules.carousels = Array.from(carousels).map(carousel => new Carousel(carousel));
        
        Logger.info(`${Object.keys(this.modules).length} módulos inicializados`);
    }
    
    /**
     * Configura funções globais
     */
    setupGlobalFunctions() {
     
        // Função de checkout
        window.checkout = () => {
            const cartModule = this.modules.cart;
            if(cartModule.getTotalItems() > 0){
                this.modules.notifications.info('Redirecionando para o checkout...');
                // window.location.href = '/checkout';
                
            } else {
                this.modules.notifications.warning('Adicione itens ao carrinho antes de finalizar a compra.');
            }
        };
        
        // Função de breadcrumb
        window.updateBreadcrumb = (items) => {
            const breadcrumbList = document.querySelector('.breadcrumb__list');
            if (breadcrumbList) {
                breadcrumbList.innerHTML = '';
                
                // Adiciona o item Home por padrão
                const homeItem = document.createElement('li');
                homeItem.className = 'breadcrumb__item';
                homeItem.innerHTML = '<a href="/pages/home/index.html" class="breadcrumb__link">Home</a>';
                breadcrumbList.appendChild(homeItem);
                
                // Adiciona os itens fornecidos
                items.forEach((item, index) => {
                    const separator = document.createElement('li');
                    separator.className = 'breadcrumb__item';
                    separator.innerHTML = '<span class="breadcrumb__link">' + item.text + '</span>';
                    breadcrumbList.appendChild(separator);
                });
            }
        };
    }  

    
    /**
     * Esconde a tela de carregamento
     */
    hideLoadingScreen() {
        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen) {
            setTimeout(() => {
                loadingScreen.classList.add('hidden');
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                }, 500);
            }, 100);
        }
    }
    
    /**
     * Configura event listeners globais
     */
    setupEventListeners() {
        // Lazy loading para imagens
        this.setupLazyLoading();
        
        // Smooth scrolling para links internos
        this.setupSmoothScrolling();
        
        // Resize handler
        window.addEventListener('resize', Utils.debounce(() => {
            EventBus.emit('window:resized', {
                width: window.innerWidth,
                height: window.innerHeight
            });
        }, 250));
        
        // Scroll handler
        window.addEventListener('scroll', Utils.throttle(() => {
            EventBus.emit('window:scrolled', {
                scrollY: window.scrollY,
                scrollX: window.scrollX
            });
            
            // Controlar visibilidade do botão "Voltar ao Topo"
            this.handleBackToTopButton();
        }, 100));
        
        // Inicializar botão "Voltar ao Topo"
        this.initBackToTopButton();
    }
    
    /**
     * Inicializa o botão "Voltar ao Topo"
     */
    initBackToTopButton() {
        const backToTopBtn = document.getElementById('backToTop');
        if (backToTopBtn) {
            backToTopBtn.addEventListener('click', () => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
                Logger.info('Voltando ao topo da página');
            });
        }
    }
    
    /**
     * Controla a visibilidade do botão "Voltar ao Topo"
     */
    handleBackToTopButton() {
        const backToTopBtn = document.getElementById('backToTop');
        if (backToTopBtn) {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        }
    }
    
    /**
     * Configura lazy loading
     */
    setupLazyLoading() {
        const images = document.querySelectorAll('img[data-src]');
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
    
    /**
     * Configura smooth scrolling
     */
    setupSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }
}


// ===== FUNÇÃO PARA LOGIN =====
function login() {
    // Esta função pode ser expandida conforme necessário
    window.location.href = '/pages/login/login.html';
}

// ===== FUNÇÃO PARA ATUALIZAR SAUDAÇÃO DO USUÁRIO =====
function updateUserGreeting() {
    // Verificar se há informações do usuário no localStorage
    const userFirstName = localStorage.getItem('userFirstName');
    
    if (userFirstName) {
        // Atualizar o texto de saudação
        const greetingElement = document.getElementById('userGreeting');
        
        if (greetingElement) {
            // Verificar se o elemento é um <a> ou <p>
            if (greetingElement.tagName === 'A') {
                greetingElement.textContent = `Olá ${userFirstName}, bem-vindo!`;
                greetingElement.href = '/pages/minha-conta/index.html';
            } else {
                // Para o elemento <p> na página home
                greetingElement.innerHTML = `Olá ${userFirstName}, bem-vindo! | <a href="#" onclick="logout()" alt="Sair">Sair</a>`;
            }
        }
    }
}

// ===== FUNÇÃO DE LOGOUT =====
function logout() {
    console.log('logout chamado');
    
    // Remover informações do usuário do localStorage
    localStorage.removeItem('userFirstName');
    console.log('Nome removido do localStorage');
    
    // Atualizar a saudação
    const greetingElement = document.getElementById('userGreeting');
    if (greetingElement) {
        // Verificar se o elemento é um <a> ou <p>
        if (greetingElement.tagName === 'A') {
            greetingElement.textContent = 'Olá Visitante, identifique-se aqui';
            greetingElement.href = '/pages/login/login.html';
            console.log('Atualizado elemento <a> para visitante');
        } else {
            // Para o elemento <p> na página home
            greetingElement.innerHTML = 'Olá Visitante, identifique-se <a href="/pages/login/login.html" alt="Tela de Login">aqui</a> ou <a href="/pages/registro/index.html" alt="Tela de Registro">registre-se</a>';
            console.log('Atualizado elemento <p> para visitante');
        }
    }
    
    // Redirecionar para a página inicial
    window.location.href = '/pages/home/index.html';
}

// ===== FUNÇÃO PARA LOGIN =====
function login() {
    // Esta função pode ser expandida conforme necessário
    window.location.href = '/pages/login/login.html';
}

// ===== FUNÇÃO PARA VISUALIZAR DETALHES DO PRODUTO =====
function viewProduct(category, brand, id) {
    // Esta função pode ser expandida para carregar dados dinamicamente
    // Por enquanto, redireciona para a página de produto com parâmetros
    const params = new URLSearchParams({
        category: category,
        brand: brand,
        id: id
    });
    window.location.href = `/pages/produto/produto.html?${params.toString()}`;
}

// ===== INICIALIZAÇÃO =====
document.addEventListener('DOMContentLoaded', () => {
    // Inicializar aplicação
    window.app = new OdontoMasterApp();
    window.app.init();
    
    // Sempre iniciar como deslogado por padrão, a menos que o usuário faça login explicitamente
    const isLoggedIn = localStorage.getItem('isLoggedIn');                             
                        
   if (isLoggedIn === 'true') {                                      
       // Apenas manter o estado de login se o usuário tiver feito login explicitamente na sessão atual                        
        updateUserGreeting();                                                          
     } else {                                                                           
        // Limpar qualquer dado de sessão que possa estar armazenado                          
        localStorage.removeItem('userFirstName');  
        localStorage.removeItem('userId');
        localStorage.removeItem('userFullName');
        localStorage.removeItem('userEmail');
        localStorage.removeItem('userCpf');
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('userAddresses');    

    // Update greeting to show as logged out
    updateUserGreeting();
     }
});

// Teste rápido para verificar se as funções estão disponíveis
if (typeof window !== 'undefined') {
    window.testUserGreeting = function() {
        const name = localStorage.getItem('userFirstName');
        if (name) {
            console.log('Usuário logado:', name);
        } else {
            console.log('Nenhum usuário logado');
        }
    };
}

// ===== EXPORTAÇÕES PARA DESENVOLVIMENTO =====
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        OdontoMasterApp,
        CONFIG,
        Utils,
        Logger,
        EventBus,
        Storage,
        CookieManager,
        NotificationSystem,
        ShoppingCart,
        SearchSystem,
        MobileMenu,
        Carousel,
        MegaMenu,
        AnimationManager,
        PerformanceMonitor
    };
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { OdontoMasterApp, CONFIG, Utils, Logger, EventBus, Storage, CookieManager, NotificationSystem, ShoppingCart, SearchSystem, MobileMenu, Carousel, MegaMenu, AnimationManager, PerformanceMonitor };
}