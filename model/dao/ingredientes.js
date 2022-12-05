/*
//////////////// DOCUMENTAÇÃO \\\\\\\\\\\\\\\\\\\\\
Objetivo : Arquivo responsável pela manipulação de dados com o banco de dados (insert,update,delete,select)
Autor : HeitorPontieri
Data_criação : 28/10/2022
Versão : 1.0
*/

const { MESSAGE_SUCCESS, MESSAGE_ERROR } = require('../../modulo/config.js')

const { PrismaClient } = require('@prisma/client')

const { selectLastId } = require  ("./produto")

const prisma = new PrismaClient()


const insertIngred = async (dados) =>{
    try {
        let sql = `insert into tbl_ingredientes(ingrediente_principal,acompanhamentos)
        
                    values('${dados.ingrediente_principal}', '${dados.acompanhamentos}')`
        
        const result = await prisma.$executeRawUnsafe(sql)

        if (result) {
            return true
            
        } else {
            return false
        }
    } catch (error) {
        return false
    }
}

module.exports={
    insertIngred
}