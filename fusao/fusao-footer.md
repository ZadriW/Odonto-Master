            @if (voltarTopo)
            {
            	<div id="jsFloatButton">
            		<a href="#topo" class="voltarTopo" title="Voltar ao topo"></a>
            	</div>
            	<script type="text/javascript">
            	  $('#jsFloatButton').hide();
            	  $(window).scroll(function () {
            		  if ($(this).scrollTop() != 0) {
            			  $('#jsFloatButton').fadeIn();
            		  } else {
            			  $('#jsFloatButton').fadeOut();
            		  }
            	  });
            	</script>
            }
            
            <script>
            if (window.innerWidth<991){
                $(".menu li.item.raiz").each(function(){
                	if($(this).find("ul.filho").html()) {
                		$(this).append("<span class='arrowmenu'></span>");
                		
                	}
                });
                
                $(".menu li.item.raiz ul.filho li.item").each(function(){
                	if($(this).find("ul.filho").html()) {
                		$(this).append("<span class='arrowmenu arrowmenu-sub'></span>");
                		
                	}
                });
                
                $(".arrowmenu").click(function(){
                       $(this).toggleClass("opened");
                       $(this).prev().slideToggle("fast");
                	   $(this).parent().toggleClass("select");
                });
            }
            
            
            if (window.innerWidth>1024){
                //.ribbon.fbits-etiqueta-selo.selo1
                
                $(".spot").each(function(){
                    $(this).find(".ribbon").each(function(){
                        if ($(this).find("img[src='https://recursos.odontomaster.com.br/i/Selos/63/spot-promo.png']").length>0){
                		console.log("promo");
                                $(this).prepend($(this).parent().find("span.promo"));
                                $(this).addClass("seloPromo");
                        }
                    });
                });
                
                $(".spot").each(function(){
                    
                        $(this).find(".ribbon.fbits-etiqueta-selo.selo1").mouseenter(function(){
                            //console.log("teste");
							//if ($(this).find(".dvgTitle").html()=="Ganhe Brinde"){
                                 $(this).parent().find(".seloDvg").slideToggle("fast");
                           // }
                        });
                        $(this).find(".ribbon.fbits-etiqueta-selo.selo1").mouseleave(function(){
                            //console.log("teste");
							//if ($(this).find(".dvgTitle").html()=="Ganhe Brinde"){
                                 $(this).parent().find(".seloDvg").slideToggle("fast");
                           // }
                        });
                    
                });
            }
            
            </script>
            
            
            <style>
            span.autocomplete-item-preco {
                display:none!important;
            }
            .resultadoLista .header-container.type4 .main-nav {
                background: #bc7ed4!important;
            }
            @@media (max-width:1199px){
                  .resultadoLista .custom-block {
                    display: none!important;
                }
                .resultadoLista .header-container.type4 .main-nav {
                    background: #bc7ed4!important;
                }
                .resultadoLista .footer-top .input-box input.button {
                    max-width: 80px!important;
            } 
            .ribbon.fbits-etiqueta-promocao {
                display:none;
            }
            .autocomplete-item-preco {
                display:none!important;
            }
            .ribbon.fbits-etiqueta-selo.selo1:hover {
                opacity: 0.8;
            }
            .spot .seloDvg {
                border: 1px solid #888;
                padding: 5px;
                margin-bottom: 0.6em;
                max-width: 97%;
                background: #ffffffba;
                line-height: 1.3em;
            }
            .spot .dvgTitle {
                color: #1d70ba;
                font-weight: bold;
            }
            img.formaspag {
                max-width: 100%;
                width: 370px;
            }
            form#EnviaFormulario input {
                margin: 0 auto;
                margin-bottom: 0em;
                clear: both;
                display: block;
            }
            form#EnviaFormulario  input[type="submit"] {
                margin-top: 1em!important;
            }
            textarea#comentarios {
                margin-bottom: 1em;
            }
            span.arrowmenu, span.arrowmenu.opened {
                display: block;
                width: 15%;
                height: 2.9rem;
                line-height: 2.9rem;
                text-align: right;
                position: absolute;
                right: 3vw;
                top: 0;
                font-family: 'FontAwesome';
                text-rendering: auto;
                -webkit-font-smoothing: antialiased;
                -moz-osx-font-smoothing: grayscale;
            }
            span.arrowmenu:before {
                content: "\f107";
                font-size: 25px;
                color: #fff;
            }
            span.arrowmenu.opened:before {
                content: "\f106";
                font-size: 25px;
                color: #fff;
            }
            
            @@media (max-width:990px){
                li.item.raiz {
                    position: relative;
                }
                span.arrowmenu.arrowmenu-sub {
                    display: none;
                }
                ul.filho {
                    background: #1a5f9c;
                    margin-left: -15px;
                    margin-right: -15px;
                }
                
                ul.filho li a {
                    line-height: 2.6em;
                    padding-left: 2.7em;
                }
                .todas-categorias span.arrowmenu {
                    margin-top: 2em;
                }
                .header-container.type4 .main-nav {
                    background: #1d70ba;
                    overflow-x: hidden!important;
                    overflow-y: scroll!important;
                    padding-bottom: 1em;
                }
            }
            
            
            @@media (max-width:1023px){
                section.fbits-section-home.fbits-banner-topo-home img {
                    max-width: 100vw;
                    max-width: 100%;
                }
               
                section.fbits-section-home.fbits-banner-topo-home img {
                    max-width: 100vw;
                    max-width: 100%;
                }
            }
            
            
                .voltarestudante {
      
                        font-size: 12px;
                        height: 48px;
                        line-height: 48px;
                        padding: 0 12px;
                        text-transform: uppercase;
                        border-radius: 30px;
                        opacity: 1;
                        background: #1b65a9;
                        color: #fff!important;
                        text-align: center;
                        padding: 0;
                        display: block;
                        max-width: 280px;
                        margin: 0 auto;
                        margin-top:1em!important;
                
                }
            </style>
            
            <script>
                var url_string=window.location.href;
                var url=new URL(url_string);
                var parametroLista=url.searchParams.get("parametroLista");
                console.log(parametroLista);
                
            </script>
              
            <script>
               
                
                
            
                $("#loading").fadeOut( "slow", function() {
                 // Animation complete
                });
                 
                
                
                if (parametroLista == "true"){
                    
                    $("body").addClass("resultadoLista");
                    
                    $(".spot").each(function(){
                        if (!$(this).find(".product-image[href^='/listacompra/']").html()){
                            $(this).remove();
                        }
                    });
                    
                    $(".toolbar-bottom").before("<a class='voltarestudante' href='https://www.odontomaster.com.br/estudante'>Voltar para a página do estudante</a>")
                    
                    
                }
                
                $(".spot").each(function(){
                    if ($(this).find(".product-image[href^='/listacompra/']").html()){
                        $(this).find(".actions").css("opacity",0);
                    }
                });
                
                 
                 $("span.todas-categorias").html("Todas as Categorias");
                 
                 $(".spot").each(function(){
                     if ($(this).find(".precoDe .fbits-valor").html()!=undefined){
                         var _precoDe = parseFloat($(this).find(".precoDe .fbits-valor").html().replace(".","").replace(",",".")).toFixed(2); 
                         
                         var _precoPor = parseFloat($(this).find(".precoPor .fbits-valor").html().replace(".","").replace(",",".")).toFixed(2); 
                         $(this).find(".ribbon.fbits-etiqueta-off").append("<span class='economize'>Economize:<br><span>R$ "+(_precoDe - _precoPor).toFixed(2)+"</span></span>");
                         $(this).find(".etiquetas-spot").before($(this).find(".ribbon.fbits-etiqueta-off"));
                     }
                     
                     $(this).find(".bt.adicionar").removeAttr("onclick").removeAttr("data-abrirmodal").attr("href",$(this).find(".comparelink").attr("href"));
                     
                     $(this).find(".details-content.hide p").each(function(){
                            $(this).html($(this).html().replace("Cartão","")); 
                     });
                 });
                 
                 function btspot(){
                     $(".spot").each(function(){
                        $(this).find(".addtocart").html($(this).find(".bt.adicionar"));
                        //$(this).find(".comparelink").html($(this).find(".bt.comprar"));
                        $(this).find(".addtowishlist").html($(this).find(".input-spot-quantidade").val("1"));
                     });
                 }
                 
                 btspot();
                 
                 $("#fbits-btnVerMais").click(function(){
                     setTimeout("btspot()",500);
                     setTimeout("btspot()",1500);
                 });
                 
                 $(".icoconta").click(function(){
                    window.location = "https://checkout.odontomaster.com.br/MinhaConta/Pedido/";
                 });
                 
                  $(".header-container.type4.header-newskin .header>.logo").click(function(){
                    window.location = "https://www.odontomaster.com.br/";
                  });
                  
                  
                  if (window.innerWidth<991){
                      $(".menu-icon").click(function(){
                          $(".main-nav").slideToggle("fast");
                      });
                      
                      $(".fechamenu").click(function(){
                          $(".main-nav").slideToggle("fast");
                      });
                      
                      $(".mini-cart").click(function(){
                            window.location = "https://checkout.odontomaster.com.br/"; 
                      });
                  }
            </script>
            
            <style>
                .view-switcher {
                    display:none!important;
                }
                .ac_results {
                    text-align: left;
                }
                .icoconta {
                    cursor:pointer;
                }
                .header-container.type4.header-newskin .header>.logo {
                    cursor: pointer;
                }
                div#popUp-News-Fundo {
                    padding: 30px;
                }
                input#modal-Nome {
                    background-color: #ebebee;
                    color: #686865;
                    height: 48px;
                    border: none;
                    font-size: 14px;
                    padding-left: 15px;
                    float: left;
                    border-radius: 30px;
                    padding-right: 6px;
                    margin-right: 22px;
                    display: inline-block;
                    margin-bottom: 1em; width: 100%;
                    max-width: 90%;
                }
                
                input#modal-Email {
                    background-color: #ebebee;
                    color: #686865;
                    height: 48px;
                    border: none;
                    font-size: 14px;
                    padding-left: 15px;
                    float: left;
                    border-radius: 30px;
                    padding-right: 6px;
                    margin-right: 22px;
                    display: inline-block;
                    margin-bottom: 1em; width: 100%;
                    max-width: 90%;
                }     
                div#popUp-News-Fundo div#newsletter-erro {
                    text-align: left;
                    padding-top: 1em;
                    position: absolute;
                }
                div#popUp-News:before {
                    content: "ASSINE NOSSA NEWSLETTER";
                    font-size: 1.3em;
                    font-weight: 700;
                    text-transform: uppercase;
                    color: #1b65a9;
                    text-align: left;
                    letter-spacing: -1px;
                    padding-bottom: 1em;
                    display: block;
                }
                input#btnCadastrarNews {
                    float: none;
                    max-width: 120px;
                    margin-left: 0;
                    font-size: 12px;
                    height: 48px;
                    line-height: 48px;
                    padding: 0 12px;
                    text-transform: uppercase;
                    border-radius: 30px;
                    opacity: 1;
                    background: #1b65a9;
                    color: #fff;
                    text-align: center;
                    padding: 0;
                    border: 0;
                    min-width: 100px;
                    clear: both;
                    display: block;
                }
                
                
            
                .footer-top .input-box input.button {
                    float: left;
                    max-width: 120px;
                    margin-left: -120px;
                    font-size: 12px;
                    height: 48px;
                    line-height: 48px;
                    padding: 0 12px;
                    text-transform: uppercase;
                    border-radius: 0 30px 30px 0;
                    opacity: 1;
                    background: #1b65a9;
                    color: #fff;
                }
                .footer-top .input-box input {
                    background-color: #ebebee;
                    color: #686865;
                    height: 48px;
                    border: none;
                    font-size: 14px;
                    padding-left: 15px;
                    float: left;
                    max-width: 215px;
                    width: 90%;
                    border-radius: 30px 0 0 30px;
                    padding-right: 6px;
                    margin-right: 22px;
                    display: inline-block;
                }
                input#Nome {
                    margin-right: 3px;
                }
                input#Email {
                    border-radius: 0;
                }
                .footer-top .input-box input.button {
                    float: left;
                    max-width: 120px;
                    margin-left: -19px;
                    font-size: 12px;
                    height: 48px;
                    line-height: 48px;
                    padding: 0 12px;
                    text-transform: uppercase;
                    border-radius: 0 30px 30px 0;
                    opacity: 1;
                    background: #1b65a9;
                    color: #fff;
                    text-align: center;
                    padding: 0;
                }
                .footer-top .input-box {
                    width: 100%;
                    max-width: 100%;
                    float: left;
                }
                .footer-middle .block .block-title strong {
                    font-size: 12px;
                    font-weight: 900;
                    text-transform: uppercase;
                }
                
                .footer-middle .block .block-title strong {
                    color: #1b65a9;
                }
                .footer-middle a {
                    color: #687176;
                    font-size: 0.9em;
                }
                .footer-middle ul.links li, .footer-middle ul.features li {
                    padding: 5px 0;
                }
                
