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

        let sql = `insert into tbl_servicos(nome,id_horario_funcionamento)
            values('${dados.nome}',${horario_funcionamento_id});`

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
const getAllServices = async function() {

    try {
        
        let sql = `select * from vwServicos;`

       
        const result = await prisma.$queryRawUnsafe(sql)

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
    insertService,
    getAllServices
}