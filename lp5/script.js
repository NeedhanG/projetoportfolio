// Mobile Menu Toggle
const menuToggle = document.querySelector(".menu-toggle")
const navLinks = document.querySelector(".nav-links")

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("active")
})

// Close mobile menu when clicking on a link
document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active")
  })
})

// Hero Slider
let currentSlide = 0
const slides = document.querySelectorAll(".hero-slide")
const totalSlides = slides.length

function nextSlide() {
  slides[currentSlide].classList.remove("active")
  currentSlide = (currentSlide + 1) % totalSlides
  slides[currentSlide].classList.add("active")
}

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

// Observe sections for animation
document.querySelectorAll("section").forEach((section) => {
  section.style.opacity = "0"
  section.style.transform = "translateY(30px)"
  section.style.transition = "opacity 0.6s ease, transform 0.6s ease"
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

// Portfolio Item Click Handlers
portfolioItems.forEach((item) => {
  const viewBtn = item.querySelector(".view-btn")
  const type = item.dataset.type

  viewBtn.addEventListener("click", (e) => {
    e.stopPropagation()

    if (type === "gallery") {
      openGalleryModal()
    } else if (type === "video") {
      openVideoModal()
    } else if (type === "stories") {
      openStoriesModal()
    }
  })
})

// Gallery Modal
const galleryModal = document.getElementById("galleryModal")
const galleryImage = galleryModal.querySelector(".gallery-image")
const galleryThumbnails = galleryModal.querySelector(".gallery-thumbnails")

const galleryImages = [
  "/luxury-modern-living-room-interior.jpg",
  "/luxury-bedroom.png",
  "/luxury-kitchen-modern-design.jpg",
  "/luxury-bathroom-spa-design.jpg",
  "/luxury-dining-room-elegant.jpg",
]

let currentGalleryIndex = 0

function openGalleryModal() {
  galleryModal.classList.add("active")
  currentGalleryIndex = 0
  updateGalleryImage()
  createThumbnails()
}

function updateGalleryImage() {
  galleryImage.src = galleryImages[currentGalleryIndex]

  // Update thumbnail active state
  const thumbnails = galleryThumbnails.querySelectorAll("img")
  thumbnails.forEach((thumb, index) => {
    thumb.classList.toggle("active", index === currentGalleryIndex)
  })
}

function createThumbnails() {
  galleryThumbnails.innerHTML = ""
  galleryImages.forEach((src, index) => {
    const img = document.createElement("img")
    img.src = src
    img.addEventListener("click", () => {
      currentGalleryIndex = index
      updateGalleryImage()
    })
    galleryThumbnails.appendChild(img)
  })
}

galleryModal.querySelector(".gallery-prev").addEventListener("click", () => {
  currentGalleryIndex = (currentGalleryIndex - 1 + galleryImages.length) % galleryImages.length
  updateGalleryImage()
})

galleryModal.querySelector(".gallery-next").addEventListener("click", () => {
  currentGalleryIndex = (currentGalleryIndex + 1) % galleryImages.length
  updateGalleryImage()
})

// Video Modal
const videoModal = document.getElementById("videoModal")
const videoIframe = videoModal.querySelector("iframe")

function openVideoModal() {
  videoModal.classList.add("active")
  // Example YouTube video - replace with actual video URL
  videoIframe.src = "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
}

// Stories Modal
const storiesModal = document.getElementById("storiesModal")
const stories = ["/instagram-story-photography-behind-the-scenes.jpg", "/instagram-story-wedding-photography-vertical.jpg", "/instagram-story-real-estate-photography-vertical.jpg"]

let currentStoryIndex = 0

function openStoriesModal() {
  storiesModal.classList.add("active")
  currentStoryIndex = 0
  updateStory()
}

function updateStory() {
  const storyContainer = storiesModal.querySelector(".stories-container")
  const story = storyContainer.querySelector(".story")
  const progressBars = storyContainer.querySelectorAll(".progress-bar")

  story.querySelector("img").src = stories[currentStoryIndex]

  progressBars.forEach((bar, index) => {
    bar.classList.toggle("active", index === currentStoryIndex)
  })
}

storiesModal.querySelector(".stories-prev").addEventListener("click", () => {
  currentStoryIndex = (currentStoryIndex - 1 + stories.length) % stories.length
  updateStory()
})

storiesModal.querySelector(".stories-next").addEventListener("click", () => {
  currentStoryIndex = (currentStoryIndex + 1) % stories.length
  updateStory()
})

// Close Modals
document.querySelectorAll(".modal-close").forEach((closeBtn) => {
  closeBtn.addEventListener("click", () => {
    closeBtn.closest(".modal").classList.remove("active")
    // Stop video when closing video modal
    if (closeBtn.closest("#videoModal")) {
      videoIframe.src = ""
    }
  })
})

// Close modal when clicking outside
document.querySelectorAll(".modal").forEach((modal) => {
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.remove("active")
      if (modal.id === "videoModal") {
        videoIframe.src = ""
      }
    }
  })
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

// Smooth Scroll for Navigation
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

// Navbar Background on Scroll
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar")
  if (window.scrollY > 100) {
    navbar.style.background = "rgba(10, 10, 10, 1)"
  } else {
    navbar.style.background = "rgba(10, 10, 10, 0.95)"
  }
})
