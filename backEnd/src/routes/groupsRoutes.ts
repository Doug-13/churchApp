const express = require('express');
const routes = express.Router();
import groupsController from "../controller/groupsController";

//Listar usuários
routes.get('/groups/:id_igreja',  groupsController.listAllGroups);
routes.get('/groups/grupo/:id_grupo',  groupsController.listGroup);
//Cadastrar usuario
routes.post('/groups/',groupsController.creategroups);

//Editar usuario
routes.put('/groups/:id_grupo',groupsController.editgroup);

//deletar usuario
routes.delete('/group/:id',groupsController.deletegroup);
    
export default routes;