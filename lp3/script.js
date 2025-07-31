// Configurações
const WHATSAPP_NUMBER = "5511999999999"
const PHONE_NUMBER = "1199999999"
let gtag // Declare the gtag variable

// Função para abrir WhatsApp
function openWhatsApp() {
  const message = encodeURIComponent("Olá! Gostaria de agendar uma consulta de avaliação.")
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`
  window.open(url, "_blank")
}

// Função para ligar
function callPhone() {
  window.open(`tel:+${PHONE_NUMBER}`, "_self")
}

// Função para rolar para seção
function scrollToSection(sectionId) {
  const element = document.getElementById(sectionId)
  if (element) {
    const headerHeight = 80
    const elementPosition = element.offsetTop - headerHeight

    window.scrollTo({
      top: elementPosition,
      behavior: "smooth",
    })
  }
}

// Função para rolar para o topo
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  })
}

// Toggle do menu mobile
function toggleMobileMenu() {
  const mobileMenu = document.getElementById("mobileMenu")
  mobileMenu.classList.toggle("active")
}

// Fechar menu mobile
function closeMobileMenu() {
  const mobileMenu = document.getElementById("mobileMenu")
  mobileMenu.classList.remove("active")
}

// Controle do botão "Voltar ao Topo"
function handleBackToTop() {
  const backToTopBtn = document.getElementById("backToTop")

  if (window.scrollY > 300) {
    backToTopBtn.classList.add("visible")
  } else {
    backToTopBtn.classList.remove("visible")
  }
}

// Animações de entrada
function handleScrollAnimations() {
  const elements = document.querySelectorAll(".treatment-card, .testimonial-card, .result-card")

  elements.forEach((element, index) => {
    const elementTop = element.getBoundingClientRect().top
    const elementVisible = 150

    if (elementTop < window.innerHeight - elementVisible) {
      setTimeout(() => {
        element.style.opacity = "1"
        element.style.transform = "translateY(0)"
      }, index * 100)
    }
  })
}

// Smooth scroll para links de navegação
function handleNavigation() {
  const navLinks = document.querySelectorAll(".nav-link, .mobile-nav-link")

  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault()
      const targetId = link.getAttribute("href").substring(1)
      scrollToSection(targetId)

      // Fechar menu mobile se estiver aberto
      closeMobileMenu()
    })
  })
}

// Efeito parallax suave
function handleParallax() {
  const scrolled = window.pageYOffset
  const parallaxElements = document.querySelectorAll(".decoration")

  parallaxElements.forEach((element, index) => {
    const speed = 0.5 + index * 0.1
    const yPos = -(scrolled * speed)
    element.style.transform = `translateY(${yPos}px)`
  })
}

// Lazy loading para imagens
function handleLazyLoading() {
  const images = document.querySelectorAll("img[data-src]")

  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target
        img.src = img.dataset.src
        img.classList.remove("lazy")
        imageObserver.unobserve(img)
      }
    })
  })

  images.forEach((img) => imageObserver.observe(img))
}

// Contador animado para estatísticas
function animateCounters() {
  const counters = document.querySelectorAll(".stat-number")

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const counter = entry.target
        const target = Number.parseInt(counter.textContent.replace(/\D/g, ""))
        const suffix = counter.textContent.replace(/\d/g, "")
        let current = 0
        const increment = target / 50

        const updateCounter = () => {
          if (current < target) {
            current += increment
            counter.textContent = Math.ceil(current) + suffix
            requestAnimationFrame(updateCounter)
          } else {
            counter.textContent = target + suffix
          }
        }

        updateCounter()
        counterObserver.unobserve(counter)
      }
    })
  })

  counters.forEach((counter) => counterObserver.observe(counter))
}

// Efeito de digitação para o título
function typewriterEffect() {
  const titles = document.querySelectorAll(".hero-title span")

  titles.forEach((title, index) => {
    const text = title.textContent
    title.textContent = ""
    title.style.opacity = "1"

    setTimeout(() => {
      let i = 0
      const typeInterval = setInterval(() => {
        if (i < text.length) {
          title.textContent += text.charAt(i)
          i++
        } else {
          clearInterval(typeInterval)
        }
      }, 100)
    }, index * 1000)
  })
}

// Validação de formulário (se houver)
function validateForm(form) {
  const inputs = form.querySelectorAll("input[required], textarea[required]")
  let isValid = true

  inputs.forEach((input) => {
    if (!input.value.trim()) {
      input.classList.add("error")
      isValid = false
    } else {
      input.classList.remove("error")
    }
  })

  return isValid
}

// Notificações toast
function showToast(message, type = "success") {
  const toast = document.createElement("div")
  toast.className = `toast toast-${type}`
  toast.textContent = message

  toast.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === "success" ? "#10b981" : "#ef4444"};
        color: white;
        padding: 16px 24px;
        border-radius: 8px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.1);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `

  document.body.appendChild(toast)

  setTimeout(() => {
    toast.style.transform = "translateX(0)"
  }, 100)

  setTimeout(() => {
    toast.style.transform = "translateX(100%)"
    setTimeout(() => {
      document.body.removeChild(toast)
    }, 300)
  }, 3000)
}

