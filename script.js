// Configurar Parse
Parse.initialize("n8qfuZ16LUPk0EKeepJlfnHi8T1mMpowk9CztGr0", "38BxP1BBw78TYG6g0eqJMRewr4OBLvbxn91jXSy2");
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

// Função para atualizar o conteúdo do dashboard
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

    // Dados para gráficos
    const waterData = {
        labels: ['Água Potável', 'Água Rede Pública', 'Água Poço Artesiano', 'Água Inexistente', 'Água Cacimba', 'Água Fonte/Rio'],
        data: [
            school.get("IN_AGUA_POTAVEL") ? 1 : 0,
            school.get("IN_AGUA_REDE_PUBLICA") ? 1 : 0,
            school.get("IN_AGUA_POCO_ARTESIANO") ? 1 : 0,
            school.get("IN_AGUA_INEXISTENTE") ? 1 : 0,
            school.get("IN_AGUA_CACIMBA") ? 1 : 0,
            school.get("IN_AGUA_FONTE_RIO") ? 1 : 0
        ]
    };

    const energyData = {
        labels: ['Energia Rede Pública', 'Energia Gerador Fóssil', 'Energia Renovável', 'Energia Inexistente'],
        data: [
            school.get("IN_ENERGIA_REDE_PUBLICA") ? 1 : 0,
            school.get("IN_ENERGIA_GERADOR_FOSSIL") ? 1 : 0,
            school.get("IN_ENERGIA_RENOVAVEL") ? 1 : 0,
            school.get("IN_ENERGIA_INEXISTENTE") ? 1 : 0
        ]
    };

    const sewageData = {
        labels: ['Esgoto Rede Pública', 'Esgoto Fossa Séptica', 'Esgoto Inexistente', 'Esgoto Fossa Comum'],
        data: [
            school.get("IN_ESGOTO_REDE_PUBLICA") ? 1 : 0,
            school.get("IN_ESGOTO_FOSSA_SEPTICA") ? 1 : 0,
            school.get("IN_ESGOTO_INEXISTENTE") ? 1 : 0,
            school.get("IN_ESGOTO_FOSSA_COMUM") ? 1 : 0
        ]
    };

    const locationData = {
        labels: ['Prédio Compartilhado', 'Local Funcionamento Galpão', 'Local Funcionamento Outros'],
        data: [
            school.get("IN_PREDIO_COMPARTILHADO") ? 1 : 0,
            school.get("IN_LOCAL_FUNC_GALPAO") ? 1 : 0,
            school.get("IN_LOCAL_FUNC_OUTROS") ? 1 : 0
        ]
    };

    // Criar gráficos
    createChart('water-chart', 'Distribuição de Água', waterData);
    createChart('energy-chart', 'Distribuição de Energia', energyData);
    createChart('sewage-chart', 'Distribuição de Esgoto', sewageData);
    createChart('location-chart', 'Localização', locationData);
}

// Função para criar gráficos
function createChart(canvasId, title, data) {
    const ctx = document.getElementById(canvasId).getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: data.labels,
            datasets: [{
                label: title,
                data: data.data,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

// Atualizar dashboard ao carregar a página
window.onload = updateDashboard;
