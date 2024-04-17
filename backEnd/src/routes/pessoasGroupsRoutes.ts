const express = require('express');
const routes = express.Router();
import pessoasGroupsRoutes from "../controller/pessoasGroupsController";

//Listar usuários
routes.get('/pessoasGroups/',  pessoasGroupsRoutes.listPessoasGroups);

//Cadastrar usuario
routes.post('/pessoasGroups/',pessoasGroupsRoutes.createPessoasGroups);

//Editar usuario
routes.put('/pessoasGroups/:id',pessoasGroupsRoutes.editPessoasGroups);

//deletar usuario
routes.delete('/pessoasGroups/:id',pessoasGroupsRoutes.deletePessoasGroups);
    
export default routes;

