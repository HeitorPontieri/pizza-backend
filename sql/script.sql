create database db_pizzaria;

show databases;

use db_pizzaria;

create table tbl_colaboradores(
id int not null auto_increment primary key,
nome_usuario varchar(50) not null,
senha varchar(100) not null,
unique index(id)

);

 create table tbl_criticas_sugestoes(
 id int not null auto_increment primary key,
 criticas varchar(25),
 unique index (id)

);



 create table tbl_formulario(
 id int not null auto_increment primary key,
 nome varchar(50) not null,
 mensagem text not null,
 id_telefone int not null,
 	constraint FK_telefone_formulario
 	foreign key(id_telefone)
     references tbl_telefone(id),
 id_celular int not null,
 	constraint FK_celular_formulario
     foreign key(id_celular)
     references tbl_celular(id),
 id_criticas int not null,
 	constraint FK_criticas_formulario
 	foreign key(id_criticas)
     references tbl_criticas_sugestoes(id),
 unique index(id)
 );
 desc tbl_formulario;

show tables;

create table tbl_horario_de_funcionamento(
id int not null auto_increment primary key,
abertura time not null,
fechamento time not null,
unique index(id)
);

create table tbl_servicos(
id int not null auto_increment primary key,
nome varchar(70) not null,
id_horario_funcionamento int not null,
	constraint FK_horario_servicos
    foreign key(id_horario_funcionamento)
    references tbl_horario_de_funcionamento(id),
unique index(id)
);

create table tbl_botoes(
id int not null auto_increment primary key,
nome varchar(50) not null,
img varchar(150) not null,
unique index(id)
);

create table tbl_ingredientes(
id int not null auto_increment primary key,
ingrediente_principal varchar(45) not null,
acompanhamentos varchar(120) not null,
unique index(id)
);

create table tbl_produto(
id int not null auto_increment primary key,
nome varchar(75) not null,
imagem varchar(150) not null,
status_promocao varchar(25) not null,
preco double not null,
porcentagem_desconto float,
status_favorito int,
unique index(id)
);

create table tbl_bebida(
id int not null auto_increment primary key,
teor_alcoolico double not null,
volume double not null,
id_produto int not null,
	constraint FK_produto_bebida
    foreign key (id_produto)
    references tbl_produto(id),
unique index(id)
);

create table tbl_pizza(
id int not null auto_increment primary key,
id_produto int not null,
	constraint FK_produto_pizza
    foreign key (id_produto)
    references tbl_produto(id),
unique index(id)
);

create table tbl_ingredientes_pizza(
id int not null auto_increment primary key,
id_pizza int not null,
	constraint FK_pizza_ingredientes
    foreign key (id_pizza)
    references tbl_pizza(id),
id_ingredientes int not null,
	constraint FK_ingredientes_ingredientes
    foreign key (id_ingredientes)
    references tbl_ingredientes(id),
unique index(id)
);

show tables;

desc tbl_telefone;


