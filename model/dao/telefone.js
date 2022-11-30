/*
//////////////// DOCUMENTAÇÃO \\\\\\\\\\\\\\\\\\\\\
Objetivo : Arquivo responsável pela manipulação de dados com o banco de dados (insert,update,delete,select)
Autor : HeitorPontieri
Data_criação : 28/10/2022
Versão : 1.0
*/

const { MESSAGE_SUCCESS, MESSAGE_ERROR } = require('../modulo/config.js')

const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const insertTelefone = async(dados) => {

    try {

        let sql = `insert into tbl_produto
        (
            ddd,
            numero,

        )
        value(
            '${dados.ddd}'
            '${dados.numero}'
        )`
        
        const result = await prisma.$executeRawUnsafe(sql)
    
        if (result) {
            return true
        }else {
            return MESSAGE_ERROR.INTERNAL_ERROR_DB
        }

    } catch (error) {

        return false
        
    }

}

module.exports = {insertTelefone}