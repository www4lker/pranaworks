### **<!DOCTYPE html>**

### **<html lang="pt-BR">**

### **<head>**

###     **<meta charset="UTF-8">**

###     **<meta name="viewport" content="width=device-width, initial-scale=1.0">**

###     **<title>Planilha Mestre - Documentos Google Drive</title>**

###     **<style>**

###         **body {**

###             **font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;**

###             **margin: 20px;**

###             **background-color: #f8f9fa;**

###         **}**

###         

###         **.container {**

###             **max-width: 1400px;**

###             **margin: 0 auto;**

###             **background-color: white;**

###             **border-radius: 8px;**

###             **box-shadow: 0 2px 10px rgba(0,0,0,0.1);**

###             **padding: 20px;**

###         **}**

###         

###         **h1 {**

###             **color: #2c3e50;**

###             **margin-bottom: 20px;**

###             **border-bottom: 3px solid #3498db;**

###             **padding-bottom: 10px;**

###         **}**

###         

###         **.stats {**

###             **background-color: #ecf0f1;**

###             **padding: 15px;**

###             **border-radius: 5px;**

###             **margin-bottom: 20px;**

###             **display: flex;**

###             **justify-content: space-between;**

###             **align-items: center;**

###         **}**

###         

###         **table {**

###             **width: 100%;**

###             **border-collapse: collapse;**

###             **margin-top: 20px;**

###             **box-shadow: 0 2px 5px rgba(0,0,0,0.1);**

###         **}**

###         

###         **th {**

###             **background-color: #34495e;**

###             **color: white;**

###             **padding: 15px;**

###             **text-align: left;**

###             **font-weight: 600;**

###             **position: sticky;**

###             **top: 0;**

###         **}**

###         

###         **td {**

###             **padding: 12px 15px;**

###             **border-bottom: 1px solid #ecf0f1;**

###             **vertical-align: top;**

###         **}**

###         

###         **tr:hover {**

###             **background-color: #f8f9fa;**

###         **}**

###         

###         **.titulo {**

###             **font-weight: 600;**

###             **color: #2c3e50;**

###             **max-width: 300px;**

###         **}**

###         

###         **.data {**

###             **white-space: nowrap;**

###             **color: #7f8c8d;**

###             **font-size: 0.9em;**

###         **}**

###         

###         **.tema {**

###             **background-color: #e8f4fd;**

###             **border-left: 4px solid #3498db;**

###             **padding: 8px;**

###             **border-radius: 3px;**

###             **font-size: 0.9em;**

###         **}**

###         

###         **.relevancia {**

###             **text-align: center;**

###             **font-weight: bold;**

###             **font-size: 1.1em;**

###         **}**

###         

###         **.rel-5 { color: #e74c3c; }**

###         **.rel-4 { color: #f39c12; }**

###         **.rel-3 { color: #f1c40f; }**

###         **.rel-2 { color: #2ecc71; }**

###         **.rel-1 { color: #95a5a6; }**

###         

###         **.url {**

###             **font-size: 0.8em;**

###             **color: #7f8c8d;**

###             **margin-top: 5px;**

###         **}**

###         

###         **.filtros {**

###             **margin-bottom: 20px;**

###             **display: flex;**

###             **gap: 10px;**

###             **align-items: center;**

###         **}**

###         

###         **select, input {**

###             **padding: 8px;**

###             **border: 1px solid #bdc3c7;**

###             **border-radius: 4px;**

###         **}**

###         

###         **.export-btn {**

###             **background-color: #3498db;**

###             **color: white;**

###             **border: none;**

###             **padding: 10px 20px;**

###             **border-radius: 5px;**

###             **cursor: pointer;**

###             **font-size: 0.9em;**

###         **}**

###         

###         **.export-btn:hover {**

###             **background-color: #2980b9;**

###         **}**

###         

###         **.legend {**

###             **margin-top: 20px;**

###             **padding: 15px;**

###             **background-color: #f8f9fa;**

###             **border-radius: 5px;**

###             **font-size: 0.9em;**

###         **}**

###     **</style>**

### **</head>**

### **<body>**

###     **<div class="container">**

###         **<h1>📊 Planilha Mestre - Documentos Google Drive</h1>**

###         

###         **<div class="stats">**

###             **<div><strong>Total de Documentos:</strong> <span id="total-docs">7</span></div>**

###             **<div><strong>Busca por:</strong> autoria OR transparência metodológica</div>**

###             **<button class="export-btn" onclick="exportToCSV()">📥 Exportar CSV</button>**

###         **</div>**

###         

###         **<div class="filtros">**

###             **<label>Filtrar por Relevância:</label>**

###             **<select id="filtro-relevancia" onchange="filtrarTabela()">**

