// Animações de entrada ao scroll
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

// Carousel de depoimentos
class TestimonialCarousel {
    constructor() {
        this.track = document.querySelector('.testimonials-track');
        this.dots = document.querySelectorAll('.dot');
        this.testimonials = document.querySelectorAll('.testimonial');
        this.currentSlide = 0;
        this.totalSlides = this.dots.length;
        this.isAutoPlaying = true;
        
        if (!this.track || this.totalSlides === 0) return;
        this.init();
    }

    init() {
        this.dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                this.goToSlide(index);
                this.pauseAutoPlay();
            });
        });
        this.setupTouchEvents();
        this.startAutoPlay();
        this.track.addEventListener('mouseenter', () => this.isAutoPlaying = false);
        this.track.addEventListener('mouseleave', () => this.isAutoPlaying = true);
    }

    setupTouchEvents() {
        let startX = 0;
        this.track.addEventListener('touchstart', (e) => startX = e.touches[0].clientX, { passive: true });
        this.track.addEventListener('touchend', (e) => {
            let endX = e.changedTouches[0].clientX;
            if (startX > endX + 50) this.nextSlide();
            else if (startX < endX - 50) this.previousSlide();
            this.pauseAutoPlay();
        });
    }

    goToSlide(index) {
        this.currentSlide = index;
        
        // Ajuste para o tamanho dos slides
        if (this.testimonials.length > 0) {
            this.track.style.width = `${this.totalSlides * 100}%`;
            this.testimonials.forEach(t => t.style.width = `${100 / this.totalSlides}%`);
        }
        
        this.track.style.transform = `translateX(-${index * (100 / this.totalSlides)}%)`;
        this.updateDots();
    }

    nextSlide() {
        this.currentSlide = (this.currentSlide + 1) % this.totalSlides;
        this.goToSlide(this.currentSlide);
    }
    
    previousSlide() {
        this.currentSlide = (this.currentSlide - 1 + this.totalSlides) % this.totalSlides;
        this.goToSlide(this.currentSlide);
    }

    updateDots() {
        this.dots.forEach((dot, index) => dot.classList.toggle('active', index === this.currentSlide));
    }

    startAutoPlay() {
        this.autoPlayInterval = setInterval(() => {
            if (this.isAutoPlaying) this.nextSlide();
        }, 5000);
    }

    pauseAutoPlay() {
        this.isAutoPlaying = false;
        clearInterval(this.autoPlayInterval);
        this.autoPlayInterval = setInterval(() => {
            this.isAutoPlaying = true;
            this.startAutoPlay();
        }, 8000); // Resume after a delay
    }
}

// Scroll suave para links internos e inicialização do carrossel
document.addEventListener('DOMContentLoaded', () => {
    new TestimonialCarousel();
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
});