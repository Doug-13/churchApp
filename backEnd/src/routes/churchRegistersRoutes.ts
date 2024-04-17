const express = require('express');
const routes = express.Router();
import cartController from "../controller/churchRegController";

//Listar igrejas
routes.get('/church/',  cartController.listChurch);
routes.get('/church/:id',  cartController.listChurchId);
routes.get('/church/user/:id_creator',  cartController.ChurchUserId);


//Cadastrar usuario
routes.post('/church/',cartController.createChurch);

//Editar usuario
routes.put('/church/:id',cartController.editChurch);

//deletar usuario
routes.delete('/church/:id',cartController.deleteChurch);
    
export default routes;