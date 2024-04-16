const database = require('../../conexao');

async function listar(req, res) {
    let dados = await database.executar(`SELECT * FROM tb_produtos`);
    res.send(dados);
}

async function buscarPorId(req, res) {
    let id = req.params.id;
    let dados = await database.executar(`SELECT * FROM tb_produtos WHERE id=${id}`);

    if (dados.length === 0) {
        res.status(404).end();
    }

    res.send(dados[0]);
}

async function criar(req, res) {
    if (!req.body.nome) {
        return res.status(400).send({ "erro": "Nome é obrigatório" });
    }

    let { nome, carga_horaria } = req.body;
    let dados = await database.executar(`INSERT INTO tb_produtos (nome, carga_horaria) VALUES ('${nome}', '${carga_horaria}')`);

    req.body.id = dados.insertId;

    res.status(201).send(req.body);
}

async function atualizar(req, res) {
    let { nome, carga_horaria } = req.body;
    let id = req.params.id;

    await database.executar(`UPDATE tb_produtos SET nome='${nome}', carga_horaria='${carga_horaria}' WHERE id=${id}`);

    req.body.id = id;

    res.send(req.body);
}

async function deletar(req, res) {
    let dados = await database.executar(`DELETE FROM tb_produtos WHERE id=${req.params.id}`);

    if (dados.affectedRows === 0) {
        res.status(404).end();
    }

    res.status(204).end();
}

module.exports = {
    listar,
    buscarPorId,
    criar,
    atualizar,
    deletar
};
