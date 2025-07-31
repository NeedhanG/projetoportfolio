// Import Lucide icons library
import lucide from "lucide"

// Import Leaflet library for map functionality
import L from "leaflet"

// Inicialização dos ícones Lucide
lucide.createIcons()

// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById("mobileMenuBtn")
const mobileMenu = document.getElementById("mobileMenu")

mobileMenuBtn.addEventListener("click", () => {
  mobileMenu.classList.toggle("active")
})

// Fechar menu mobile ao clicar em um link
const mobileNavLinks = document.querySelectorAll(".mobile-nav-link")
mobileNavLinks.forEach((link) => {
  link.addEventListener("click", () => {
    mobileMenu.classList.remove("active")
  })
})

// Smooth scroll para links de navegação
const navLinks = document.querySelectorAll('a[href^="#"]')
navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault()
    const targetId = link.getAttribute("href")
    const targetSection = document.querySelector(targetId)

    if (targetSection) {
      const headerHeight = document.querySelector(".header").offsetHeight
      const targetPosition = targetSection.offsetTop - headerHeight

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      })
    }
  })
})

// Inicializar Mapa
function initMap() {
  // Coordenadas da Av. Paulista, 1000 - São Paulo/SP
  const lat = -23.5613
  const lng = -46.6565

  // Criar o mapa
  const map = L.map("map").setView([lat, lng], 16)

  // Adicionar tiles do OpenStreetMap
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "© OpenStreetMap contributors",
  }).addTo(map)

  // Adicionar marcador
  const marker = L.marker([lat, lng]).addTo(map)

  // Popup do marcador
  marker
    .bindPopup(`
        <div style="text-align: center; padding: 10px;">
            <strong>Dr. Ricardo Silva</strong><br>
            Advocacia & Consultoria<br>
            <small>Av. Paulista, 1000 - São Paulo/SP</small>
        </div>
    `)
    .openPopup()
}

// Inicializar mapa quando a página carregar
document.addEventListener("DOMContentLoaded", () => {
  // Verificar se o elemento do mapa existe
  if (document.getElementById("map")) {
    initMap()
  }
})

// Animação de scroll para elementos
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

// Aplicar animação aos cards
document.addEventListener("DOMContentLoaded", () => {
  const animatedElements = document.querySelectorAll(".area-card, .depoimento-card")

  animatedElements.forEach((el) => {
    el.style.opacity = "0"
    el.style.transform = "translateY(20px)"
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease"
    observer.observe(el)
  })
})

// Função para WhatsApp
function openWhatsApp(message = "") {
  const phone = "5511999999999" // Número do WhatsApp
  const defaultMessage = "Olá! Gostaria de agendar uma consulta gratuita."
  const finalMessage = message || defaultMessage
  const url = `https://wa.me/${phone}?text=${encodeURIComponent(finalMessage)}`
  window.open(url, "_blank")
}

// Adicionar evento aos botões de WhatsApp
document.addEventListener("DOMContentLoaded", () => {
  const whatsappButtons = document.querySelectorAll(".btn-primary")
  whatsappButtons.forEach((btn) => {
    if (btn.textContent.includes("WhatsApp") || btn.textContent.includes("Consulta")) {
      btn.addEventListener("click", (e) => {
        e.preventDefault()
        openWhatsApp()
      })
    }
  })
})

// Header scroll effect
window.addEventListener("scroll", () => {
  const header = document.querySelector(".header")
  if (window.scrollY > 100) {
    header.style.backgroundColor = "rgba(255, 255, 255, 0.98)"
    header.style.boxShadow = "0 1px 3px 0 rgba(0, 0, 0, 0.1)"
  } else {
    header.style.backgroundColor = "rgba(255, 255, 255, 0.95)"
    header.style.boxShadow = "none"
  }
})

// Formulário de contato (se necessário no futuro)
function handleContactForm(event) {
  event.preventDefault()

  // Aqui você pode adicionar a lógica para enviar o formulário
  // Por exemplo, enviar para um serviço de email ou API

  alert("Mensagem enviada com sucesso! Entraremos em contato em breve.")
}

// Lazy loading para imagens
document.addEventListener("DOMContentLoaded", () => {
  const images = document.querySelectorAll('img[src*="placeholder"]')

  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target
        img.style.opacity = "0"
        img.style.transition = "opacity 0.3s"

        setTimeout(() => {
          img.style.opacity = "1"
        }, 100)

        observer.unobserve(img)
      }
    })
  })

  images.forEach((img) => imageObserver.observe(img))
})

// Função para destacar seção ativa na navegação
function highlightActiveSection() {
  const sections = document.querySelectorAll("section[id]")
  const navLinks = document.querySelectorAll(".nav-link")

  let current = ""

  sections.forEach((section) => {
    const sectionTop = section.offsetTop
    const sectionHeight = section.clientHeight

    if (window.scrollY >= sectionTop - 200) {
      current = section.getAttribute("id")
    }
  })

  navLinks.forEach((link) => {
    link.classList.remove("active")
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active")
    }
  })
}

window.addEventListener("scroll", highlightActiveSection)

// Adicionar classe active ao CSS
const style = document.createElement("style")
style.textContent = `
    .nav-link.active {
        color: #d97706 !important;
        font-weight: 600;
    }
`
document.head.appendChild(style)
