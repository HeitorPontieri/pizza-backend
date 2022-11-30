/*
//////////////// DOCUMENTAÇÃO \\\\\\\\\\\\\\\\\\\\\
Objetivo : Arquivo responsável pela manipulação de dados com o banco de dados (insert,update,delete,select)
Autor : HeitorPontieri
Data_criação : 28/10/2022
Versão : 1.0
*/

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
            status_favorit
        )
        value(
            '${dados.nome}'
            '${dados.imagem}'
            '${dados.status_promocao}'
            '${dados.preco}'
            '${dados.porcentagem_desconto}'
            '${dados.status_favorito}'
        )`
        
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

module.exports = {insertProduto}