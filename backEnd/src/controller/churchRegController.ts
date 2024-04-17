import { Request, Response } from "express";
import db from '../config/database';

interface ChurchData {
    nome: string;
    telefone: string;
    email: string;
    estado: string;
    cidade: string;
    rua: string;
    numero: string;
    cep: string;
    lider?: string;
    sobre_nos?: string;
    logo?: string;
    Instagram?: string;
    WhatsApp?: string;
    id_creator?: number;
}

async function listChurch(req: Request, res: Response): Promise<void> {
    try {
        db.connection.query('SELECT * FROM CHURCH', (err, results) => {
            if (err) {
                console.error("Erro ao listar igrejas:", err);
                res.status(500).json({
                    success: false,
                    message: 'Erro ao listar igrejas.'
                });
            } else {
                console.log(results);
                res.json({
                    success: true,
                    message: 'Listagem realizada com sucesso.',
                    data: results
                });
            }
        });
    } catch (error) {
        console.error("Erro ao listar igrejas:", error);
        res.status(500).json({
            success: false,
            message: 'Erro ao listar igrejas.'
        });
    }
}

async function ChurchUserId(req: Request, res: Response): Promise<void> {
    const id_creator: number = parseInt(req.params.id_creator);
    try {
        db.connection.query('SELECT * FROM CHURCH WHERE id_creator=?', [id_creator], (err, results) => {
            if (err) {
                console.error("Erro ao listar igrejasdfdfdfd:", err);
                res.status(500).json({
                    success: false,
                    message: 'Erro ao listar igrejas teste.'
                });
            } else {
                console.log(results);
                res.json({
                    success: true,
                    message: 'Listagem realizada com sucesso.',
                    data: results
                });
            }
        });
    } catch (error) {
        console.error("Erro ao listar igrejas:", error);
        res.status(500).json({
            success: false,
            message: 'Erro ao listar igreja teste 2s.'
        });
    }
}

async function listChurchId(req: Request, res: Response): Promise<void> {
    const userId: number = parseInt(req.params.id);
    try {
        db.connection.query('SELECT * FROM CHURCH WHERE id=?', [userId], (err, results) => {
            if (err) {
                console.error("Erro ao listar igrejas:", err);
                res.status(500).json({
                    success: false,
                    message: 'Erro ao listar igrejas.'
                });
            } else {
                console.log(results);
                res.json({
                    success: true,
                    message: 'Listagem realizada com sucesso.',
                    data: results
                });
            }
        });
    } catch (error) {
        console.error("Erro ao listar igrejas:", error);
        res.status(500).json({
            success: false,
            message: 'Erro ao listar igrejas.'
        });
    }
}

async function createChurch(req: Request, res: Response): Promise<void> {
    try {
        const churchData: ChurchData = req.body;
        const querySql = 'INSERT INTO CHURCH SET ?';

        db.connection.query(querySql, churchData, (err, results) => {
            if (err) {
                console.error("Erro ao cadastrar igreja:", err);
                res.status(500).json({
                    success: false,
                    message: 'Erro ao cadastrar igreja.'
                });
            } else {
                console.log("Cadastro de igreja realizado com sucesso");
                res.status(200).json({
                    success: true,
                    message: 'Cadastro de igreja realizado com sucesso.'
                });
            }
        });
    } catch (error) {
        console.error("Erro ao cadastrar igreja:", error);
        res.status(500).json({
            success: false,
            message: 'Erro ao cadastrar igreja.'
        });
    }
}


async function editChurch(req: Request, res: Response): Promise<void> {
    try {
        const { id } = req.params;
        const { nome, telefone, email, estado, cidade, rua, numero, cep, lider, sobre_nos, logo, Instagram, WhatsApp } = req.body;
        const querySql = 'UPDATE CHURCH SET ? WHERE id = ?';

        const churchData: ChurchData = {
            nome,
            telefone,
            email,
            estado,
            cidade,
            rua,
            numero,
            cep,
            lider,
            sobre_nos,
            logo,
            Instagram,
            WhatsApp
        };

        db.connection.query(querySql, [churchData, id], (err, results) => {
            if (err) {
                console.error("Erro ao editar igreja:", err);
                res.status(500).json({
                    success: false,
                    message: 'Erro ao editar igreja.'
                });
            } else {
                res.json({
                    success: true,
                    message: 'Alteração realizada com sucesso.',
                    data: results
                });
            }
        });
    } catch (error) {
        console.error("Erro ao editar igreja:", error);
        res.status(500).json({
            success: false,
            message: 'Erro ao editar igreja.'
        });
    }
}

async function deleteChurch(req: Request, res: Response): Promise<void> {
    try {
        const { id } = req.params;
        const querySql = 'DELETE FROM CHURCH WHERE id = ?';

        db.connection.query(querySql, [id], (err, results) => {
            if (err) {
                console.error("Erro ao deletar igreja:", err);
                res.status(500).json({
                    success: false,
                    message: 'Erro ao deletar igreja.'
                });
            } else {
                res.json({
                    success: true,
                    message: 'Cadastro apagado com sucesso.'
                });
            }
        });
    } catch (error) {
        console.error("Erro ao deletar igreja:", error);
        res.status(500).json({
            success: false,
            message: 'Erro ao deletar igreja.'
        });
    }
}

export default {
    listChurch,
    ChurchUserId,
    listChurchId,
    createChurch,
    editChurch,
    deleteChurch
};
