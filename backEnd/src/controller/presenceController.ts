import { Request, Response } from "express";
import db from '../config/database';

async function listPresence(req: Request, res: Response) {
    const id_grupo = req.params.id_grupo;
    db.connection.query(`
        SELECT
        DATE_FORMAT(r.data_reuniao, '%d/%m/%Y') AS data_reuniao,
            COUNT(DISTINCT pm.id_user) AS total_membros,
            COUNT(DISTINCT pv.id_visitante) AS total_visitantes,
            GROUP_CONCAT(DISTINCT pm.id_user SEPARATOR ', ') AS ids_membros,
            GROUP_CONCAT(DISTINCT CONCAT(u.nome, ' ', u.sobrenome) SEPARATOR ', ') AS membros,
            GROUP_CONCAT(DISTINCT pv.id_visitante SEPARATOR ', ') AS ids_visitantes,
            GROUP_CONCAT(DISTINCT CONCAT(vi.nome) SEPARATOR ', ') AS visitantes
        FROM
            reuniao r
        LEFT JOIN
            presenca pm ON r.id_reuniao = pm.id_reuniao AND pm.id_user IS NOT NULL
        LEFT JOIN
            presenca pv ON r.id_reuniao = pv.id_reuniao AND pv.id_user IS NULL
        LEFT JOIN
            users u ON pm.id_user = u.id
        LEFT JOIN
            visitantes vi ON vi.id = pv.id_visitante
        WHERE
            r.id_grupo = ?
                    GROUP BY
            r.data_reuniao;

    `,

        [id_grupo],
        (err, results) => {
            if (err) {
                console.error("Erro ao executar a consulta:", err);
                return res.status(500).json({
                    success: false,
                    message: 'Erro ao executar a consulta.'
                });
            }
            console.log(results);
            res.json({
                success: true,
                message: 'Listagem realizada com sucesso.',
                data: results
            });
        }
    );
}



async function postPresence(req: Request, res: Response) {
    // Parâmetros para a query SQL
    const querysql = 'INSERT INTO reuniao (data_reuniao, observacao, id_grupo) VALUES (?, ?, ?)';
    const params = [
        req.body.data_reuniao,
        req.body.observacao,
        req.body.id_grupo
    ];

    // Executando a query SQL com prepared statement
    db.connection.query(querysql, params, (err, results) => {
        if (err) {
            console.error('Erro ao cadastrar grupo:', err);
            res.status(500).send('Erro ao cadastrar grupo.');
        } else {
            console.log('Cadastro realizado com sucesso:', results);

            // Mostrar os dados postados no banco de dados
            console.log('Dados postados:');
            console.log('Data da reunião:', req.body.data_reuniao);
            console.log('Observação:', req.body.observacao);
            console.log('ID do grupo:', req.body.id_grupo);

            return res.status(200).json({ message: 'Cadastro Realizado com Sucesso', results });
        }
    });
}



async function postMembersVisitors(req: Request, res: Response) {
    try {
        // Validar entrada
        const { id_user, id_visitante, id_reuniao } = req.body;
        // if (!id_user || !id_reuniao) {
        //     return res.status(400).json({ message: 'Parâmetros inválidos' });
        // }

        // Parâmetros para a query SQL
        const querysql = 'INSERT INTO presenca (id_user, id_visitante, id_reuniao) VALUES (?, ?, ?)';
        const params = [id_user, id_visitante, id_reuniao];

        // Executando a query SQL com prepared statement
        await new Promise((resolve, reject) => {
            db.connection.query(querysql, params, (err, results) => {
                if (err) {
                    console.error('Erro ao cadastrar presença:', err);
                    return reject(err);
                } else {
                    console.log('Cadastro de presença realizado com sucesso:', results);

                    // Mostrar os dados postados no banco de dados
                    console.log('Dados postados:');
                    console.log('ID usuário:', id_user);
                    console.log('Nome Visitante:', id_visitante);
                    console.log('ID reunião:', id_reuniao);

                    return resolve(results);
                }
            });
        });

        return res.status(200).json({ message: 'Cadastro de presença realizado com sucesso' });
    } catch (error) {
        console.error('Erro ao cadastrar presença:', error);
        return res.status(500).json({ message: 'Erro ao cadastrar presença' });
    }
}



export default {
    listPresence,
    postPresence,
    postMembersVisitors
};
