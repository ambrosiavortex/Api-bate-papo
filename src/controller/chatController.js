import { Router } from 'express';
import { getAuthentication } from '../utils/jwt.js';

import * as salaPermissaoRepo from '../repository/salaPermissaoRepository.js';
import * as chatRepo from '../repository/chatRepository.js';

const endpoints = Router();
const autenticador = getAuthentication();


endpoints.post('/chat/:sala', autenticador, async (req, resp) => {
    let salaId = req.params.sala;
    let usuarioId = req.user.id;
    let mensagem = req.body;

    const registros = await chatRepo.inserirMensagem(usuarioId, salaId, mensagem);
    resp.send(registros);
});


endpoints.get('/chat/:sala', autenticador, async (req, resp) => {
    
});


export default endpoints;