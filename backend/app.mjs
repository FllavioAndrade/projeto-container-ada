import express from 'express';
import mongodb from 'mongodb';
import cors from 'cors';
import bodyParser from 'body-parser';

const { MongoClient } = mongodb;
const app = express();
const port = 3000;
const mongoUrl = 'mongodb://database-mongo:27017';
const dbName = 'eventos';
let db;

app.use(cors());
app.use(bodyParser.json());

const connectToMongoDB = async () => {
    try {
        const client = await MongoClient.connect(mongoUrl, { useUnifiedTopology: true });
        db = client.db(dbName);
        console.log('Conectado ao MongoDB');

        // Adicionar usuário root padrão
        const usersCollection = db.collection('users');
        const rootUser = await usersCollection.findOne({ username: 'root' });
        if (!rootUser) {
            await usersCollection.insertOne({ nome: 'Root User', email: 'root@example.com', username: 'root', password: 'rootpassword' });
            console.log('Usuário root criado com sucesso');
        }
    } catch (err) {
        console.error('Erro de conexão ao banco de dados', err);
        setTimeout(connectToMongoDB, 5000); // Tentar reconectar após 5 segundos
    }
};

connectToMongoDB();

app.post('/register', async (req, res) => {
    const { nome, email, username, password } = req.body;

    // Validação básica dos dados
    if (!nome || !email || !username || !password) {
        return res.status(400).send('Todos os campos são obrigatórios');
    }

    try {
        const usersCollection = db.collection('users');
        const existingUser = await usersCollection.findOne({ username });

        if (existingUser) {
            return res.status(409).send('Usuário já existe');
        }

        await usersCollection.insertOne({ nome, email, username, password });
        res.send('Usuário cadastrado com sucesso');
    } catch (err) {
        console.error('Erro no registro:', err);
        res.status(500).send('Erro ao cadastrar usuário');
    }
});

app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).send('Usuário e senha são obrigatórios');
    }

    try {
        const usersCollection = db.collection('users');
        const user = await usersCollection.findOne({ username, password });

        if (!user) {
            return res.status(401).send('Usuário ou senha incorreto');
        }

        res.send('Login bem-sucedido');
    } catch (err) {
        console.error('Erro ao fazer login:', err);
        res.status(500).send('Erro ao fazer login');
    }
});

// Endpoint para cadastrar eventos
app.post('/events', async (req, res) => {
    const { username, password, event } = req.body;

    if (!username || !password || !event) {
        return res.status(400).send('Usuário, senha e evento são obrigatórios');
    }

    try {
        const usersCollection = db.collection('users');
        const user = await usersCollection.findOne({ username, password });

        if (!user || user.username !== 'root') {
            return res.status(403).send('Acesso negado');
        }

        const eventsCollection = db.collection('events');
        await eventsCollection.insertOne(event);
        res.send('Evento cadastrado com sucesso');
    } catch (err) {
        console.error('Erro ao cadastrar evento:', err);
        res.status(500).send('Erro ao cadastrar evento');
    }
});

// Endpoint de teste para verificar a conexão com o MongoDB
app.get('/test-connection', async (req, res) => {
    try {
        await db.command({ ping: 1 });
        res.send('Conexão com o MongoDB está funcionando');
    } catch (err) {
        console.error('Erro ao testar conexão com o MongoDB:', err);
        res.status(500).send('Erro ao testar conexão com o MongoDB');
    }
});

app.get('/', (req, res) => {
    res.send('Backend funcionando e conectado ao MongoDB!');
});

app.listen(port, () => {
    console.log(`Backend rodando em http://localhost:${port}`);
});