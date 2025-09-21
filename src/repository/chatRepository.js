import { connection } from './connection.js';


export async function inserirMensagem(usuarioId, salaId, mensagem) {
    const comando = `
        SELECT id 
            FROM salaPermissao 
                WHERE sala_id = ? AND usuario_id = ? AND aprovado = TRUE;
    `

    const [ info ] = await connection.query (comando, [
        usuarioId,
        salaId
    ])

    if(info.length === 0) {
        console.log('Você não tem permissão para enviar mensagens nesse chat.')
    }

    const comando2 = `
        INSERT INTO chat (usuario_id, sala_id, mensagem, criacao) 
            VALUES (?, ?, ?, NOW());
    `

    const [ info2 ] = await connection.query (comando, [
        usuarioId,
        salaId,
        mensagem,
        new Date()
    ])

    return { info2 };
}


export async function listarMensagensPorSala(salaId) {
    
}