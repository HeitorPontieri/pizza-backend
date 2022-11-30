/*
//////////////// DOCUMENTAÇÃO \\\\\\\\\\\\\\\\\\\\\
Objetivo : Arquivo responsável pela manipulação de dados com o banco de dados (insert,update,delete,select)
Autor : HeitorPontieri
Data_criação : 28/10/2022
Versão : 1.0
*/

const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const insertForm = async function(dados){
    try {

        let sql = `insert into tbl_formulario(nome,mensagem) values ('${dados.nome}', '${dados.mensagem}') `





    } catch (error) {
        
    }
}