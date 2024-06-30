import { Request, Response } from "express";
import db from '../config/database';
import { RowDataPacket } from 'mysql2';

interface users {
    id: number;
    nome: string;
    sobrenome: string;
    email: string;
    senha: string;
    telefone: string;
    data_nascimento: Date;
    profissao: string;
    escolaridade: string;
    data_batismo: Date;
    data_entrada_igreja: Date;
    logradouro: string;
    numero: string;
    complemento: string;
    cidade: string;
    bairro: string;
    cep: string;
    id_igreja: number;
    foto_url: string;
    Instagram: string,
    WhatsApp: string;
}

// Chamar função para mostrar usuários (GET)
async function listUsers(req: Request, res: Response) {
    db.connection.query('SELECT * FROM USERS', (err, results: RowDataPacket[]) => {
        if (err) {
            console.log("Erro ao listar clientes:", err);
            res.status(500).json({
                success: false,
                message: 'Erro ao listar clientes.'
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

async function listNames(req: Request, res: Response) {
    const { id_igreja } = req.params; // Supondo que você esteja passando o id_igreja como um parâmetro na rota
    db.connection.query('SELECT nome, data_nascimento FROM USERS WHERE id_igreja = ?', [id_igreja], (err, results: RowDataPacket[]) => {
        if (err) {
            console.log("Erro ao listar clientes:", err);
            res.status(500).json({
                success: false,
                message: 'Erro ao listar clientes.'
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

// Chamar função para mostrar usuários (GET)
async function getUser(req: Request, res: Response): Promise<void> {
    const userId: number = parseInt(req.params.id);
    const querySql: string = 'SELECT * FROM USERS WHERE ID = ?';

    db.connection.query(querySql, [userId], (err, results: RowDataPacket[]) => {
        if (err) {
            console.error("Erro ao buscar cliente:", err);
            res.status(500).json({
                success: false,
                message: 'Erro ao buscar cliente.'
            });
        } else {
            const user: users = results[0] as users;
            if (user) {
                res.json({
                    success: true,
                    message: 'Usuário encontrado com sucesso.',
                    data: user
                });
            } else {
                res.status(404).json({
                    success: false,
                    message: 'Usuário não encontrado.'
                });
            }
        }
    });
}

// Chamar função para mostrar usuários (GET)
async function getUsersById(req: Request, res: Response): Promise<void> {
    const userId: number = parseInt(req.params.id);
    const churchId: number = parseInt(req.params.id_igreja);

    // Verificar se os parâmetros são válidos
    if (isNaN(userId) || isNaN(churchId)) {
        res.status(400).json({
            success: false,
            message: 'Parâmetros inválidos: id ou id_igreja não são números válidos.'
        });
        return;
    }

    const querySql: string = 'SELECT * FROM USERS WHERE ID_IGREJA = ? AND ID = ?';

    db.connection.query(querySql, [churchId, userId], (err, results: RowDataPacket[]) => {
        if (err) {
            console.error("Erro ao buscar cliente:", err);
            res.status(500).json({
                success: false,
                message: 'Erro ao buscar cliente.'
            });
        } else {
            const user: users = results[0] as users;
            if (user) {
                res.json({
                    success: true,
                    message: 'Usuário encontrado com sucesso.',
                    data: user
                });
            } else {
                res.status(404).json({
                    success: false,
                    message: 'Usuário não encontrado.'
                });
            }
        }
    });
}


async function getUsersByChurchId(req: Request, res: Response) {
    const churchId = req.params.id_igreja;
    const querysql = 'SELECT * FROM USERS WHERE ID_IGREJA = ? ';

    db.connection.query(querysql, [churchId], (err, results: RowDataPacket[]) => {
        if (err) {
            console.log("Erro ao buscar usuários:", err);
            res.status(500).json({
                success: false,
                message: 'Erro ao buscar usuários.'
            });
        } else {
            if (results.length > 0) {
                res.json({
                    success: true,
                    message: 'Usuários encontrados com sucesso.',
                    data: results
                });
            } else {
                res.status(404).json({
                    success: false,
                    message: 'Nenhum usuário encontrado para esta igreja.'
                });
            }
        }
    });
}

async function getUsersBirthdays(req: Request, res: Response) {
    const churchId = parseInt(req.params.id_igreja);

    // Exibir o valor de churchId no console
    console.log("churchId:", churchId);

    // Verificar se o parâmetro id_igreja é válido
    if (isNaN(churchId)) {
        res.status(400).json({
            success: false,
            message: 'Parâmetro inválido: id_igreja não é um número válido.'
        });
        return;
    }

    const querysql = 
        `SELECT NOME, SOBRENOME, 
        DATE_FORMAT(DATA_NASCIMENTO, '%d/%m/%Y') AS DATA_NASCIMENTO_FORMATADA FROM USERS
        WHERE ID_IGREJA = ? AND 
        DATA_NASCIMENTO IS NOT NULL`;

    db.connection.query(querysql, [churchId], (err, results: RowDataPacket[]) => {
        if (err) {
            console.log("Erro ao buscar usuários:", err);
            res.status(500).json({
                success: false,
                message: 'Erro ao buscar usuários.'
            });
        } else {
            if (results.length > 0) {
                res.json({
                    success: true,
                    message: 'Usuários encontrados com sucesso.',
                    data: results
                });
            } else {
                res.status(404).json({
                    success: false,
                    message: 'Nenhum usuário encontrado para esta igreja.'
                });
            }
        }
    });
}


async function login(req: Request, res: Response) {
    const { email, senha } = req.body;

    // Verificar se o email e senha estão presentes no corpo da solicitação
    if (!email || !senha) {
        return res.status(400).json({ success: false, message: 'É necessário fornecer email e senha.' });
    }

    // Consultar o banco de dados para verificar se o usuário existe
    db.connection.query('SELECT * FROM USERS WHERE email = ? AND senha = ?', [email, senha], (err, results: RowDataPacket[]) => {
        if (err) {
            console.error("Erro ao realizar login:", err);
            return res.status(500).json({ success: false, message: 'Erro ao realizar login.' });
        }

        // Verificar se encontrou algum usuário com o email e senha fornecidos
        if (results.length === 0) {
            return res.status(401).json({ success: false, message: 'Credenciais inválidas.' });
        }

        // Se encontrou, retorna sucesso e os dados do usuário
        const user: users = results[0] as users;
        res.json({ success: true, message: 'Login realizado com sucesso.', data: user });
    });
}

async function createUsers(req: Request, res: Response) {
    const querysql = `
        INSERT INTO USERS 
        (nome, sobrenome, email, senha, telefone, data_nascimento, profissao, escolaridade, data_batismo, data_entrada_igreja, logradouro, numero, complemento, cidade, bairro, cep, id_igreja, foto_url, Instagram, WhatsApp, data_cadastro, data_modificacao) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW());
    `;

    const params = [
        req.body.nome,
        req.body.sobrenome,
        req.body.email,
        req.body.senha,
        req.body.telefone,
        req.body.data_nascimento,
        req.body.profissao,
        req.body.escolaridade,
        req.body.data_batismo,
        req.body.data_entrada_igreja,
        req.body.logradouro,
        req.body.numero,
        req.body.complemento,
        req.body.cidade,
        req.body.bairro,
        req.body.cep,
        req.body.id_igreja,
        req.body.foto_url,
        req.body.Instagram,
        req.body.WhatsApp
    ];

    db.connection.query(querysql, params, (err, results) => {
        if (err) {
            console.error("Erro ao criar cliente:", err);
            res.status(500).json({
                success: false,
                message: 'Ussuário já cadastrado!.'
            });
        } else {
            console.log("Cadastro Realizado com Sucesso");
            res.status(200).json({
                success: true,
                message: 'Cadastro Realizado com Sucesso'
            });
        }
    });
}

async function putUser(req: Request, res: Response) {
    const userId: number = parseInt(req.params.id);
    console.log('UserID:', userId);

    const data = req.body.data; 

    const querySql: string = `
    UPDATE users 
    SET nome = ?, sobrenome = ?, email = ?, senha = ?, telefone = ?, data_nascimento = ?, profissao = ?, escolaridade = ?, data_batismo = ?, data_entrada_igreja = ?, logradouro = ?, numero = ?, complemento = ?, cidade = ?, bairro = ?, cep = ?, id_igreja = ?, foto_url = ?, Instagram = ?, WhatsApp = ?, data_modificacao = ?
    WHERE ID = ?
    `;

    const params = [
        data.nome,
        data.sobrenome,
        data.email,
        data.senha,
        data.telefone,
        data.data_nascimento,
        data.profissao,
        data.escolaridade,
        data.data_batismo,
        data.data_entrada_igreja,
        data.logradouro ,
        data.numero ,
        data.complemento ,
        data.cidade ,
        data.bairro ,
        data.cep ,
        data.id_igreja,
        data.foto_url,
        data.Instagram,
        data.WhatsApp,
        new Date(), // Defina data_modificacao como a data atual
        userId
    ];

    console.log('SQL Query:', querySql);
    console.log('Parameters:', params);

    db.connection.query(querySql, params, (err, results) => {
        if (err) {
            console.log("Erro ao editar cliente:", err);
            res.status(500).json({
                success: false,
                message: 'Erro ao editar cliente.'
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

async function editChurchUser(req: Request, res: Response) {
    const userId: number = parseInt(req.body.id);
    const churchId: number = parseInt(req.body.id_igreja);
    const querySql: string = `
    UPDATE users 
    SET id_igreja = ?
    WHERE ID = ?;
`;

    const params = [
        churchId,

        userId
    ];

    db.connection.query(querySql, params, (err, results) => {
        if (err) {
            console.log("Erro ao editar cliente:", err);
            res.status(500).json({
                success: false,
                message: 'Erro ao editar cliente.'
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

async function deleteUser(req: Request, res: Response) {
    const userId: number = parseInt(req.params.id);
    const churchId: number = parseInt(req.params.id_igreja);
    const querySql: string = `DELETE FROM users WHERE ID_IGREJA = ? AND ID = ?`;
    db.connection.query(querySql, [churchId, userId], (err, results) => {
        if (err) {
            console.log("Erro ao deletar cliente:", err);
            res.status(500).json({
                success: false,
                message: 'Erro ao deletar cliente.'
            });
        } else {
            res.json({
                message: 'Cadastro apagado com Sucesso',
            });
        }
    });
}

export default {
    getUsersById,//ok
    listNames,
    getUser,//ok
    editChurchUser,
    getUsersBirthdays,
    listUsers,//ok
    getUsersByChurchId,//ok
    login,//ok
    createUsers,//ok
    putUser,    
    deleteUser//ok
}


