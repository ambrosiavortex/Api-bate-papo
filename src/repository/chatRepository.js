import { connection } from './connection.js';


export async function inserirMensagem(salaId, usuarioId, mensagem) {
    const comando = `
        SELECT id 
            FROM salaPermissao 
                WHERE usuario_id = ? AND sala_id AND aprovado = TRUE;
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

    const [ info2 ] = await connection.query (comando2, [
        usuarioId,
        salaId,
        mensagem,
        new Date()
    ])

    return `Mensagem enviada com sucesso!`;
}


export async function listarMensagensPorSala(salaId, usuarioId) {
    const comando = `
        SELECT id 
            FROM salaPermissao 
                WHERE sala_id = ? AND usuario_id = ? AND aprovado = TRUE;
    `

    const [ info ] = await connection.query(comando, [
        salaId,
        usuarioId
    ])

    if(info.length === 0) {
        return `Você não tem permissão para visualizar essa conversa.`
    }

    const comando2 = `
        SELECT chat.id,
         chat.usuario_id,
         nome,
         mensagem,
         criacao
    FROM chat
    JOIN usuario ON chat.usuario_id = usuario.id
   WHERE sala_id = ?
   ORDER 
      BY criacao ASC;
    `

    const [ info2 ] = await connection.query(comando, [
        salaId,
        usuarioId
    ])

    return (info, info2);
}