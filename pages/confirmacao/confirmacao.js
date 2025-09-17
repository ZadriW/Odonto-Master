document.addEventListener('DOMContentLoaded', () => {
    // Seleciona os elementos relevantes
    const shippingOptions = document.querySelectorAll('input[name="shipping"]');
    const confirmOrderBtn = document.getElementById('confirm-order-btn');
    const editOrderBtn = document.getElementById('edit-order-btn');
    
    // Verifica se estamos na página correta
    if (!shippingOptions.length) {
        return; // Sai da função se os elementos não existirem
    }
    
    // Adiciona eventos aos botões de envio
    shippingOptions.forEach(option => {
        option.addEventListener('change', updateShippingCost);
    });
    
    // Adiciona eventos aos botões de ação
    if (confirmOrderBtn) {
        confirmOrderBtn.addEventListener('click', confirmOrder);
    }
    
    if (editOrderBtn) {
        editOrderBtn.addEventListener('click', editOrder);
    }
    
    // Função para atualizar o custo de envio
    function updateShippingCost() {
        const selectedOption = document.querySelector('input[name="shipping"]:checked');
        if (!selectedOption) return;
        
        // Valores de frete simulados
        const shippingCosts = {
            standard: 25.00,
            express: 45.00,
            scheduled: 35.00
        };
        
        const selectedValue = selectedOption.value;
        const shippingCost = shippingCosts[selectedValue] || 0;
        
        // Atualiza o valor do frete na interface
        const shippingCostElement = document.getElementById('shipping-cost');
        if (shippingCostElement) {
            shippingCostElement.textContent = `R$ ${shippingCost.toFixed(2).replace('.', ',')}`;
        }
        
        // Recalcula o total do pedido
        recalculateOrderTotal(shippingCost);
    }
    
    // Função para recalcular o total do pedido
    function recalculateOrderTotal(shippingCost) {
        // Valores simulados do pedido
        const subtotal = 507.50; // Subtotal fixo para este exemplo
        const discount = 53.44;   // Desconto fixo para este exemplo
        
        const grandTotal = subtotal - discount + shippingCost;
        
        // Atualiza os totais na interface
        const grandTotalElement = document.getElementById('grand-total');
        if (grandTotalElement) {
            grandTotalElement.textContent = `R$ ${grandTotal.toFixed(2).replace('.', ',')}`;
        }
    }
    
    // Função para confirmar o pedido
    function confirmOrder() {
        // Verifica se uma opção de envio foi selecionada
        const selectedOption = document.querySelector('input[name="shipping"]:checked');
        if (!selectedOption) {
            alert('Por favor, selecione uma forma de envio.');
            return;
        }
        
        // Mostra um indicador de carregamento
        const originalText = confirmOrderBtn.innerHTML;
        confirmOrderBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processando...';
        confirmOrderBtn.disabled = true;
        
        // Simula o processo de confirmação do pedido
        setTimeout(() => {
            // Em uma implementação real, aqui você faria uma chamada AJAX para o servidor
            // para processar o pedido
            
            // Para este exemplo, vamos simular uma confirmação bem-sucedida
            alert('Pedido confirmado com sucesso! Você será redirecionado para a página de pagamento.');
            
            // Redireciona para a página de pagamento (simulado)
            // window.location.href = '/pagamento/index.html';
            
            // Restaura o botão
            confirmOrderBtn.innerHTML = originalText;
            confirmOrderBtn.disabled = false;
        }, 2000);
    }
    
    // Função para editar o pedido
    function editOrder() {
        // Confirma se o usuário quer realmente editar o pedido
        if (confirm('Você será redirecionado de volta ao carrinho para editar seu pedido. Deseja continuar?')) {
            // Redireciona para a página do carrinho
            window.location.href = '/pages/carrinho/carrinho.html';
        }
    }
    
    // Inicializa os totais do pedido
    updateShippingCost();
});

// Função para carregar dados do cliente (simulada)
function loadCustomerData() {
    // Em uma implementação real, esses dados viriam de uma API ou do localStorage
    const customerData = {
        name: 'Dr. João Silva Santos',
        document: '123.456.789-00',
        email: 'joao.silva@email.com',
        phone: '(71) 99999-9999',
        address: {
            zipcode: '40000-000',
            street: 'Rua Exemplo',
            number: '123',
            complement: 'Apto 456',
            neighborhood: 'Bairro Exemplo',
            cityState: 'Salvador/BA'
        }
    };
    
    // Preenche os campos com os dados do cliente
    document.getElementById('customer-name').textContent = customerData.name;
    document.getElementById('customer-document').textContent = customerData.document;
    document.getElementById('customer-email').textContent = customerData.email;
    document.getElementById('customer-phone').textContent = customerData.phone;
    document.getElementById('address-zipcode').textContent = customerData.address.zipcode;
    document.getElementById('address-street').textContent = customerData.address.street;
    document.getElementById('address-number').textContent = customerData.address.number;
    document.getElementById('address-complement').textContent = customerData.address.complement;
    document.getElementById('address-neighborhood').textContent = customerData.address.neighborhood;
    document.getElementById('address-city-state').textContent = customerData.address.cityState;
}

// Carrega os dados do cliente quando a página é carregada
document.addEventListener('DOMContentLoaded', loadCustomerData);