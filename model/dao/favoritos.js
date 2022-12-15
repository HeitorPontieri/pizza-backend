/*
//////////////// DOCUMENTAÇÃO \\\\\\\\\\\\\\\\\\\\\
Objetivo : Arquivo responsável pela manipulação de dados com o banco de dados (insert,update,delete,select)
Autor : HeitorPontieri
Data_criação : 28/10/2022
Versão : 1.0
*/

const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient

const updateFavoritos = async function (dados) {
    try {

        /*
            DELIMITER $$
            create procedure procUpdateFav (in id int)

            BEGIN

            update tbl_produto
            set tbl_produto.status_favorito = tbl_produto.status_favorito + 1
            where tbl_produto.id = id;
            
            END $$
        */ 
        let sql = `call procUpdateFav(${dados.id})`

        const result = await prisma.$executeRawUnsafe(sql)

        if (result) {
            return true
        }
        else {
            return false
        }

    } catch (error) {
        return false
    }


}

module.exports = {

    updateFavoritos
}