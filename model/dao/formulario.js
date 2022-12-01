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
        let sql = `insert into tbl_formulario(nome, mensagem, email, telefone, celular, criticas_sugestoes) 
        
       values ('${dados.nome}', '${dados.mensagem}','${dados.email}' , '${dados.telefone}', '${dados.celular}', '${dados.criticas_sugestoes}');`
        
        const result = prisma.$queryRawUnsafe(sql)

        if(result){
            return result
        }
        else{
            return false
        }
    } catch (error) {
        return false
    }
}


module.exports={
    insertForm
}