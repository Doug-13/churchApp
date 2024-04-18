import { Request, Response } from "express";
import db from '../config/database';

async function listPresence(req: Request, res: Response) {
    const id_grupo = req.params.id_grupo;
    db.connection.query(`
        SELECT
            DATE_FORMAT(p.data_presenca, '%d/%m/%Y') AS data_reuniao,
            g.nome_grupo AS nome_reuniao,
            (SELECT COUNT(*) FROM presenca WHERE id_grupo = p.id_grupo AND id_user IS NULL AND data_presenca = p.data_presenca) AS total_visitantes,
            (SELECT COUNT(*) FROM presenca WHERE id_grupo = p.id_grupo AND id_user IS NOT NULL AND data_presenca = p.data_presenca) AS total_membros,
            GROUP_CONCAT(CASE WHEN p.id_user IS NOT NULL THEN CONCAT(u.nome, ' ', u.sobrenome) END SEPARATOR ', ') AS membros,
            GROUP_CONCAT(CASE WHEN p.id_user IS NULL THEN p.nome_visitante END SEPARATOR ', ') AS visitantes
        FROM
            presenca p
        JOIN
            grupos g ON p.id_grupo = g.id_grupo
        LEFT JOIN
            users u ON p.id_user = u.id
        WHERE
            p.id_grupo = ?
        GROUP BY
            data_reuniao,
            nome_reuniao,
            p.data_presenca;
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

export default {
    listPresence
};
