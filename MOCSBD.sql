

use id2171616_oxylgenius;
create table usuario (
ID int primary key auto_increment,
Login varchar(30) ,
Senha varchar (10) NOT NULL,
Nome varchar(30) NOT NULL,
LoginFacebook varchar(30),
LoginGoogle varchar(30),
Telefone varchar(11),
Tipo enum ('U', 'F', 'G')

) Default charset = utf8;

create table notificacao(
ID_Notificacao int primary key NOT NULL auto_increment,
ID_Autor int NOT NULL,
Conteudo varchar(100),
Dta_de_criacao date,
ID_Objeto int NOT NULL
)Default charset = utf8;

create table avaliacao(
ID_avaliacao int primary key NOT NULL auto_increment,
Dta date,
ID_Autor int NOT NULL,
Nota float
) Default charset = utf8;

create table mudanca(
ID_mudanca int primary key NOT NULL auto_increment,
ID_Autor int,
ID_Obra int,
DtadeCriacao date
)Default charset = utf8;
use id2171616_oxylgenius;
create table obra(
ID_Obra int primary key NOT NULL auto_increment,
ft_frente  longblob,
ft_verso longblob,
descricao varchar(30),
historico varchar(30),
marcas varchar(30),
inconologia varchar(30),
estado varchar(20),
referencias varchar(60),
local_data date,
nome varchar (30),
n_de_visulizacoes int
)Default charset = utf8;

create table identificacao(
n_no_inventario int primary key NOT NULL,
colecao varchar(20),
nome varchar(20),
titulo varchar(20),
procedencia varchar(20),
funcao varchar(20)
)Default charset = utf8;
create table caracteristicas(
ID_caracteristica int primary key NOT NULL auto_increment,
material varchar(10),
tecnica varchar(20),
autora varchar(20)
)Default charset = utf8;
create table dimensoes (
ID_Dim int primary key NOT NULL auto_increment,
Altura float,
Largura float,
Comprimento float
)Default charset = utf8;
create table documentacao_fotografica (
ID_Doc_fot int primary key NOT NULL auto_increment,
fotografo varchar(20),
dta date,
arquivo varchar(20)
)Default charset = utf8;
create table aquisicao (
ID_Aqui int primary key NOT NULL auto_increment,
Forma varchar (10), 
dta date,
autor varchar(20),
observacoes varchar (60)
)Default charset = utf8;

ALTER TABLE usuario
ADD COLUMN idsupervisao int;

ALTER TABLE usuario
ADD foreign key (idsupervisao)
references usuario(ID);

ALTER TABLE usuario
ADD COLUMN idavaliacao int;

ALTER TABLE usuario
ADD foreign key (idavaliacao)
references avaliacao(ID_avaliacao);

ALTER TABLE usuario
ADD COLUMN idnotificacao int;

ALTER TABLE usuario
ADD foreign key (idnotificacao)
references notificacao(ID_notificacao);

ALTER TABLE usuario
ADD COLUMN idmudanca int;

ALTER TABLE usuario
ADD foreign key (idmudanca)
references mudanca(ID_mudanca);

ALTER TABLE usuario
ADD COLUMN idobra int;

ALTER TABLE usuario
ADD foreign key (idobra)
references obra(ID_Obra);

ALTER TABLE notificacao
ADD foreign key (ID_Autor)
references usuario(ID);

ALTER TABLE avaliacao
ADD foreign key (ID_Autor)
references usuario(ID);

ALTER TABLE mudanca
ADD foreign key (ID_Autor)
references usuario(ID);

ALTER TABLE obra
ADD COLUMN iduploader int;

ALTER TABLE obra
ADD foreign key (iduploader)
references usuario(ID);

ALTER TABLE obra
ADD COLUMN n_no_inventario int;

ALTER TABLE obra
ADD foreign key (n_no_inventario)
references identificacao(n_no_inventario);

ALTER TABLE obra
ADD COLUMN ID_caracteristica int;

ALTER TABLE obra
ADD foreign key (ID_caracteristica)
references caracteristicas(ID_caracteristica);

ALTER TABLE obra
ADD COLUMN ID_Dim int;

ALTER TABLE obra
ADD foreign key (ID_Dim)
references dimensoes(ID_Dim);

ALTER TABLE obra
ADD COLUMN ID_Doc_fot int;

ALTER TABLE obra
ADD foreign key (ID_Doc_fot)
references documentacao_fotografica(ID_Doc_fot);

ALTER TABLE obra
ADD COLUMN ID_Aqui int;

ALTER TABLE obra
ADD foreign key (ID_Aqui)
references aquisicao(ID_Aqui);

