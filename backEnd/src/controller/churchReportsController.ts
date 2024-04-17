import { Request, Response } from "express";
import db from '../config/database';

async function listreports(req: Request, res: Response) {
    const idIgreja = req.params.id_igreja;
    db.connection.query('SELECT * FROM relatorioculto WHERE id_igreja = ? ORDER BY data desc;', [idIgreja], (err, results) => {
        console.log(results)
        if (err) {
            console.log("Erro ao listar relatórios de culto:", err);
            res.status(500).json({
                success: false,
                message: 'Erro ao listar relatórios de culto.'
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

async function listreportsunique(req: Request, res: Response) {
    const idIgreja = req.params.id_igreja;
    const idReport = req.params.id;
    
    db.connection.query('SELECT * FROM relatorioculto WHERE id_igreja = ? AND id = ?', [idIgreja, idReport], (err, results) => {
        console.log(results)
        if (err) {
            console.log("Erro ao listar relatórios de culto:", err);
            res.status(500).json({
                success: false,
                message: 'Erro ao listar relatórios de culto.'
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

async function createReports(req: Request, res: Response) {
    const querysql = 'INSERT INTO RelatorioCulto (data, hora, tipo_culto, pregador, tema, numero_presentes, numero_visitantes, comentarios, id_criador, id_igreja) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);';
    const params = [
        req.body.data,
        req.body.hora,
        req.body.tipo_culto,
        req.body.pregador,
        req.body.tema,
        req.body.numero_presentes,
        req.body.numero_visitantes,
        req.body.comentarios,
        req.body.id_criador,
        req.body.id_igreja
    ];

    db.connection.query(querysql, params, (err, results) => {
        if (err) {
            console.error('Error creating report:', err);
            return res.status(500).json({ error: 'An error occurred while creating the report.' });
        }
        console.log('Report created successfully:', results);
        return res.status(200).json({ message: 'Cadastro Realizado com Sucesso', results });
    });
}


// http://localhost:3006/api/report/208/5
// http://localhost:3006/api/reports/208

async function editreport(req: Request, res: Response) {
    const idReport = req.params.id; // Capturando o ID do relatório dos parâmetros da requisição
    const querysql = `UPDATE RelatorioCulto SET data = ?, hora = ?, tipo_culto = ?, pregador = ?, tema = ?, numero_presentes = ?, numero_visitantes = ?, comentarios = ? WHERE id = ?`;

    const params = [
        req.body.data,
        req.body.hora,
        req.body.tipo_culto,
        req.body.pregador,
        req.body.tema,
        req.body.numero_presentes,
        req.body.numero_visitantes,
        req.body.comentarios,
        req.params.id // Corrigindo para req.params.id para capturar corretamente o ID do relatório
    ];

    db.connection.query(querysql, params, (err, results) => {
        if (err) {
            console.error("Erro ao editar relatório de culto:", err);
            return res.status(500).json({
                success: false,
                message: 'Erro ao editar relatório de culto.',
                error: err // Adicionando o erro à resposta JSON
            });
        } else {
            console.log(results);
            return res.json({
                success: true,
                message: 'Alteração realizada com sucesso.',
                data: results
            });
        }
    });
}


async function deletereport(req: Request, res: Response) {
    const idIgreja = req.params.id_igreja;
    const idReport = req.params.id;
    const querysql = 'DELETE FROM relatorioculto WHERE id_igreja = ? AND id = ?';

    db.connection.query(querysql, [idIgreja, idReport], (err, results) => {
        if (err) {
            console.error("Erro ao excluir relatório de culto:", err);
            res.status(500).json({
                success: false,
                message: 'Erro ao excluir relatório de culto.'
            });
        } else {
            console.log("Relatório de culto excluído com sucesso.");
            res.json({
                success: true,
                message: 'Relatório de culto excluído com sucesso.'
            });
        }
    });
}

export default {
    listreports,//ok
    listreportsunique,//ok
    createReports,//ok
    editreport,//ok
    deletereport//ok
}   