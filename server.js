const express = require('express');
const path = require('path');
const fs = require('fs').promises;
const cors = require('cors');

// Crie a aplicação Express
const app = express();

// Configurar o middleware para servir arquivos estáticos
app.use(express.json());
app.use(express.static('public'));
app.use('/img', express.static(path.join(__dirname, 'public/img')));
app.use(cors());

// Diretório base para os arquivos dos parceiros
const PARCEIROS_DIR = path.join(__dirname, 'taxas', 'parceiros');

// Middleware para verificar se o diretório existe
app.use(async (req, res, next) => {
    try {
        await fs.access(PARCEIROS_DIR);
    } catch {
        await fs.mkdir(PARCEIROS_DIR, { recursive: true });
    }
    next();
});

// Rota para salvar as taxas
app.post('/salvar-taxas/:parceiro', async (req, res) => {
    try {
        const { parceiro } = req.params;
        const taxas = req.body;
        
        // Cria o diretório do parceiro se não existir
        const parceiroDir = path.join(PARCEIROS_DIR, parceiro);
        await fs.mkdir(parceiroDir, { recursive: true });
        
        // Salva o arquivo JSON
        const filePath = path.join(parceiroDir, 'taxas.json');
        await fs.writeFile(filePath, JSON.stringify(taxas, null, 2));
        
        res.json({ message: 'Taxas salvas com sucesso' });
    } catch (error) {
        console.error('Erro ao salvar taxas:', error);
        res.status(500).json({ error: 'Erro ao salvar taxas' });
    }
});

// Rota para carregar as taxas
app.get('/taxas/parceiros/:parceiro/taxas.json', async (req, res) => {
    try {
        const { parceiro } = req.params;
        const filePath = path.join(PARCEIROS_DIR, parceiro, 'taxas.json');
        
        const taxasJson = await fs.readFile(filePath, 'utf-8');
        const taxas = JSON.parse(taxasJson);
        
        res.json(taxas);
    } catch (error) {
        console.error('Erro ao carregar taxas:', error);
        res.status(404).json({ error: 'Taxas não encontradas' });
    }
});

// Tratamento de erros
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send('Erro interno do servidor');
});

// Iniciar o servidor
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
    console.log(`Diretório das taxas: ${PARCEIROS_DIR}`);
});