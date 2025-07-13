document.addEventListener('DOMContentLoaded', () => {

    // --- CÓDIGO NOVO PARA INICIALIZAR OS CARROSSÉIS DE SERVIÇOS (SWIPER.JS) ---
    const serviceSliders = document.querySelectorAll('.service-slider');

    serviceSliders.forEach(slider => {
        new Swiper(slider, {
            // Configurações do Swiper
            loop: true,
            grabCursor: true,
            
            // Autoplay (avança a cada 4 segundos)
            autoplay: {
                delay: 4000,
                disableOnInteraction: false, // Continua o autoplay mesmo depois que o usuário interage
            },

            // Paginação (as bolinhas embaixo)
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },

            // Responsividade (mostra mais slides em telas maiores)
            breakpoints: {
                // quando a largura da tela for >= 320px
                320: {
                    slidesPerView: 1.2, // Mostra 1 slide e um pedaço do próximo
                    spaceBetween: 20
                },
                // quando a largura da tela for >= 768px
                768: {
                    slidesPerView: 2.5, // Mostra 2 slides e um pedaço do próximo
                    spaceBetween: 30
                },
                // quando a largura da tela for >= 1024px
                1024: {
                    slidesPerView: 3.5, // Mostra 3 slides e um pedaço do próximo
                    spaceBetween: 40
                }
            }
        });
    });


    // --- SCRIPT PARA O ACORDEÃO DO FAQ (Seu código original) ---
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            faqItems.forEach(otherItem => {
                otherItem.classList.remove('active');
            });
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    // --- SCRIPT PARA O CARROSSEL AUTOMÁTICO DE DEPOIMENTOS (Seu código original) ---
    const testimonialSlider = document.querySelector('.testimonial-wrapper');
    if (testimonialSlider) {
        // Seu código para o slider de depoimentos continua aqui...
    }

    // --- CÓDIGO PARA ATIVAR O TOQUE NO MOBILE (Seu código original) ---
    function enableActiveStateOnMobile(selector) {
        document.querySelectorAll(selector).forEach(element => {
            element.addEventListener('touchstart', () => {}, { passive: true });
        });
    }
    enableActiveStateOnMobile('.benefit-card, .included-card, .pricing-plan, .cta-button');

});