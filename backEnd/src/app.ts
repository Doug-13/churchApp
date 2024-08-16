const express = require("express")
// //Instancia o express na variável app
const app = express();

//para o express utilizar o json
app.use(express.json());

import usersRoutes from './routes/usersRoutes';
import churchReportsRoutes from './routes/churchReportsRoutes';
import visitorsRoutes from './routes/visitorsRoutes';
import financialRoutes from './routes/financialRoutes';
import churchRegistersRoutes from './routes/churchRegistersRoutes';
import groupsRoutes from './routes/groupsRoutes';
import pessoasGroupsRoutes from './routes/pessoasGroupsRoutes';
import presenceRoutes from './routes/presenceRoutes';
import eventsRoutes from './routes/eventsRoutes';

app.use('/api/', churchRegistersRoutes);
app.use('/api/', churchReportsRoutes);
app.use('/api/', financialRoutes);
app.use('/api/', visitorsRoutes);
app.use('/api/', usersRoutes);
app.use('/api/', groupsRoutes);
app.use('/api/', pessoasGroupsRoutes);
app.use('/api/', presenceRoutes);
app.use('/api/', eventsRoutes);

export default app;