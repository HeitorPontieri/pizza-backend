/*
//////////////// DOCUMENTAÇÃO \\\\\\\\\\\\\\\\\\\\\
Objetivo : Arquivo responsável pela manipulação de dados com o banco de dados (insert,update,delete,select)
Autor : HeitorPontieri
Data_criação : 28/10/2022
Versão : 1.0
*/

const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient

const getPromocao = async function(status_promocao){
    try {

        let sql = ` call procPromocao('${status_promocao}')`
        

        const result = await prisma.$queryRawUnsafe(sql)
       

        if (result) {
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
    getPromocao
}