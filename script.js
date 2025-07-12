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
});