// Tracking de eventos (Google Analytics)
function trackEvent(action, category = "User Interaction", label = "") {
  if (typeof gtag !== "undefined") {
    gtag("event", action, {
      event_category: category,
      event_label: label,
    })
  }
}

// Event Listeners
document.addEventListener("DOMContentLoaded", () => {
  // Inicializar funcionalidades
  handleNavigation()
  handleLazyLoading()
  animateCounters()

  // Event listeners para scroll
  window.addEventListener("scroll", () => {
    handleBackToTop()
    handleScrollAnimations()
    handleParallax()
  })

  // Event listeners para botões
  document.querySelectorAll('[onclick*="openWhatsApp"]').forEach((btn) => {
    btn.addEventListener("click", () => {
      trackEvent("WhatsApp Click", "Contact", "CTA Button")
    })
  })

  // Fechar menu mobile ao clicar fora
  document.addEventListener("click", (e) => {
    const mobileMenu = document.getElementById("mobileMenu")
    const menuBtn = document.querySelector(".mobile-menu-btn")

    if (!mobileMenu.contains(e.target) && !menuBtn.contains(e.target)) {
      closeMobileMenu()
    }
  })

  // Prevenção de spam em formulários
  let lastSubmission = 0
  document.querySelectorAll("form").forEach((form) => {
    form.addEventListener("submit", (e) => {
      const now = Date.now()
      if (now - lastSubmission < 3000) {
        e.preventDefault()
        showToast("Aguarde alguns segundos antes de enviar novamente.", "error")
        return
      }
      lastSubmission = now
    })
  })

  // Smooth scroll para navegação interna
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute("href"))
      if (target) {
        const headerHeight = 80
        const elementPosition = target.offsetTop - headerHeight

        window.scrollTo({
          top: elementPosition,
          behavior: "smooth",
        })
      }
    })
  })

  // Inicializar animações de entrada
  setTimeout(() => {
    handleScrollAnimations()
  }, 500)

  // Performance: debounce para eventos de scroll
  let scrollTimeout
  window.addEventListener("scroll", () => {
    if (scrollTimeout) {
      clearTimeout(scrollTimeout)
    }
    scrollTimeout = setTimeout(() => {
      handleBackToTop()
      handleScrollAnimations()
    }, 10)
  })
})

// Função para otimização de performance
function debounce(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

// Aplicar debounce aos eventos de scroll
const debouncedScroll = debounce(() => {
  handleBackToTop()
  handleScrollAnimations()
  handleParallax()
}, 16)

window.addEventListener("scroll", debouncedScroll)

// Service Worker para cache (opcional)
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js")
      .then((registration) => {
        console.log("SW registered: ", registration)
      })
      .catch((registrationError) => {
        console.log("SW registration failed: ", registrationError)
      })
  })
}

// Função para detectar dispositivo móvel
function isMobile() {
  return window.innerWidth <= 768
}

// Ajustar comportamento baseado no dispositivo
function adjustForDevice() {
  if (isMobile()) {
    // Desabilitar parallax em mobile para melhor performance
    document.querySelectorAll(".decoration").forEach((el) => {
      el.style.transform = "none"
    })

    // Reduzir animações em dispositivos móveis
    document.documentElement.style.setProperty("--animation-duration", "0.3s")
  }
}

// Executar ajustes no carregamento e redimensionamento
window.addEventListener("load", adjustForDevice)
window.addEventListener("resize", debounce(adjustForDevice, 250))

// Preload de imagens críticas
function preloadImages() {
  const criticalImages = [
    "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881",
    "https://images.unsplash.com/photo-1559839734-2b71ea197ec2",
  ]

  criticalImages.forEach((src) => {
    const img = new Image()
    img.src = src
  })
}

// Executar preload
preloadImages()
