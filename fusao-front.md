</body>

<style>

h3.title.big {
    color: #000;
    margin-top: 3em;
    margin-bottom: 1.3em;
    text-transform: uppercase;
    border-bottom: 3px solid #1d70ba;
}

ul,li {
    list-style: none;
}

section.fbits-section-home.fbits-vitrine-home {
    padding-bottom: 4em;
}
section.fbits-section-home.fbits-ofertas-departamento {
    margin-bottom: 5em;
}
section.fbits-section-home.fbits-banner-meio-home {
    margin: 4em 0;
    padding: 2em 0;
}
section.fbits-section-home.fbits-banner-meio-home .fbits-banner-item {
    text-align: center;
    width: 100%;
    max-width: 100%;
}
section.fbits-section-home.fbits-banner-meio-home .fbits-banner-item img {
    width: 100%;
    height: auto;
    max-width: 100%;
    display: block;
    margin: 0 auto;
}

/* Melhores Ofertas com Banner Lateral */
section.fbits-vitrine-com-banner .col-banner-ofertas .fbits-banner-item {
    background: #fff;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    transition: box-shadow 0.3s ease;
    display: none;
}
section.fbits-vitrine-com-banner .col-banner-ofertas .fbits-banner-item:first-child {
    display: block;
}
section.fbits-vitrine-com-banner .col-banner-ofertas .fbits-banner-item:hover {
    box-shadow: 0 4px 16px rgba(0,0,0,0.15);
}
section.fbits-vitrine-com-banner .col-banner-ofertas .fbits-banner-item img {
    width: 100%;
    height: auto;
    display: block;
}
section.fbits-vitrine-com-banner .col-banner-ofertas {
    float: left;
}
section.fbits-vitrine-com-banner .col-carrossel-ofertas {
    float: left;
}

