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
            status_favorito
        )
        value(
            '${dados.nome}',
            '${dados.imagem}',
            '${dados.status_promocao}',
            '${dados.preco}',
            '${dados.porcentagem_desconto}',
            '${dados.status_favorito}'
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
const updateProduto = async (dados) => {

    try {

        let sql = `update tbl_produto set 

            nome = ${dados.nome},
            imagem = ${dados.imagem},
            status_promocao = ${dados.status_favorito},
            preco = ${dados.preco},
            porcentagem_desconto = ${dados.porcentagem_desconto},
            status_favorito = ${dados.status_favorito}


        `

        //executa o script sql no banco de dados ($executeRawUnsafe permite encaminhar um variavel contendo um script)
        const result = await prisma.$queryRawUnsafe(sql)

        // verifica se on script foi executado com sucesso no banco de dados
        if (result) {
            return true
        } else {
            return false
        }

    } catch (error) {

        return false

    }

}

//funcao para deletar um registro no banco de dados
const deleteProduto = async (id) => {

    // alter table tbl_filme_diretor drop foreign key FK_filme_filme_ator;
    try {

        //import da classe prismaClient, que é respnsavel pelas interacoes com BD
        const { PrismaClient } = require('@prisma/client')

        //instancia da classe PrismaClient
        const prisma = new PrismaClient()

        let sqlFK = `alter table tbl_produto_curso drop foreign key id_produto;`
        console.log(sqlFK)
        let resultFK = await prisma.$executeRawUnsafe(sqlFK)
        
        if (resultFK) {
            
            let sql = `delete from tbl_produto where id = ${id};`
         
            //executa o script sql no banco de dados ($executeRawUnsafe permite encaminhar um variavel contendo um script)
            const resultSQL = await prisma.$executeRawUnsafe(sql)
            // verifica se on script foi executado com sucesso no banco de dados
            if (resultSQL) {
                
                let sql = `alter table tbl_produto_curso 
                    add constraint FK_produto_produto_curso
                        foreign key (id_produto)  
                            references tbl_produto;  
                `

                const result = await prisma.$executeRawUnsafe(sql)

                if (result) {
                    return true
                }else{
                    return false
                }
            } else {
                return false
            }
        }else{
            return false
        }
    } catch (error) {

        return false

    }
}

//funcao para retornar todos os registros do banco de dados
const selectAllProdutos = async () => {

    //import da classe prismaClient, que é respnsavel pelas interacoes com BD
    const { PrismaClient } = require('@prisma/client')

    //instancia da classe PrismaClient
    const prisma = new PrismaClient()

    //criamos um objeto do tipo rsproduto para receber os dados do banco de dados 
    //atraves de um script SQL (select)
    const rsprodutos = await prisma.$queryRaw`select cast(id as float) as id, nome, foto, sexo, rg, cpf, email, telefone, celular, data_nasc from tbl_produto`

    if (rsprodutos.length > 0)
        return rsprodutos

    else
        return false



}
const selectByIdProduto = async (id) => {

    //import da classe prismaClient, que é respnsavel pelas interacoes com BD
    const { PrismaClient } = require('@prisma/client')

    //instancia da classe PrismaClient
    const prisma = new PrismaClient()

    let sql = `select cast(id as float) as 
        id, 
        nome, 
        foto, 
        sexo, 
        rg, 
        cpf, 
        email, 
        telefone, 
        celular, 
        data_nasc 
        from tbl_produto 
        where id = ${id};
    `

    //atraves de um script SQL (select)
    const rsproduto = await prisma.$queryRawUnsafe(sql)

    if (rsproduto.length > 0) {
        return rsproduto
    }
    else {
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