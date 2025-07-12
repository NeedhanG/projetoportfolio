// --- SCRIPT PARA O ACORDEÃO DO FAQ ---

// 1. Seleciona todos os itens do FAQ
const faqItems = document.querySelectorAll('.faq-item');

// 2. Adiciona um "ouvinte de clique" a cada item
faqItems.forEach(item => {
    // Seleciona a parte da pergunta dentro do item
    const question = item.querySelector('.faq-question');

    question.addEventListener('click', () => {
        // Verifica se o item clicado já está ativo
        const isActive = item.classList.contains('active');

        // Opcional: Fecha todos os outros itens abertos para ter apenas um aberto por vez
        faqItems.forEach(otherItem => {
            otherItem.classList.remove('active');
        });

        // Se o item não estava ativo, abre ele. Se estava, ele permanecerá fechado (pelo passo anterior).
        if (!isActive) {
            item.classList.add('active');
        }
    });
});