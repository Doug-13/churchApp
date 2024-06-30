import { Request, Response } from "express";
import db from '../config/database';

async function listAllGroups(req: Request, res: Response) {
    const id_igreja = req.params.id_igreja;
    db.connection.query(`
      SELECT
            g.id_grupo,
            g.nome_grupo,
            g.descricao_grupo,
            CONCAT(ul.nome,' ',ul.sobrenome) AS nome_lider,
            CONCAT(uv.nome,' ',uv.sobrenome) AS vice_lider
        FROM 
            grupos AS g
        LEFT JOIN
            users AS ul ON g.id_lider = ul.id
        LEFT JOIN
            users AS uv ON g.id_vicelider = uv.id
        WHERE 
            g.id_igreja = ?;`
    , [id_igreja], (err, results) => {
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
            l.nome,
            l.sobrenome,
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
    const idGrupo = req.params.id as string; // Obtendo o ID do grupo dos parâmetros da requisição
    const {
        nome_grupo,
        descricao_grupo,
        id_lider,
        id_vicelider,
        id_criador,
        id_igreja,
        endereco,
        bairro,
        numero,
        cidade,
        estado
    } = req.body;

    try {
        // Comando SQL para atualizar o grupo na tabela `grupos`
        const querysql = `
            UPDATE grupos
            SET nome_grupo = ?,
                descricao_grupo = ?,
                id_lider = ?,
                id_vicelider = ?,
                id_criador = ?,
                id_igreja = ?,
                endereco = ?,
                bairro = ?,
                numero = ?,
                cidade = ?,
                estado = ?
            WHERE id_grupo = ?`;

        // Parâmetros para a consulta SQL
        const params = [
            nome_grupo,
            descricao_grupo,
            id_lider,
            id_vicelider,
            id_criador,
            id_igreja,
            endereco,
            bairro,
            numero,
            cidade,
            estado,
            idGrupo // Adicionando o ID do grupo ao final dos parâmetros
        ];

        // Mostrar os dados que serão enviados para o banco de dados
        console.log('Dados do grupo a serem atualizados:', {
            nome_grupo,
            descricao_grupo,
            id_lider,
            id_vicelider,
            id_criador,
            id_igreja,
            endereco,
            bairro,
            numero,
            cidade,
            estado,
            idGrupo
        });

        // Executar a consulta SQL de atualização usando a versão promise do mysql2
        const [results] = await db.connection.promise().query(querysql, params);

        // Mostrar o resultado da consulta no console
        console.log('Resultado da atualização:', results);

        // Retornar a resposta em JSON
        res.json({
            success: true,
            message: 'Alteração realizada com sucesso.',
            data: results
        });
    } catch (error) {
        // Em caso de erro, retornar uma mensagem de erro
        console.error('Erro ao atualizar grupo:', error);
        res.status(500).json({
            success: false,
            message: 'Ocorreu um erro ao atualizar o grupo. Por favor, tente novamente.'
        });
    }
}

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