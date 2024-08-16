import { Request, Response } from "express";
import db from '../config/database';

async function listPessoasGroups(req: Request, res: Response) {
    const id_grupo = req.params.id_grupo;
    db.connection.query(
        `SELECT u.id, CONCAT(u.nome, ' ', u.sobrenome) AS nome_completo,
                DATE_FORMAT(pg.data_lancamento, '%d/%m/%Y') AS data_de_entrada_no_grupo
        FROM 
            pessoasgrupos pg
        LEFT JOIN 
            users u ON pg.id_users = u.id
        WHERE 
            pg.id_grupo =? ;`,
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


async function insertNewPeople(req: Request, res: Response) {
    const idGrupo = req.params.id_grupo; // Assuming you want to get the group id from the route parameter
    const { id_users } = req.body; // Assuming you are receiving id_users in the request body

    const querysql = `INSERT INTO pessoasgrupos (id_users, id_grupo) VALUES (?, ?);`; // Corrected SQL query
    const params = [id_users, idGrupo]; // Parameters for the query

    db.connection.query(querysql, params, (err, results) => {
        if (err) {
            console.error('Erro ao inserir membro no grupo:', err);
            return res.status(500).json({
                success: false,
                message: 'Erro ao inserir membro no grupo.',
                error: err
            });
        }

        res.json({
            success: true,
            message: 'Membro inserido no grupo com sucesso.',
            data: results
        });
    });
}

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
    insertNewPeople,
    // editPessoasGroups,
    deletePessoasGroups,
}