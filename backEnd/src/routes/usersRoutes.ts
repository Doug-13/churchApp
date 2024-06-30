import express from 'express';
import usersController from '../controller/usersController';

const routes = express.Router();

// Rotas para usuários
routes.get('/users', usersController.listUsers);
routes.get('/users/:id', usersController.getUser);
routes.get('/users/church/peoples/:id_igreja', usersController.listNames);
routes.get('/users/church/:id_igreja', usersController.getUsersByChurchId);
routes.get('/users/:id_igreja/:id', usersController.getUsersById);
routes.get('/users/birthday/church/:id_igreja', usersController.getUsersBirthdays);

routes.post('/users/login', usersController.login);
routes.post('/users', usersController.createUsers);

routes.post('/user/:id', usersController.editChurchUser);

// routes.put('/users/:id_igreja/:id', usersController.editUser);
routes.put('/user/edit/:id', usersController.putUser);

routes.delete('/users/:id_igreja/:id', usersController.deleteUser);

export default routes;