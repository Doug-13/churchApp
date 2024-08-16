import { Request, Response } from "express";
import db from '../config/database';

async function listEventsAll(req: Request, res: Response) {
    try {
        const igrejaId = req.params.igreja_id;

        const query = `SELECT * FROM EVENTOS WHERE igreja_id = ?`;
        db.connection.query(query, [igrejaId], (err, results) => {
            if (err) {
                console.error(err);
                return res.status(500).json({
                    success: false,
                    message: 'Erro ao listar eventos.'
                });
            }

            res.json({
                success: true,
                message: 'Listagem realizada com sucesso.',
                data: results
            });
        });
    } catch (error) {
        console.error('Erro inesperado:', error);
        res.status(500).json({
            success: false,
            message: 'Erro inesperado'
        });
    }
}


async function listEvents(req: Request, res: Response) {
    try {
        const igrejaId = req.params.igreja_id;

        const query = `        
            SELECT 
                r.id AS id_recorrencia,
                e.id AS id_evento,
                e.nome_evento,
                e.data_inicio,
                e.data_fim,
                e.hora_inicio,
                e.hora_fim,
                e.local,
                e.detalhes,
                e.criado_por_id,
                e.data_criacao,
                e.igreja_id,
                DATE_FORMAT(r.data_inicio, '%d/%m/%Y') AS data_inicio_Rec,
                DATE_FORMAT(r.data_inicio, '%d/%m/%Y') AS data_formatada,
                r.ativo
            FROM eventos AS e  
            INNER JOIN recorrencias AS r ON e.id = r.evento_id  
            WHERE e.igreja_id = ?   
            AND r.data_inicio >= CURRENT_DATE()  -- Exclui datas anteriores a hoje          

            UNION ALL  

            SELECT      
                '-' AS id_recorrencia,
                e.id AS id_evento,
                e.nome_evento,
                e.data_inicio,
                e.data_fim,
                e.hora_inicio,
                e.hora_fim,
                e.local,
                e.detalhes,
                e.criado_por_id,
                e.data_criacao,
                e.igreja_id,
                DATE_FORMAT(e.data_inicio, '%d/%m/%Y') AS data_inicio_Rec,  
                DATE_FORMAT(e.data_inicio, '%d/%m/%Y') AS data_formatada,
                r.ativo
            FROM eventos AS e 
            LEFT JOIN recorrencias AS r ON e.id = r.evento_id 
            WHERE e.igreja_id = ?     
            AND (e.recorrencia = 'Evento Unico' OR e.recorrencia IS NULL) 
            AND e.data_inicio >= CURRENT_DATE() 
            ORDER BY data_inicio_Rec;

    
        `;
        db.connection.query(query, [igrejaId, igrejaId], (err, results) => {
            if (err) {
                console.error(err);
                return res.status(500).json({
                    success: false,
                    message: 'Erro ao listar eventos.'
                });
            }

            res.json({
                success: true,
                message: 'Listagem realizada com sucesso.',
                data: results
            });
        });
    } catch (error) {
        console.error('Erro inesperado:', error);
        res.status(500).json({
            success: false,
            message: 'Erro inesperado'
        });
    }
}


async function createEvents(req: Request, res: Response) {
    // Definindo 'Evento único' como valor padrão para recorrência se não for especificado pelo usuário
    const recorrencia = req.body.recorrencia || 'Evento único';

    // SQL query para inserir os dados
    const querysql = 'INSERT into eventos (criado_por_id, igreja_id, nome_evento, local, data_inicio, data_fim, hora_inicio, hora_fim, detalhes, recorrencia) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);';

    const params = [
        req.body.criado_por_id,
        req.body.igreja_id,
        req.body.nome_evento,
        req.body.local,
        req.body.data_inicio,
        req.body.data_fim,
        req.body.hora_inicio,
        req.body.hora_fim,
        req.body.detalhes,
        recorrencia // Usando o valor padrão ajustado aqui
    ];

    // Executar a consulta SQL
    db.connection.query(querysql, params, (err, results) => {
        if (err) {
            // Em caso de erro, envie uma resposta de erro
            res.status(500).send('Erro ao cadastrar o evento');
            console.error('Erro ao inserir evento no banco de dados:', err);
        } else {
            // Se a inserção for bem-sucedida, envie uma resposta de sucesso
            res.status(200).send('Cadastro Realizado com Sucesso');
        }
    });
}



