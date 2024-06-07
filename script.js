// Configurar Parse
Parse.initialize("YOUR_APP_ID", "YOUR_JS_KEY");
Parse.serverURL = "https://parseapi.back4app.com/classes/nordeste1";

// Função para buscar dados do Parse
async function fetchData() {
    const query = new Parse.Query("nordeste1");
    try {
        const results = await query.find();
        return results;
    } catch (error) {
        console.error("Error while fetching data: ", error);
        return [];
    }
}

// Função para atualizar o conteúdo do dashboard e gerar gráficos
async function updateDashboard() {
    document.getElementById('overview-content').innerHTML = '<p class="loading">Carregando...</p>';

    const data = await fetchData();

    if (data.length === 0) {
        document.getElementById('overview-content').innerHTML = '<p>Nenhum dado encontrado</p>';
        return;
    }

    const school = data[0];

    document.getElementById('overview-content').innerHTML = `
        <p>Nome da Entidade: ${school.get("NO_ENTIDADE")}</p>
        <p>Endereço: ${school.get("DS_ENDERECO")}, ${school.get("NO_BAIRRO")}, ${school.get("NO_MUNICIPIO")}, ${school.get("CO_UF")}</p>
    `;

    // Dados para o gráfico de Água
    const waterData = {
        labels: ['Água Potável', 'Água Rede Pública', 'Água Poço Artesiano', 'Água Inexistente', 'Água Cacimba', 'Água Fonte/Rio'],
        datasets: [{
            label: 'Água',
            data: [
                school.get("IN_AGUA_POTAVEL"),
                school.get("IN_AGUA_REDE_PUBLICA"),
                school.get("IN_AGUA_POCO_ARTESIANO"),
                school.get("IN_AGUA_INEXISTENTE"),
                school.get("IN_AGUA_CACIMBA"),
                school.get("IN_AGUA_FONTE_RIO")
            ],
            backgroundColor: ['#4caf50', '#2196f3', '#ffeb3b', '#f44336', '#ff9800', '#9c27b0']
        }]
    };

    // Dados para o gráfico de Energia
    const energyData = {
        labels: ['Energia Rede Pública', 'Energia Gerador Fóssil', 'Energia Renovável', 'Energia Inexistente'],
        datasets: [{
            label: 'Energia',
            data: [
                school.get("IN_ENERGIA_REDE_PUBLICA"),
                school.get("IN_ENERGIA_GERADOR_FOSSIL"),
                school.get("IN_ENERGIA_RENOVAVEL"),
                school.get("IN_ENERGIA_INEXISTENTE")
            ],
            backgroundColor: ['#4caf50', '#2196f3', '#ffeb3b', '#f44336']
        }]
    };

    // Dados para o gráfico de Esgoto
    const sewageData = {
        labels: ['Esgoto Rede Pública', 'Esgoto Fossa Séptica', 'Esgoto Inexistente', 'Esgoto Fossa Comum'],
        datasets: [{
            label: 'Esgoto',
            data: [
                school.get("IN_ESGOTO_REDE_PUBLICA"),
                school.get("IN_ESGOTO_FOSSA_SEPTICA"),
                school.get("IN_ESGOTO_INEXISTENTE"),
                school.get("IN_ESGOTO_FOSSA_COMUM")
            ],
            backgroundColor: ['#4caf50', '#2196f3', '#ffeb3b', '#f44336']
        }]
    };

    // Dados para o gráfico de Local de Funcionamento
    const locationData = {
        labels: ['Prédio Compartilhado', 'Local Funcionamento Galpão', 'Local Funcionamento Outros'],
        datasets: [{
            label: 'Local de Funcionamento',
            data: [
                school.get("IN_PREDIO_COMPARTILHADO"),
                school.get("IN_LOCAL_FUNC_GALPAO"),
                school.get("IN_LOCAL_FUNC_OUTROS")
            ],
            backgroundColor: ['#4caf50', '#2196f3', '#ffeb3b']
        }]
    };

    // Criar gráficos
    new Chart(document.getElementById('water-chart'), {
        type: 'bar',
        data: waterData
    });

    new Chart(document.getElementById('energy-chart'), {
        type: 'bar',
        data: energyData
    });

    new Chart(document.getElementById('sewage-chart'), {
        type: 'bar',
        data: sewageData
    });

    new Chart(document.getElementById('location-chart'), {
        type: 'bar',
        data: locationData
    });
}

// Atualizar dashboard ao carregar a página
window.onload = updateDashboard;
