import * as repo from '../repository/salaRepository.js';

import { getAuthentication } from '../utils/jwt.js';
import { Router } from "express";

const autenticador = getAuthentication();
const endpoints = Router();

endpoints.post('/sala', autenticador, async (req, resp) => {
    let nome = req.body.nome;
    let usuarioLogadoId = req.user.id;

    await repo.inserirSala(nome, usuarioLogadoId, false);
    resp.send(`A Sala foi criada!`);
});

export default endpoints;