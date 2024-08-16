const express = require('express');
const routes = express.Router();
import churchReportsController from "../controller/churchReportsController";

//Listar usuários
routes.get('/reports/:id_igreja',  churchReportsController.listreports);

routes.get('/reports/:id_igreja/:id',  churchReportsController.listreportsunique);

//Cadastrar usuario
routes.post('/reports/:id',churchReportsController.createReports);

//Editar usuario
routes.put('/report/:id',churchReportsController.editreport);

//deletar usuario
routes.delete('/report/:id_igreja/:id',churchReportsController.deletereport);

    
export default routes;