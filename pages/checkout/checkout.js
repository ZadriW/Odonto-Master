// ===== REFINED CHECKOUT PAGE FUNCTIONALITY =====

// Carregar o banco de dados de produtos antes de qualquer operação
document.addEventListener('DOMContentLoaded', function() {
  // Verificar se o app principal já está inicializado (pode ter vindo de outros scripts)
  if (!window.app) {
    // Se não estiver inicializado, criar uma instância simplificada
    window.app = {
      productDB: {
        products: {},
        // Função para obter produto
        getProduct(productId) {
          // Em ambiente de checkout, buscar do localStorage ou carregar dados básicos
          const allProducts = {
            'prod1': { id: 'prod1', name: 'Kit Clareamento Dental Whiteness HP', price: 18990, discount: 27, image: '/images/clareador-whiteness.png', category: 'Clareamento Dental', brand: 'Whiteness' },
            'prod2': { id: 'prod2', name: 'Resina Composta Z350 XT - Solventum', price: 29900, discount: 15, image: '/images/resina-composta.png', category: 'Resina Composta', brand: 'Solventum' },
            'prod3': { id: 'prod3', name: 'Anestésico Mepivalem 3%', price: 22900, discount: 30, image: '/images/anestesico.png', category: 'Anestésico', brand: 'Mepivalem' },
            'prod4': { id: 'prod4', name: 'Broca Carbide FG 245', price: 1450, discount: 10, image: '/images/broca.png', category: 'Broca', brand: 'Carbide' },
            'prod5': { id: 'prod5', name: 'Fotopolimerizador LED Radii Plus', price: 390000, discount: 20, image: '/images/fotopolimerizador.png', category: 'Fotopolimerizador', brand: 'Radii' },
            'prod6': { id: 'prod6', name: 'Cimento Endontico Pull Fill Kit - Biodinamica', price: 4990, discount: 18, image: 'https://odontomaster.fbitsstatic.net/img/p/cimento-endodontico-pulp-fill-kit-biodinamica-74784/266174.jpg?w=320&h=320&v=202508291601&qs=ignore', category: 'Cimento', brand: 'Biodinamica' },
            'prod7': { id: 'prod7', name: 'Lima Manual Kendo K-File - VDW', price: 3540, discount: 25, image: 'https://odontomaster.fbitsstatic.net/img/p/lima-manual-kendo-k-file-vdw-74629/265800-1.jpg?w=320&h=320&v=202508271736&qs=ignore', category: 'Endodontia', brand: 'VDW' },
            'prod8': { id: 'prod8', name: 'Clareador Whiteness Perfect 22% - FGM', price: 7990, discount: 12, image: 'https://odontomaster.fbitsstatic.net/img/p/clareador-whiteness-perfect-22-fgm-72016/260704.jpg?w=320&h=320&v=no-change&qs=ignore', category: 'Clareamento Dental', brand: 'FGM' },
            'prod9': { id: 'prod9', name: 'Autoclave Vitale Class 12L - Cristófoli', price: 7990, discount: 10, image: 'https://odontomaster.fbitsstatic.net/img/p/autoclave-vitale-class-12l-cristofoli-70901/258917.jpg?w=420&h=420&v=no-change&qs=ignore', category: 'Autoclave', brand: 'Cristófoli' },
            'prod10': { id: 'prod10', name: 'Autoclave Vitale Class 21L - Cristófoli', price: 1937, discount: 15, image: 'https://odontomaster.fbitsstatic.net/img/p/autoclave-vitale-class-12l-cristofoli-70901/258917.jpg?w=420&h=420&v=no-change&qs=ignore', category: 'Autoclave', brand: 'Cristófoli' },
            'prod11': { id: 'prod11', name: 'Lima Reciprocante Reciproc - VDW', price: 40990, discount: 22, image: 'https://odontomaster.fbitsstatic.net/img/p/lima-reciprocante-reciproc-vdw-70872/258882.jpg?w=320&h=320&v=no-change&qs=ignore', category: 'Endodontia', brand: 'VDW' },
            'prod12': { id: 'prod12', name: 'Resina TPH Spectrum - Dentsply', price: 2370, discount: 18, image: 'https://odontomaster.fbitsstatic.net/img/p/resina-tph-spectrum-dentsply-73652/264075.jpg?w=320&h=320&v=no-change&qs=ignore', category: 'Resina Composta', brand: 'Dentsply' },
            'prod13': { id: 'prod13', name: 'Kit Braquete de Aço Advanced Series Roth 022 - Orthometric', price: 2190, discount: 15, image: 'https://odontomaster.fbitsstatic.net/img/p/kit-braquete-de-aco-advanced-series-roth-022-orthometric-73253/263482.jpg?w=320&h=320&v=202501241014&qs=ignore', category: 'Ortodontia', brand: 'Orthometric' },
            'prod14': { id: 'prod14', name: 'Ficha Clínica Simples - Preven', price: 41172, discount: 10, image: 'https://odontomaster.fbitsstatic.net/img/p/ficha-clinica-simples-preven-74761/266131.jpg?w=320&h=320&v=202508201217&qs=ignore', category: 'Material de Escritório', brand: 'Preven' },
            'prod15': { id: 'prod15', name: 'Clareador Whiteness Perfect 10% - FGM', price: 7990, discount: 25, image: 'https://odontomaster.fbitsstatic.net/img/p/clareador-whiteness-perfect-10-fgm-71914/260561.jpg?w=320&h=320&v=202502211159&qs=ignore', category: 'Clareamento Dental', brand: 'FGM' },
            'prod16': { id: 'prod16', name: 'Localizador Apical Farominal E-Pex Pró - MK Life', price: 15590, discount: 20, image: 'https://odontomaster.fbitsstatic.net/img/p/clareador-whiteness-hp-blue-calcium-35-mini-kit-fgm-72121/260864-1.jpg?w=320&h=320&v=202506141130&qs=ignore', category: 'Endodontia', brand: 'MK Life' },
            'prod17': { id: 'prod17', name: 'Kit Braquete Metálico 100 Casos', price: 890, discount: 15, image: 'https://odontomaster.fbitsstatic.net/img/p/fotopolimerizador-emitter-a-fit-com-ponteira-shuster-73208/263424.jpg?w=420&h=420&v=202502031032&qs=ignore', category: 'Ortodontia', brand: 'Diversos' },
            'prod18': { id: 'prod18', name: 'Restaurador Provisório Fill Temp 25g - Biodinâmica', price: 185000, discount: 18, image: 'https://odontomaster.fbitsstatic.net/img/p/restaurador-provisorio-fill-temp-25g-biodinamica-74783/266173.jpg?w=320&h=320&v=202508291544&qs=ignore', category: 'Materiais Restauradores', brand: 'Biodinâmica' },
            'prod19': { id: 'prod19', name: 'Kit Corredor de Classe II Iceram Clear Distalizer 23mm/25mm/27mm - Orthometric', price: 25000, discount: 12, image: 'https://odontomaster.fbitsstatic.net/img/p/kit-corretor-de-classe-ii-iceram-clear-distalizer-23mm-25mm-27mm-orthometric-74765/266136.jpg?w=420&h=420&v=202508201212&qs=ignore', category: 'Ortodontia', brand: 'Orthometric' },
            'prod20': { id: 'prod20', name: 'Clareador Whiteness HP Blue Calcium 35% Mini Kit - FGM', price: 12500, discount: 20, image: '/images/cimento-resina.png', category: 'Clareamento Dental', brand: 'FGM' },
            'prod21': { id: 'prod21', name: 'Fotopolimerizador Emitter a Fit com Ponteira - SHUSTER', price: 8900, discount: 15, image: '/images/fresa-diamantada.png', category: 'Fotopolimerização', brand: 'SHUSTER' },
            'prod22': { id: 'prod22', name: 'Clareador Whiteness HP Maxx 35% 1PAC - FGM', price: 285000, discount: 10, image: '/images/raio-x-portatil.png', category: 'Clareamento Dental', brand: 'FGM' },
            'prod23': { id: 'prod23', name: 'Clareador Whiteness HP Maxx 35% Mini Kit - FGM', price: 45000, discount: 25, image: '/images/lampada-extra.png', category: 'Clareamento Dental', brand: 'FGM' },
            'prod24': { id: 'prod24', name: 'Clareador Whiteness Perfect 16% - FGM', price: 1250, discount: 10, image: '/images/moldagem-facial.png', category: 'Clareamento Dental', brand: 'FGM' },
            'prod25': { id: 'prod25', name: 'Clareador Potenza Bianco Pro 35% H202 - PHS', price: 850000, discount: 12, image: '/images/unidade-odontologica.png', category: 'Clareamento Dental', brand: 'PHS' },
            'equip1': { id: 'equip1', name: 'Motor Endodôntico E-Connect Pro - MK Life', price: 850000, discount: 12, image: '/images/motor-endodontico.png', category: 'Equipamentos', brand: 'MK Life' },
            'equip2': { id: 'equip2', name: 'Fotopolimerizador Emitter a Fit com Ponteira - SHUSTER', price: 850000, discount: 12, image: '/images/fotopolimerizador-emitter.png', category: 'Equipamentos', brand: 'SHUSTER' },
            'equip3': { id: 'equip3', name: 'Autoclave Vitale Class 12L - Cristófoli', price: 850000, discount: 12, image: '/images/autoclave-12l.png', category: 'Equipamentos', brand: 'Cristófoli' },
            'equip4': { id: 'equip4', name: 'Autoclave Vitale Class 21L - Cristófoli', price: 850000, discount: 12, image: '/images/autoclave-21l.png', category: 'Equipamentos', brand: 'Cristófoli' },
            'equip5': { id: 'equip5', name: 'Localizador Apical Farominal E-Pex Pró - MK Life', price: 850000, discount: 12, image: '/images/localizador-apical.png', category: 'Equipamentos', brand: 'MK Life' },
            'equip6': { id: 'equip6', name: 'Kit Acadêmico Prime - GNATUS', price: 850000, discount: 12, image: '/images/kit-academico.png', category: 'Equipamentos', brand: 'GNATUS' },
            'equip7': { id: 'equip7', name: 'Fotopolimerizador Led Grand Valo Sem Fio Black - Ultradent', price: 850000, discount: 12, image: '/images/fotopolimerizador-grand-valo.png', category: 'Equipamentos', brand: 'Ultradent' },
           
          };
          return allProducts[productId] || null;
        }
      }
    };
  }
});

