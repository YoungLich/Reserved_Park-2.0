import cors from 'cors'; // Importando o pacote CORS
import express from 'express';
import admin from 'firebase-admin';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const app = express();

// Inicializa o Firebase Admin SDK para interagir com o Firestore
admin.initializeApp({
  credential: admin.credential.cert('conexao-firebase.json'),
});

const firebaseConfig = {
  apiKey: "AIzaSyB0woJQZdF3cxf1OIyAu97u6lz95Se5Pd4",
  authDomain: "resver-12909.firebaseapp.com",
  projectId: "resver-12909",
  storageBucket: "resver-12909.appspot.com",
  messagingSenderId: "630362934867",
  appId: "1:630362934867:web:c73d8a41d195123f6600a6"
};

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);

// Middleware para permitir CORS
const corsOptions = {
  origin: 'http://127.0.0.1:5500',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
}


app.use(cors(corsOptions));


app.use(express.json());

// Rota de login
app.post('/login', async (req, res) => {
  const { usernameInput, passwordInput } = req.body;

  if (!usernameInput || !passwordInput) {
    return res.status(400).json({ message: 'Email e senha são obrigatórios.' });
  }

  try {

    const userSnapshot = await admin.firestore()
      .collection('Usuarios')
      .where('email', '==', usernameInput)
      .get();

    if (userSnapshot.empty) {
      return res.status(401).json({ message: 'Usuário não encontrado.' });
    }

    const userData = userSnapshot.docs[0].data();
    const storedPassword = userData.password;

    if (passwordInput !== storedPassword) {
      return res.status(401).json({ message: 'Senha incorreta.' });
    }


    const token = await admin.auth().createCustomToken(userSnapshot.docs[0].id);

    return res.json({
      redirect: '/login/public/home.html',
      token,
    });

  } catch (error) {
    console.error("Erro no login:", error);
    return res.status(500).json({ message: 'Erro interno. Tente novamente mais tarde.' });
  }
});

app.get('/vagas', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'vagas.html'));
});
app.get('/home', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'home.html'));
});

// Outras rotas
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


app.listen(3005, () => console.log('Servidor rodando na porta 3005'));
