document.addEventListener('DOMContentLoaded', () => {

    // --- INICIALIZAÇÃO DO CARROSSEL DE SERVIÇOS (SWIPER.JS) ---
    const serviceSliders = document.querySelectorAll('.service-slider');
    serviceSliders.forEach(slider => {
        new Swiper(slider, {
            loop: true,
            grabCursor: true,
            autoplay: {
                delay: 4000,
                disableOnInteraction: false,
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            breakpoints: {
                320: { slidesPerView: 1.2, spaceBetween: 20 },
                768: { slidesPerView: 2.5, spaceBetween: 30 },
                1024: { slidesPerView: 3.5, spaceBetween: 40 }
            }
        });
    });

    // --- NOVO CARROSSEL DE DEPOIMENTOS (SWIPER.JS) ---
    new Swiper('.testimonial-carousel', {
        effect: 'coverflow',
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: 'auto',
        loop: true,
        coverflowEffect: {
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: false,
        },
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
    });

   // --- SCRIPT PARA O ACORDEÃO DO FAQ ---
const faqItems = document.querySelectorAll('.faq-item');
if (faqItems.length > 0) {
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Fecha todos os outros itens para ter apenas um aberto por vez
            faqItems.forEach(otherItem => {
                otherItem.classList.remove('active');
            });

            // Se o item clicado não estava ativo, abre ele.
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
}
    // --- CÓDIGO PARA ATIVAR O TOQUE NO MOBILE (Seu código original mantido) ---
    function enableActiveStateOnMobile(selector) {
        document.querySelectorAll(selector).forEach(element => {
            element.addEventListener('touchstart', () => {}, { passive: true });
        });
    }
    enableActiveStateOnMobile('.benefit-card, .included-card, .pricing-plan, .cta-button, .service-plan-card'); // Adicionado .service-plan-card

});

// --- SCRIPT PARA ROLAGEM SUAVE SEM ALTERAR A URL ---

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        // 1. Impede o comportamento padrão do link
        e.preventDefault();

        // 2. Pega o ID do alvo (ex: '#planos')
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        // 3. Verifica se o elemento de destino existe na página
        if (targetElement) {
            // 4. Faz a rolagem suave até o elemento
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});