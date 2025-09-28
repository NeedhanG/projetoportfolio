document.addEventListener('DOMContentLoaded', () => {
    const propertyGrid = document.getElementById('property-grid');
    const propertyModal = document.getElementById('property-modal');
    const closeModalButton = propertyModal.querySelector('.close-button');
    const modalDetails = document.getElementById('modal-details');
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav');

    // Substitua esta URL pela sua URL do App Web do Google Apps Script
    const API_URL = 'https://script.google.com/macros/s/AKfycbyrLF5gkNzMIJZww1bwqHTzucXbfldc6jmqFuTctmRiQl4JAbIp7ds4wwcGBCeGhXBL/exec';

    // Função para buscar e exibir imóveis
    const fetchAndDisplayProperties = async () => {
        propertyGrid.innerHTML = '<p class="loading-message">Carregando imóveis...</p>'; // Mensagem de carregamento

        try {
            const response = await fetch(`${API_URL}?action=getProperties`);
            const data = await response.json();

            if (data.status === 'success') {
                const properties = data.properties.filter(p => p.status === 'disponivel');
                if (properties.length === 0) {
                    propertyGrid.innerHTML = '<p class="no-properties">Nenhum imóvel disponível no momento.</p>';
                    return;
                }

                propertyGrid.innerHTML = ''; // Limpa a mensagem de carregamento
                properties.forEach(property => {
                    const card = createPropertyCard(property);
                    propertyGrid.appendChild(card);
                });
            } else {
                console.error("Erro na API ao buscar imóveis:", data.message);
                propertyGrid.innerHTML = `<p class="error-message">Erro ao carregar imóveis: ${data.message}.</p>`;
            }
        } catch (error) {
            console.error("Erro ao buscar imóveis: ", error);
            propertyGrid.innerHTML = '<p class="error-message">Erro ao carregar imóveis. Tente novamente mais tarde.</p>';
        }
    };

    // Função para criar um card de imóvel
    const createPropertyCard = (property) => {
        const card = document.createElement('div');
        card.classList.add('property-card');
        card.dataset.id = property.id; // Armazenar o ID do documento

        const shortDescription = property.description.length > 100 
            ? property.description.substring(0, 97) + '...' 
            : property.description;

        card.innerHTML = `
            <img src="${property.imageUrl || 'https://via.placeholder.com/300x200?text=Imovel'}" alt="${property.title}">
            <div class="property-card-content">
                <h3>${property.title}</h3>
                <p class="price">R$ ${parseFloat(property.price).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                <p class="description">${shortDescription}</p>
                <button class="btn btn-details" data-id="${property.id}">Ver Mais</button>
            </div>
        `;

        // Adiciona evento de clique ao botão "Ver Mais"
        card.querySelector('.btn-details').addEventListener('click', () => openPropertyModal(property.id));
        return card;
    };

    // Função para abrir o modal de detalhes do imóvel
    const openPropertyModal = async (id) => {
        try {
            const response = await fetch(`${API_URL}?action=getProperty&id=${id}`);
            const data = await response.json();

            if (data.status === 'success' && data.property) {
                const property = data.property;

                modalDetails.innerHTML = `
                    <img src="${property.imageUrl || 'https://via.placeholder.com/600x400?text=Detalhes+do+Imovel'}" alt="${property.title}" class="modal-image">
                    <h3>${property.title}</h3>
                    <p class="modal-price">R$ ${parseFloat(property.price).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                    <p class="modal-description">${property.description}</p>
                    <!-- Adicionar mais detalhes aqui se necessário, como localização, quartos, banheiros, etc. -->
                `;
                propertyModal.style.display = 'flex'; // Exibe o modal
            } else {
                console.error("Erro na API ao buscar detalhes do imóvel:", data.message);
                alert("Não foi possível carregar os detalhes do imóvel.");
            }
        } catch (error) {
            console.error("Erro ao carregar detalhes do imóvel: ", error);
            alert("Não foi possível carregar os detalhes do imóvel.");
        }
    };

    // Função para fechar o modal
    const closePropertyModal = () => {
        propertyModal.style.display = 'none';
    };

    // Event Listeners
    closeModalButton.addEventListener('click', closePropertyModal);

    // Fechar modal ao clicar fora
    window.addEventListener('click', (event) => {
        if (event.target == propertyModal) {
            closePropertyModal();
        }
    });

    // Toggle do menu de navegação para mobile
    menuToggle.addEventListener('click', () => {
        mainNav.classList.toggle('active');
        // Opcional: Animar o ícone do menu
        // menuToggle.querySelector('i').classList.toggle('fa-bars');
        // menuToggle.querySelector('i').classList.toggle('fa-times');
    });

    // Carregar imóveis ao iniciar
    fetchAndDisplayProperties();
});