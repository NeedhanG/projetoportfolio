// Hero Slider
let currentSlide = 0
const slides = document.querySelectorAll(".hero-slide")
const totalSlides = slides.length

function nextSlide() {
  slides[currentSlide].classList.remove("active")
  currentSlide = (currentSlide + 1) % totalSlides
  slides[currentSlide].classList.add("active")
}

// Auto-advance hero slides
setInterval(nextSlide, 5000)

// Scroll Animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -100px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1"
      entry.target.style.transform = "translateY(0)"
    }
  })
}, observerOptions)

// Observe sections for fade-in animation
document.querySelectorAll("section").forEach((section) => {
  section.style.opacity = "0"
  section.style.transform = "translateY(30px)"
  section.style.transition = "opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1), transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)"
  observer.observe(section)
})

// Portfolio Filters
const filterBtns = document.querySelectorAll(".filter-btn")
const portfolioItems = document.querySelectorAll(".portfolio-item")

filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    // Remove active class from all buttons
    filterBtns.forEach((b) => b.classList.remove("active"))
    btn.classList.add("active")

    const filter = btn.dataset.filter

    portfolioItems.forEach((item) => {
      if (filter === "all" || item.dataset.category === filter) {
        item.classList.remove("hidden")
      } else {
        item.classList.add("hidden")
      }
    })
  })
})

// Portfolio Item Click - Open Gallery Modal
const galleryModal = document.getElementById("galleryModal")
const galleryImage = galleryModal.querySelector(".gallery-image")

const galleryImages = [
  "public/luxury-modern-living-room-interior.jpg",
  "public/luxury-bedroom.png",
  "public/luxury-kitchen-modern-design.jpg",
  "public/luxury-bathroom-spa-design.jpg",
  "public/luxury-dining-room-elegant.jpg",
]

let currentGalleryIndex = 0

portfolioItems.forEach((item, index) => {
  item.addEventListener("click", () => {
    const category = item.dataset.category
    if (category === "photos") {
      currentGalleryIndex = index % galleryImages.length
      openGalleryModal()
    }
  })
})

function openGalleryModal() {
  galleryModal.classList.add("active")
  updateGalleryImage()
}

function updateGalleryImage() {
  galleryImage.src = galleryImages[currentGalleryIndex]
}

// Gallery Navigation
galleryModal.querySelector(".gallery-prev").addEventListener("click", (e) => {
  e.stopPropagation()
  currentGalleryIndex = (currentGalleryIndex - 1 + galleryImages.length) % galleryImages.length
  updateGalleryImage()
})

galleryModal.querySelector(".gallery-next").addEventListener("click", (e) => {
  e.stopPropagation()
  currentGalleryIndex = (currentGalleryIndex + 1) % galleryImages.length
  updateGalleryImage()
})

// Close Modal
const modalClose = document.querySelector(".modal-close")
modalClose.addEventListener("click", () => {
  galleryModal.classList.remove("active")
})

galleryModal.addEventListener("click", (e) => {
  if (e.target === galleryModal) {
    galleryModal.classList.remove("active")
  }
})

// Keyboard navigation for gallery
document.addEventListener("keydown", (e) => {
  if (galleryModal.classList.contains("active")) {
    if (e.key === "ArrowLeft") {
      currentGalleryIndex = (currentGalleryIndex - 1 + galleryImages.length) % galleryImages.length
      updateGalleryImage()
    } else if (e.key === "ArrowRight") {
      currentGalleryIndex = (currentGalleryIndex + 1) % galleryImages.length
      updateGalleryImage()
    } else if (e.key === "Escape") {
      galleryModal.classList.remove("active")
    }
  }
})

// Testimonials Slider
let currentTestimonial = 0
const testimonialCards = document.querySelectorAll(".testimonial-card")
const testimonialDots = document.querySelectorAll(".testimonial-dots .dot")
const totalTestimonials = testimonialCards.length

function showTestimonial(index) {
  testimonialCards.forEach((card) => card.classList.remove("active"))
  testimonialDots.forEach((dot) => dot.classList.remove("active"))

  testimonialCards[index].classList.add("active")
  testimonialDots[index].classList.add("active")
}

document.querySelector(".testimonial-prev").addEventListener("click", () => {
  currentTestimonial = (currentTestimonial - 1 + totalTestimonials) % totalTestimonials
  showTestimonial(currentTestimonial)
})

document.querySelector(".testimonial-next").addEventListener("click", () => {
  currentTestimonial = (currentTestimonial + 1) % totalTestimonials
  showTestimonial(currentTestimonial)
})

testimonialDots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    currentTestimonial = index
    showTestimonial(currentTestimonial)
  })
})

// Auto-advance testimonials
setInterval(() => {
  currentTestimonial = (currentTestimonial + 1) % totalTestimonials
  showTestimonial(currentTestimonial)
}, 7000)

// Contact Form
const contactForm = document.querySelector(".contact-form")

contactForm.addEventListener("submit", (e) => {
  e.preventDefault()

  const name = document.getElementById("name").value
  const email = document.getElementById("email").value
  const message = document.getElementById("message").value

  console.log("[v0] Form submitted:", { name, email, message })

  alert("Mensagem enviada com sucesso! Entraremos em contato em breve.")
  contactForm.reset()
})

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
})

// Parallax Effect on Hero
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset
  const heroBackground = document.querySelector(".hero-background")

  if (heroBackground && scrolled < window.innerHeight) {
    heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`
  }
})
