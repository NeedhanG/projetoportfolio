document.addEventListener('DOMContentLoaded', () => {
    const propertyGrid = document.getElementById('property-grid');
    const propertyModal = document.getElementById('property-modal');
    const closeModalButton = propertyModal.querySelector('.close-button');
    const modalDetails = document.getElementById('modal-details');
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav');

    // Firebase Firestore (db já inicializado no index.html)
    const propertiesRef = db.collection('properties');

    // Função para buscar e exibir imóveis
    const fetchAndDisplayProperties = async () => {
        propertyGrid.innerHTML = '<p class="loading-message">Carregando imóveis...</p>'; // Mensagem de carregamento

        try {
            const snapshot = await propertiesRef.where('status', '==', 'disponivel').get();
            if (snapshot.empty) {
                propertyGrid.innerHTML = '<p class="no-properties">Nenhum imóvel disponível no momento.</p>';
                return;
            }

            propertyGrid.innerHTML = ''; // Limpa a mensagem de carregamento
            snapshot.forEach(doc => {
                const property = doc.data();
                const propertyId = doc.id;
                const card = createPropertyCard(property, propertyId);
                propertyGrid.appendChild(card);
            });
        } catch (error) {
            console.error("Erro ao buscar imóveis: ", error);
            propertyGrid.innerHTML = '<p class="error-message">Erro ao carregar imóveis. Tente novamente mais tarde.</p>';
        }
    };

    // Função para criar um card de imóvel
    const createPropertyCard = (property, id) => {
        const card = document.createElement('div');
        card.classList.add('property-card');
        card.dataset.id = id; // Armazenar o ID do documento do Firebase

        const shortDescription = property.description.length > 100 
            ? property.description.substring(0, 97) + '...' 
            : property.description;

        card.innerHTML = `
            <img src="${property.imageUrl || 'https://via.placeholder.com/300x200?text=Imovel'}" alt="${property.title}">
            <div class="property-card-content">
                <h3>${property.title}</h3>
                <p class="price">R$ ${parseFloat(property.price).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                <p class="description">${shortDescription}</p>
                <button class="btn btn-details" data-id="${id}">Ver Mais</button>
            </div>
        `;

        // Adiciona evento de clique ao botão "Ver Mais"
        card.querySelector('.btn-details').addEventListener('click', () => openPropertyModal(id));
        return card;
    };

    // Função para abrir o modal de detalhes do imóvel
    const openPropertyModal = async (id) => {
        try {
            const doc = await propertiesRef.doc(id).get();
            if (!doc.exists) {
                console.error("Imóvel não encontrado!");
                alert("Imóvel não encontrado.");
                return;
            }
            const property = doc.data();

            modalDetails.innerHTML = `
                <img src="${property.imageUrl || 'https://via.placeholder.com/600x400?text=Detalhes+do+Imovel'}" alt="${property.title}" class="modal-image">
                <h3>${property.title}</h3>
                <p class="modal-price">R$ ${parseFloat(property.price).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                <p class="modal-description">${property.description}</p>
                <!-- Adicionar mais detalhes aqui se necessário, como localização, quartos, banheiros, etc. -->
            `;
            propertyModal.style.display = 'flex'; // Exibe o modal
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