document.addEventListener('DOMContentLoaded', () => {

    // Inicializa a biblioteca de animações ao rolar a página
    AOS.init({
        duration: 800, // Duração da animação em milissegundos
        once: true,    // Animação acontece apenas uma vez
        offset: 50,    // "Gatilho" da animação um pouco antes do elemento aparecer
    });

    // Inicializa o carrossel de depoimentos
    const swiper = new Swiper('.testimonials-slider', {
        loop: true,
        grabCursor: true,
        spaceBetween: 20,
        
        // Navegação por paginação (bolinhas)
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },

        // Autoplay para girar sozinho
        autoplay: {
          delay: 6000,
          disableOnInteraction: false,
        },
        
        // Adaptação para diferentes tamanhos de tela
        breakpoints: {
            768: {
                slidesPerView: 2,
                spaceBetween: 30
            },
        }
    });

});