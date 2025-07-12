document.addEventListener('DOMContentLoaded', () => {

    // --- SCRIPT PARA O ACORDEÃO DO FAQ ---
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

    // --- SCRIPT PARA O CARROSSEL AUTOMÁTICO DE DEPOIMENTOS ---
    const slider = document.querySelector('.testimonial-wrapper');
    const slides = document.querySelectorAll('.testimonial-card');
    
    if (slider && slides.length > 0) {
        let currentIndex = 0;
        const totalSlides = slides.length;

        function showNextSlide() {
            currentIndex = (currentIndex + 1) % totalSlides;
            const offset = -currentIndex * 100;
            slider.style.transform = `translateX(${offset}%)`;
        }

        setInterval(showNextSlide, 5000); // Muda de slide a cada 5 segundos
    }

    // --- CÓDIGO NOVO PARA ATIVAR O TOQUE NO MOBILE ---
    // Esta função adiciona um "ouvinte de toque" vazio. A simples existência
    // dele já é suficiente para o iOS entender que o elemento é clicável
    // e, assim, aplicar o efeito :active do CSS.
    function enableActiveStateOnMobile(selector) {
        document.querySelectorAll(selector).forEach(element => {
            element.addEventListener('touchstart', () => {}, { passive: true });
        });
    }

    enableActiveStateOnMobile('.benefit-card');
    enableActiveStateOnMobile('.included-card');
    enableActiveStateOnMobile('.portfolio-card');
    enableActiveStateOnMobile('.pricing-plan');
    enableActiveStateOnMobile('.cta-button');

});