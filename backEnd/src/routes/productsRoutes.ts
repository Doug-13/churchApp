const express = require('express');
const routes = express.Router();
import productsController from "../controller/productsController";

//Listar usuários
routes.get('/products/',  productsController.listproducts);

//Cadastrar usuario
routes.post('/products/',productsController.createproducts);

//Editar usuario
routes.put('/product/:id',productsController.editproduct);

//deletar usuario
routes.delete('/product/:id',productsController.deleteproduct);
    
export default routes;