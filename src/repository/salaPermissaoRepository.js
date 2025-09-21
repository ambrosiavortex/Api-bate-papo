import { connection } from './connection.js';


export async function inserirPermissao(salaId, usuarioId, aprovado) {
    const comando = `
        INSERT INTO salaPermissao (sala_id, usuario_id, aprovado)
            VALUES (?, ?, FALSE);
    `

    const [ info ] = await connection.query (comando, [
        salaId,
        usuarioId,
        aprovado
    ])

    return info.insertId;
}


export async function aprovarPermissao(salaId, usuarioId) {
    const comando = `
        SELECT id 
            FROM salaPermissao
            WHERE sala_id = ? AND usuario_id = ? AND aprovado = TRUE;
    `
    const [ info ] = await connection.query (comando, [
        salaId,
        usuarioId
    ])

    if(info.lenght === 0) {
        console.log("Você não tem permissão pra isso!");
    }

    const comando2 = `
        UPDATE salaPermissao
            SET aprovado = TRUE
            WHERE sala_id = ? AND usuario_id = ?;   
    `

    const [ info2 ] = await connection.query (comando2, [
        salaId,
        usuarioId
    ])

    return { info, info2}
}


export async function verificarPermissaoSala(salaId, usuarioId) {
    
}