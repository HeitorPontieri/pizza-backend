/*
//////////////// DOCUMENTAÇÃO \\\\\\\\\\\\\\\\\\\\\
Objetivo : Arquivo responsável pela manipulação de dados com o banco de dados (insert,update,delete,select)
Autor : HeitorPontieri
Data_criação : 28/10/2022
Versão : 1.0
*/

const { MESSAGE_SUCCESS, MESSAGE_ERROR } = require('../../modulo/config.js')

const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const insertProduto = async(dados) => {

    try {

        let sql = `insert into tbl_produto
        (
            nome,
            imagem,
            status_promocao,
            preco,
            porcentagem_desconto,
            status_favorito,
            tipo_produto
        )
        values(
            '${dados.nome}',
            '${dados.imagem}',
            '${dados.status_promocao}',
            '${dados.preco}',
            '${dados.porcentagem_desconto}',
            '${dados.status_favorito}',
            '${dados.tipo_produto}'
        );`
        
        const result = await prisma.$executeRawUnsafe(sql)
    
        if (result) {
            return true
        }else {
            return false
        }

    } catch (error) {

        return false
        
    }
}

const selectLastId = async () => {

    //import da classe prismaClient, que é respnsavel pelas interacoes com BD
    const { PrismaClient } = require('@prisma/client')

    //instancia da classe PrismaClient
    const prisma = new PrismaClient()

    let sql = `select id from tbl_produto order by id desc limit 1;`

    const rsDados = await prisma.$queryRawUnsafe(sql)

    if (rsDados) {
        return rsDados[0].id
    }else {
        return false
    }
}


module.exports = {insertProduto, selectLastId}