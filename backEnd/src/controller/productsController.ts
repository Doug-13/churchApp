import { Request, Response } from "express";
import db from '../config/database';

async function listproducts(req: Request, res: Response) {
    db.connection.query('SELECT * FROM PRODUCTS', (err, results) => {
        console.log(results)
        res.json({
            success: true,
            message: 'Listagem realizada com sucesso.',
            data: results
        });
    })
}

async function createproducts(req: Request, res: Response) {
    const querysql = 'INSERT into products (ds_name,ds_description,nm_value,ds_brand,ds_status) VALUES(?,?,?,?,?);'
    const params = Array(
        req.body.DS_NAME,
        req.body.DS_DESCRIPTION,
        req.body.NM_VALUE,
        req.body.DS_BRAND,
        req.body.DS_STATUS
        
    )
    db.connection.query(querysql, params, (err, results) => {
        res.send('Cadastro Realizado com Sucesso' + results);
    })
}

async function editproduct(req: Request, res: Response) {
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

async function deleteproduct(req: Request, res: Response) {
    const idUser = req.params.id;
    const querysql = 'delete from products WHERE id_product =?'

    db.connection.query(querysql, [idUser], (err, results) => {
        res.json({
            message: 'Cadastro apagado com Sucesso',
        });
    })
}


export default {
    listproducts,
    createproducts,
    editproduct,
    deleteproduct
}