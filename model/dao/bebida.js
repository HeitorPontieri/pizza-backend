
/*
//////////////// DOCUMENTAÇÃO \\\\\\\\\\\\\\\\\\\\\
Objetivo : Arquivo responsável pela manipulação de dados com o banco de dados (insert,update,delete,select)
Autor : HeitorPontieri
Data_criação : 28/10/2022
Versão : 1.0
*/

const { MESSAGE_SUCCESS, MESSAGE_ERROR } = require('../../modulo/config.js')

const { PrismaClient } = require('@prisma/client')

const  { selectLastId } = require( "./produto.js")

const prisma = new PrismaClient()

const insertBebida = async(dados) => {

    const produtos = await selectLastId()

    try {

        let sql = `insert into tbl_bebida
        (
            teor_alcoolico,
            volume,
            id_Produto
        )
        values(
            ${dados.teor_alcoolico},
            ${dados.volume},
            ${produtos}
        )`
        
        

        const result = await prisma.$queryRawUnsafe(sql)
    
        if (result) {
            return true
        }else {
            return MESSAGE_ERROR.INTERNAL_ERROR_DB
        }

    } catch (error) {
        return false
        
    }

}

module.exports = {insertBebida}
