const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// Defina as credenciais no código
const correctUsername = "reservedpark2024@gmail.com";
const correctPassword = "reserved@123";

// Middleware para permitir envio de dados no body
app.use(express.urlencoded({ extended: true }));

// Servir arquivos estáticos das pastas 'css' e 'js'
app.use('/css', express.static(path.join(__dirname, 'public', 'css')));
app.use('/js', express.static(path.join(__dirname, 'public', 'js')));

// Servir arquivos HTML da pasta 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Rota para servir a página de login
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Rota para processar o login
app.post('/login', (req, res) => {
    const { usernameInput, passwordInput } = req.body;

    // Verifique se o username e a senha estão corretos
    if (usernameInput === correctUsername && passwordInput === correctPassword) {
        // Redireciona para outra página se estiver correto
        res.redirect('/home.html');
    } else {
        // Retorne uma mensagem de erro se as credenciais forem inválidas
        res.send('Credenciais inválidas. Tente novamente.');
    }
});

// Rotas para servir páginas HTML adicionais
app.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'home.html'));
});

app.get('/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'dashboard.html'));
});

app.get('/vagas', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'vagas.html'));
});

app.get('/reservas', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'reservas.html'));
});

app.get('/pagamentos', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'pagamentos.html'));
});

app.get('/relatorios', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'relatorios.html'));
});

app.get('/configuracoes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'configuracoes.html'));
});

// Inicie o servidor e abra o navegador
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
    import('open').then((open) => open.default(`http://localhost:${PORT}`));
});