// Get cart data from localStorage using the existing cart system
function getCartData() {
  try {
    const cart = localStorage.getItem('odonto_cart');
    return cart ? JSON.parse(cart) : [];
  } catch (error) {
    console.error('Error reading cart from localStorage:', error);
    return [];
  }
}

// Save cart data to localStorage
function saveCartData(cart) {
  try {
    localStorage.setItem('odonto_cart', JSON.stringify(cart));
    // Dispatch event to notify other parts of the app
    window.dispatchEvent(new CustomEvent('cartUpdated', { detail: cart }));
    return true;
  } catch (error) {
    console.error('Error saving cart to localStorage:', error);
    return false;
  }
}

// Get cart data
let cartData = getCartData();

// Coupon data (in a real application, this would come from an API)
let appliedCoupon = null;
const coupons = {
  "DESC10": { discount: 10, type: "percentage" },
  "DESC20": { discount: 20, type: "percentage" },
  "DESC50": { discount: 50, type: "fixed" }
};

// DOM Elements
const cartItemsContainer = document.getElementById('cartItems');
const subtotalElement = document.getElementById('subtotal');
const discountLine = document.getElementById('discountLine');
const discountAmount = document.getElementById('discountAmount');
const totalAmount = document.getElementById('totalAmount');
const couponInput = document.getElementById('couponInput');
const applyCouponBtn = document.getElementById('applyCouponBtn');
const continueShoppingBtn = document.getElementById('continueShoppingBtn');
const finalizeOrderBtn = document.getElementById('finalizeOrderBtn');

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
  renderCartItems();
  updateCartTotals();
  
  // Event listeners
  applyCouponBtn.addEventListener('click', applyCoupon);
  continueShoppingBtn.addEventListener('click', continueShopping);
  finalizeOrderBtn.addEventListener('click', finalizeOrder);
  
  // Listen for cart updates from other pages
  window.addEventListener('cartUpdated', function(event) {
    cartData = event.detail || getCartData() || [];
    renderCartItems();
    updateCartTotals();
  });
});

