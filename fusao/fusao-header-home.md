<script>
    function getCookie_a(cname) {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for(var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }
     function setCookie_c(cname, cvalue, exdays) {
        var d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        var expires = "expires="+d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";domain=.odontomaster.com.br;path=/";
    	
    }

    if ((getCookie_a("_EMAIL_")!="") && (getCookie_a("_CADASTRO_")!="")) {
        
        setCookie_c("_CADASTRO_", "", "1000");
        window.location = "https://checkout.odontomaster.com.br/Fechamento";
        
    }
</script>

<meta name="HandheldFriendly" content="True">
<meta name="MobileOptimized" content="640">
<meta name="viewport" content="initial-scale = 1, maximum-scale = 1, user-scalable = no">


<style>
@@media (min-width: 576px) {
    .container {
        max-width: 100vw!important;
    }
}
section.fbits-section-home.fbits-banner-centro-home img {
    margin: 0 auto!important;
}
    div#loading {
        background: #fff;
        height: 100vh;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        z-index: 99999;
    }
    #loading {
        background: #fff!important;
        background-position: center!important;
        background-repeat: no-repeat!important;
    }
    span.minicart-txt-itens {
        display: none;
    }
    
    /* Corrige duplicação do dropdown do carrinho */
    .mini-cart .topCartContent {
        display: none !important;
    }
    
    /* Garante que apenas o wrapper do Wake Commerce seja visível */
    .mini-cart .minicart-itens-wrapper {
        display: block !important;
    }
    
    /* Oculta elementos duplicados gerados pelo Wake Commerce */
    .mini-cart .minicart-itens-wrapper .topCartContent,
    .mini-cart .minicart-itens-wrapper .block-content,
    .mini-cart .minicart-itens-wrapper .inner-wrapper {
        display: none !important;
    }
    
    /* Força exibição apenas do conteúdo principal do carrinho */
    .mini-cart .minicart-itens-wrapper > *:not(.topCartContent):not(.block-content):not(.inner-wrapper) {
        display: block !important;
    }
    
    /* Dropdown do carrinho vazio */
    .mini-cart {
        position: relative;
    }
    
    .cart-dropdown {
        position: absolute;
        top: 100%;
        right: 0;
        background: #fff;
        border: 1px solid #ddd;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        min-width: 280px;
        z-index: 1000;
        display: none !important;
        opacity: 0;
        transform: translateY(-10px);
        transition: all 0.3s ease;
        visibility: hidden;
    }
    
    .cart-dropdown.show {
        display: block !important;
        opacity: 1;
        transform: translateY(0);
        visibility: visible;
    }
    
    .cart-dropdown-content {
        padding: 20px;
        text-align: center;
    }
    
    .cart-empty-message {
        color: #666;
        font-size: 14px;
        margin-bottom: 15px;
        line-height: 1.4;
    }
    
    .cart-empty-icon {
        font-size: 48px;
        color: #ccc;
        margin-bottom: 15px;
    }
    
    .cart-dropdown-actions {
        margin-top: 15px;
    }
    .header-container.type2 .main-nav .menu-wrapper, .header-container.type3 .main-nav, .header-container.type3.header-newskin .main-nav, .header-container.type19 .main-nav, .header-container.type20 .main-nav, .header-container.type4.header-newskin .main-nav .menu-wrapper, .header-container.type4 .main-nav .menu-wrapper, .header-container.type9 .main-nav .menu-wrapper, .header-container.type10 .header-wrapper, .header-container.type10.header-newskin .header-wrapper, .header-container.type3.sticky-header .header-wrapper, .header-container.type3.header-newskin.sticky-header .header-wrapper, .header-container.type20.sticky-header .header-wrapper, .header-container.type4.header-newskin.sticky-header .header-wrapper, .header-container.type4.sticky-header .header-wrapper, .header-container.type10.sticky-header .header-wrapper, .header-container.type20 .header-wrapper {
        background-color: #1c5787;
    }
    .header-container.type4 .main-nav {
        background: #1c5787!important;
    }
    
    @@media (min-width: 1280px) {
        .main-nav h1.logo img {
            max-width: 249px!important;
        }
        .main-nav h1 {
            top: -85px!important;
            max-width: 250px!important;
        }
        .main-nav .container {
            padding-left: 0!important;
        }
        li.item.raiz.ultimo.item0.menu-geral.estudante {
            float: none;
        }
    }
   
    @@media (max-width:990px){
        .header-container.type4.header-newskin .menu-icon {
            left: 7.1em!important;
        }
    }
    body li.item.raiz.item0.estudante {
        background: url(https://recursos.odontomaster.com.br/i/odonto/area-estudante.svg) #3434E3!important;
    }
</style>

<div id="loading">
    
</div>
<a name="topo"></a>

<div class="wrapper">
    <div class="page">

<div class="header-container type4 header-newskin">
    <div class="top-links-container">
        <div class="top-links container">
                        
     <span class="textleft"><b>ATENÇÃO!</b> Os produtos desse site são restritos à Dentistas com CRO, Clínicas Odontológicas e Estudantes de Graduação em Odontologia.<a></a></span>    
             <span class="textright">@FBITSLogin.Add()</span>  
            
        </div>
    </div>
    <div class="header container">
                <h1 class="logo"><a href="/" class="logo"><img src="https://recursos.odontomaster.com.br/i/logo_odonto.png"></a></h1>
                <div class="cart-area">
            <div class="custom-block">
                <span style="color:#787d7f;display:block;">TELEVENDAS
                    <b style="color:#606669;font-size:16px;font-weight:600;display:block;line-height:20px;">(71) 3173-7300</b>
                </span></div>            
                
                <div class="icoatendimento">
                    <div class="dropatend">
                         <b>Pelos Telefones:</b>
				         <p>(71) 3173-7300 - Salvador/BA</p>
				         <p>(75) 3322-8498 - Feira de Santana/BA</p>
				         <p>(79) 3085-0710 - Aracaju/SE</p>
				         
				         <b>Pelo WhatsApp:</b>
				         <p>(71) 98867-0812</p>
				         <p>(71) 99401-9924</p>
				         
				         <b>Horário de Atendimento:</b>
				         <p>Segunda a Sexta das 08:00 às 18:00</p>
				         <p>Sábados 08:00 às 14:00</p>
				         
				         
				    </div>
                </div>
                
                <style>
                    .dropatend {
                        display:none;
                    }
                </style>
                
                <div class="icoconta">
                    
                </div>
                
                <div class="mini-cart">
                    <a href="javascript:void(0)" class="mybag-link">
                        <i class="icon-mini-cart"></i>
                        <span class="cart-info">
                            <span class="cart-qty">0</span>
                            <span>Item(s)</span>
                        </span>
                    </a>
                    <div class="minicart-itens-wrapper">
                        @FBITSCarrinho.Add()
                    </div>
                    
                    <!-- Dropdown do carrinho vazio -->
                    <div class="cart-dropdown" id="cartEmptyDropdown">
                        <div class="cart-dropdown-content">
                            <div class="cart-empty-icon">
                                <i class="icon-mini-cart"></i>
                            </div>
                            <div class="cart-empty-message">
                                Sua sacola de compras está vazia
                            </div>
                        </div>
                    </div>
                </div>
        </div>
        <div class="search-area">
            <a href="javascript:void(0);" class="search-icon"><i class="icon-search"></i></a>
             <form id="searchFormHeader" autocomplete="off" method="get" action="/busca" itemprop="potentialAction" itemscope="" itemtype="http://schema.org/SearchAction">
                  <div class="form-search ">
        
                @*<input id="search" type="text" name="q" class="input-text" autocomplete="off">*@
                
                <div class="headerSearch " itemscope="" itemtype="http://schema.org/WebSite">
                <meta itemprop="url" content="https://www.odontomaster.com.br/">
                  <meta itemprop="target" content="https://www.odontomaster.com.br/Busca?busca={busca}">
            
            
                    <span class="hide">
                        <button class="btSearch greenBack hide" type="button" id="btnBusca">
                          buscar <i class="icon isearch"></i>
                        </button>
                       @* @FBITSSearch.Add() *@
                    </span>
                    <input type="text" value="" class="inputSearch ac_input search" id="txtBuscaPrincipal" itemprop="query-input" name="busca" data-placeholder="Busque aqui.." autocomplete="off" placeholder="Busque aqui..">
            
            
                
              </div>
                
               @* <select id="cat" name="cat">
            
            
                </select>*@
                
                <script>
                    $("#cat").html($("#escolhaFrabricante").html());
                    
                    // Sincronizar quantidade do carrinho e controlar dropdown
                    function atualizarCarrinho(){
                        console.log("🔄 Atualizando contador do carrinho...");
                        
                        var quantidadeTotal = 0;
                        
                        try {
                            // Tentar acessar a quantidade total do Wake Commerce
                            if (typeof window.Fbits !== 'undefined' && window.Fbits.Carrinho) {
                                var qtdWake = window.Fbits.Carrinho.QuantidadeTotal || 0;
                                if (qtdWake > 0) {
                                    quantidadeTotal = qtdWake;
                                    console.log("📊 Quantidade do Wake Commerce:", quantidadeTotal);
                                }
                            }
                        } catch(e) {
                            console.log("⚠️ Wake Commerce não disponível:", e);
                        }
                        
                        // Método 2: Somar quantidades de todos os campos de quantidade
                        if (quantidadeTotal === 0) {
                            // Buscar em todos os possíveis seletores de quantidade
                            var seletoresQuantidade = [
                                ".minicart-itens-wrapper .qtdCarrinho",
                                ".minicart-itens-wrapper input[type='number']",
                                ".minicart-itens-wrapper .quantidade",
                                ".minicart-itens-wrapper .qty",
                                ".minicart-itens-wrapper .cart-quantity",
                                ".fbits-responsive-carrinho-item .qtdCarrinho",
                                ".fbits-responsive-carrinho-item input[type='number']"
                            ];
                            
                            seletoresQuantidade.forEach(function(seletor) {
                                $(seletor).each(function() {
                                    var valor = $(this).val() || $(this).text() || $(this).html();
                                    var qtdItem = parseInt(valor.toString().replace(/[^\d]/g, '')) || 0;
                                    if (qtdItem > 0) {
                                        quantidadeTotal += qtdItem;
                                        console.log("📦 Encontrado via", seletor, "- Quantidade:", qtdItem);
                                    }
                                });
                            });
                        }
                        
                        // Método 3: Buscar quantidade total em elementos específicos do Wake
                        if (quantidadeTotal === 0) {
                            var elementosQuantidade = [
                                ".minicart-qtde-itens",
                                ".cart-qty",
                                ".minicart-total-items",
                                ".cart-total-quantity",
                                ".fbits-carrinho-quantidade-total"
                            ];
                            
                            elementosQuantidade.forEach(function(seletor) {
                                var elemento = $(seletor).first();
                                if (elemento.length > 0) {
                                    var texto = elemento.text().trim();
                                    var qtd = parseInt(texto.replace(/[^\d]/g, '')) || 0;
                                    if (qtd > 0) {
                                        quantidadeTotal = qtd;
                                        console.log("📊 Quantidade encontrada em", seletor, ":", qtd);
                                    }
                                }
                            });
                        }
                        
                        // Método 4: Contar itens e somar suas quantidades individuais
                        if (quantidadeTotal === 0) {
                            $(".minicart-itens-wrapper .fbits-responsive-carrinho-item").each(function() {
                                var item = $(this);
                                var qtdItem = 1; // Default
                                
                                // Tentar encontrar quantidade do item
                                var qtdElement = item.find('.qtdCarrinho, input[type="number"], .quantidade').first();
                                if (qtdElement.length > 0) {
                                    var valor = qtdElement.val() || qtdElement.text() || qtdElement.html();
                                    qtdItem = parseInt(valor.toString().replace(/[^\d]/g, '')) || 1;
                                }
                                
                                quantidadeTotal += qtdItem;
                                console.log("📦 Item do carrinho - Quantidade:", qtdItem);
                            });
                        }
                        
                        // Método 5: Fallback - contar apenas itens únicos
                        if (quantidadeTotal === 0) {
                            var itensUnicos = $(".minicart-itens-wrapper .fbits-responsive-carrinho-item").length;
                            if (itensUnicos > 0) {
                                quantidadeTotal = itensUnicos;
                                console.log("📊 Fallback - Itens únicos:", quantidadeTotal);
                            }
                        }
                        
                        // Garantir que seja um número válido
                        if (isNaN(quantidadeTotal) || quantidadeTotal < 0) {
                            quantidadeTotal = 0;
                        }
                        
                        // Atualizar contador visual
                        $(".cart-qty").text(quantidadeTotal);
                        
                        // Controlar dropdown do carrinho vazio
                        if (quantidadeTotal === 0) {
                            $(".cart-empty").hide();
                            
                    } else {
                            $(".cart-empty").show();
                            // Esconder dropdown do carrinho vazio
                            $("#cartEmptyDropdown").removeClass("show");
                        }
                        
                        console.log("✅ Carrinho atualizado - Quantidade total:", quantidadeTotal);
                        return quantidadeTotal;
                    }
                    
                    $(document).ready(function(){
                        // Garantir que o dropdown esteja escondido no carregamento
                        $("#cartEmptyDropdown").removeClass("show");
                        
                        // Interceptar e corrigir atualizações do Wake Commerce
                        function interceptarWakeCommerce() {
                            // Sobrescrever função de atualização do Wake se existir
                            if (typeof window.Fbits !== 'undefined' && window.Fbits.Carrinho) {
                                var originalUpdate = window.Fbits.Carrinho.Atualizar;
                                if (originalUpdate) {
                                    window.Fbits.Carrinho.Atualizar = function() {
                                        originalUpdate.apply(this, arguments);
                                        setTimeout(atualizarCarrinho, 100);
                                    };
                                }
                            }
                            
                            // Interceptar mudanças nos elementos de quantidade
                            $('.minicart-itens-wrapper').on('change', 'input[type="number"], .qtdCarrinho', function() {
                                setTimeout(atualizarCarrinho, 200);
                            });
                            
                            // Interceptar cliques nos botões de quantidade
                            $('.minicart-itens-wrapper').on('click', '.btn-number, .qty-btn', function() {
                                setTimeout(atualizarCarrinho, 300);
                            });
                        }
                        
                        // Executar interceptação
                        interceptarWakeCommerce();
                        
                        // Atualizar após carregar
                        setTimeout(atualizarCarrinho, 500);
                        
                        // Atualizar quando hover no carrinho
                        $(".mini-cart").on("mouseenter", function(){
                            setTimeout(function(){
                                var quantidadeTotal = atualizarCarrinho();
                                
                                // Mostrar dropdown quando entrar no carrinho (se vazio)
                                if (quantidadeTotal === 0) {
                                    $("#cartEmptyDropdown").addClass("show");
                                }
                            }, 100);
                        });
                        
                        // Esconder dropdown quando sair do carrinho
                        $(".mini-cart").on("mouseleave", function(){
                            setTimeout(function(){
                                $("#cartEmptyDropdown").removeClass("show");
                            }, 300);
                        });
                        
                        // Atualizar carrinho quando houver mudanças via AJAX
                   $(document).ajaxComplete(function() {
                            setTimeout(atualizarCarrinho, 200);
                        });
                        
                        // Detectar mudanças específicas no carrinho
                        $(document).on('cartUpdated', function() {
                            console.log("🛒 Evento cartUpdated detectado");
                            setTimeout(atualizarCarrinho, 300);
                        });
                        
                        // Observar mudanças no DOM do carrinho
                        if (typeof MutationObserver !== 'undefined') {
                            var carrinhoObserver = new MutationObserver(function(mutations) {
                                var shouldUpdate = false;
                                mutations.forEach(function(mutation) {
                                    if (mutation.type === 'childList' || mutation.type === 'characterData') {
                                        var target = $(mutation.target);
                                        if (target.closest('.minicart-itens-wrapper').length > 0) {
                                            shouldUpdate = true;
                                        }
                                    }
                                });
                                
                                if (shouldUpdate) {
                                    console.log("👀 Mudança detectada no carrinho via MutationObserver");
                                    setTimeout(atualizarCarrinho, 200);
                                }
                            });
                            
                            // Observar mudanças no wrapper do carrinho
                            var carrinhoWrapper = document.querySelector('.minicart-itens-wrapper');
                            if (carrinhoWrapper) {
                                carrinhoObserver.observe(carrinhoWrapper, {
                                    childList: true,
                                    subtree: true,
                                    characterData: true
                                });
                            }
                        }
                        
                        // Atualizar carrinho periodicamente (fallback)
                        setInterval(function() {
                            atualizarCarrinho();
                        }, 5000);
                        
                        // Função para forçar correção do contador
                        function forcarCorrecaoContador() {
                            console.log("🔧 Forçando correção do contador...");
                            
                            // Buscar todos os elementos que podem conter quantidade
                            var todosElementos = $('.minicart-itens-wrapper *');
                            var quantidadeReal = 0;
                            
                            todosElementos.each(function() {
                                var elemento = $(this);
                                var texto = elemento.text() || elemento.val() || elemento.html() || '';
                                
                                // Procurar por padrões de quantidade
                                var padroes = [
                                    /(\d+)\s*x\s*/gi,  // "3 x" ou "3x"
                                    /qtd[:\s]*(\d+)/gi, // "QTD: 3" ou "QTD 3"
                                    /quantidade[:\s]*(\d+)/gi, // "Quantidade: 3"
                                    /(\d+)\s*unidade/gi, // "3 unidade"
                                    /(\d+)\s*item/gi // "3 item"
                                ];
                                
                                padroes.forEach(function(padrao) {
                                    var match = texto.match(padrao);
                                    if (match) {
                                        var numero = parseInt(match[1]) || 0;
                                        if (numero > 0 && numero < 1000) { // Limite razoável
                                            quantidadeReal += numero;
                                            console.log("🔍 Padrão encontrado:", match[0], "- Número:", numero);
                                        }
                                    }
                                });
                                
                                // Se o elemento é um input de número, usar seu valor
                                if (elemento.is('input[type="number"]') || elemento.hasClass('qtdCarrinho')) {
                                    var valor = parseInt(elemento.val()) || 0;
                                    if (valor > 0) {
                                        quantidadeReal += valor;
                                        console.log("🔢 Input encontrado - Valor:", valor);
                                    }
                                }
                            });
                            
                            // Se encontrou quantidade real, usar ela
                            if (quantidadeReal > 0) {
                                $(".cart-qty").text(quantidadeReal);
                                console.log("✅ Contador corrigido para:", quantidadeReal);
                            }
                        }
                        
                        // Executar correção forçada periodicamente
                        setInterval(forcarCorrecaoContador, 3000);
                    });
                </script>
                
                <button type="submit" title="Search" class="button"><i class="icon-search"></i></button>
        <div id="search_autocomplete" class="search-autocomplete" style="display: none;"></div>
        <div class="clearer"></div>
    </div>
</form>

        </div>
        <div class="menu-icon"><a href="javascript:void(0)" title="Menu"><i class="fa fa-bars"></i></a></div>
            </div>
    <div class="header-wrapper">
<div class="main-nav">
    <div class="fechamenu"><i class="fa fa-times-circle" aria-hidden="true"></i></div>
    <div class="container">      
         <h1 class="logo"><a href="/" class="logo"><img src="https://recursos.odontomaster.com.br/i/logo_odonto.png" alt=" Commerce"></a></h1>
        <div class="menu-wrapper">
            <div class="menu-all-pages-container">
                <ul class="menu">
                        
                        @{Html.RenderAction("MenuTopo", "Menu");}

                </ul>

            </div>
        </div>
    </div>
</div>

</div>

</div>




@if (Convert.ToBoolean(G.Dados["Search-Barra-Fixa-Ativa"]))
{
    Html.FbitsRenderPartial("HeaderFloating");
}