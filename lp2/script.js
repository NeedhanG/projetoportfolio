// Aguarda o documento HTML ser completamente carregado para executar o script.
document.addEventListener("DOMContentLoaded", () => {

  // --- 1. LÓGICA DO MENU MOBILE ---
  const mobileMenuBtn = document.getElementById("mobileMenuBtn");
  const navMenu = document.getElementById("navMenu");

  // Adiciona um evento de clique ao botão do menu mobile.
  if (mobileMenuBtn && navMenu) {
    mobileMenuBtn.addEventListener("click", () => {
      // Adiciona ou remove a classe 'active' do menu, fazendo-o aparecer ou desaparecer.
      navMenu.classList.toggle("active");
    });
  }


  // --- 2. LÓGICA DE ROLAGEM SUAVE (SMOOTH SCROLL) ---
  // Seleciona todos os links que apontam para uma âncora (#) na página.
  const navLinks = document.querySelectorAll('a[href^="#"]');

  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault(); // Impede o comportamento padrão do link.

      const targetId = this.getAttribute("href");
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        // Calcula a posição do topo da seção, descontando a altura do header.
        const headerHeight = document.querySelector(".header").offsetHeight;
        const targetPosition = targetSection.offsetTop - headerHeight;

        // Rola a página suavemente até a posição calculada.
        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });

        // Fecha o menu mobile se ele estiver aberto após o clique.
        if (navMenu.classList.contains("active")) {
          navMenu.classList.remove("active");
        }
      }
    });
  });


  // --- 3. EFEITO NO HEADER AO ROLAR A PÁGINA ---
  window.addEventListener("scroll", () => {
    const header = document.querySelector(".header");
    // Adiciona um leve sombreamento ao header quando o usuário rola a página.
    if (window.scrollY > 50) {
      header.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.05)";
    } else {
      header.style.boxShadow = "none";
    }
  });


  // --- 4. ANIMAÇÃO DE ELEMENTOS AO APARECEREM NA TELA (Intersection Observer) ---
  const observerOptions = {
    threshold: 0.1, // O elemento é considerado "visível" quando 10% dele estiver na tela.
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      // Se o elemento estiver visível na tela.
      if (entry.isIntersecting) {
        // Adiciona a classe 'is-visible' para ativar a animação CSS.
        entry.target.classList.add("is-visible");
      }
    });
  }, observerOptions);

  // Seleciona todos os elementos que devem ser animados.
  const animatedElements = document.querySelectorAll(".feature-card, .testimonial-card, .pricing-card");

  // Aplica o observador a cada elemento.
  animatedElements.forEach((el) => {
    observer.observe(el);
  });


  // --- 5. INTERAÇÃO DOS BOTÕES PRINCIPAIS (CTA) ---
  // Apenas um exemplo de como adicionar interatividade.
  const ctaButtons = document.querySelectorAll(".btn");

  ctaButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      const buttonText = this.textContent.trim();

      if (buttonText === "Contato" || buttonText === "Entre em Contato") {
        e.preventDefault();
        // Aqui você poderia redirecionar para uma página de contato ou abrir um formulário.
        alert("Ação para o botão de contato!");
      } else if (buttonText === "Saiba Mais" || buttonText === "Nossos Serviços") {
        e.preventDefault();
        // Rola até a seção de funcionalidades.
        document.getElementById("features").scrollIntoView({ behavior: "smooth" });
      }
    });
  });
});