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
    document.getElementById('water-content').innerHTML = '<p class="loading">Carregando...</p>';
    document.getElementById('energy-content').innerHTML = '<p class="loading">Carregando...</p>';
    document.getElementById('sewage-content').innerHTML = '<p class="loading">Carregando...</p>';
    document.getElementById('location-content').innerHTML = '<p class="loading">Carregando...</p>';

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

    document.getElementById('water-content').innerHTML = `
        <p>Água Potável: ${school.get("IN_AGUA_POTAVEL") ? 'Sim' : 'Não'}</p>
        <p>Água Rede Pública: ${school.get("IN_AGUA_REDE_PUBLICA") ? 'Sim' : 'Não'}</p>
        <p>Água Poço Artesiano: ${school.get("IN_AGUA_POCO_ARTESIANO") ? 'Sim' : 'Não'}</p>
        <p>Água Inexistente: ${school.get("IN_AGUA_INEXISTENTE") ? 'Sim' : 'Não'}</p>
        <p>Água Cacimba: ${school.get("IN_AGUA_CACIMBA") ? 'Sim' : 'Não'}</p>
        <p>Água Fonte/Rio: ${school.get("IN_AGUA_FONTE_RIO") ? 'Sim' : 'Não'}</p>
    `;

    document.getElementById('energy-content').innerHTML = `
        <p>Energia Rede Pública: ${school.get("IN_ENERGIA_REDE_PUBLICA") ? 'Sim' : 'Não'}</p>
        <p>Energia Gerador Fóssil: ${school.get("IN_ENERGIA_GERADOR_FOSSIL") ? 'Sim' : 'Não'}</p>
        <p>Energia Renovável: ${school.get("IN_ENERGIA_RENOVAVEL") ? 'Sim' : 'Não'}</p>
        <p>Energia Inexistente: ${school.get("IN_ENERGIA_INEXISTENTE") ? 'Sim' : 'Não'}</p>
    `;

    document.getElementById('sewage-content').innerHTML = `
        <p>Esgoto Rede Pública: ${school.get("IN_ESGOTO_REDE_PUBLICA") ? 'Sim' : 'Não'}</p>
        <p>Esgoto Fossa Séptica: ${school.get("IN_ESGOTO_FOSSA_SEPTICA") ? 'Sim' : 'Não'}</p>
        <p>Esgoto Inexistente: ${school.get("IN_ESGOTO_INEXISTENTE") ? 'Sim' : 'Não'}</p>
        <p>Esgoto Fossa Comum: ${school.get("IN_ESGOTO_FOSSA_COMUM") ? 'Sim' : 'Não'}</p>
    `;

    document.getElementById('location-content').innerHTML = `
        <p>Prédio Compartilhado: ${school.get("IN_PREDIO_COMPARTILHADO") ? 'Sim' : 'Não'}</p>
        <p>Local Funcionamento Galpão: ${school.get("IN_LOCAL_FUNC_GALPAO") ? 'Sim' : 'Não'}</p>
        <p>Local Funcionamento Outros: ${school.get("IN_LOCAL_FUNC_OUTROS") ? 'Sim' : 'Não'}</p>
    `;
}

// Atualizar dashboard ao carregar a página
window.onload = updateDashboard;
