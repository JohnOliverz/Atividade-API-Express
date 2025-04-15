const express = require('express');
const app = express();
const usuarios = require('../data/usuarios');

app.use(express.json());

//Rota POST - Cadastrar nova pessoa
app.post('/cadastro', (req, res) =>{
    const { nome, cidade } = req.body;

    if (!nome || !cidade){
        return res.status(400).json({mensagem: 'Obrigatório preencher os campos.'})
    }

    const novaPessoa = {
        id: usuarios.length + 1,
        nome,
        cidade
    };

    usuarios.push(novaPessoa);
    res.status(201).json(novaPessoa);
});

//Rota GET - Mostrar apenas os 10 ultimos usuários
app.get('/usuario/todos', (req, res) =>{
    const ultimosUsuarios = usuarios.slice(-10);
    res.json(ultimosUsuarios);
});

//Rota GET - Mostrar todos os usuários filtrados por uma cidade
app.get('/usuario/cidade/:cidade', (req, res) =>{
    const cidadeParametro = req.params.cidade.toLowerCase();

    const usuariosFiltrados = usuarios.filter(usuario =>
        usuario.cidade.toLowerCase() === cidadeParametro
    );

    if (usuariosFiltrados.length === 0) {
        return res.status(400).json({ mensagem: 'Nunhum usuário encontrado nessa cidade'});
    }

    res.json(usuariosFiltrados);
});

//Rota GET - Usuário sorteado aleatoriamente
app.get('/usuario/sorteado', (req, res) =>{
    if (usuarios.length === 0) {
        return res.status(400).json({ mensagem: 'Nenhum usuário cadastrado'})
    }

    const indiceAleatorio = Math.floor(Math.random() * usuarios.length);
    const usuarioSorteado = usuarios[indiceAleatorio];

    res.json(usuarioSorteado);
});

module.exports = app;