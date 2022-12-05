/*
//////////////// DOCUMENTAÇÃO \\\\\\\\\\\\\\\\\\\\\
Objetivo : Arquivo responsável pela manipulação de dados com o banco de dados (insert,update,delete,select)
Autor : HeitorPontieri
Data_criação : 28/10/2022
Versão : 1.0
*/

const { PrismaClient } = require('@prisma/client')
const e = require('express')
const { MESSAGE_ERROR } = require('../../modulo/config')

const prisma = new PrismaClient

const insertHour = async function(dados){
    try {
        let sql = `insert into tbl_horario_de_funcionamento(abertura,fechamento)
        
                    values('${dados.abertura}','${dados.fechamento}')`

        const result = await prisma.$executeRawUnsafe(sql)

        if(result){
            return true
        }
        else{
            return MESSAGE_ERROR.INTERNAL_ERROR_DB
        }
        
    } catch (error) {
        return false
    }
}
const selectLastID = async () =>{

    let sql = `select id from tbl_horario_de_funcionamento order by id desc limit 1;`

    const rsDados = await prisma.$queryRawUnsafe(sql)

    if (rsDados) {
        return rsDados[0].id
    }else {
        return false
    }
}

module.exports={
    insertHour,selectLastID
}