import { connection } from './connection.js';


export async function inserirSala(nome, usuario_id) {
    const comando = `
        INSERT INTO sala (nome, usuario_id) 
            VALUES (?, ?);
    `;

      const [ info ] = await connection.query(comando, [
        nome,
        usuario_id
    ]);

    const sala_id = info.insertId;

    const comando2 = ` 
        INSERT INTO salaPermissao (sala_id, usuario_id, aprovado)
            VALUES (?, ?, TRUE);`

    const [ info2 ] = await connection.query(comando2, [
        sala_id,
        usuario_id
    ])

    return [ sala_id ];
}