// Render cart items
function renderCartItems() {
  if (!cartItemsContainer) return;
  
  if (!cartData || cartData.length === 0) {
    cartItemsContainer.innerHTML = '<p>Seu carrinho está vazio.</p>';
    return;
  }
  
  cartItemsContainer.innerHTML = cartData.map(item => {
    // Usar price_current se disponível, senão usar o campo price antigo para compatibilidade
    const itemPrice = item.price_current || item.price;
    let priceInReais = (itemPrice > 1000) ? itemPrice / 100 : itemPrice;
    
    // Verificar se temos informações de parcelamento no item
    let installmentInfo = '';
    if (item.installments) {
      const installmentCount = item.installments.count || 10;
      const installmentValue = item.installments.value || (priceInReais / installmentCount);
      installmentInfo = `${installmentCount}x sem juros de R$ ${installmentValue.toFixed(2).replace('.', ',')}`;
    } else {
      // Usar padrão de 10x se não houver informações específicas
      installmentInfo = `10x sem juros de R$ ${(priceInReais/10).toFixed(2).replace('.', ',')}`;
    }
    
    // Obter informações do produto do banco de dados para usar imagem real
    const productInfo = window.app ? window.app.productDB.getProduct(item.id) : null;
    const productImage = productInfo ? productInfo.image : 
                        (item.image || `https://placehold.co/60x60/e8ece9/333?text=${encodeURIComponent(item.name.substring(0, 15))}`);
    
    const brand = productInfo ? productInfo.brand : 'Marca não especificada';
    
    return `
      <div class="cart-item">
        <div class="cart-item__image">
          <img src="${productImage}" alt="${item.name}" onerror="this.src='https://placehold.co/60x60/e8ece9/333?text=Produto';">
        </div>
        <div class="cart-item__info">
          <h4 class="item-name">${item.name}</h4>
          <div class="item-brand">${brand}</div>
          <div class="item-quantity">Quantidade: ${item.quantity}</div>
          <div class="item-installment">${installmentInfo}</div>
        </div>
        <div class="item-price">
          R$ ${priceInReais.toFixed(2).replace('.', ',')}
        </div>
      </div>
    `;
  }).join('');
}

