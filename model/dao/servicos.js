/*
//////////////// DOCUMENTAÇÃO \\\\\\\\\\\\\\\\\\\\\
Objetivo : Arquivo responsável pela manipulação de dados com o banco de dados (insert,update,delete,select)
Autor : HeitorPontieri
Data_criação : 28/10/2022
Versão : 1.0
*/
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient

const {selectLastID} = require('./horario_de_funcionamento.js')

const insertService = async function(dados){
    try {

        const horario_funcionamento_id = await selectLastID()

        let sql = `insert into tbl_servico(nome,id_horario_funcionamento)
            values('${dados.nome}',${horario_funcionamento_id});`

           
        const result = await prisma.$executeRawUnsafe(sql)
    console.log(result);
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

module.exports={
    insertService
}