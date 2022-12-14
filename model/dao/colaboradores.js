/*
//////////////// DOCUMENTAÇÃO \\\\\\\\\\\\\\\\\\\\\
Objetivo : Arquivo responsável pela manipulação de dados com o banco de dados (insert,update,delete,select)
Autor : HeitorPontieri
Data_criação : 28/10/2022
Versão : 1.0
*/

const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient

const insertColaborador = async function (dados) {
    try {
        let sql = `insert into tbl_colaboradores(nome_usuario,senha)
        values(MD5('${dados.nome_usuario}'),MD5('${dados.senha}'));`


        const result = await prisma.$queryRawUnsafe(sql)

        if (result)
            return result
        else
            return false

    }
    catch (error) {
        return false
    }

}
const selectColaborador = async function (dados) {
    try {
        let sql = `select tbl_colaboradores.nome_usuario,tbl_colaboradores.senha from tbl_colaboradores 
                    where nome_usuario = MD5('${dados.nome_usuario}') and senha = MD5('${dados.senha}');`

        const result = await prisma.$queryRawUnsafe(sql)
        

        if (result) {
            return result
        }
        else{
            return false
        }
    }
    catch (error) {
        return false
    }


}

const validateColaborador = async function (dados){
    try {
        let sql = `select * from tbl_colaboradores where nome_usuario = MD5('${dados.nome_usuario}' and senha = MD5('${dados.senha}')`

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



module.exports = {
    insertColaborador,
    selectColaborador,
    validateColaborador
}