async function listRecurringEvents(req: Request, res: Response) {
    try {
        const id = req.params.id; 

        const query = `
            SELECT 
                r.id AS id_recorrencia,
                e.nome_evento,
                r.data_inicio,
                r.data_fim,
                r.hora_inicio,
                r.hora_fim,
                r.ativo,
                e.local,
                e.detalhes,                
                DATE_FORMAT(r.data_inicio, '%d/%m/%Y') AS data_inicio_Form, 
                DATE_FORMAT(r.data_fim, '%d/%m/%Y') AS data_fim_Form
            FROM 
                eventos AS e 
            INNER JOIN 
                recorrencias AS r ON e.id = r.evento_id 
            WHERE 
                r.id = ?  -- Filtra pelo ID da recorrência
            ORDER BY 
                r.data_inicio;
        `;

        db.connection.query(query, [id], (err, results) => {
            if (err) {
                console.error(err);
                return res.status(500).json({
                    success: false,
                    message: 'Erro ao listar eventos recorrentes.'
                });
            }

            res.json({
                success: true,
                message: 'Listagem de eventos recorrentes realizada com sucesso.',
                data: results
            });
        });
    } catch (error) {
        console.error('Erro inesperado:', error);
        res.status(500).json({
            success: false,
            message: 'Erro inesperado'
        });
    }
}


async function groupRecurringEvents(req: Request, res: Response) {
    try {
        const id = req.params.id; 

        const query = `
            SELECT nome_evento,
                data_inicio,
                data_fim, 
                hora_inicio,
                hora_fim,
                local,
                detalhes,
                recorrencia,
                DATE_FORMAT(data_inicio, '%d/%m/%Y') AS data_inicio_Form, 
                DATE_FORMAT(data_fim, '%d/%m/%Y') AS data_fim_Form
            FROM eventos
            WHERE id = ?
        `;

        db.connection.query(query, [id], (err, results) => {
            if (err) {
                console.error(err);
                return res.status(500).json({
                    success: false,
                    message: 'Erro ao listar eventos recorrentes.'
                });
            }

            res.json({
                success: true,
                message: 'Listagem de eventos recorrentes realizada com sucesso.',
                data: results
            });
        });
    } catch (error) {
        console.error('Erro inesperado:', error);
        res.status(500).json({
            success: false,
            message: 'Erro inesperado'
        });
    }
}

async function editEvent(req: Request, res: Response) {
    const id = req.params.id;
    const querysql = `UPDATE recorrencias SET data_inicio = ?, data_fim = ?, hora_inicio = ?, hora_fim = ?, ativo = ? WHERE id = ?`;

    const params = [
        req.body.data_inicio,
        req.body.data_fim,
        req.body.hora_inicio,
        req.body.hora_fim,
        req.body.ativo,
        req.params.id
    ];

    db.connection.query(querysql, params, (err, results) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({
                success: false,
                message: 'An error occurred while updating the event.',
                error: err.message
            });
        }

        res.json({
            success: true,
            message: 'Alteração realizada com sucesso.',
            data: results
        });
    });
}

async function editGroup(req: Request, res: Response) {
    const id = req.params.id;
    const querysql = `
        UPDATE eventos 
        SET 
            nome_evento = ?,
            local = ?,
            data_inicio = ?, 
            data_fim = ?, 
            hora_inicio = ?, 
            hora_fim = ?, 
            recorrencia = ?,
            detalhes = ? 
        WHERE id = ?
    `;

    const params = [
        req.body.nome_evento,
        req.body.local,
        req.body.data_inicio,
        req.body.data_fim,
        req.body.hora_inicio,
        req.body.hora_fim,
        req.body.recorrencia,
        req.body.detalhes,
        req.params.id
    ];

    db.connection.query(querysql, params, (err, results) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({
                success: false,
                message: 'An error occurred while updating the event.',
                error: err.message
            });
        }

        res.json({
            success: true,
            message: 'Alteração realizada com sucesso.',
            data: results
        });
    });
}



async function deleteEvent(req: Request, res: Response) {
    const idUser = req.params.id;
    const querysql = 'DELETE FROM EVENTOS WHERE id = ?'

    db.connection.query(querysql, [idUser], (err, results) => {
        res.json({
            message: 'Evento apagado com Sucesso',
        }); 
    })
}


export default {
    listEventsAll,
    listEvents,
    createEvents,
    listRecurringEvents,
    groupRecurringEvents,
    editEvent,
    editGroup,
    deleteEvent
}