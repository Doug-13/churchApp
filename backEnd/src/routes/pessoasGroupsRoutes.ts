const express = require('express');
const routes = express.Router();
import pessoasGroupsRoutes from "../controller/pessoasGroupsController";

//Listar usuários
routes.get('/pessoasGroups/:id_grupo',  pessoasGroupsRoutes.listPessoasGroups);

//Cadastrar usuario
routes.post('/pessoasGroups/',pessoasGroupsRoutes.createPessoasGroups);
routes.post('/pessoasGroups/:id_grupo/addMember',pessoasGroupsRoutes.insertNewPeople);
//Editar usuario
// routes.put('/pessoasGroups/:id',pessoasGroupsRoutes.editPessoasGroups);

//deletar usuario
routes.delete('/pessoasGroups/:id',pessoasGroupsRoutes.deletePessoasGroups);
    
export default routes;