span.icones-pagamento-footer {
    display: block;
    float: left;
    width: 50px;
    height: 40px;
    background-size: 95%;
    background-position: center top;
    background-repeat: no-repeat;
    cursor: pointer;
}
span.icones-pagamento-footer.icone-boleto{background-image:url(https://recursos.odontomaster.com.br/i/SVG-formasPagamento/boleto.svg);}
span.icones-pagamento-footer.icone-boleto{opacity:.9;}

span.icones-pagamento-footer.icone-visa{background-image:url(https://recursos.odontomaster.com.br/i/SVG-formasPagamento/visa-cor.svg);}

span.icones-pagamento-footer.icone-master{background-image:url(https://recursos.odontomaster.com.br/i/SVG-formasPagamento/master-cor.svg);}

span.icones-pagamento-footer.icone-amex{background-image:url(https://recursos.odontomaster.com.br/i/SVG-formasPagamento/american-cor.svg);}

span.icones-pagamento-footer.icone-diners{background-image:url(https://recursos.odontomaster.com.br/i/SVG-formasPagamento/diners-cor.svg);}

.footer-bottom {
    border-top: 1px solid #1b65a9;
}
.footer-bottom {
    padding: 5px 0;
}

.footer-bottom address * {
    font-size: 0.8rem!important;
}
.footer-bottom address {
    margin-right: 0;
    line-height: 1.5em;
    text-align: center;
    padding-top: 1em;
    /* font-size: 0.8em; */
}
ul.blockfooter.noborder.copyright {
    font-size: 0.8rem;
}
.footer-bottom address {
    float: none;
}
.footer-bottom {
    padding: 5px 0;
    max-width: 1050px;
}
.fstore {
    float: none;
    display: block;
    text-indent: -9999px;
    line-height: 9999px;
    opacity: 1;
    width: 80px;
    height: 40px;
    background: url(https://static.fbits.net/i/logo-tray-corp-rodape.svg) 0% 0% / 80px no-repeat;
    margin: 0.8rem auto 0.3rem;
    overflow: hidden;
}

@@media all{
i{font-style:italic;}
*:focus{box-shadow:none;outline:0;}
[class^="porto-icon-"]:before{font-family:'porto-icons';font-style:normal;font-weight:normal;speak:none;display:inline-block;text-decoration:inherit;width:1em;margin-right:.2em;text-align:center;font-variant:normal;text-transform:none;line-height:1em;margin-left:.2em;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;}
.porto-icon-facebook:before{content:'\f833';}
}
@@media all{
*,::after,::before{box-sizing:inherit;}
.social-icons [class^="porto-icon-"]{color:#fff;}
.footer-bottom .social-icons [class^="porto-icon-"]{color:inherit;}
}
/*! CSS Used fontfaces */
@@font-face{font-family:'porto-icons';src:url(https://recursos.odontomaster.com.br/f/porto-icons.eot);src:url(https://recursos.odontomaster.com.br/f/porto-icons.eot) format('embedded-opentype'), url(https://recursos.odontomaster.com.br/f/porto-icons.woff2) format('woff2'), url(https://recursos.odontomaster.com.br/f/porto-icons.woff) format('woff'), url(https://recursos.odontomaster.com.br/f/porto-icons.ttf) format('truetype'), url(https://recursos.odontomaster.com.br/f/porto-icons.svg) format('svg');font-weight:normal;font-style:normal;}


.footer-bottom .social-icons a {
    background-image: none;
    background-color: #fff;
    text-indent: 0;
    color: #333;
    border-radius: 0;
    font-size: 13.67px;
    width: 32px;
    height: 32px;
    text-align: center;
    margin-left: 0;
    margin-right: 4px;
    float: left;
    line-height: 32px;
    border-radius: 100%;
}
[class^="porto-icon-"]:before, [class*=" porto-icon-"]:before {
    font-family: 'porto-icons';
    font-style: normal;
    font-weight: normal;
    speak: none;
    display: inline-block;
    text-decoration: inherit;
    width: 1em;
    margin-right: .2em;
    text-align: center;
    font-variant: normal;
    text-transform: none;
    line-height: 1em;
    margin-left: .2em;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}

.porto-icon-facebook:before {
    content: '\f833';
}

.development {
    position: relative;
}

.footer .social-icons a {
    background-color: transparent;
    border-radius: 50%;
    position: relative;
    font-size: 20px;
    display: inline-block;
    text-indent: 0;
}
.fa-facebook-f:before, .fa-facebook:before {
    content: "\f09a";
    color: #1b65a9;
    font-size: 21px;
    margin-left: 0;
    position: absolute;
    width: 20px;
    top: 0;
    left: 0;
    opacity: 1;
}
.fa-instagram:before {
    content: "\f16d";
    /* content: "\f09a"; */
    color: #1b65a9;
    font-size: 21px;
    margin-left: 0;
    position: absolute;
    width: 20px;
    top: 0;
    left: 0;
    opacity: 1;
}

a.fbits-login-link-cadastro {
    margin-left: 2em;
}

a.fbits-login-link-cadastro:before {
    content: "ou ";
    text-decoration: none!important;
    position: absolute;
    margin-left: -20px;
}
.dropatend {
    display:none;   
}
span.cart-qty:empty {
    display: none!important;
}
.spot .avaliacao {
    display: none;
}
.category-products .products-grid li.item {
    float: left;
    display: inline-block!important;
}

@@media (min-width:1200px){
    .ac_results {
        text-align: left;
        left: 40%!important;
        margin-left: -187px!important;
        margin-top: 0.8em;
    }
    .dropatend {
        background: #fff;
        padding: 25px;
        height: auto;
        position: absolute;
        width: 460px;
        text-align: left;
        top: 60px;
        border-top: 6px solid #1b65a9!important;
        right: -6px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.5);
        padding-top: 44px;
        color: #000;
    }
    .icoatendimento:hover .dropatend {
        display:block!important;
    }
    .dropatend:before {
        content: "";
        position: absolute;
        border: 10px solid transparent;
        display: block;
        right: 176px;
        top: -25px;
        border-bottom-color: #1b65a9;
    }
    .dropatend:after {
        content: "Entre em Contato";
        color: #1b65a9;
        font-weight: bold;
        position: absolute;
        top: 24px;
    }
    .dropatend p {
        margin-bottom: 0;
    }
    .dropatend b {
        margin-top: 16px;
        display: block;
        line-height: 1.7em;
    }
}

.fechamenu {
    display:none;
}

                @@media (max-width:990px){
                    .details-content.hide b:last-child {
                        clear: both;
                        display: block;
                    }
                    .ac_results {
                        border: 1px solid #ddd;
                        background: #fff;
                        box-shadow: 0 0 3px 3px rgba(0,0,0,0.1);
                        padding-bottom: 5px;
                        border-radius: 0 0 5px 5px;
                        margin: -8px 0 0 24px;
                        width: 100vw!important;
                        top: 11em!important;
                    }
                    .fechamenu {
                        display: block;
                        position: fixed;
                        right: 0.4em;
                        color: #fff;
                        font-size: 1.7em;
                        z-index: 99;
                        top: 0.3em;
                    }
                    .main-nav .container {
                        padding-right: 4vw!important;
                        padding-left: 4vw!important;
                        margin-top: 1em;
                    }
                    .header-container.type4.header-newskin .main-nav ul.menu>li {
                        margin-right: 0;
                        display: block;
                        min-width: 70vw;
                        background: #1d70ba!important;
                    }
                    .header-container.type4.header-newskin .main-nav li.menu-geral.estudante {
                        background: #ffeb01!important;
                    }
                    li.item.raiz.item0.todas-categorias {
                        padding-top: 2em;
                    }
                    span.todas-categorias {
                        color: #fff;
                        padding-top: 15px;
                        padding-bottom: 16px;
                        padding-left: 15px;
                        padding-right: 15px;
                        font-weight: bold;
                        line-height: 3.4em;
                        padding-top: 2em;
                        margin-top: 2em;
                    }
                    .main-nav:after {
                        content: "";
                        display: block;
                        background: #00000073;
                        width: 22vw;
                        position: fixed;
                        height: 100vh;
                        top: 0;
                        z-index: 0;
                        right: 0;
                    }
                    #fbits-cadastro-newsletter {
                            width: 100%!important;
                            float: none!important;
                            margin: 0px 0px!important;
                            text-align: center!important;
                            padding-bottom:2em!important;
                    }
                    .footer-top .input-box input {
                        background-color: #ebebee;
                        color: #686865;
                        height: 48px;
                        border: none;
                        font-size: 14px;
                        padding-left: 15px;
                        float: left;
                        max-width: 100%;
                        width: 100%;
                        border-radius: 30px!important;
                        padding-right: 6px;
                        margin-right: 0;
                        display: inline-block;
                        margin-bottom: 0.7em;
                    }
                    .footer-top .input-box input.button {
                        float: none;
                        max-width: 120px;
                        margin-left: 0;
                        font-size: 12px;
                        height: 48px;
                        line-height: 48px;
                        padding: 0 12px;
                        text-transform: uppercase;
                        border-radius: 0 30px 30px 0;
                        opacity: 1;
                        background: #1b65a9;
                        color: #fff;
                        text-align: center;
                        padding: 0;
                        margin: 0;
                    }
                    .header-container .header-wrapper {
                        display: block;
                    }
                    .main-nav, .fixed-header-area {
                        display: none;
                        position: fixed;
                        z-index: 99999;
                        top: 0;
                        height: 100vh;
                    }
                }
            </style>
            
            <div class="footer-container ">
                <div class="footer">
                        <div class="footer-top">
                        <div class="container">
                            <div class="row">
                                <div class="col-md-12">
                                <div class="footer-top-inner">
              <div class="row">
                <div class="col-md-5">
                  <div class="block" style="margin-bottom: 15px;">
                    <div class="block-title"><strong><span>ASSINE NOSSA NEWSLETTER</span></strong></div> 
                    <div class="block-content">
                      <p>E FIQUE POR DENTRO DAS NOVIDADES</p>
                    </div>
                  </div>
                </div>
                <div class="col-md-7">
                  <div id="fbits-cadastro-newsletter" class="block-content" style="width:100%;float:right;margin:38px 0px;">  
                        
                    <div class="input-box">
                        <input class="input" id="Nome" maxlength="50" name="objNews.Nome" placeholder="Nome" type="text" value="">
                        <input class="input" id="Email" maxlength="70" name="objNews.Email" placeholder="E-mail" type="text" value="">
                        @*<input type="text" name="email" id="newsletter-footer" title="Sign up for our newsletter" class="input-text required-entry validate-email" placeholder="E-mail">*@
                        <input type="submit" class="button" value="Assinar" onclick="cadastroNewsletter(this);">
                        @*<button type="submit" title="Subscribe" class="button"><span><span>ASSINAR</span></span></button>*@
                        <span id="newsletter-mensagem" class="title newsletter-erro"></span>
                        <div class="clearer"></div>
                    </div>
                
                
                  </div>
                </div> 
              </div>
            </div>                    </div>
                            </div>
                        </div>
                    </div>
                        <div class="footer-middle">
                        <div class="container">
                                        <div class="row">
            <div class="col-lg-3">
                <div class="block">
                      <div class="block-title"><strong><span>INSTITUCIONAL</span></strong></div>
                      <div class="block-content">
                          <div class="row">
                            <div class="col-md-12">
                              <ul class="links">
                                <li><a href="https://blog.odontomaster.com.br" target="_blank">Nosso blog</a></li>
                                <li><a href="/quemsomos">Quem Somos</a></li> 
                                <li><a href="/estudantes">Estudantes</a></li>
                                <li><a href="https://checkout.odontomaster.com.br/Parceiros/Cliente">Revenda</a></li> 
                                <li><a href="https://checkout.odontomaster.com.br/Login/Authenticate">Login/Cadastro</a></li> 
                                <li><a href="http://odonto-master.rds.land/trabalhe-conosco">Trabalhe Conosco</a></li> 
                              </ul>
                            </div>
                         
                          </div> 
                        </div>
                </div>
            </div>   
            
             <div class="col-lg-3">
                <div class="block">
                      <div class="block-title"><strong><span>AJUDA</span></strong></div>
                      <div class="block-content">
                          <div class="row">
                            <div class="col-md-12">
                              <ul class="links">
                                <li><a href="/comocomprar">Como Comprar</a></li> 
                                <li><a href="/trocasedevolucoes">Trocas e Devoluções</a></li>
                                <li><a href="/politicadeprivacidade">Política de Privacidade</a></li>
                                <li><a href="/cashback">Cashback de Frete</a></li> 
                              </ul>
                            </div>
                         
                          </div> 
                        </div>
                </div>
            </div>   
            
             <div class="col-lg-3">
                <div class="block">
                      <div class="block-title"><strong><span>ATENDIMENTO</span></strong></div>
                      <div class="block-content">
                          <div class="row">
                            <div class="col-md-12">
                              <ul class="links">
                                <li class="icochat"><a href="https://api.whatsapp.com/send?phone=5571988670812" target="_blank">Chat Online</a></li>
                                <li class="icophone"><a href="tel:+557131737300" target="_blank">(71) 3173-7300</a></li>
                                <li class="icoatend"><a href="mailto:atendimento@odontomaster.com.br" target="_blank">atendimento@odontomaster.com.br</a></li> 
                              </ul>
                            </div>
                         
                          </div> 
                        </div>
                </div>
            </div>   
            
            <div class="col-lg-3">
                <div class="block">
                      <div class="block-title"><strong><span>HORÁRIO DE FUNCIONAMENTO</span></strong></div>
                      <div class="block-content">
                          <div class="row">
                            <div class="col-md-12">
                              <ul class="links">
                                <li>Segunda a Sexta das 08h às 18h</li>
                                <li>Sábados das 08h às 12h</li>
                              </ul>
                            </div>
                         
                          </div> 
                        </div>
                </div>
            </div>   
            
            <div class="col-lg-6">
                <div class="block"><BR><BR>
                      <div class="block-title"><strong><span>FORMAS DE PAGAMENTO</span></strong></div>
                      <div class="block-content">
                          <div class="row">
                            <div class="col-md-12">
                              <ul class="links">
                                  
                                  <img data-lazyLoad="True" class="formaspag" data-original="https://recursos.odontomaster.com.br/i/bandeiras-cards.png" />
                                  
                                  @*
                                <li>
                                    
                                   
                                      <span class="icones-pagamento-footer icone-boleto"></span>
                                      <span class="icones-pagamento-footer icone-visa"></span>
                                      <span class="icones-pagamento-footer icone-master"></span>
                                      <span class="icones-pagamento-footer icone-amex"></span>
                                      <span class="icones-pagamento-footer icone-diners"></span>
                                   
                                    
                                </li>*@
                              </ul>
                            </div>
                         
                          </div> 
                        </div>
                </div>
            </div>   
            
            <style>
                a#seloEbit {
                    float: left;
                    margin-right: 0.6em;
                }
            </style>
            
            <div class="col-lg-3">
                <div class="block"><BR><BR>
                      <div class="block-title"><strong><span>SELOS DE SEGURANÇA</span></strong></div>
                      <div class="block-content">
                          <div class="row">
                            <div class="col-md-12">
                              <ul class="links">
                                <li> 
                                <!--<a id="seloEbit" href="http://www.ebit.com.br/103112" target="_blank" data-noop="redir(this.href);"></a> <script type="text/javascript" id="getSelo" src="https://imgs.ebit.com.br/ebitBR/selo-ebit/js/getSelo.js?103112"> </script>-->
                                <!--- Secure Site Seal - DO NOT EDIT --->
                    
                 <span id="ss_img_wrapper_115-55_image_en">
                        <a href="http://www.alphassl.com/ssl-certificates/wildcard-ssl.html" target="_blank" title="SSL Certificates">
                            <img alt="Wildcard SSL Certificates" border=0 id="ss_img" src="//seal.alphassl.com/SiteSeal/images/alpha_noscript_115-55_en.gif" title="SSL Certificate"></a></span>
                            <script type="text/javascript" src="//seal.alphassl.com/SiteSeal/alpha_image_115-55_en.js"></script>
                                
                                </li>
                              </ul>
                            </div>
                         
                          </div> 
                        </div>
                </div>
            </div>   
            
            <div class="col-lg-3">
                <div class="block"><BR><BR>
                      <div class="block-title"><strong><span>REDES SOCIAIS</span></strong></div>
                      <div class="block-content">
                          <div class="row">
                            <div class="col-md-12">
                              <ul class="links">
                                <li>
                                    
                                    <div class="social-icons"> 
                                        <a href="https://www.facebook.com/DentalOdontoMaster/" title="Facebook" target="_blank"><i class="fa fa-facebook" aria-hidden="true"></i></a> 
                                        <a href="https://www.instagram.com/dentalodontomaster/" title="Instagram" target="_blank"><i class="fa fa-instagram" aria-hidden="true"></i></a> 
                                    </div>
                                    
                                </li>
                              </ul>
                            </div>
                         
                          </div> 
                        </div>
                </div>
            </div>   
            
    
            
            
            </div>
                </div>
                    </div>
                        <div class="footer-bottom">
                        <div class="container">
                           <ul class="blockfooter noborder endereço-footer">
            					<address class="fbits-dadosEmpresa">
            						<span class="razaoSocial" data-nome="Razão Social"> &copy; <span class="copyright-direitos">Todos os direitos reservados - @G.Dados["DadosEmpresa-RazaoSocial"] -</span>
            						<span class="cnpj" data-nome="CNPJ">CNPJ: @G.Dados["DadosEmpresa-CNPJ"]</span><br>
            						<span class="endereco" data-nome="Endereço">@G.Dados["DadosEmpresa-Endereco"] -</span>
            						<span class="bairro" data-nome="Bairro">@G.Dados["DadosEmpresa-Bairro"] -</span>
            						<span class="cidade" data-nome="Cidade">@G.Dados["DadosEmpresa-Cidade"]/@G.Dados["DadosEmpresa-Estado"] -</span>
            						<span class="cep" data-nome="CEP">CEP: @G.Dados["DadosEmpresa-CEP"]</span>        
            					 </address>				
            				</ul>
            			
            				<ul class="blockfooter noborder copyright">					
            					<p>Eventuais promoções, descontos e prazos de pagamento expostos aqui são válidos apenas para compras via internet. As fotos, textos e layout aqui veiculados são de propriedade da Loja. É proibida a utilização total ou parcial sem nossa autorização.</p>
            				</ul> 
                        </div>
                        
                        
                        <div class="development">
                            	<ul class="blockfooter noborder logo-fbits">
                					<a target="_blank" href="https://www.traycorp.com.br/?utm_source=@(G.NomeEcommerce)-Loja&utm_medium=loja&utm_campaign=RodapeAdmin&utm_term=loja" title="Tray Corp by FBITS"><i class="fstore replace">Tray Corp by FBITS</i></a> 
                				</ul>
                        </div>
                    </div>
                    </div>
            </div>


    </div>
</div>

<script>
$(".toggle .titlefooter").click(function(){
  $(this).next().toggle();
  $(this).toggleClass("opened");
});




</script>


@Html.Partial("_ViewSwitcher")
@Zanox.InsertScript(Convert.ToBoolean(G.Dados["ZanoxAtivo"]))

@{Html.RenderAction("SelectGrupoScriptTag", "GrupoScriptTag", new { @posicao = EnumPosicaoScript.FooterBaixo });}