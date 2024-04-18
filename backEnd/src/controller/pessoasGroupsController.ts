import { Request, Response } from "express";
import db from '../config/database';

async function listPessoasGroups(req: Request, res: Response) {
    const id_grupo = req.params.id_grupo;
    db.connection.query(
        `SELECT CONCAT(u.nome, ' ', u.sobrenome) AS nome_completo,
                DATE_FORMAT(pg.data_lancamento, '%d/%m/%Y') AS data_de_entrada_no_grupo
        FROM 
            pessoasgrupos pg
        LEFT JOIN 
            users u ON pg.id_users = u.id
        WHERE 
            pg.id_grupo = ?;`,
        [id_grupo],
        (err, results) => {
            if (err) {
                console.error(err);
                res.status(500).json({
                    success: false,
                    message: 'Ocorreu um erro ao listar as pessoas do grupo.'
                });
            } else {
                console.log(results);
                res.json({
                    success: true,
                    message: 'Listagem realizada com sucesso.',
                    data: results
                });
            }
        }
    );
}

async function createPessoasGroups(req: Request, res: Response) {
    const querysql = 'INSERT INTO PessoasGrupos (id_users, id_grupo) VALUES (?, ?);';
    const params = [
        req.body.id_users,
        req.body.id_grupo
    ];

    db.connection.query(querysql, params, (err, results) => {
        if (err) {
            console.error('Erro ao cadastrar pessoas em grupos:', err);
            res.status(500).send('Erro ao cadastrar pessoas em grupos');
            return;
        }
        console.log('Cadastro realizado com sucesso:', results);
        res.status(200).send('Cadastro realizado com sucesso');
    });
}

async function editPessoasGroups(req: Request, res: Response) {
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

async function deletePessoasGroups(req: Request, res: Response) {
    const idUser = req.params.id;
    const querysql = 'delete from products WHERE id_product =?'

    db.connection.query(querysql, [idUser], (err, results) => {
        res.json({
            message: 'Cadastro apagado com Sucesso',
        });
    })
}


export default {
    listPessoasGroups,
    createPessoasGroups,
    editPessoasGroups,
    deletePessoasGroups,
}