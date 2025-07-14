document.addEventListener('DOMContentLoaded', () => {

    // --- INICIALIZAÇÃO DOS CARROSSÉIS (SWIPER.JS) ---
    const serviceSliders = document.querySelectorAll('.service-slider');
    serviceSliders.forEach(slider => {
        new Swiper(slider, {
            loop: true,
            grabCursor: true,
            autoplay: {
                delay: 4000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
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
                faqItems.forEach(otherItem => {
                    otherItem.classList.remove('active');
                });
                if (!isActive) {
                    item.classList.add('active');
                }
            });
        });
    }

    // --- CÓDIGO PARA ATIVAR O EFEITO DE TOQUE NO MOBILE ---
    function enableActiveStateOnMobile(selector) {
        document.querySelectorAll(selector).forEach(element => {
            element.addEventListener('touchstart', () => {}, { passive: true });
        });
    }
    enableActiveStateOnMobile('.benefit-card, .service-plan-card, .cta-button, .project-view-button');

    // --- SCRIPT PARA ROLAGEM SUAVE SEM ALTERAR A URL ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});