// Update item quantity
function updateQuantity(itemId, change) {
  const item = cartData.find(item => item.id == itemId);
  if (item) {
    const newQuantity = item.quantity + change;
    
    // Update quantity in cart
    if (newQuantity <= 0) {
      // Remove item if quantity is 0 or less
      removeItem(itemId);
    } else {
      // Update quantity
      item.quantity = newQuantity;
      saveCartData(cartData);
    }
    
    // Re-render the cart and update totals
    renderCartItems();
    updateCartTotals();
  }
}

// Remove item from cart
function removeItem(itemId) {
  cartData = cartData.filter(item => item.id != itemId);
  saveCartData(cartData);
  
  // Re-render the cart and update totals
  renderCartItems();
  updateCartTotals();
}

// Apply coupon
function applyCoupon() {
  const couponCode = couponInput.value.trim().toUpperCase();
  
  if (coupons[couponCode]) {
    appliedCoupon = {
      code: couponCode,
      ...coupons[couponCode]
    };
    
    // Save applied coupon to localStorage
    localStorage.setItem('odonto_applied_coupon', JSON.stringify(appliedCoupon));
    
    alert(`Cupom "${couponCode}" aplicado com sucesso!`);
    updateCartTotals();
  } else {
    alert('Cupom inválido. Por favor, verifique o código e tente novamente.');
  }
}

// Update cart totals
function updateCartTotals() {
  // Calculate subtotal
    let subtotal = 0;
    if (cartData && cartData.length > 0) {
      cartData.forEach(item => {
        // Usar price_current se disponível, senão usar o campo price antigo para compatibilidade
        const itemPrice = item.price_current || item.price;
        const priceInReais = (itemPrice > 1000) ? itemPrice / 100 : itemPrice;
        subtotal += priceInReais * item.quantity;
      });
    }
  
  // Calculate discount
  let discount = 0;
  if (appliedCoupon) {
    if (appliedCoupon.type === "percentage") {
      discount = subtotal * (appliedCoupon.discount / 100);
    } else if (appliedCoupon.type === "fixed") {
      discount = appliedCoupon.discount;
    }
  }
  
  // Calculate total
  const total = subtotal - discount;
  
  // Update the DOM
  subtotalElement.textContent = `R$ ${subtotal.toFixed(2).replace('.', ',')}`;
  
  if (appliedCoupon) {
    discountLine.style.display = 'flex';
    discountAmount.textContent = `- R$ ${discount.toFixed(2).replace('.', ',')}`;
    
    // Save applied coupon to localStorage
    localStorage.setItem('odonto_applied_coupon', JSON.stringify(appliedCoupon));
  } else {
    discountLine.style.display = 'none';
  }
  
  totalAmount.innerHTML = `<strong>R$ ${total.toFixed(2).replace('.', ',')}</strong>`;
}

// Finalize order
function finalizeOrder() {
  if (!cartData || cartData.length === 0) {
    alert('Seu carrinho está vazio. Adicione itens antes de finalizar o pedido.');
    return;
  }
  
  // In a real implementation, this would submit the order
  alert('Pedido finalizado com sucesso!');
  // Clear cart after order is finalized
  saveCartData([]);
  // Redirect to confirmation page
  // window.location.href = '/pages/confirmacao/confirmacao.html';
}

// Make addItemToCart globally accessible for testing
window.addItemToCart = function(item) {
  // Check if item already exists in cart
  const existingItem = cartData.find(cartItem => cartItem.id == item.id);
  
  if (existingItem) {
    // If item exists, increase quantity
    existingItem.quantity += item.quantity || 1;
  } else {
    // If item doesn't exist, add it to cart
    cartData.push(item);
  }
  
  saveCartData(cartData);
  renderCartItems();
  updateCartTotals();
};