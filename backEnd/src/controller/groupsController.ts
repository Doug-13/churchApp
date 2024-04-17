import { Request, Response } from "express";
import db from '../config/database';

async function listAllGroups(req: Request, res: Response) {
    const id_igreja = req.params.id_igreja;
    db.connection.query('SELECT * FROM grupos WHERE id_igreja = ?', [id_igreja], (err, results) => {
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
    });
}


async function listGroup(req: Request, res: Response) {
    const id_grupo = req.params.id_grupo;
    db.connection.query(
        `SELECT g.nome_grupo AS nome_do_grupo, 
            g.id_grupo,
            IFNULL(CONCAT(l.nome, ' ', l.sobrenome), '') AS nome_do_lider,
            IFNULL(CONCAT(vl.nome, ' ', vl.sobrenome), '') AS nome_do_vice_lider,
            g.descricao_grupo,
            g.data_lancamento,
            g.endereco,
            g.bairro,
            g.numero,
            g.cidade,
            g.estado
        FROM grupos g
        LEFT JOIN users l ON g.id_lider = l.id
        LEFT JOIN users vl ON g.id_vicelider = vl.id
        WHERE g.id_grupo = ?;
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



async function creategroups(req: Request, res: Response) {
    const querysql = `INSERT INTO grupos (nome_grupo, descricao_grupo, id_lider, id_vicelider, id_criador, id_igreja, data_lancamento, endereco, bairro, numero, cidade, estado) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    // Parâmetros para a query SQL
    const params = [
        req.body.nome_grupo,
        req.body.descricao_grupo,
        req.body.id_lider,
        req.body.id_vicelider,
        req.body.id_criador,
        req.body.id_igreja,
        new Date().toISOString().slice(0, 19).replace('T', ' '),
        req.body.endereco,
        req.body.bairro,
        req.body.numero,
        req.body.cidade,
        req.body.estado
    ];

    // Executando a query SQL com prepared statement
    db.connection.query(querysql, params, (err, results) => {
        if (err) {
            console.error('Erro ao cadastrar grupo:', err);
            res.status(500).send('Erro ao cadastrar grupo.');
        } else {
            console.log('Cadastro realizado com sucesso:', results);
            return res.status(200).json({ message: 'Cadastro Realizado com Sucesso', results });
        }
    });
}




async function editgroup(req: Request, res: Response) {
    const idUser = req.params.id;
    const querysql = `UPDATE products SET DS_NAME = ?,DS_DESCRIPTION = ?, NM_VALUE = ?, DS_BRAND = ?,DS_STATUS = ? WHERE id_product = ?`;

    const params = Array(
        req.body.DS_NAME,
        req.body.DS_DESCRIPTION,
        req.body.NM_VALUE,
        req.body.DS_BRAND,
        req.body.DS_STATUS,
        req.params.id
    );
    db.connection.query(querysql, params, (err, results) => {
        res.json({
            success: true,
            message: 'Alteração realizada com sucesso.',
            data: results
        });
    })
};

async function deletegroup(req: Request, res: Response) {
    const idUser = req.params.id;
    const querysql = 'delete from products WHERE id_product =?'

    db.connection.query(querysql, [idUser], (err, results) => {
        res.json({
            message: 'Cadastro apagado com Sucesso',
        });
    })
}


export default {
    listAllGroups,
    listGroup,
    creategroups,
    editgroup,
    deletegroup
}