.product-name {
    margin: 10px 0;
    font-size: 1.1em;
    font-weight: 600;
    letter-spacing: -0.8px;
    color: #000;
    margin: 0 0 3px;
    min-height: 2.9em;
    max-height: 2.9em;
    overflow: hidden;
    text-align: center;
}
.spotPreco {
    height: 70px;
    text-align: center;
}
.item .details-area .actions {
    text-align: center;
}


    @@media (min-width:1300px){
       
        .spot {
            padding-left: 1em;
            padding-right: 1em;
        }
        section.fbits-section-home.fbits-banner-topo-home img {
            max-width: 97%;
            margin: 0 auto;
        }
         section.fbits-section-home.fbits-banner-topo-home .fbits-banner-item:first-child img {
            margin: 0;
        }
         section.fbits-section-home.fbits-banner-topo-home .fbits-banner-item:last-child img {
            margin: 0;
            float:right;
        }
        
        section.fbits-section-home.fbits-banner-rodape img {
            max-width: 97%;
            margin: 0 auto;
        }
         section.fbits-section-home.fbits-banner-rodape .fbits-banner-item:first-child img {
            margin: 0;
        }
         section.fbits-section-home.fbits-banner-rodape .fbits-banner-item:last-child img {
            margin: 0;
            float:right;
         }
        section.fbits-section-home.fbits-banner-mobiletopo-home img {
            max-width:;
            margin: 0 ;
        }
         section.fbits-section-home.fbits-banner-mobiletopo-home .fbits-banner-item:first-child img {
            margin: 0;
        }
         section.fbits-section-home.fbits-banner-mobiletopo-home .fbits-banner-item:last-child img {
            margin: 0;
            float:right;
        }
        
        section.fbits-section-home.fbits-banner-meio-home {
            margin: 3em 0;
            padding: 1em 0;
        }
        section.fbits-section-home.fbits-banner-meio-home .row-fbits-banner-meio {
            margin: 0;
        }
        section.fbits-section-home.fbits-banner-meio-home img {
            max-width: 100%;
            width: 100%;
            height: auto;
            margin: 0 auto;
            display: block;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }
        section.fbits-section-home.fbits-banner-meio-home .fbits-banner-item {
            padding: 0;
            margin: 0;
        }
        section.fbits-section-home.fbits-banner-meio-home .fbits-banner-item img {
            margin: 0 auto;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }
    }
    
    
    @@media (max-width:1023px){
        section.fbits-section-home.fbits-banner-centro-home img {
            margin: 0 auto!important;
        }
        body .fbits-banner-rodape img {
            max-width: 100%;
        }
        section.fbits-section-home.fbits-banner-meio-home img {
            max-width: 100%!important;
            width: 100%!important;
            height: auto!important;
            margin: 0 auto!important;
            border-radius: 6px;
        }
        section.fbits-section-home.fbits-banner-meio-home {
            margin: 2em 0;
            padding: 1em 0;
        }
        
        /* Melhores Ofertas com Banner - Tablet */
        section.fbits-vitrine-com-banner .col-banner-ofertas,
        section.fbits-vitrine-com-banner .col-carrossel-ofertas {
            width: 100%;
            max-width: 100%;
            float: none;
        }
        section.fbits-vitrine-com-banner .col-banner-ofertas {
            margin-bottom: 20px;
        }
    }
    
    @@media (max-width:1600px){
        .row.row-fbits-banner-topo >div {
            padding: 0;
        }
        .fbits-banner-rodape {
            margin-bottom: 5px;
            display: block;
            float: none;
        }
        section.fbits-section-home.fbits-banner-rodape {
            /* display: none!important; */
            width: 100%;
        }
        section.fbits-section-home.fbits-banner-topo-home img {
           
        }
        body .fbits-banner-rodape img {
            float: none;
            display: block!important;
            margin: 0 auto;
        }
        section.fbits-section-home.fbits-banner-meio-home img {
            max-width: 100%;
            width: 100%;
            height: auto;
            float: none;
            display: block!important;
            margin: 0 auto;
            border-radius: 4px;
        }
        section.fbits-section-home.fbits-banner-meio-home {
            margin: 1.5em 0;
            padding: 0.5em 0;
        }
        .row.row-fbits-banner-meio >div {
            padding: 0 10px;
        }
        
        /* Melhores Ofertas com Banner - Mobile */
        section.fbits-vitrine-com-banner .col-banner-ofertas,
        section.fbits-vitrine-com-banner .col-carrossel-ofertas {
            padding: 0 15px;
        }
        section.fbits-vitrine-com-banner .col-banner-ofertas .fbits-banner-item img {
            width: 100%;
            height: auto;
        }
    }
    
</style>
 <div class="main-container col1-layout">
        <div class="main container">
            <div class="col-main">
    
    <!--BANNER TOPO-->
    <section class="fbits-section-home fbits-banner-topo-home">
        <div class="row row-fbits-banner-topo">
            <div class="col-md-12">
                <FBITS:Banner filtroPosicao="mobiletopo" idsBanners="" tipo="carrossel"  configuracaoCarrossel="{
                
                  infinite: false,
                  speed: '300',
                  autoplay: true,
                  slidesToShow: 5,
                  slidesToScroll: 1,
                  responsive: [
                    {
                      breakpoint: 1920,
                      settings: {
                        slidesToShow: 5,
                        slidesToScroll: 1,
                      }
                    },
                    {
                      breakpoint: 1280,
                      settings: {
                        slidesToShow: 4,
                        slidesToScroll: 1
                      }
                    },
                    {
                      breakpoint: 767,
                      settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1
                      }
                    },
                    {
                      breakpoint: 440,
                      settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1
                      }
                    }
                  ]
                }" classeItens="" />
            </div>
        </div>
    </section>  
    </div>
