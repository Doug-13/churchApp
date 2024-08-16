const express = require('express');
const routes = express.Router();
import visitorsController from "../controller/visitorsController";

//Listar usuários
// router.get('/visitors/:id_igreja/:id',  visitorsController.userVisitor);
routes.get('/visitors/:id_igreja',  visitorsController.listvisitors);
routes.get('/visitors/visitors_list/:id_igreja',  visitorsController.listVisitorsDay);
routes.get('/visitors/visitors_groups/:id_grupo',  visitorsController.listVisitorsGroups);

//Cadastrar usuario
routes.post('/visitors/:id_igreja',visitorsController.createvisitors);
routes.post('/visitor/visitors_group/',visitorsController.createvisitorsGroups);
//Editar usuario

routes.put('/visitor/:id',visitorsController.editVisitor);

//deletar usuario
routes.delete('/visitor/:id_igreja',visitorsController.deletevisitor);
    
export default routes;


// const VisitantesScreen = ({ cultoVisitors }) => (
//   <ScrollView style={{ flex: 1 }}>
//     {cultoVisitors.map((report, index) => (
//       <View key={index} style={styles.itemContainer}>
//         <Text style={styles.reportTitle}>Visitantes dia {formatDate(report.data)}</Text>
//         {report.visitors.map((visitor, index) => (
//           <Text key={index} style={styles.reportText}>{visitor || "Nome do visitante não disponível"}</Text>
//         ))}
//       </View>
//     ))}
//   </ScrollView>
// );