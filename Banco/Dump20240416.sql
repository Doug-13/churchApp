CREATE DATABASE  IF NOT EXISTS `churchapp` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `churchapp`;
-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: churchapp
-- ------------------------------------------------------
-- Server version	8.0.36

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `church`
--

DROP TABLE IF EXISTS `church`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `church` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(255) NOT NULL,
  `telefone` varchar(20) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `estado` varchar(50) DEFAULT NULL,
  `cidade` varchar(100) NOT NULL,
  `rua` varchar(255) NOT NULL,
  `numero` varchar(20) NOT NULL,
  `cep` varchar(10) DEFAULT NULL,
  `lider` varchar(255) DEFAULT NULL,
  `sobre_nos` text,
  `logo` varchar(255) DEFAULT NULL,
  `data_cadastro` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `data_modificacao` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `Instagram` varchar(255) DEFAULT NULL,
  `WhatsApp` varchar(20) DEFAULT NULL,
  `id_creator` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=211 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `church`
--

LOCK TABLES `church` WRITE;
/*!40000 ALTER TABLE `church` DISABLE KEYS */;
INSERT INTO `church` VALUES (35,'Igreja da Paz','111222333','igrejadapaz@email.com','Rio Grande Do Sul','São Leopoldo','Avenida da Esperança','789','12345-678','Ana Silva','Uma igreja que promove a paz e a harmonia na comunidade','caminho/para/a/logo4.jpg','2024-03-10 11:55:19','2024-03-10 11:55:19',NULL,NULL,NULL),(36,'Igreja da Esperança','444555666','esperanca@igreja.com','Rio Grande Do Sul','São Leopoldo','Praça da Fé','987','54321-123','Pedro Oliveira','Uma igreja que inspira esperança e fé nos corações','caminho/para/a/logo5.jpg','2024-03-10 11:55:19','2024-03-10 11:55:19',NULL,NULL,NULL),(37,'Comunidade Cristã','777888999','comunidadecrista@email.com','Rio Grande Do Sul','São Leopoldo','Rua da Fé','456','98765-432','Mariana Santos','Uma comunidade unida pela fé em Cristo','caminho/para/a/logo6.jpg','2024-03-10 11:55:19','2024-03-10 11:55:19',NULL,NULL,NULL),(38,'Igreja da Alegria','123123123','igrejaalegria@email.com','Rio Grande Do Sul','Novo Hamburgo','Avenida da Alegria','321','87654-321','Paulo Silva','Uma igreja que transmite alegria e esperança em Cristo','caminho/para/a/logo7.jpg','2024-03-10 11:55:19','2024-03-10 11:55:19',NULL,NULL,NULL),(39,'Igreja da Vida','456456456','igrejavida@email.com','Rio Grande Do Sul','Novo Hamburgo','Estrada da Vida','654','23456-789','Carla Oliveira','Uma igreja que celebra a vida e a bondade de Deus','caminho/para/a/logo8.jpg','2024-03-10 11:55:19','2024-03-10 11:55:19',NULL,NULL,NULL),(40,'Comunidade da Fé','333444555','comunidade@igreja.com','Rio de Janeiro','Rio de Janeiro','Avenida da Fé','456','54321-987','Pedro Oliveira','Uma comunidade de fé e esperança','caminho/para/a/logo2.jpg','2024-03-10 03:00:00','2024-03-10 03:00:00','comunidade_fe','888888888',NULL),(44,'Assembleia de Deus','51992883720','Add@ohgloria','Rs','São Leopoldo ','Oscar rieth','50',NULL,'Fala muito ',NULL,NULL,'2024-03-17 18:54:47','2024-03-17 18:54:47',NULL,NULL,NULL),(200,'Igreja do fogo ','Nzjwj','Qwsxcgr','Bjj','Nnj','Nnb','Jjj',NULL,'Jjj',NULL,NULL,'2024-03-21 22:38:38','2024-03-21 22:38:38',NULL,NULL,76),(201,'Bin','Jjj','Jbh','Nnj','Jjn','Nnj','Njj',NULL,'Njk',NULL,NULL,'2024-03-21 22:41:18','2024-03-21 22:41:18',NULL,NULL,76),(202,'Rico','Njn','Nnkj','N','Nnn','Nnnn','Nnb',NULL,'Nnj',NULL,NULL,'2024-03-21 22:43:31','2024-03-21 22:43:31',NULL,NULL,76),(203,'Assembleia ','992883729','douglas.memskamsn','Bjh','Hhhh','Hhj','Hjj',NULL,'Njj',NULL,NULL,'2024-03-21 22:48:37','2024-03-21 22:48:37',NULL,NULL,76),(204,'Manzhsb','Nsbejsb','Nbjs','Njj','Nj','Jjj','Jjj',NULL,'Jjj',NULL,NULL,'2024-03-21 22:49:54','2024-03-21 22:49:54',NULL,NULL,76),(205,'Ef','Sssd','Err','Fddd','Ddf','Vv','Dd',NULL,'Dd',NULL,NULL,'2024-03-21 22:50:45','2024-03-21 22:50:45',NULL,NULL,76),(206,'Xghxf','Svhtd','Dfrsx','Xftrd','Dfgg','Xgt',' Cdd',NULL,'Ctr',NULL,NULL,'2024-03-21 22:51:18','2024-03-21 22:51:18',NULL,NULL,76),(207,'Etvxd','Xfhf','Vyscg','Cfr','Cgt','Vgtvg','Vfr',NULL,'Cffr',NULL,NULL,'2024-03-21 22:52:36','2024-03-21 22:52:36',NULL,NULL,76),(208,'Família','Hujb','Nhjj','Njjj','Jjjj','Njjj','Jjjj',NULL,'Jjjj',NULL,NULL,'2024-03-21 22:53:54','2024-04-06 00:04:14',NULL,NULL,76),(209,'Teste de fogo','124432','Msjsjwn','Ndnsn','Nnn','Nn','Jnnn',NULL,'Nnj',NULL,NULL,'2024-03-22 01:02:35','2024-03-22 01:02:35',NULL,NULL,88),(210,'Igreja Batista Vida Transformada ','51 998726250','ibvt@gmail.com','Rio Grande do Sul ','São Leopoldo ','Bruno Kuschick ','190',NULL,'Júnior da Silva',NULL,NULL,'2024-04-12 23:23:19','2024-04-12 23:23:19',NULL,NULL,94);
/*!40000 ALTER TABLE `church` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `grupos`
--

DROP TABLE IF EXISTS `grupos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `grupos` (
  `id_grupo` int NOT NULL AUTO_INCREMENT,
  `nome_grupo` varchar(100) NOT NULL,
  `descricao_grupo` text,
  `id_lider` int DEFAULT NULL,
  `id_vicelider` int DEFAULT NULL,
  `id_criador` int NOT NULL,
  `id_igreja` int DEFAULT NULL,
  `data_lancamento` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `endereco` varchar(255) DEFAULT NULL,
  `bairro` varchar(100) DEFAULT NULL,
  `numero` varchar(20) DEFAULT NULL,
  `cidade` varchar(100) DEFAULT NULL,
  `estado` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id_grupo`),
  KEY `id_criador` (`id_criador`),
  KEY `id_lider` (`id_lider`),
  KEY `id_igreja` (`id_igreja`),
  CONSTRAINT `grupos_ibfk_1` FOREIGN KEY (`id_criador`) REFERENCES `users` (`id`),
  CONSTRAINT `grupos_ibfk_2` FOREIGN KEY (`id_lider`) REFERENCES `users` (`id`),
  CONSTRAINT `grupos_ibfk_3` FOREIGN KEY (`id_igreja`) REFERENCES `church` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `grupos`
--

LOCK TABLES `grupos` WRITE;
/*!40000 ALTER TABLE `grupos` DISABLE KEYS */;
INSERT INTO `grupos` VALUES (10,'Grupo 1','Descrição do Grupo 1',69,71,69,208,'2024-03-28 16:35:11',NULL,NULL,NULL,NULL,NULL),(11,'Grupo 2','Descrição do Grupo 2',69,71,69,208,'2024-03-28 16:35:11',NULL,NULL,NULL,NULL,NULL),(12,'Grupo 3','Descrição do Grupo 3',69,71,69,208,'2024-03-28 16:35:11',NULL,NULL,NULL,NULL,NULL),(13,'Teste ','Teste2',69,89,76,208,'2024-04-10 05:12:27',NULL,NULL,NULL,NULL,NULL),(14,'Teste ','Teate',69,84,76,208,'2024-04-11 01:38:18',NULL,NULL,NULL,NULL,NULL),(15,'Teste ','Teste',69,89,76,208,'2024-04-11 01:43:38',NULL,NULL,NULL,NULL,NULL),(16,'Teste','Teste ',69,89,76,208,'2024-04-11 01:44:35',NULL,NULL,NULL,NULL,NULL),(17,'Teste','Teste',89,76,76,208,'2024-04-11 01:47:43',NULL,NULL,NULL,NULL,NULL),(18,'Teste ','Hsbwj',69,91,76,208,'2024-04-11 01:48:57',NULL,NULL,NULL,NULL,NULL),(19,'Cljsb','Nsbwjw',76,89,76,208,'2024-04-11 01:51:08',NULL,NULL,NULL,NULL,NULL),(20,'Jvh','Bvh ',69,89,76,208,'2024-04-11 01:55:37',NULL,NULL,NULL,NULL,NULL),(21,'Teste','Teste',69,76,76,208,'2024-04-11 03:53:07',NULL,NULL,NULL,NULL,NULL),(22,'Teste','Teste',69,84,76,208,'2024-04-11 03:54:25',NULL,NULL,NULL,NULL,NULL),(23,'Teste ','Teste',69,84,76,208,'2024-04-11 03:55:38',NULL,NULL,NULL,NULL,NULL),(24,'Teste','Teste',69,76,76,208,'2024-04-11 04:04:23',NULL,NULL,NULL,NULL,NULL),(25,'Hackathon','Teste',31,33,31,37,'2024-04-16 05:14:50','Rua Arthur Correa da Silva','Campestre','50','São Leopoldo','RS');
/*!40000 ALTER TABLE `grupos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pessoasgrupos`
--

DROP TABLE IF EXISTS `pessoasgrupos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pessoasgrupos` (
  `id_userGroups` int NOT NULL AUTO_INCREMENT,
  `id_users` int NOT NULL,
  `id_grupo` int NOT NULL,
  `data_lancamento` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_userGroups`),
  KEY `id_users` (`id_users`),
  KEY `id_grupo` (`id_grupo`),
  CONSTRAINT `pessoasgrupos_ibfk_1` FOREIGN KEY (`id_users`) REFERENCES `users` (`id`),
  CONSTRAINT `pessoasgrupos_ibfk_2` FOREIGN KEY (`id_grupo`) REFERENCES `grupos` (`id_grupo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pessoasgrupos`
--

LOCK TABLES `pessoasgrupos` WRITE;
/*!40000 ALTER TABLE `pessoasgrupos` DISABLE KEYS */;
/*!40000 ALTER TABLE `pessoasgrupos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `presenca`
--

DROP TABLE IF EXISTS `presenca`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `presenca` (
  `id_presenca` int NOT NULL AUTO_INCREMENT,
  `id_usuario` int NOT NULL,
  `id_grupo` int NOT NULL,
  `data_presenca` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_presenca`),
  KEY `id_usuario` (`id_usuario`),
  KEY `id_grupo` (`id_grupo`),
  CONSTRAINT `presenca_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `users` (`id`),
  CONSTRAINT `presenca_ibfk_2` FOREIGN KEY (`id_grupo`) REFERENCES `grupos` (`id_grupo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `presenca`
--

LOCK TABLES `presenca` WRITE;
/*!40000 ALTER TABLE `presenca` DISABLE KEYS */;
/*!40000 ALTER TABLE `presenca` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `relatorioculto`
--

DROP TABLE IF EXISTS `relatorioculto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `relatorioculto` (
  `id` int NOT NULL AUTO_INCREMENT,
  `data` date NOT NULL,
  `hora` time NOT NULL,
  `tipo_culto` varchar(100) NOT NULL,
  `pregador` varchar(100) DEFAULT NULL,
  `tema` varchar(255) DEFAULT NULL,
  `numero_presentes` int DEFAULT NULL,
  `numero_visitantes` int DEFAULT NULL,
  `comentarios` text,
  `id_criador` int NOT NULL,
  `id_igreja` int NOT NULL,
  `data_lancamento` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `id_criador` (`id_criador`),
  KEY `id_igreja` (`id_igreja`),
  CONSTRAINT `relatorioculto_ibfk_1` FOREIGN KEY (`id_criador`) REFERENCES `users` (`id`),
  CONSTRAINT `relatorioculto_ibfk_2` FOREIGN KEY (`id_igreja`) REFERENCES `church` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=47 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `relatorioculto`
--

LOCK TABLES `relatorioculto` WRITE;
/*!40000 ALTER TABLE `relatorioculto` DISABLE KEYS */;
INSERT INTO `relatorioculto` VALUES (4,'2024-03-21','19:00:00','Culto de Domingo','Rev. João Silva','A importância da fé',150,10,'Culto abençoado, boa participação da congregação.',69,208,'2024-03-23 10:50:25'),(5,'2024-03-22','23:00:00','Culto de Quarta-feira','Pr. José Santos','O poder da oração',120,5,'Teste de edição de alguns visitantes novos.',69,208,'2024-03-23 10:50:25'),(6,'2024-03-20','20:00:00','Culto de Domingo','Rev. Maria Oliveira','A alegria da comunhão',180,15,'Houve uma festa de confraternização após o culto.',69,208,'2024-03-23 10:50:25'),(7,'2024-03-23','19:00:00','Culto de Domingo','Pr. Marcos Ferreira','A esperança que não decepciona',160,12,'Culto marcado por momentos de intensa adoração.',35,37,'2024-03-23 10:57:45'),(8,'2024-03-24','19:30:00','Culto de Quinta-feira','Rev. Ana Oliveira','Vencendo o desânimo',130,8,'Mensagem impactante sobre perseverança.',35,37,'2024-03-23 10:57:45'),(9,'2024-03-25','20:00:00','Culto de Sexta-feira','Pr. Pedro Almeida','Fé que move montanhas',140,10,'Testemunhos emocionantes durante o culto.',35,37,'2024-03-23 10:57:45'),(10,'2024-02-24','19:30:00','Culto de Quinta-feira','Ir. Douglas Mello','Enchei-vos do Espírito',110,18,'Mensagem impactante sobre perseverança.',35,37,'2024-03-23 11:36:15'),(12,'2024-03-29','07:25:00','Sgd','Fht','Ghy',862,8,'Sges',76,208,'2024-03-29 10:38:47'),(13,'2024-03-29','07:42:00','Ajgubfy','Hgfg','Hgh',5,1,'Yfxvh',76,208,'2024-03-29 10:53:31'),(14,'2024-03-29','20:00:00','Quinta ','Pastor Everton ','Circulo de oração ',6,2,'Culto foi uma benção ',76,208,'2024-03-29 10:56:15'),(15,'2024-03-29','07:59:00','B bb','Gc n','Vxhn',889,8,'Vcgh',76,208,'2024-03-29 10:57:44'),(16,'2024-03-29','07:59:00','B bb','Gc n','Vxhn',889,8,'Vcgh',76,208,'2024-03-29 10:58:04'),(17,'2024-03-29','07:59:00','B bb','Gc n','Vxhn',889,8,'Vcgh',76,208,'2024-03-29 10:58:11'),(18,'2024-03-30','11:02:00','Sábado ','John','Missões ',96,2,'Teste',76,208,'2024-03-29 11:00:13'),(21,'2024-03-29','08:10:00','Quinta feira ','Abinadabe','Circulo de oração ',36,2,'Teste',76,208,'2024-03-29 11:13:23'),(22,'2024-04-01','15:00:00','Terça feira ','Pastor Antônio ','Libertação ',36,3,'Teste',76,208,'2024-03-29 11:58:42'),(23,'2024-03-31','20:00:00','Teste3 ','Jfft','Uc',3,1,'Teste',76,208,'2024-03-29 12:05:36'),(24,'2024-03-31','09:10:00','Sábado','Bxthv','Jovens',68,3,'',76,208,'2024-03-29 12:12:14'),(25,'2024-03-31','09:14:00','Vjkv','Cgbnn','Gcvh',96,2,'Teste',76,208,'2024-03-29 12:15:01'),(26,'2024-04-09','09:17:00','Justamente','Bfyh','Heuwh',95,3,'Teste',76,208,'2024-03-29 12:17:43'),(27,'2024-04-04','10:10:00','Teste','Paul Albert','Clicrbs',96,3,'Teste',76,208,'2024-03-29 13:16:56'),(28,'2024-04-10','10:27:00','Nsjsnej','Nhjj','Ngujj',96,2,'Teste',76,208,'2024-03-29 13:27:58'),(29,'2024-03-11','10:31:00','Hhhh','João','Yyyyyy',20,2,'Teste',76,208,'2024-03-29 13:33:34'),(30,'2024-03-01','09:30:00','Culto de Domingo','Pedroca','Público',58,2,'Muita participação, intenso louvor e adoração.',76,208,'2024-03-30 10:39:53'),(31,'2024-03-01','09:30:00','Culto de Domingo','Pedroca','Público',58,2,'Muita participação, intenso louvor e adoração.',76,208,'2024-03-30 10:39:56'),(32,'2024-03-01','09:30:00','Culto de Domingo','Pedro Almeida','Público',58,2,'Muita participação, intenso louvor e adoração.',76,208,'2024-03-30 13:43:43'),(33,'2024-04-02','20:00:00','Domingo','Pedrinho','Missões',36,3,'Teste drive',76,208,'2024-03-30 11:00:28'),(34,'2024-03-30','08:27:00','Domingo','Poqnzb','Mimsnsj',95,3,'Teste',76,208,'2024-03-30 11:28:23'),(35,'2024-03-30','08:32:00','Sábado','Mis Everton','Jovens',32,2,'Gxgxgcgc',76,208,'2024-03-30 11:33:19'),(36,'2024-03-14','08:35:00','Pedro','João Batista','Missões já',36,3,'Hshsheh',76,208,'2024-03-30 11:36:38'),(37,'2024-04-11','08:40:00','Cgbb','Bbbh','Hghh',9,2,'H hcuc',76,208,'2024-03-30 11:40:52'),(38,'2024-04-03','08:44:00','Yxcyccuc','Ycjcjch','Ucucucu',68,2,'Uxuxuuccu',76,208,'2024-03-30 11:44:39'),(39,'2024-04-12','08:48:00','Domingo','Ksbsj','Missão',9,1,'Hsbsjwhwh',76,208,'2024-03-30 11:49:01'),(40,'2024-04-13','08:50:00','Quinta','Teste','Ensino',36,2,'Teste',76,208,'2024-03-30 11:51:37'),(41,'2024-04-13','08:50:00','Quinta','Teste','Ensino',36,2,'Teste',76,208,'2024-03-30 11:54:36'),(42,'2024-04-13','08:50:00','Quinta-feira','Teste','Ensino',36,2,'Teste',76,208,'2024-03-30 11:55:27'),(43,'2024-04-14','00:00:00','Sábado a noite','Douglas Mello','Páscoa da morte a vida',66,3,'Culto impactante e comovente',76,208,'2024-03-30 12:11:44'),(44,'2024-03-30','11:00:00','Hebsh','Bbbb','Bbbb',999,1,'Wbbhb',76,208,'2024-03-30 14:02:16'),(45,'2024-04-24','21:34:00','Reunião de família','Douglas','Páscoa',5,1,'Teste',76,208,'2024-04-01 00:34:59'),(46,'2024-04-08','18:00:00','Culto de ceia','Pr Junior','Tetelestai',150,1,'Culto top',76,208,'2024-04-13 00:15:10');
/*!40000 ALTER TABLE `relatorioculto` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transacoesfinanceiras`
--

DROP TABLE IF EXISTS `transacoesfinanceiras`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `transacoesfinanceiras` (
  `id` int NOT NULL AUTO_INCREMENT,
  `data` date NOT NULL,
  `tipo` enum('Entrada','Saída') NOT NULL,
  `descricao` varchar(255) DEFAULT NULL,
  `valor` decimal(10,2) NOT NULL,
  `id_ofertante` int DEFAULT NULL,
  `tipo_contribuicao` enum('Oferta','Dízimo','Outro') NOT NULL,
  `comentarios` text,
  `id_church` int NOT NULL,
  `id_criador` int NOT NULL,
  `data_lancamento` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `id_ofertante` (`id_ofertante`),
  KEY `id_church` (`id_church`),
  KEY `id_criador` (`id_criador`),
  CONSTRAINT `transacoesfinanceiras_ibfk_1` FOREIGN KEY (`id_ofertante`) REFERENCES `users` (`id`),
  CONSTRAINT `transacoesfinanceiras_ibfk_2` FOREIGN KEY (`id_church`) REFERENCES `church` (`id`),
  CONSTRAINT `transacoesfinanceiras_ibfk_3` FOREIGN KEY (`id_criador`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transacoesfinanceiras`
--

LOCK TABLES `transacoesfinanceiras` WRITE;
/*!40000 ALTER TABLE `transacoesfinanceiras` DISABLE KEYS */;
INSERT INTO `transacoesfinanceiras` VALUES (1,'2024-03-30','Entrada','Oferta de domingo',50.00,NULL,'Oferta','Oferta para manutenção da igreja',208,76,'2024-03-31 23:02:26'),(2,'2024-03-28','Entrada','Oferta para missões',75.00,NULL,'Oferta','Oferta destinada a apoiar missões',208,76,'2024-03-31 23:02:26'),(3,'2024-03-27','Entrada','Oferta para eventos especiais',100.00,NULL,'Oferta','Oferta para evento de jovens',208,76,'2024-03-31 23:02:26'),(4,'2024-02-20','Entrada','Dízimo mensal',100.00,76,'Dízimo','Dízimo referente ao mês de março',208,76,'2024-03-31 23:02:26'),(5,'2024-03-29','Entrada','Dízimo',150.00,76,'Dízimo','Dízimo extra para obras da igreja',208,76,'2024-03-31 23:02:26'),(6,'2024-01-29','Entrada','Dízimo',150.00,76,'Dízimo','Dízimo',208,76,'2024-03-31 23:02:26'),(7,'2024-01-15','Entrada','Oferta',250.00,76,'Oferta','Oferta para construção',208,76,'2024-04-01 00:31:22'),(8,'2024-03-30','Saída','Pagamento de contas de água',200.00,76,'Outro','Pagamento de contas de água referente ao mês',208,76,'2024-04-02 02:14:44'),(9,'2024-03-31','Saída','Compra de materiais para reforma',300.00,76,'Outro','Compra de materiais para reforma da igreja',208,76,'2024-04-02 02:14:44'),(10,'2024-04-01','Saída','Pagamento de contas de energia',250.00,76,'Outro','Pagamento de contas de energia referente ao mês',208,76,'2024-04-02 02:14:44'),(11,'2024-03-29','Saída','Despesa com obras da igreja',150.00,76,'Dízimo','Dízimo extra para obras da igreja',208,76,'2024-04-02 02:14:44'),(12,'2024-04-02','Entrada','Ofertas',25.00,76,'Outro','Pagamento do culto missionário',208,76,'2024-04-02 23:41:44'),(13,'2024-04-03','Entrada','Oferta',36.00,84,'Oferta','Teste',208,76,'2024-04-03 03:08:58'),(14,'2024-04-03','Entrada','Oferta',36.00,84,'Oferta','Teste',208,76,'2024-04-03 03:10:11'),(15,'2024-04-03','Entrada','Oferta',23.00,84,'Oferta','Tuhgg',208,76,'2024-04-03 03:11:46'),(16,'2024-04-03','Entrada','Oferta',36.00,84,'Oferta','Fxh',208,76,'2024-04-03 03:12:58'),(17,'2024-04-03','Entrada','Oferta',65.00,84,'Oferta','Vfg',208,76,'2024-04-03 03:15:14'),(18,'2024-04-03','Entrada','Dízimo',36.00,84,'Dízimo','Terça ',208,76,'2024-04-03 03:17:31'),(19,'2024-04-03','Entrada',NULL,36.00,76,'Oferta','Bshwbsb',208,76,'2024-04-03 03:23:07'),(20,'2024-04-03','Entrada',NULL,25.00,84,'Oferta','Vghh',208,76,'2024-04-03 03:24:36'),(21,'2024-04-03','Entrada',NULL,106.00,76,'Oferta','Teste',208,76,'2024-04-03 03:25:33'),(22,'2024-04-03','Entrada',NULL,36.00,84,'Oferta','Teste',208,76,'2024-04-03 03:27:42'),(23,'2024-04-04','Entrada',NULL,96.94,69,'Oferta','Teste',208,76,'2024-04-03 03:28:40'),(24,'2024-04-03','Entrada',NULL,559.00,90,'Oferta','Teste Lucas ',208,76,'2024-04-03 03:38:25'),(25,'2024-04-03','Entrada',NULL,36.00,76,'Oferta','Teate',208,76,'2024-04-03 03:41:59'),(26,'2024-04-03','Entrada',NULL,36.00,76,'Oferta','Teste',208,76,'2024-04-03 03:47:58'),(27,'2024-04-03','Entrada',NULL,36.00,84,'Oferta','Teste',208,76,'2024-04-03 03:52:32'),(28,'2024-04-03','Entrada',NULL,36.00,69,'Outro','Teste',208,76,'2024-04-03 03:53:50'),(29,'2024-04-03','Entrada','Cukto de quarta ',36.00,NULL,'Oferta','Teste',208,76,'2024-04-03 03:56:49'),(30,'2024-04-06','Entrada','Reste',50.00,91,'Dízimo','Teste',208,91,'2024-04-06 20:48:26'),(31,'2024-04-12','Entrada','Sem descrição',5000.00,94,'Dízimo','Deus é fiel',210,94,'2024-04-12 23:46:30');
/*!40000 ALTER TABLE `transacoesfinanceiras` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) NOT NULL,
  `sobrenome` varchar(100) NOT NULL,
  `email` varchar(255) NOT NULL,
  `senha` varchar(255) NOT NULL,
  `telefone` varchar(20) DEFAULT NULL,
  `data_nascimento` date DEFAULT NULL,
  `profissao` varchar(100) DEFAULT NULL,
  `escolaridade` varchar(100) DEFAULT NULL,
  `data_batismo` date DEFAULT NULL,
  `data_entrada_igreja` date DEFAULT NULL,
  `logradouro` varchar(255) DEFAULT NULL,
  `numero` varchar(20) DEFAULT NULL,
  `complemento` varchar(100) DEFAULT NULL,
  `cidade` varchar(100) DEFAULT NULL,
  `bairro` varchar(100) DEFAULT NULL,
  `cep` varchar(10) DEFAULT NULL,
  `id_igreja` int DEFAULT NULL,
  `foto_url` varchar(255) DEFAULT NULL,
  `data_cadastro` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `data_modificacao` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `Instagram` varchar(255) DEFAULT NULL,
  `WhatsApp` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  KEY `id_igreja` (`id_igreja`),
  CONSTRAINT `users_ibfk_1` FOREIGN KEY (`id_igreja`) REFERENCES `church` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=95 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (31,'João','Almeida','joao1@example.com','senha123','111222333','1993-03-10','Administrador','Ensino Superior','2013-09-18','2013-09-18','Rua C','789','Sala 2','Cidade A','Bairro C','54321-123',37,'url_joao1.jpg','2024-03-10 13:54:31','2024-03-10 13:54:31',NULL,NULL),(33,'Pedro','Rocha','pedro1@example.com','senha123','777888999','1980-11-15','Engenheiro Civil','Ensino Superior','2000-06-12','2000-06-12','Rua E','321','Casa 1','Cidade A','Bairro E','12345-678',37,'url_pedro1.jpg','2024-03-10 13:54:31','2024-03-10 13:54:31',NULL,NULL),(34,'Amanda','Oliveira','amanda1@example.com','senha123','222333444','1995-08-20','Psicóloga','Mestrado','2015-10-30','2015-10-30','Rua F','987','Apartamento 101','Cidade A','Bairro F','13579-246',37,'url_amanda1.jpg','2024-03-10 13:54:31','2024-03-10 13:54:31',NULL,NULL),(35,'Rafael','Santana','rafael1@example.com','senha123','555666777','1987-04-02','Contador','Ensino Superior','2007-03-15','2007-03-15','Rua G','654','Casa 2','Cidade A','Bairro G','98765-432',37,'url_rafael1.jpg','2024-03-10 13:54:31','2024-03-10 13:54:31',NULL,NULL),(36,'Luana','Fernandes','luana1@example.com','senha123','888999000','1983-09-28','Enfermeira','Ensino Superior','2003-12-20','2003-12-20','Rua H','147','Bloco D','Cidade A','Bairro H','54321-987',37,'url_luana1.jpg','2024-03-10 13:54:31','2024-03-10 13:54:31',NULL,NULL),(37,'Marcos','Barbosa','marcos1@example.com','senha123','111333555','1978-07-14','Advogado','Pós-Graduação','1998-05-03','1998-05-03','Avenida I','258','Casa 3','Cidade A','Bairro I','12345-678',37,'url_marcos1.jpg','2024-03-10 13:54:31','2024-03-10 13:54:31',NULL,NULL),(38,'Tatiane','Mendes','tatiane1@example.com','senha123','444666888','1990-02-08','Professor','Doutorado','2010-08-15','2010-08-15','Rua J','369','Apartamento 202','Cidade A','Bairro J','98765-432',37,'url_tatiane1.jpg','2024-03-10 13:54:31','2024-03-10 13:54:31',NULL,NULL),(39,'Rodrigo','Alves','rodrigo1@example.com','senha123','777999111','1985-06-23','Arquiteto','Ensino Superior','2005-07-28','2005-07-28','Rua K','741','Casa 4','Cidade A','Bairro K','13579-246',37,'url_rodrigo1.jpg','2024-03-10 13:54:31','2024-03-10 13:54:31',NULL,NULL),(40,'Patrícia','Costa','patricia1@example.com','senha123','222444666','1989-11-30','Analista de Sistemas','Ensino Superior','2009-10-10','2009-10-10','Rua L','852','Bloco E','Cidade A','Bairro L','54321-987',37,'url_patricia1.jpg','2024-03-10 13:54:31','2024-03-10 13:54:31',NULL,NULL),(41,'Sandra','Machado','sandra1@example.com','senha123','123456111','1982-04-18','Engenheira Elétrica','Ensino Superior','2002-09-22','2002-09-22','Avenida M','123','Casa 5','Cidade B','Bairro M','12345-678',36,'url_sandra1.jpg','2024-03-10 13:54:31','2024-03-10 13:54:31',NULL,NULL),(42,'Fabio','Souza','fabio1@example.com','senha123','987654222','1991-10-05','Analista Financeiro','Ensino Superior','2011-11-11','2011-11-11','Rua N','456','Apartamento 303','Cidade B','Bairro N','98765-432',36,'url_fabio1.jpg','2024-03-10 13:54:31','2024-03-10 13:54:31',NULL,NULL),(43,'Camila','Lopes','camila1@example.com','senha123','456123333','1986-12-30','Médica','Pós-Graduação','2006-05-17','2006-05-17','Rua O','789','Bloco F','Cidade B','Bairro O','54321-987',36,'url_camila1.jpg','2024-03-10 13:54:31','2024-03-10 13:54:31',NULL,NULL),(44,'Gustavo','Nascimento','gustavo1@example.com','senha123','321654444','1984-08-15','Empresário','Ensino Superior','2004-03-08','2004-03-08','Avenida P','321','Casa 6','Cidade B','Bairro P','13579-246',36,'url_gustavo1.jpg','2024-03-10 13:54:31','2024-03-10 13:54:31',NULL,NULL),(45,'Carolina','Ferreira','carolina1@example.com','senha123','852963555','1979-03-28','Enfermeira','Ensino Superior','1999-12-11','1999-12-11','Rua Q','654','Apartamento 404','Cidade B','Bairro Q','98765-432',36,'url_carolina1.jpg','2024-03-10 13:54:31','2024-03-10 13:54:31',NULL,NULL),(46,'Lucas','Oliveira','lucas1@example.com','senha123','147258666','1994-05-20','Estudante','Ensino Médio','2014-08-30','2014-08-30','Rua R','987','Casa 7','Cidade B','Bairro R','12345-678',36,'url_lucas1.jpg','2024-03-10 13:54:31','2024-03-10 13:54:31',NULL,NULL),(47,'Mariana','Silva','mariana1@example.com','senha123','369258777','1987-09-10','Advogada','Mestrado','2007-10-01','2007-10-01','Avenida S','147','Bloco G','Cidade B','Bairro S','54321-987',36,'url_mariana1.jpg','2024-03-10 13:54:31','2024-03-10 13:54:31',NULL,NULL),(48,'Ricardo','Santos','ricardo1@example.com','senha123','963852888','1980-11-25','Professor','Doutorado','2000-04-20','2000-04-20','Rua T','369','Apartamento 505','Cidade B','Bairro T','98765-432',36,'url_ricardo1.jpg','2024-03-10 13:54:31','2024-03-10 13:54:31',NULL,NULL),(49,'Vanessa','Costa','vanessa1@example.com','senha123','741852999','1983-07-14','Contadora','Pós-Graduação','2003-09-15','2003-09-15','Rua U','852','Casa 8','Cidade B','Bairro U','13579-246',36,'url_vanessa1.jpg','2024-03-10 13:54:31','2024-03-10 13:54:31',NULL,NULL),(50,'Daniel','Rocha','daniel1@example.com','senha123','159357000','1992-02-08','Engenheiro de Software','Ensino Superior','2012-07-28','2012-07-28','Avenida V','741','Bloco H','Cidade B','Bairro V','12345-678',36,'url_daniel1.jpg','2024-03-10 13:54:31','2024-03-10 13:54:31',NULL,NULL),(51,'Fernanda','Oliveira','fernanda1@example.com','senha123','333666999','1996-03-18','Psicóloga','Mestrado','2016-10-22','2016-10-22','Rua W','123','Casa 9','Cidade C','Bairro W','12345-678',35,'url_fernanda1.jpg','2024-03-10 13:54:31','2024-03-10 13:54:31',NULL,NULL),(52,'Thiago','Santos','thiago1@example.com','senha123','999333666','1981-08-05','Biomédico','Ensino Superior','2001-11-11','2001-11-11','Avenida X','456','Apartamento 606','Cidade C','Bairro X','98765-432',35,'url_thiago1.jpg','2024-03-10 13:54:31','2024-03-10 13:54:31',NULL,NULL),(53,'Juliana','Silva','juliana1@example.com','senha123','666999222','1984-12-30','Engenheira de Alimentos','Pós-Graduação','2004-05-17','2004-05-17','Rua Y','789','Bloco I','Cidade C','Bairro Y','54321-987',35,'url_juliana1.jpg','2024-03-10 13:54:31','2024-03-10 13:54:31',NULL,NULL),(54,'Roberto','Pereira','roberto1@example.com','senha123','222555888','1979-08-15','Advogado','Ensino Superior','1999-03-08','1999-03-08','Rua Z','321','Casa 10','Cidade C','Bairro Z','13579-246',35,'url_roberto1.jpg','2024-03-10 13:54:31','2024-03-10 13:54:31',NULL,NULL),(55,'Laura','Ferreira','laura1@example.com','senha123','888111444','1993-03-28','Enfermeira','Ensino Superior','2013-12-11','2013-12-11','Avenida AA','654','Apartamento 707','Cidade C','Bairro AA','98765-432',35,'url_laura1.jpg','2024-03-10 13:54:31','2024-03-10 13:54:31',NULL,NULL),(56,'Felipe','Rocha','felipe1@example.com','senha123','111444777','1997-05-20','Estudante','Ensino Médio','2017-08-30','2017-08-30','Rua BB','987','Casa 11','Cidade C','Bairro BB','12345-678',35,'url_felipe1.jpg','2024-03-10 13:54:31','2024-03-10 13:54:31',NULL,NULL),(57,'Camila','Melo','camila2@example.com','senha123','444777000','1980-09-10','Administradora','Mestrado','2000-10-01','2000-10-01','Avenida CC','147','Bloco J','Cidade C','Bairro CC','54321-987',35,'url_camila2.jpg','2024-03-10 13:54:31','2024-03-10 13:54:31',NULL,NULL),(58,'Gabriel','Costa','gabriel1@example.com','senha123','777000333','1985-11-25','Professor','Doutorado','2005-04-20','2005-04-20','Rua DD','369','Apartamento 808','Cidade C','Bairro DD','98765-432',35,'url_gabriel1.jpg','2024-03-10 13:54:31','2024-03-10 13:54:31',NULL,NULL),(59,'Marcela','Almeida','marcela1@example.com','senha123','111333000','1988-07-14','Contadora','Pós-Graduação','2008-09-15','2008-09-15','Avenida EE','852','Casa 12','Cidade C','Bairro EE','13579-246',35,'url_marcela1.jpg','2024-03-10 13:54:31','2024-03-10 13:54:31',NULL,NULL),(60,'Rafaela','Nunes','rafaela1@example.com','senha123','222444000','1990-02-08','Engenheira de Software','Ensino Superior','2010-07-28','2010-07-28','Rua FF','741','Bloco K','Cidade C','Bairro FF','12345-678',35,'url_rafaela1.jpg','2024-03-10 13:54:31','2024-03-10 13:54:31',NULL,NULL),(66,'Maria','Silva','maria.silva@example.com','senha456','999888777','1985-06-13','Engenheira','Pós-graduação','2004-04-19','2024-07-03','Avenida X','123','Apartamento 101','Cidade B','Bairro D','12345-678',36,'url_maria.jpg','2024-03-10 22:04:36','2024-03-10 22:04:36','maria_silva','555666777'),(68,'João','Oliveira','joao.oliveira@example.com','senha123','111222333','1990-09-20','Analista de Sistemas','Graduação','2010-07-15','2010-07-15','Rua Y','456','Casa 2','Cidade C','Bairro E','98765-432',37,'url_joao.jpg','2024-03-10 22:11:11','2024-03-10 22:11:11','joao_oliveira','777888999'),(69,'Douglas','Mello','douglasazevedomello2@gmail.com','Doug','(51) 992883720',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,208,NULL,'2024-03-15 16:11:28','2024-03-22 00:02:39',NULL,NULL),(76,'Giovana','Mello','Gio@mello','123','51992883720','1985-06-13','Autonomo','Ensino Superior','2004-06-13','2024-04-19','Rua Arthur Corrêa da Silva','50','Casa','São Leopoldo','Campestre','93046750',208,NULL,'2024-03-17 18:10:06','2024-04-06 23:01:09',NULL,'(12) 211111111'),(78,'','','','','',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2024-03-17 18:10:12','2024-03-17 18:10:12',NULL,NULL),(82,'Douglas','Mello','Dougmello@email','123','(51) 992883720',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2024-03-17 18:20:06','2024-03-21 23:27:20',NULL,NULL),(83,'Fernando ','de Mello','f.azevedomello@gmail.com','2511','(51) 984365024',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2024-03-17 20:15:17','2024-03-17 20:15:17',NULL,NULL),(84,'Josi','Blange','joblange@hotmail','080288','(51) 992143711',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,208,NULL,'2024-03-18 01:03:08','2024-03-22 00:46:53',NULL,NULL),(85,'Douglas ','Mello','Dougmel@email','123','(51) 992883720',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2024-03-20 01:30:05','2024-03-20 01:30:05',NULL,NULL),(86,'Jsbeb','Nsbwj','Nsbwj','123','(18) 171717171',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2024-03-20 01:46:45','2024-03-20 01:46:45',NULL,NULL),(87,'Doug','Azevedo ','Dougazevedo@mello','123','(51) 992883720',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2024-03-20 09:23:13','2024-03-20 09:38:44',NULL,NULL),(88,'Gabi','Mello','Gabi@mello','123','(88) 977788999',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,209,NULL,'2024-03-22 00:56:17','2024-03-22 01:02:35',NULL,NULL),(89,'Gabriel ','Santos de Mello ','gabielucasmello@gmail.com','Oi curioso','616527383',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,208,NULL,'2024-03-22 01:05:17','2024-03-22 01:05:55',NULL,NULL),(90,'Lucas','Mello','Peidei@gmail.com','12345','(55) 519989894',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,208,NULL,'2024-03-27 01:16:35','2024-03-27 01:17:58',NULL,NULL),(91,'Iasmim ','Mondini','iasmim.smondini@gmail.com','Smondini4','(54) 996965996',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,208,NULL,'2024-04-06 20:44:11','2024-04-06 20:44:52',NULL,NULL),(92,'João Pedro Blange dos Santos','Blange dos  Santos','jpblange@gmail.com','1375','(51) 984792360',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,208,NULL,'2024-04-06 22:39:37','2024-04-06 22:40:39',NULL,NULL),(93,'Teste','Teste','Nzjwsn','1234','(61) 526262626',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2024-04-12 22:39:57','2024-04-12 22:39:57',NULL,NULL),(94,'Fernando ','Tulikowski ','nandotulikowski@gmail.com','Douglasboco','(51) 998726250',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,210,NULL,'2024-04-12 22:54:58','2024-04-12 23:23:19',NULL,NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `visitantes`
--

DROP TABLE IF EXISTS `visitantes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `visitantes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_culto` int NOT NULL,
  `nome` varchar(100) NOT NULL,
  `whatsapp` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_culto` (`id_culto`),
  CONSTRAINT `visitantes_ibfk_1` FOREIGN KEY (`id_culto`) REFERENCES `relatorioculto` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `visitantes`
--

LOCK TABLES `visitantes` WRITE;
/*!40000 ALTER TABLE `visitantes` DISABLE KEYS */;
INSERT INTO `visitantes` VALUES (1,7,'Pedro Silva','5512345678'),(2,7,'Ana Oliveira','5512345679'),(3,7,'João Santos',NULL),(4,8,'Maria Souza','5512345680'),(5,8,'Marcos Ferreira','5512345681'),(6,4,'Luana Pereira','5512345682'),(7,4,'Lucas Almeida','5512345683'),(8,5,'Camila Rodrigues','5512345684'),(9,5,'Thiago Oliveira',NULL),(10,6,'Juliana Santos','5512345685'),(11,6,'Douglas Mello','51992883720'),(12,21,'João campeiro','9594648-46451'),(13,21,'Albert cristien','9464649-4649'),(14,22,'Pedro','6996666-6655'),(15,22,'Tiago','5199288-3720'),(16,22,'João ','6398632-1594'),(21,25,'Douglas','51 2398536858'),(22,25,'Vdtgc','51 2458745984'),(23,26,'Douglas','946494849488'),(24,26,'Vcghvv','986698569986'),(25,27,'Josiane Blange','51992143711'),(26,27,'Gabriel Santos','516326497649'),(27,27,'Lucas','512365894413'),(28,28,'Hvhh','666666666666'),(29,28,'Bvghhh','666698666985'),(30,29,'Carlos Alberto','51992883720'),(31,29,'Ruwn','51992143711'),(32,41,'Fghvvfg','(85) 69855-855'),(33,41,'Vdggv','(85) 6985-'),(34,42,'Fghvvfg','(85) 69855-855'),(35,42,'Vdggv','(85) 6985-'),(36,43,'Pedro','(64) 64646-4985'),(37,43,'Bzhwhwbsh','(94) 61649-'),(38,43,'Jdjsjsj','(94) 64646-6'),(39,44,'Ghhhg','(66) 6666-'),(40,45,'Gato Félix','(31) 54849-1319'),(41,46,'Fernando','(51) 99872-6250');
/*!40000 ALTER TABLE `visitantes` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-04-16 22:44:39
