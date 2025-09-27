document.addEventListener('DOMContentLoaded', () => {
    // Referências aos elementos do DOM
    const authSection = document.getElementById('auth-section');
    const adminDashboard = document.getElementById('admin-dashboard');
    const loginForm = document.getElementById('login-form');
    const loginEmailInput = document.getElementById('login-email');
    const loginPasswordInput = document.getElementById('login-password');
    const loginErrorMessage = document.getElementById('login-error-message');
    const userEmailDisplay = document.getElementById('user-email-display');
    const logoutButton = document.getElementById('logout-button');

    const propertyForm = document.getElementById('property-form');
    const propertyIdInput = document.getElementById('property-id');
    const propertyImageInput = document.getElementById('property-image');
    const currentImagePreview = document.getElementById('current-image-preview');
    const propertyTitleInput = document.getElementById('property-title');
    const propertyPriceInput = document.getElementById('property-price');
    const propertyDescriptionInput = document.getElementById('property-description');
    const propertyStatusSelect = document.getElementById('property-status');
    const submitPropertyBtn = document.getElementById('submit-property-btn');
    const formTitle = document.getElementById('form-title');
    const formMessage = document.getElementById('form-message');
    const adminPropertyList = document.getElementById('admin-property-list');

    // Referências do Firebase (auth, db, storage já inicializados no admin.html)
    const propertiesRef = db.collection('properties');
    const storageRef = storage.ref();

    let editingPropertyId = null; // Variável para controlar a edição

    // --- Funções de Autenticação ---
    const showAuthSection = () => {
        authSection.style.display = 'flex';
        adminDashboard.style.display = 'none';
        loginEmailInput.value = '';
        loginPasswordInput.value = '';
        loginErrorMessage.style.display = 'none';
    };

    const showAdminDashboard = (userEmail) => {
        authSection.style.display = 'none';
        adminDashboard.style.display = 'block';
        userEmailDisplay.textContent = userEmail;
        fetchAndDisplayAdminProperties(); // Carrega a lista de imóveis ao logar
    };

    // Monitora o estado de autenticação
    auth.onAuthStateChanged((user) => {
        if (user) {
            showAdminDashboard(user.email);
        } else {
            showAuthSection();
        }
    });

    // Login
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = loginEmailInput.value;
        const password = loginPasswordInput.value;

        try {
            await auth.signInWithEmailAndPassword(email, password);
            // onAuthStateChanged cuidará de exibir o dashboard
        } catch (error) {
            console.error("Erro de login:", error);
            loginErrorMessage.textContent = "Erro de login: " + (error.message || "Credenciais inválidas.");
            loginErrorMessage.style.display = 'block';
        }
    });

    // Logout
    logoutButton.addEventListener('click', async () => {
        try {
            await auth.signOut();
            // onAuthStateChanged cuidará de exibir a seção de login
        } catch (error) {
            console.error("Erro ao fazer logout:", error);
            alert("Erro ao fazer logout.");
        }
    });

    // --- Funções de Gerenciamento de Imóveis ---

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
        propertyImageInput.value = ''; // Limpa o input de arquivo
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
        const imageFile = propertyImageInput.files[0];

        if (!title || isNaN(price) || !description || !status) {
            showFormMessage('Por favor, preencha todos os campos.', true);
            return;
        }

        let imageUrl = ''; // URL da imagem, se houver
        let oldImageUrl = ''; // URL da imagem antiga para exclusão (em caso de edição)

        // Se estiver editando e não for uma nova imagem, mantém a URL antiga
        if (editingPropertyId) {
            const doc = await propertiesRef.doc(editingPropertyId).get();
            if (doc.exists && !imageFile) { // Se não enviou nova imagem, mantém a existente
                imageUrl = doc.data().imageUrl || '';
            }
            oldImageUrl = doc.data().imageUrl || ''; // Guarda a URL antiga para possível exclusão
        }

        submitPropertyBtn.disabled = true;
        submitPropertyBtn.textContent = editingPropertyId ? 'Salvando...' : 'Cadastrando...';

        try {
            // Se houver uma nova imagem, faz o upload
            if (imageFile) {
                // Remove a imagem antiga do Storage se estiver editando e houver uma nova imagem
                if (oldImageUrl && oldImageUrl !== imageUrl) {
                    try {
                        const oldImageRef = storage.refFromURL(oldImageUrl);
                        await oldImageRef.delete();
                        console.log("Imagem antiga removida do Storage.");
                    } catch (deleteError) {
                        console.warn("Não foi possível remover imagem antiga do Storage (pode não existir):", deleteError.message);
                    }
                }

                const imageFileName = Date.now() + '-' + imageFile.name;
                const imageUploadTask = storageRef.child('property_images/' + imageFileName).put(imageFile);

                await imageUploadTask;
                imageUrl = await imageUploadTask.snapshot.ref.getDownloadURL();
                showFormMessage('Imagem enviada com sucesso!');
            }

            const propertyData = {
                title,
                price,
                description,
                status,
                imageUrl, // Pode ser vazio se não houver imagem
                updatedAt: firebase.firestore.FieldValue.serverTimestamp()
            };

            if (editingPropertyId) {
                await propertiesRef.doc(editingPropertyId).update(propertyData);
                showFormMessage('Imóvel atualizado com sucesso!');
            } else {
                propertyData.createdAt = firebase.firestore.FieldValue.serverTimestamp();
                await propertiesRef.add(propertyData);
                showFormMessage('Imóvel cadastrado com sucesso!');
            }

            resetPropertyForm();
            fetchAndDisplayAdminProperties(); // Recarrega a lista
        } catch (error) {
            console.error("Erro ao salvar imóvel:", error);
            showFormMessage('Erro ao salvar imóvel: ' + error.message, true);
        } finally {
            submitPropertyBtn.disabled = false;
            submitPropertyBtn.textContent = editingPropertyId ? 'Atualizar Imóvel' : 'Cadastrar Imóvel';
        }
    });

    // Função para carregar e exibir a lista de imóveis no painel administrativo
    const fetchAndDisplayAdminProperties = async () => {
        adminPropertyList.innerHTML = '<tr><td colspan="5">Carregando imóveis...</td></tr>';
        try {
            // Busca todos os imóveis (disponíveis e vendidos)
            const snapshot = await propertiesRef.orderBy('createdAt', 'desc').get();
            if (snapshot.empty) {
                adminPropertyList.innerHTML = '<tr><td colspan="5">Nenhum imóvel cadastrado.</td></tr>';
                return;
            }

            adminPropertyList.innerHTML = ''; // Limpa a mensagem de carregamento
            snapshot.forEach(doc => {
                const property = doc.data();
                const propertyId = doc.id;
                const row = createPropertyTableRow(property, propertyId);
                adminPropertyList.appendChild(row);
            });
        } catch (error) {
            console.error("Erro ao buscar imóveis para admin:", error);
            adminPropertyList.innerHTML = '<tr><td colspan="5" style="color:#f44336;">Erro ao carregar imóveis.</td></tr>';
        }
    };

    // Função para criar uma linha da tabela de imóvel
    const createPropertyTableRow = (property, id) => {
        const row = document.createElement('tr');
        row.dataset.id = id;

        const priceFormatted = parseFloat(property.price).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        const statusClass = property.status === 'disponivel' ? 'disponivel' : 'vendido';

        row.innerHTML = `
            <td><img src="${property.imageUrl || 'https://via.placeholder.com/80x60?text=Sem+Foto'}" alt="${property.title}"></td>
            <td>${property.title}</td>
            <td>${priceFormatted}</td>
            <td><span class="status-badge ${statusClass}">${property.status.toUpperCase()}</span></td>
            <td class="actions">
                <button class="edit-btn" data-id="${id}" title="Editar Imóvel"><i class="fas fa-edit"></i></button>
                <button class="delete-btn" data-id="${id}" title="Excluir Imóvel"><i class="fas fa-trash-alt"></i></button>
            </td>
        `;

        // Adiciona listeners para os botões de ação
        row.querySelector('.edit-btn').addEventListener('click', () => editProperty(id));
        row.querySelector('.delete-btn').addEventListener('click', () => deleteProperty(id, property.imageUrl));

        return row;
    };

    // Função para editar um imóvel
    const editProperty = async (id) => {
        try {
            const doc = await propertiesRef.doc(id).get();
            if (!doc.exists) {
                alert("Imóvel não encontrado para edição.");
                return;
            }
            const property = doc.data();

            editingPropertyId = id;
            formTitle.textContent = `Editar Imóvel: ${property.title}`;
            submitPropertyBtn.textContent = 'Atualizar Imóvel';

            propertyIdInput.value = id;
            propertyTitleInput.value = property.title;
            propertyPriceInput.value = property.price;
            propertyDescriptionInput.value = property.description;
            propertyStatusSelect.value = property.status;

            if (property.imageUrl) {
                currentImagePreview.src = property.imageUrl;
                currentImagePreview.style.display = 'block';
            } else {
                currentImagePreview.style.display = 'none';
            }

            // Rola para o formulário
            propertyForm.scrollIntoView({ behavior: 'smooth', block: 'start' });

        } catch (error) {
            console.error("Erro ao carregar imóvel para edição:", error);
            alert("Erro ao carregar dados do imóvel para edição.");
        }
    };

    // Função para excluir um imóvel
    const deleteProperty = async (id, imageUrl) => {
        if (!confirm("Tem certeza que deseja excluir este imóvel? Esta ação é irreversível.")) {
            return;
        }

        try {
            // Primeiro, tenta excluir a imagem do Storage (se existir)
            if (imageUrl) {
                const imageRef = storage.refFromURL(imageUrl);
                await imageRef.delete();
                console.log("Imagem removida do Storage.");
            }

            // Depois, exclui o documento do Firestore
            await propertiesRef.doc(id).delete();
            showFormMessage('Imóvel excluído com sucesso!');
            fetchAndDisplayAdminProperties(); // Recarrega a lista
        } catch (error) {
            console.error("Erro ao excluir imóvel:", error);
            alert("Erro ao excluir imóvel: " + error.message);
        }
    };
});