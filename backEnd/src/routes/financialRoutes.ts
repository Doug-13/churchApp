const express = require('express');
const routes = express.Router();
import financialsController from "../controller/financialController";

//Listar usuários
routes.get('/financials/:id',  financialsController.listFinancials);
routes.get('/financials/church/:id_church',  financialsController.listAllFinancials);

//Cadastrar usuario
routes.post('/financials/:id_church',financialsController.createFinancials);

//Editar usuario
routes.put('/financial/:id',financialsController.editFinancial);

//deletar usuario
routes.delete('/financial/:id',financialsController.deleteFinancial);
    
export default routes;

