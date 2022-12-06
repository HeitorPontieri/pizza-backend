/*
//////////////// DOCUMENTAÇÃO \\\\\\\\\\\\\\\\\\\\\
Objetivo : Arquivo responsável pela manipulação de dados com o banco de dados (insert,update,delete,select)
Autor : HeitorPontieri
Data_criação : 28/10/2022
Versão : 1.0
*/

const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient

const getFavoritos = async function(status_favorito){
    try {

        const status_fav =  status_favorito
      
        let sql =  `call procFavorito(${status_fav.status_favorito})`
        
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

module.exports={
    getFavoritos
}