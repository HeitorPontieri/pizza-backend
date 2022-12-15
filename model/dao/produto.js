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

const selectProdutoById = async (id) => {

    
    let sql = `select * from tbl_produto where ${id};`

    const rsDados = await prisma.$queryRawUnsafe(sql)

    if (rsDados) {
        return rsDados[0].id
    }else {
        return false
    }
}

const updateProduto = async function(dados) {
    try {

        let sql  = `call procAtualizarProd (${dados.id},'${dados.nome}', '${dados.imagem}', '${dados.status_promocao}', ${dados.preco},${dados.porcentagem_desconto},${dados.status_favorito},'${dados.tipo_produto}');`

        console.log(sql);
       const result = await prisma.$executeRawUnsafe(sql)

       if(result){
        return true
       }
       else{
        return false
       }

    } catch (error) {
       return false 
    }
}

const deleteProduto = async function(id){
    try {

        let sql = `delete from tbl_produto where id = ${id};`

        const result = await prisma.$executeRawUnsafe(sql)

       if(result){
        return true
       }
       else{
        return false
       }

        
    } catch (error) {
        return false
    }
}

const getallProdutos = async () => {

    try {

        let sql = `select * from tbl_produto`

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


module.exports = {insertProduto, selectLastId,selectProdutoById, updateProduto, deleteProduto, getallProdutos}