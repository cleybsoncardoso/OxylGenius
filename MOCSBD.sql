-- MySQL dump 10.13  Distrib 5.7.17, for Win64 (x86_64)
--
-- Host: localhost    Database: id2171616_oxylgenius
-- ------------------------------------------------------
-- Server version	5.7.17-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `aquisicao`
--

DROP TABLE IF EXISTS `aquisicao`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `aquisicao` (
  `ID_Aqui` int(11) NOT NULL AUTO_INCREMENT,
  `Forma` varchar(10) DEFAULT NULL,
  `dta` date DEFAULT NULL,
  `autor` varchar(20) DEFAULT NULL,
  `observacoes` varchar(60) DEFAULT NULL,
  PRIMARY KEY (`ID_Aqui`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `aquisicao`
--

LOCK TABLES `aquisicao` WRITE;
/*!40000 ALTER TABLE `aquisicao` DISABLE KEYS */;
/*!40000 ALTER TABLE `aquisicao` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `avaliacao`
--

DROP TABLE IF EXISTS `avaliacao`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `avaliacao` (
  `ID_avaliacao` int(11) NOT NULL AUTO_INCREMENT,
  `Dta` date DEFAULT NULL,
  `ID_Autor` int(11) NOT NULL,
  `Nota` float DEFAULT NULL,
  PRIMARY KEY (`ID_avaliacao`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `avaliacao`
--

LOCK TABLES `avaliacao` WRITE;
/*!40000 ALTER TABLE `avaliacao` DISABLE KEYS */;
/*!40000 ALTER TABLE `avaliacao` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `caracteristicas`
--

DROP TABLE IF EXISTS `caracteristicas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `caracteristicas` (
  `ID_caracteristica` int(11) NOT NULL AUTO_INCREMENT,
  `material` varchar(10) DEFAULT NULL,
  `tecnica` varchar(20) DEFAULT NULL,
  `autora` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`ID_caracteristica`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `caracteristicas`
--

LOCK TABLES `caracteristicas` WRITE;
/*!40000 ALTER TABLE `caracteristicas` DISABLE KEYS */;
/*!40000 ALTER TABLE `caracteristicas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dimensoes`
--

DROP TABLE IF EXISTS `dimensoes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `dimensoes` (
  `ID_Dim` int(11) NOT NULL AUTO_INCREMENT,
  `Altura` float DEFAULT NULL,
  `Largura` float DEFAULT NULL,
  `Comprimento` float DEFAULT NULL,
  PRIMARY KEY (`ID_Dim`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dimensoes`
--

LOCK TABLES `dimensoes` WRITE;
/*!40000 ALTER TABLE `dimensoes` DISABLE KEYS */;
/*!40000 ALTER TABLE `dimensoes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `documentacao_fotografica`
--

DROP TABLE IF EXISTS `documentacao_fotografica`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `documentacao_fotografica` (
  `ID_Doc_fot` int(11) NOT NULL AUTO_INCREMENT,
  `fotografo` varchar(20) DEFAULT NULL,
  `dta` date DEFAULT NULL,
  `arquivo` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`ID_Doc_fot`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `documentacao_fotografica`
--

LOCK TABLES `documentacao_fotografica` WRITE;
/*!40000 ALTER TABLE `documentacao_fotografica` DISABLE KEYS */;
/*!40000 ALTER TABLE `documentacao_fotografica` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `fotoobra`
--

DROP TABLE IF EXISTS `fotoobra`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `fotoobra` (
  `ID_Foto` int(11) NOT NULL,
  `linkFoto` longtext,
  PRIMARY KEY (`ID_Foto`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fotoobra`
--

LOCK TABLES `fotoobra` WRITE;
/*!40000 ALTER TABLE `fotoobra` DISABLE KEYS */;
/*!40000 ALTER TABLE `fotoobra` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `identificacao`
--

DROP TABLE IF EXISTS `identificacao`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `identificacao` (
  `n_no_inventario` int(11) NOT NULL,
  `colecao` varchar(20) DEFAULT NULL,
  `nome` varchar(20) DEFAULT NULL,
  `titulo` varchar(20) DEFAULT NULL,
  `procedencia` varchar(20) DEFAULT NULL,
  `funcao` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`n_no_inventario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `identificacao`
--

LOCK TABLES `identificacao` WRITE;
/*!40000 ALTER TABLE `identificacao` DISABLE KEYS */;
/*!40000 ALTER TABLE `identificacao` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mudancaempregado`
--

DROP TABLE IF EXISTS `mudancaempregado`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `mudancaempregado` (
  `ID_mudancaEmpregado` int(11) NOT NULL AUTO_INCREMENT,
  `ID_Autor` int(11) DEFAULT NULL,
  `ID_Empregado` int(11) DEFAULT NULL,
  `conteudo` varchar(10) DEFAULT NULL,
  `DataAlteracao` date DEFAULT NULL,
  PRIMARY KEY (`ID_mudancaEmpregado`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mudancaempregado`
--

LOCK TABLES `mudancaempregado` WRITE;
/*!40000 ALTER TABLE `mudancaempregado` DISABLE KEYS */;
/*!40000 ALTER TABLE `mudancaempregado` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mudancaobra`
--

DROP TABLE IF EXISTS `mudancaobra`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `mudancaobra` (
  `ID_mudancaObra` int(11) NOT NULL AUTO_INCREMENT,
  `ID_Autor` int(11) DEFAULT NULL,
  `ID_Obra` int(11) DEFAULT NULL,
  `conteudo` varchar(300) DEFAULT NULL,
  `DataAlteracao` date DEFAULT NULL,
  PRIMARY KEY (`ID_mudancaObra`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mudancaobra`
--

LOCK TABLES `mudancaobra` WRITE;
/*!40000 ALTER TABLE `mudancaobra` DISABLE KEYS */;
/*!40000 ALTER TABLE `mudancaobra` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notificacao`
--

DROP TABLE IF EXISTS `notificacao`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `notificacao` (
  `ID_Notificacao` int(11) NOT NULL AUTO_INCREMENT,
  `ID_Autor` int(11) NOT NULL,
  `Conteudo` varchar(100) DEFAULT NULL,
  `Dta_de_criacao` date DEFAULT NULL,
  `estadoNotificacao` tinyint(1) DEFAULT NULL,
  `ID_Objeto` int(11) NOT NULL,
  PRIMARY KEY (`ID_Notificacao`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notificacao`
--

LOCK TABLES `notificacao` WRITE;
/*!40000 ALTER TABLE `notificacao` DISABLE KEYS */;
/*!40000 ALTER TABLE `notificacao` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `obra`
--

DROP TABLE IF EXISTS `obra`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `obra` (
  `ID_Obra` int(11) NOT NULL AUTO_INCREMENT,
  `descricao` varchar(200) DEFAULT NULL,
  `estadoObra` tinyint(1) DEFAULT NULL,
  `historico` varchar(30) DEFAULT NULL,
  `marcas` varchar(30) DEFAULT NULL,
  `inconologia` varchar(30) DEFAULT NULL,
  `estado` varchar(20) DEFAULT NULL,
  `referencias` varchar(60) DEFAULT NULL,
  `local_data` date DEFAULT NULL,
  `nome` varchar(30) DEFAULT NULL,
  `n_de_visulizacoes` int(11) DEFAULT NULL,
  PRIMARY KEY (`ID_Obra`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `obra`
--

LOCK TABLES `obra` WRITE;
/*!40000 ALTER TABLE `obra` DISABLE KEYS */;
/*!40000 ALTER TABLE `obra` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario`
--

DROP TABLE IF EXISTS `usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `usuario` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `tokenAcesso` int(10) DEFAULT NULL,
  `Login` varchar(30) DEFAULT NULL,
  `Senha` varchar(10) NOT NULL,
  `Nome` varchar(30) NOT NULL,
  `LoginFacebook` varchar(30) DEFAULT NULL,
  `LoginGoogle` varchar(30) DEFAULT NULL,
  `FotoUsuario` longtext,
  `Telefone` varchar(11) DEFAULT NULL,
  `Tipo` enum('U','F','G') DEFAULT NULL,
  `idsupervisao` int(11) DEFAULT NULL,
  `ativo` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `idsupervisao` (`idsupervisao`),
  CONSTRAINT `usuario_ibfk_1` FOREIGN KEY (`idsupervisao`) REFERENCES `usuario` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` VALUES (1,NULL,'cley','MTIz','cleybson',NULL,NULL,'https://media.licdn.com/mpr/mpr/shrinknp_200_200/AAEAAQAAAAAAAAfAAAAAJDk5ZDNhNDI4LTNmOTMtNGI5Yy1iZDIzLTk3NjM1YmVmMTkzNA.jpg',NULL,NULL,NULL,1);
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-07-28  0:53:14