###                 **<option value="">Todas</option>**

###                 **<option value="5">5 - Máxima</option>**

###                 **<option value="4">4 - Alta</option>**

###                 **<option value="3">3 - Média</option>**

###                 **<option value="2">2 - Baixa</option>**

###                 **<option value="1">1 - Mínima</option>**

###             **</select>**

###             

###             **<label>Buscar:</label>**

###             **<input type="text" id="busca" placeholder="Digite para buscar..." oninput="filtrarTabela()">**

###         **</div>**

###         

###         **<table id="tabela-documentos">**

###             **<thead>**

###                 **<tr>**

###                     **<th style="width: 30%">Título</th>**

###                     **<th style="width: 12%">Data</th>**

###                     **<th style="width: 40%">Tema Principal</th>**

###                     **<th style="width: 10%">Relevância</th>**

###                     **<th style="width: 8%">Link</th>**

###                 **</tr>**

###             **</thead>**

###             **<tbody>**

###                 **<tr>**

###                     **<td class="titulo">**

###                         **Epistemologias Não-Lineares e Git: Uma Metodologia Híbrida para a Escrita Acadêmica em Humanidades**

###                     **</td>**

###                     **<td class="data">28/05/2025</td>**

###                     **<td class="tema">**

###                         **Metodologia híbrida integrando Git para transparência metodológica na escrita acadêmica, gestão de autoria e coautoria, versionamento de contribuições de IA**

###                     **</td>**

###                     **<td class="relevancia rel-5">5</td>**

###                     **<td><a href="https://docs.google.com/document/d/1NpB-vpMEqM09DnDbL9viA2\_Iu5dens7nwCAYoGcnH14/edit" target="\_blank">🔗</a></td>**

###                 **</tr>**

###                 **<tr>**

###                     **<td class="titulo">**

###                         **Metodologia Híbrida para Escrita Acadêmica (incompleo)**

###                     **</td>**

###                     **<td class="data">27/05/2025</td>**

###                     **<td class="tema">**

###                         **Desenvolvimento de metodologia para transparência no processo de escrita acadêmica, documentação de decisões teóricas e evidências**

###                     **</td>**

###                     **<td class="relevancia rel-4">4</td>**

###                     **<td><a href="https://docs.google.com/document/d/1sgk4zuAhwB6WDXLLfSrwPWUTGd8f4U\_lx4vRFlPLswQ/edit" target="\_blank">🔗</a></td>**

###                 **</tr>**

###                 **<tr>**

###                     **<td class="titulo">**

###                         **Copy of Metodologia Híbrida para Escrita Acadêmica (incompleo)**

###                     **</td>**

###                     **<td class="data">27/05/2025</td>**

###                     **<td class="tema">**

###                         **Cópia/versão de backup do documento de metodologia híbrida, aspectos práticos de transparência metodológica**

###                     **</td>**

###                     **<td class="relevancia rel-4">4</td>**

###                     **<td><a href="https://docs.google.com/document/d/1sgxKgQDKEwsg0QkeNfGCAgC-pmfV58-HTkomAhMAnE0/edit" target="\_blank">🔗</a></td>**

###                 **</tr>**

###                 **<tr>**

###                     **<td class="titulo">**

###                         **Escrita Não Criativa e Autoria**

###                     **</td>**

###                     **<td class="data">19/05/2025</td>**

###                     **<td class="tema">**

###                         **Questões de autoria na escrita não criativa, possivelmente abordando autoria algorítmica e práticas de escrita técnica/acadêmica**

###                     **</td>**

###                     **<td class="relevancia rel-5">5</td>**

###                     **<td><a href="https://docs.google.com/document/d/1AEY16qjtS49NbBfE59fLV6sTBBeJXpXJ/edit" target="\_blank">🔗</a></td>**

###                 **</tr>**

###                 **<tr>**

###                     **<td class="titulo">**

###                         **Metodologia Não Linear Escrita Acadêmica**

###                     **</td>**

###                     **<td class="data">27/05/2025</td>**

###                     **<td class="tema">**

###                         **Abordagens não lineares para escrita acadêmica, potencialmente relacionado à transparência de processos metodológicos alternativos**

###                     **</td>**

###                     **<td class="relevancia rel-3">3</td>**

###                     **<td><a href="https://docs.google.com/document/d/1HZ1vPPmF7oc6v4I22oXj3hrjT85Wv-fHNu7Ff7DqUqg/edit" target="\_blank">🔗</a></td>**

###                 **</tr>**

###                 **<tr>**

###                     **<td class="titulo">**

###                         **Pesquisa profunda sobre Han e IA**

###                     **</td>**

###                     **<td class="data">29/06/2025</td>**

