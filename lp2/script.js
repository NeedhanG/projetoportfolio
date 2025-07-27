// Mobile Menu Toggle
document.addEventListener("DOMContentLoaded", () => {
  const mobileMenuBtn = document.getElementById("mobileMenuBtn")
  const navMenu = document.getElementById("navMenu")

  if (mobileMenuBtn && navMenu) {
    mobileMenuBtn.addEventListener("click", () => {
      navMenu.classList.toggle("active")
    })
  }

  // Smooth scrolling for navigation links
  const navLinks = document.querySelectorAll('a[href^="#"]')

  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault()

      const targetId = this.getAttribute("href")
      const targetSection = document.querySelector(targetId)

      if (targetSection) {
        const headerHeight = document.querySelector(".header").offsetHeight
        const targetPosition = targetSection.offsetTop - headerHeight

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        })

        // Close mobile menu if open
        if (navMenu.classList.contains("active")) {
          navMenu.classList.remove("active")
        }
      }
    })
  })

  // Add scroll effect to header
  window.addEventListener("scroll", () => {
    const header = document.querySelector(".header")

    if (window.scrollY > 100) {
      header.style.backgroundColor = "rgba(255, 255, 255, 0.98)"
    } else {
      header.style.backgroundColor = "rgba(255, 255, 255, 0.95)"
    }
  })

  // Add animation on scroll for feature cards
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1"
        entry.target.style.transform = "translateY(0)"
      }
    })
  }, observerOptions)

  // Observe feature cards, testimonials, and pricing cards
  const animatedElements = document.querySelectorAll(".feature-card, .testimonial-card, .pricing-card")

  animatedElements.forEach((el) => {
    el.style.opacity = "0"
    el.style.transform = "translateY(20px)"
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease"
    observer.observe(el)
  })

  // Form handling for buttons (you can customize this)
  const ctaButtons = document.querySelectorAll(".btn-primary")

  ctaButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      if (this.textContent.includes("Contato") || this.textContent.includes("Entre em Contato")) {
        e.preventDefault()
        alert("Redirecionando para página de contato...")
        // Here you would redirect to your contact page
        // window.location.href = '/contact';
      } else if (this.textContent.includes("Saiba Mais")) {
        e.preventDefault()
        // Scroll to features section
        document.getElementById("features").scrollIntoView({ behavior: "smooth" })
      }
    })
  })

  // Demo button handling
  const demoButtons = document.querySelectorAll(".btn-outline")

  demoButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      if (this.textContent.includes("Serviços") || this.textContent.includes("Nossos Serviços")) {
        e.preventDefault()
        // Scroll to features section
        document.getElementById("features").scrollIntoView({ behavior: "smooth" })
      } else if (this.textContent.includes("Trabalho") || this.textContent.includes("Conheça")) {
        e.preventDefault()
        // Scroll to testimonials section
        document.getElementById("testimonials").scrollIntoView({ behavior: "smooth" })
      }
    })
  })
})

// Add mobile menu styles dynamically
const style = document.createElement("style")
style.textContent = `
    @media (max-width: 768px) {
        .nav-menu {
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background-color: white;
            border-top: 1px solid #e5e7eb;
            flex-direction: column;
            padding: 20px;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
            transform: translateY(-100%);
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
        }
        
        .nav-menu.active {
            display: flex;
            transform: translateY(0);
            opacity: 1;
            visibility: visible;
        }
        
        .nav-menu .nav-link {
            padding: 12px 0;
            border-bottom: 1px solid #f3f4f6;
        }
        
        .nav-menu .nav-link:last-child {
            border-bottom: none;
        }
    }
`
document.head.appendChild(style)
