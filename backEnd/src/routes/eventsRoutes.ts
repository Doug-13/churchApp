const express = require('express');
const routes = express.Router();
import eventsController from "../controller/eventsController";

//Listar usuários
routes.get('/events/list/:igreja_id',  eventsController.listEvents);
routes.get('/events/:igreja_id',  eventsController.listEventsAll);

routes.get('/events/listRecurringEvents/:id',  eventsController.listRecurringEvents);
routes.get('/events/groupRecurringEvents/:id',  eventsController.groupRecurringEvents);
//Cadastrar usuario    listRecurringEvents
routes.post('/events/',eventsController.createEvents);

//Editar usuario
routes.put('/event/:id',eventsController.editEvent);
routes.put('/eventgroup/:id',eventsController.editGroup);

//deletar usuario
routes.delete('/event/:id',eventsController.deleteEvent);
    
export default routes;