import { Request, Response } from "express";
import db from '../config/database';

async function listFinancials(req: Request, res: Response) {
    db.connection.query('SELECT * FROM TransacoesFinanceiras WHERE id_ofertante = ? ORDER BY data DESC; ', [req.params.id], (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).json({
                success: false,
                message: 'Erro ao listar transações financeiras.'
            });
        } else {
            res.json({
                success: true,
                message: 'Listagem realizada com sucesso.',
                data: results
            });
        }
    });
}

async function listAllFinancials(req: Request, res: Response) {
    db.connection.query('SELECT * FROM TransacoesFinanceiras WHERE id_church = ? ORDER BY data DESC; ', [req.params.id_church], (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).json({
                success: false,
                message: 'Erro ao listar transações financeiras.'
            });
        } else {
            res.json({
                success: true,
                message: 'Listagem realizada com sucesso.',
                data: results
            });
        }
    });
}


async function createFinancials(req: Request, res: Response) {
    const querysql = 'INSERT INTO TransacoesFinanceiras (data, tipo, descricao, valor, id_ofertante, tipo_contribuicao, comentarios, id_church, id_criador) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);';
    const params = [
        req.body.data,
        req.body.tipo,
        req.body.descricao,
        req.body.valor,
        req.body.id_ofertante,
        req.body.tipo_contribuicao,
        req.body.comentarios,
        req.body.id_church,
        req.body.id_criador
    ];
    db.connection.query(querysql, params, (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).json({
                success: false,
                message: 'Erro ao criar transação financeira.'
            });
        } else {
            res.json({
                success: true,
                message: 'Cadastro realizado com sucesso.',
                data: results
            });
        }
    });
}

async function editFinancial(req: Request, res: Response) {
    const querysql = `UPDATE TransacoesFinanceiras SET data = ?, tipo = ?, descricao = ?, valor = ?, ofertante_dizimista = ?, tipo_contribuicao = ?, comentarios = ? WHERE id = ?;`;
    const params = [
        req.body.data,
        req.body.tipo,
        req.body.descricao,
        req.body.valor,
        req.body.ofertante_dizimista,
        req.body.tipo_contribuicao,
        req.body.comentarios,
        req.params.id
    ];
    db.connection.query(querysql, params, (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).json({
                success: false,
                message: 'Erro ao editar transação financeira.'
            });
        } else {
            res.json({
                success: true,
                message: 'Alteração realizada com sucesso.',
                data: results
            });
        }
    });
}

async function deleteFinancial(req: Request, res: Response) {
    const querysql = 'DELETE FROM TransacoesFinanceiras WHERE id = ?;';
    db.connection.query(querysql, [req.params.id], (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).json({
                success: false,
                message: 'Erro ao excluir transação financeira.'
            });
        } else {
            res.json({
                success: true,
                message: 'Cadastro apagado com sucesso.'
            });
        }
    });
}

export default {
    listFinancials,
    listAllFinancials,
    createFinancials,
    editFinancial,
    deleteFinancial
};
