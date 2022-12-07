/*
//////////////// DOCUMENTAÇÃO \\\\\\\\\\\\\\\\\\\\\
Objetivo : Arquivo responsável pela manipulação de dados com o banco de dados (insert,update,delete,select)
Autor : HeitorPontieri
Data_criação : 28/10/2022
Versão : 1.0
*/

const { MESSAGE_SUCCESS, MESSAGE_ERROR } = require('../../modulo/config.js')

const { PrismaClient } = require('@prisma/client')

const { selectLastId } = require  ("./produto.js")

const prisma = new PrismaClient()

const insertPizza = async () => {

    const produtos = await selectLastId()

    try {

        let sql = `insert into tbl_pizza
        (
            id_produto
        )
        values(
            '${produtos}'
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

const getPizzasById = async (id) => {

    try {
        
        let sql = `select * from vwPizza_Ingrediente where id = ${id};`
        console.log(sql);

        const result = await prisma.$queryRawUnsafe(sql)

        if (result) {
            
            return result

        } else {

            return MESSAGE_ERROR.INTERNAL_ERROR_DB
            
        }


    } catch (error) {
        
        return MESSAGE_ERROR.INTERNAL_ERROR_DB

    }


}
const getPizza = async () => {

    let sql = `select * from vwPizza`

    const result = await prisma.$queryRawUnsafe(sql)

    if (result) {
        
        return result

    } else {

        return MESSAGE_ERROR.INTERNAL_ERROR_DB
        
    }

}


const getLastIDPizza = async () =>{
    
    let sql = `select id from tbl_pizza order by id desc limit 1;`

    const result = await prisma.$queryRawUnsafe(sql)

    if (result) {
        return result[0].id
    }else {
        return false
    }
}


module.exports = {insertPizza,getLastIDPizza, getPizzasById, getPizza}
