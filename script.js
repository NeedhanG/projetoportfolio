// Animações de entrada ao scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
});

// Carousel de depoimentos
class TestimonialCarousel {
    constructor() {
        this.track = document.querySelector('.testimonials-track');
        this.dots = document.querySelectorAll('.dot');
        this.currentSlide = 0;
        this.totalSlides = 4;
        this.isAutoPlaying = true;
        this.autoPlayInterval = null;
        
        // Adiciona uma verificação para garantir que os elementos existem
        if (this.track && this.dots.length > 0) {
            this.init();
        }
    }

    init() {
        // Configurar eventos dos dots
        this.dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                this.goToSlide(index);
                this.pauseAutoPlay();
                setTimeout(() => this.resumeAutoPlay(), 5000);
            });
        });

        // Configurar touch/swipe para mobile
        this.setupTouchEvents();
        
        // Iniciar autoplay
        this.startAutoPlay();
        
        // Pausar autoplay quando o usuário interagir
        this.track.addEventListener('mouseenter', () => this.pauseAutoPlay());
        this.track.addEventListener('mouseleave', () => this.resumeAutoPlay());
    }

    setupTouchEvents() {
        let startX = 0;
        let startY = 0;
        let moveX = 0;
        
        this.track.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
            this.pauseAutoPlay();
        });
        
        this.track.addEventListener('touchmove', (e) => {
            moveX = e.touches[0].clientX;
            // Prevenir scroll vertical se estiver fazendo swipe horizontal
            if (Math.abs(moveX - startX) > Math.abs(e.touches[0].clientY - startY)) {
                e.preventDefault();
            }
        });
        
        this.track.addEventListener('touchend', (e) => {
            const diffX = moveX - startX;
            const threshold = 50;
            
            if (Math.abs(diffX) > threshold) {
                if (diffX > 0) {
                    this.previousSlide();
                } else {
                    this.nextSlide();
                }
            }
            
            setTimeout(() => this.resumeAutoPlay(), 3000);
        });
    }

    goToSlide(index) {
        this.currentSlide = index;
        this.track.style.transform = `translateX(-${index * 100}%)`;
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
        this.dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === this.currentSlide);
        });
    }

    startAutoPlay() {
        this.autoPlayInterval = setInterval(() => {
            if (this.isAutoPlaying) {
                this.nextSlide();
            }
        }, 4000);
    }



    pauseAutoPlay() {
        this.isAutoPlaying = false;
    }

    resumeAutoPlay() {
        this.isAutoPlaying = true;
    }
}

// Inicializar o carousel quando a página carregar
document.addEventListener('DOMContentLoaded', () => {
    new TestimonialCarousel();
});

// Scroll suave para links internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});