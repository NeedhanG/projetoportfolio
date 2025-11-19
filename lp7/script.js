// Toggle FAQ items
function toggleFaq(button) {
  const faqItem = button.parentElement
  const isActive = faqItem.classList.contains("active")

  // Close all other open FAQ items
  document.querySelectorAll(".faq-item.active").forEach((item) => {
    if (item !== faqItem) {
      item.classList.remove("active")
    }
  })

  // Toggle current item
  if (isActive) {
    faqItem.classList.remove("active")
  } else {
    faqItem.classList.add("active")
  }
}

// Smooth scrolling for navigation links
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

// Close FAQ when clicking outside
document.addEventListener("click", (e) => {
  if (!e.target.closest(".faq-item")) {
    document.querySelectorAll(".faq-item.active").forEach((item) => {
      if (!e.target.closest(".faq-header")) {
        item.classList.remove("active")
      }
    })
  }
})

// Add button click handlers
document.querySelectorAll(".btn-primary, .btn-outline").forEach((btn) => {
  btn.addEventListener("click", () => {
    alert("Entre em contato para agendar sua sessão!\nWhatsApp: (11) 98765-4321\nEmail: marina@email.com")
  })
})
