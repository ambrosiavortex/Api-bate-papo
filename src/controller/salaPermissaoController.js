import { Router } from 'express';
import { getAuthentication } from '../utils/jwt.js';

import * as salaPermissaoRepo from '../repository/salaPermissaoRepository.js';
import * as salaRepo from '../repository/salaRepository.js';

const endpoints = Router();
const autenticador = getAuthentication();



endpoints.post('/sala/:sala/entrar', autenticador, async (req, resp) => {
    let salaId = req.params.sala;
    let usuarioId = req.user.id;

    await salaPermissaoRepo.inserirPermissao(salaId, usuarioId, false);
    if(!salaId) {
        resp.status(404).send('Sala não encontrada');
    }else(
        resp.send('Pedido de entrada na sala enviado!')
    );
  
});


endpoints.post('/sala/:sala/aprovar/:usuario', autenticador, async (req, resp) => {
    let salaId = req.params.sala;
    let usuarioId = req.params.usuario;

    const registros = await salaPermissaoRepo.aprovarPermissao(salaId, usuarioId);
    resp.send(registros);
});



export default endpoints;