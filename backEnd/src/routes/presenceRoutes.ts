const express = require('express');
const routes = express.Router();
import presenceController from "../controller/presenceController";

//Listar usuários
routes.get('/presence/:id_grupo',  presenceController.listPresence);

//Cadastrar usuario
// routes.post('/products/',productsController.createproducts);

// //Editar usuario
// routes.put('/product/:id',productsController.editproduct);

// //deletar usuario
// routes.delete('/product/:id',productsController.deleteproduct);
    
export default routes;