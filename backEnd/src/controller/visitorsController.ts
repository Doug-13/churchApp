import { Request, Response } from "express";
import db from '../config/database';

// async function userVisitor(req: Request, res: Response) {
//     const idIgreja = req.params.id_igreja; // Capturando o ID da igreja dos parâmetros da requisição
//     db.connection.query(
//         `SELECT * FROM Visitantes WHERE id_culto IN (SELECT id FROM RelatorioCulto WHERE id_igreja = ? AND id = ?)`,
//         [idIgreja],
//         (err, results) => {
//             if (err) {
//                 console.error("Erro ao listar visitantes:", err);
//                 res.status(500).json({
//                     success: false,
//                     message: 'Erro ao listar visitantes.'
//                 });
//             } else {
//                 console.log(results);
//                 res.json({
//                     success: true,
//                     message: 'Listagem realizada com sucesso.',
//                     data: results
//                 });
//             }
//         }
//     );
// }

async function listvisitors(req: Request, res: Response) {
    const idIgreja = req.params.id_igreja; // Capturando o ID da igreja dos parâmetros da requisição
    db.connection.query(
        `SELECT * FROM Visitantes WHERE id_culto IN (SELECT id FROM RelatorioCulto WHERE id_igreja = ?)`,
        [idIgreja],
        (err, results) => {
            if (err) {
                console.error("Erro ao listar visitantes:", err);
                res.status(500).json({
                    success: false,
                    message: 'Erro ao listar visitantes.'
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

async function listVisitorsDay(req: Request, res: Response) {
    const idIgreja = req.params.id_igreja;
    
    db.connection.query(
        `SELECT Visitantes.*, RelatorioCulto.data
        FROM Visitantes
        INNER JOIN RelatorioCulto ON Visitantes.id_culto = RelatorioCulto.id
        WHERE RelatorioCulto.id_igreja = ?
        ORDER BY RelatorioCulto.data DESC;`,
        [idIgreja],
        (err, results) => {
            if (err) {
                console.error("Erro ao listar visitantes:", err);
                res.status(500).json({
                    success: false,
                    message: 'Erro ao listar visitantes.'
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

async function createvisitors(req: Request, res: Response) {
    const querysql = 'INSERT INTO Visitantes (id_culto, nome, whatsapp) VALUES (?, ?, ?)';
    const params = [
        req.body.id_culto,
        req.body.nome,
        req.body.whatsapp
    ];

    db.connection.query(querysql, params, (err, results) => {
        if (err) {
            console.error("Erro ao criar visitante:", err);
            res.status(500).json({
                success: false,
                message: 'Erro ao criar visitante.'
            });
        } else {
            console.log(results);
            res.json({
                success: true,
                message: 'Visitante criado com sucesso.',
                data: results
            });
        }
    });
}

async function editVisitor(req: Request, res: Response) {
    const id = req.params.id;
    const querysql = `UPDATE Visitantes SET id_culto = ?, nome = ?, whatsapp = ? WHERE id = ?`;
    const params = [
        req.body.id_culto,
        req.body.nome,
        req.body.whatsapp,
        id  // Adicione o id do visitante como último parâmetro
    ];

    try {
        db.connection.query(querysql, params, (err, results) => {
            if (err) {
                console.error('Erro ao editar visitante:', err);
                res.status(500).json({ success: false, message: 'Erro ao editar visitante.' });
            } else {
                res.json({
                    success: true,
                    message: 'Alteração realizada com sucesso.',
                    data: results
                });
            }
        });
    } catch (error) {
        console.error('Erro interno:', error);
        res.status(500).json({ success: false, message: 'Erro interno no servidor.' });
    }
}



async function deletevisitor(req: Request, res: Response) {
    const idUser = req.params.id;
    const querysql = 'delete from visitors WHERE id_visitor =?'

    db.connection.query(querysql, [idUser], (err, results) => {
        res.json({
            message: 'Cadastro apagado com Sucesso',
        });
    })
}


export default {
    // userVisitor,
    listvisitors,
    listVisitorsDay,
    createvisitors,
    editVisitor,
    
    deletevisitor
}