</div>

    <div class="top-container">
        <!--BANNER CENTRO-->
        <section class="fbits-section-home fbits-banner-centro-home bdesk">
            <div class="row row-fbits-banner-centro bcentro">
                <FBITS:Banner filtroPosicao="centro" idsBanners="" tipo="estatico" configuracaoCarrossel="" classeItens="" />
            </div>
        </section>
        
         <section class="fbits-section-home fbits-banner-centro-home bmob">
            <div class="row row-fbits-banner-centro bcentro2">
                <FBITS:Banner filtroPosicao="Mobile Centro" idsBanners="" tipo="estatico" configuracaoCarrossel="" classeItens="" />
            </div>
        </section>
    </div>
    
    <script>
    if (window.innerWidth>990){
        $(".bcentro").slick({dots: true,fade: true, autoplay:true, arrows: true});
        $(".bmob").remove();
    } else {
        $(".bcentro2").slick({dots: true,fade: true, autoplay:true, arrows: true});
        $(".bdesk").remove();
    }
    </script>
    <div class="main-container col1-layout">
        <div class="main container">
            <div class="col-main">
    
    <!--BANNER TOPO-->
    <section class="fbits-section-home fbits-banner-topo-home">
        <div class="row row-fbits-banner-topo">
            <div class="col-md-12">
                <FBITS:Banner filtroPosicao="topo" idsBanners="" tipo="carrossel"  configuracaoCarrossel="{
                  dots: false,
                  infinite: true,
                  speed: '300',
                  autoplay: true,
                  slidesToShow: 4,
                  slidesToScroll: 1,
                  responsive: [
                    {
                      breakpoint: 1920,
                      settings: {
                        slidesToShow: 4,
                        slidesToScroll: 1,
                      }
                    },
                    {
                      breakpoint: 1280,
                      settings: {
                        slidesToShow: 4,
                        slidesToScroll: 1
                      }
                    },
                    {
                      breakpoint: 767,
                      settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1
                      }
                    },
                    {
                      breakpoint: 440,
                      settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1
                      }
                    }
                  ]
                }" classeItens="" />
            </div>
    </section>  
    
    <!--MELHORES OFERTAS COM BANNER LATERAL-->
    <section class="fbits-section-home fbits-vitrine-home fbits-vitrine-com-banner">
        <div class="row row-vitrine-home">
            <div class="col-md-12">
                <div class="line">
                    <h3 class="title big"> melhores ofertas</h3>
                    <span></span>
                </div>
            </div>
        </div>
        <div class="row row-vitrine-home">
            <!-- Banner Vertical -->
            <div class="col-md-3 col-sm-12 col-banner-ofertas">
                <FBITS:Banner filtroPosicao="Lateral Direita" idsBanners="" tipo="estatico" configuracaoCarrossel="" classeItens="banner-ofertas-lateral" />
            </div>
            
            <!-- Carrossel de Produtos -->
            <div class="col-md-9 col-sm-12 col-carrossel-ofertas">
                <FBITS:ListaSpots idsHotsites="117326" tipo="carrossel" configuracaoCarrossel="{
                  dots: false,
                  infinite: true,
                  speed: 300,
                  slidesToShow: 3,
                  slidesToScroll: 1,
                  responsive: [
                    {
                      breakpoint: 1920,
                      settings: {
                        slidesToShow: 3,
                        slidesToScroll: 1
                      }
                    },
                    {
                      breakpoint: 1280,
                      settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1
                      }
                    },
                    {
                      breakpoint: 767,
                      settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                      }
                    }
                  ]
                }" classeItens="componente-vitrine" />
            </div>
        </div>
    </section>

    
   <!--VITRINE DOIS-->
    <section class="fbits-section-home fbits-vitrine-home">
        <div class="row row-vitrine-home">
            <div class="col-md-12">
                <div class="line">
                    <h3 class="title big"> novidades! </h3>
                    <span></span>
                </div>               
                <FBITS:ListaCustomizada idsBanners="" idsHotsites="117167" idsConteudos="" tipo="carrossel" configuracaoCarrossel="{
                  dots: false,
                  infinite: true,
                  speed: 300,
                  adaptiveHeight: true,
                  slidesToShow: 4,
                  slidesToScroll: 1,
                  responsive: [
                    {
                      breakpoint: 1920,
                      settings: {
                        slidesToShow: 4,
                        slidesToScroll: 1
                      }
                    },
                    {
                      breakpoint: 1280,
                      settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1
                      }
                    },
                    {
                      breakpoint: 767,
                      settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                      }
                    }
                  ]
                }" classeItens="componente-vitrine" />
            </div>
        </div>
    </section>
    

    
   <!--BANNER RODAPE-->
    <section class="fbits-section-home fbits-banner-rodape" style="width: 100%;">
        <div class="row row-fbits-banner-rodape">
            <div class="col-md-12">
                <div class="line">
                    <h3 class="title big"> </h3>
                    <span></span>
                </div> 
                <FBITS:Banner filtroPosicao="rodape" idsBanners="" tipo="carrossel" configuracaoCarrossel="{
                  dots: false,
                  infinite: true,
                  speed: 300,
                  slidesToShow: 4,
                  slidesToScroll: 1,
                  responsive: [
                    {
                      breakpoint: 1920,
                      settings: {
                        slidesToShow: 4,
                        slidesToScroll: 1
                      }
                    },
                    {
                      breakpoint: 1280,
                      settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1
                      }
                    },
                    {
                      breakpoint: 767,
                      settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                      }
                    },
                    {
                      breakpoint: 400,
                      settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                      }
                    }
                  ]
                }" classeItens="componente-banner-rodape" />
            </div>
        </div>
    </section>

        <!--OFERTAS POR DEPARTAMENTO-->
    <section class="fbits-section-home fbits-ofertas-departamento">
        <div class="row row-ofertas-departamento">
            <div class="col-md-12">
                <div class="line">
                    <h3 class="title big">os melhores equipamentos! </h3>
                    <span></span>
                </div>          
                <FBITS:OfertasPorDepartamento idHotsite="117268" tipo="carrossel" configuracaoCarrossel="{
                  dots: false,
                  infinite: true,
                  speed: 300,
                  slidesToShow: 4,
                  slidesToScroll: 1,
                  responsive: [
                    {
                      breakpoint: 1920,
                      settings: {
                        slidesToShow: 4,
                        slidesToScroll: 1
                      }
                    },
                    {
                      breakpoint: 1280,
                      settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1
                      }
                    },
                    {
                      breakpoint: 767,
                      settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                      }
                    }
                  ]
                }" classeItens="componente-vitrine componente-ofertas-departamento" />
            </div>           
        </div>
    </section>  
    
    <!--BANNER MEIO - Entre Equipamentos e Clareador-->
    <section class="fbits-section-home fbits-banner-meio-home">
        <div class="row row-fbits-banner-meio">
            <div class="col-md-12">
                <FBITS:Banner filtroPosicao="Centro Lower" idsBanners="" tipo="estatico" configuracaoCarrossel="" classeItens="banner-meio-equipamentos" />
            </div>
        </div>
    </section>
    
        <!--LUVAS-->
    <section class="fbits-section-home fbits-vitrine-home">
        <div class="row row-vitrine-home">
            <div class="col-md-12">
                <div class="line">
                    <h3 class="title big">os melhores preços em clareador</h3>
                    <span></span>
                </div>               
                <FBITS:ListaCustomizada idsBanners="" idsHotsites="117272" idsConteudos="" tipo="carrossel" configuracaoCarrossel="{
                  dots: false,
                  infinite: true,
                  speed: 300,
                  adaptiveHeight: true,
                  slidesToShow: 4,
                  slidesToScroll: 1,
                  responsive: [
                    {
                      breakpoint: 1920,
                      settings: {
                        slidesToShow: 4,
                        slidesToScroll: 1
                      }
                    },
                    {
                      breakpoint: 1280,
                      settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1
                      }
                    },
                    {
                      breakpoint: 767,
                      settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                      }
                    }
                  ]
                }" classeItens="componente-vitrine" />
            </div>
        </div>
    </section>

        </div>
    </div>
</div>