###                     **<td class="tema">**

###                         **Investigação sobre filosofia de Byung-Chul Han em relação à inteligência artificial, possíveis implicações para autoria digital**

###                     **</td>**

###                     **<td class="relevancia rel-2">2</td>**

###                     **<td><a href="https://docs.google.com/document/d/1l5sR9NpVXEVUzJM-CS66c3tJU0Z0VrBTaUgyPNWWSak/edit" target="\_blank">🔗</a></td>**

###                 **</tr>**

###                 **<tr>**

###                     **<td class="titulo">**

###                         **Fundamentos de Metodologia Científica**

###                     **</td>**

###                     **<td class="data">19/05/2025</td>**

###                     **<td class="tema">**

###                         **Material de base sobre metodologia científica, potencialmente incluindo princípios de transparência metodológica e rigor epistêmico**

###                     **</td>**

###                     **<td class="relevancia rel-2">2</td>**

###                     **<td><a href="https://docs.google.com/document/d/1O242Tm7QeK\_sK1HfG\_H77wysC8cIGtbU/edit" target="\_blank">🔗</a></td>**

###                 **</tr>**

###             **</tbody>**

###         **</table>**

###         

###         **<div class="legend">**

###             **<h4>Legenda de Relevância:</h4>**

###             **<div style="display: flex; gap: 20px; flex-wrap: wrap;">**

###                 **<span><strong class="rel-5">5 - Máxima:</strong> Trata diretamente de autoria e transparência metodológica</span>**

###                 **<span><strong class="rel-4">4 - Alta:</strong> Aborda metodologias com foco em transparência</span>**

###                 **<span><strong class="rel-3">3 - Média:</strong> Relacionado indiretamente aos temas</span>**

###                 **<span><strong class="rel-2">2 - Baixa:</strong> Conexão tangencial com os temas</span>**

###                 **<span><strong class="rel-1">1 - Mínima:</strong> Pouca ou nenhuma relação direta</span>**

###             **</div>**

###         **</div>**

###     **</div>**

### 

###     **<script>**

###         **function filtrarTabela() {**

###             **const filtroRelevancia = document.getElementById('filtro-relevancia').value;**

###             **const busca = document.getElementById('busca').value.toLowerCase();**

###             **const tabela = document.getElementById('tabela-documentos');**

###             **const linhas = tabela.getElementsByTagName('tr');**

###             

###             **for (let i = 1; i < linhas.length; i++) {**

###                 **const linha = linhas\[i];**

###                 **const relevancia = linha.cells\[3].textContent.trim();**

###                 **const titulo = linha.cells\[0].textContent.toLowerCase();**

###                 **const tema = linha.cells\[2].textContent.toLowerCase();**

###                 

###                 **let mostrar = true;**

###                 

###                 **if (filtroRelevancia \&\& relevancia !== filtroRelevancia) {**

###                     **mostrar = false;**

###                 **}**

###                 

###                 **if (busca \&\& !titulo.includes(busca) \&\& !tema.includes(busca)) {**

###                     **mostrar = false;**

###                 **}**

###                 

###                 **linha.style.display = mostrar ? '' : 'none';**

###             **}**

###             

###             **// Atualizar contador**

###             **const linhasVisiveis = Array.from(linhas).slice(1).filter(linha => linha.style.display !== 'none').length;**

###             **document.getElementById('total-docs').textContent = linhasVisiveis;**

###         **}**

###         

###         **function exportToCSV() {**

###             **const tabela = document.getElementById('tabela-documentos');**

###             **const linhas = tabela.querySelectorAll('tr');**

###             **let csv = '';**

###             

###             **// Cabeçalho**

###             **const cabecalho = Array.from(linhas\[0].cells).map(cell => cell.textContent.trim()).slice(0, 4);**

###             **csv += cabecalho.join(',') + '\\n';**

###             

###             **// Dados**

###             **for (let i = 1; i < linhas.length; i++) {**

###                 **if (linhas\[i].style.display !== 'none') {**

###                     **const dados = Array.from(linhas\[i].cells).slice(0, 4).map(cell => {**

###                         **return '"' + cell.textContent.trim().replace(/"/g, '""') + '"';**

###                     **});**

###                     **csv += dados.join(',') + '\\n';**

###                 **}**

###             **}**

###             

###             **// Download**

###             **const blob = new Blob(\[csv], { type: 'text/csv' });**

###             **const url = window.URL.createObjectURL(blob);**

###             **const a = document.createElement('a');**

###             **a.href = url;**

###             **a.download = 'documentos\_google\_drive.csv';**

###             **a.click();**

###             **window.URL.revokeObjectURL(url);**

###         **}**

###     **</script>**

### **</body>**

### **</html>**

