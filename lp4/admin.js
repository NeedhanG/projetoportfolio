document.addEventListener('DOMContentLoaded', () => {
    // Substitua esta URL pela sua URL do App Web do Google Apps Script
    const API_URL = 'https://script.google.com/macros/s/AKfycbyrLF5gkNzMIJZww1bwqHTzucXbfldc6jmqFuTctmRiQl4JAbIp7ds4wwcGBCeGhXBL/exec';

    // Referências aos elementos do DOM
    const authSection = document.getElementById('auth-section'); // Mantido, mas oculto via CSS e JS
    const adminDashboard = document.getElementById('admin-dashboard');
    // As referências de login e logout foram removidas, pois a autenticação Firebase foi desativada.
    // O dashboard agora é acessível diretamente (sem proteção).

    const propertyForm = document.getElementById('property-form');
    const propertyIdInput = document.getElementById('property-id');
    const propertyImageUrlInput = document.getElementById('property-image-url'); // Alterado para URL
    const currentImagePreview = document.getElementById('current-image-preview');
    const propertyTitleInput = document.getElementById('property-title');
    const propertyPriceInput = document.getElementById('property-price');
    const propertyDescriptionInput = document.getElementById('property-description');
    const propertyStatusSelect = document.getElementById('property-status');
    const submitPropertyBtn = document.getElementById('submit-property-btn');
    const formTitle = document.getElementById('form-title');
    const formMessage = document.getElementById('form-message');
    const adminPropertyList = document.getElementById('admin-property-list');

    let editingPropertyId = null; // Variável para controlar a edição

    // Removendo funções de autenticação. O dashboard será exibido diretamente.
    // ATENÇÃO: Isso torna seu painel administrativo SEM PROTEÇÃO.
    // Implemente autenticação no seu Google Apps Script se isso for um sistema real.
    adminDashboard.style.display = 'block'; // Garante que o dashboard esteja visível

    // --- Funções de Gerenciamento de Imóveis (usando o Apps Script API) ---

    // Função para exibir mensagem no formulário
    const showFormMessage = (message, isError = false) => {
        formMessage.textContent = message;
        formMessage.style.color = isError ? '#f44336' : 'green';
        formMessage.style.display = 'block';
        setTimeout(() => {
            formMessage.style.display = 'none';
        }, 3000);
    };

    // Resetar formulário
    const resetPropertyForm = () => {
        propertyForm.reset();
        propertyIdInput.value = '';
        propertyImageUrlInput.value = ''; // Limpa o input de URL
        currentImagePreview.style.display = 'none';
        currentImagePreview.src = '';
        formTitle.textContent = 'Cadastrar Novo Imóvel';
        submitPropertyBtn.textContent = 'Cadastrar Imóvel';
        editingPropertyId = null;
    };

    // Submissão do formulário (Adicionar/Editar Imóvel)
    propertyForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const title = propertyTitleInput.value;
        const price = parseFloat(propertyPriceInput.value);
        const description = propertyDescriptionInput.value;
        const status = propertyStatusSelect.value;
        const imageUrl = propertyImageUrlInput.value; // Pega a URL da imagem do input de texto

        if (!title || isNaN(price) || !description || !status) {
            showFormMessage('Por favor, preencha todos os campos.', true);
            return;
        }

        submitPropertyBtn.disabled = true;
        submitPropertyBtn.textContent = editingPropertyId ? 'Salvando...' : 'Cadastrando...';

        try {
            const propertyData = {
                title,
                price,
                description,
                status,
                imageUrl // A URL da imagem fornecida pelo usuário
            };

            let response;
            if (editingPropertyId) {
                // Atualizar imóvel existente
                propertyData.id = editingPropertyId; // Envia o ID para a API saber qual atualizar
                response = await fetch(API_URL, {
                    method: 'POST',
                    mode: 'cors',
                    cache: 'no-cache',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ action: 'updateProperty', property: propertyData })
                });
            } else {
                // Adicionar novo imóvel
                response = await fetch(API_URL, {
                    method: 'POST',
                    mode: 'cors',
                    cache: 'no-cache',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ action: 'addProperty', property: propertyData })
                });
            }

            const result = await response.json();

            if (result.status === 'success') {
                showFormMessage(editingPropertyId ? 'Imóvel atualizado com sucesso!' : 'Imóvel cadastrado com sucesso!');
                resetPropertyForm();
                fetchAndDisplayAdminProperties(); // Recarrega a lista
            } else {
                showFormMessage('Erro ao salvar imóvel: ' + (result.message || 'Erro desconhecido.'), true);
            }
        } catch (error) {
            console.error("Erro ao salvar imóvel:", error);
            showFormMessage('Erro de rede ou API: ' + error.message, true);
        } finally {
            submitPropertyBtn.disabled = false;
            submitPropertyBtn.textContent = editingPropertyId ? 'Atualizar Imóvel' : 'Cadastrar Imóvel';
        }
    });

    // Função para carregar e exibir a lista de imóveis no painel administrativo
    const fetchAndDisplayAdminProperties = async () => {
        adminPropertyList.innerHTML = '<tr><td colspan="5">Carregando imóveis...</td></tr>';
        try {
            const response = await fetch(`${API_URL}?action=getProperties`);
            const data = await response.json();

            if (data.status === 'success') {
                const properties = data.properties;
                if (properties.length === 0) {
                    adminPropertyList.innerHTML = '<tr><td colspan="5">Nenhum imóvel cadastrado.</td></tr>';
                    return;
                }

                adminPropertyList.innerHTML = ''; // Limpa a mensagem de carregamento
                properties.forEach(property => {
                    const row = createPropertyTableRow(property);
                    adminPropertyList.appendChild(row);
                });
            } else {
                console.error("Erro na API ao buscar imóveis para admin:", data.message);
                adminPropertyList.innerHTML = `<tr><td colspan="5" style="color:#f44336;">Erro ao carregar imóveis: ${data.message}.</td></tr>`;
            }
        } catch (error) {
            console.error("Erro ao buscar imóveis para admin:", error);
            adminPropertyList.innerHTML = '<tr><td colspan="5" style="color:#f44336;">Erro de rede ou API ao carregar imóveis.</td></tr>';
        }
    };

    // Função para criar uma linha da tabela de imóvel
    const createPropertyTableRow = (property) => {
        const row = document.createElement('tr');
        row.dataset.id = property.id; // Assume que o ID vem da API

        const priceFormatted = parseFloat(property.price).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        const statusClass = property.status === 'disponivel' ? 'disponivel' : 'vendido';

        row.innerHTML = `
            <td><img src="${property.imageUrl || 'https://via.placeholder.com/80x60?text=Sem+Foto'}" alt="${property.title}"></td>
            <td>${property.title}</td>
            <td>${priceFormatted}</td>
            <td><span class="status-badge ${statusClass}">${property.status.toUpperCase()}</span></td>
            <td class="actions">
                <button class="edit-btn" data-id="${property.id}" title="Editar Imóvel"><i class="fas fa-edit"></i></button>
                <button class="delete-btn" data-id="${property.id}" title="Excluir Imóvel"><i class="fas fa-trash-alt"></i></button>
            </td>
        `;

        // Adiciona listeners para os botões de ação
        row.querySelector('.edit-btn').addEventListener('click', () => editProperty(property.id));
        row.querySelector('.delete-btn').addEventListener('click', () => deleteProperty(property.id)); // Não precisa mais da URL da imagem para exclusão separada
        return row;
    };

    // Função para editar um imóvel
    const editProperty = async (id) => {
        try {
            const response = await fetch(`${API_URL}?action=getProperty&id=${id}`);
            const data = await response.json();

            if (data.status === 'success' && data.property) {
                const property = data.property;

                editingPropertyId = id;
                formTitle.textContent = `Editar Imóvel: ${property.title}`;
                submitPropertyBtn.textContent = 'Atualizar Imóvel';

                propertyIdInput.value = id;
                propertyTitleInput.value = property.title;
                propertyPriceInput.value = property.price;
                propertyDescriptionInput.value = property.description;
                propertyStatusSelect.value = property.status;
                propertyImageUrlInput.value = property.imageUrl || ''; // Preenche com a URL existente

                if (property.imageUrl) {
                    currentImagePreview.src = property.imageUrl;
                    currentImagePreview.style.display = 'block';
                } else {
                    currentImagePreview.style.display = 'none';
                }

                // Rola para o formulário
                propertyForm.scrollIntoView({ behavior: 'smooth', block: 'start' });

            } else {
                console.error("Erro na API ao carregar imóvel para edição:", data.message);
                alert("Erro ao carregar dados do imóvel para edição: " + (data.message || 'Erro desconhecido.'));
            }
        } catch (error) {
            console.error("Erro ao carregar imóvel para edição:", error);
            alert("Erro de rede ou API ao carregar dados do imóvel para edição.");
        }
    };

    // Função para excluir um imóvel
    const deleteProperty = async (id) => {
        if (!confirm("Tem certeza que deseja excluir este imóvel? Esta ação é irreversível.")) {
            return;
        }

        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                mode: 'cors',
                cache: 'no-cache',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ action: 'deleteProperty', id: id })
            });

            const result = await response.json();

            if (result.status === 'success') {
                showFormMessage('Imóvel excluído com sucesso!');
                fetchAndDisplayAdminProperties(); // Recarrega a lista
            } else {
                showFormMessage('Erro ao excluir imóvel: ' + (result.message || 'Erro desconhecido.'), true);
            }
        } catch (error) {
            console.error("Erro ao excluir imóvel:", error);
            alert("Erro de rede ou API ao excluir imóvel: " + error.message);
        }
    };

    // Carrega a lista de imóveis quando o dashboard é exibido (neste caso, na inicialização)
    fetchAndDisplayAdminProperties();

    // Event listener para mostrar a pré-visualização da imagem URL
    propertyImageUrlInput.addEventListener('input', () => {
        const url = propertyImageUrlInput.value;
        if (url) {
            currentImagePreview.src = url;
            currentImagePreview.style.display = 'block';
        } else {
            currentImagePreview.style.display = 'none';
        }
    });
});