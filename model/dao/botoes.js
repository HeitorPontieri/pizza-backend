/*
//////////////// DOCUMENTAÇÃO \\\\\\\\\\\\\\\\\\\\\
Objetivo : Arquivo responsável pela manipulação de dados com o banco de dados (insert,update,delete,select)
Autor : HeitorPontieri
Data_criação : 28/10/2022
Versão : 1.0
*/


const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const insertButtons = async function(dados){
    try {
        let sql = `insert into tbl_botoes(nome,img) 
        
       values ('${dados.nome}', '${dados.img}');`
        
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

const getButtons = async function(){
    try {
        let sql = `select tbl_botoes.nome, tbl_botoes.img from tbl_botoes`
        console.log(sql);

        const result  = prisma.$queryRawUnsafe(sql)

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
    insertButtons,getButtons
}