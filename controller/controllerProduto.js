/*
//////////////// DOCUMENTAÇÃO \\\\\\\\\\\\\\\\\\\\\
Objetivo : Arquivo responsável pela manipulação de recebimento, tratamento e retorno de dados
entre a API e a model
Autor : HeitorPontieri
Data_criação : 28/11/2022
Versão : 1.0
*/
const { MESSAGE_SUCCESS, MESSAGE_ERROR } = require('../modulo/config.js')

const novoProduto = async (dados) => {

   
        if (dados.nome == '' || dados.nome == undefined || dados.imagem == undefined|| dados.imagem == '' || dados.status_promocao == undefined || dados.status_promocao == '' || dados.preco == undefined || dados.preco == '') {
        
        return {status: 400, message: MESSAGE_ERROR.REQUIRED_FIELDS}

    }else{
        
        const novoProduto = require('../model/DAO/produto.js')

        const resultNovoProduto = await novoProduto.insertProduto(dados)

        if (resultNovoProduto) {
            
            if (dados.teor_alcoolico != undefined && dados.volume != undefined) {
    
                const novaBebida = require('../model/DAO/bebidas.js')
                const resultNovaBebida = await novaBebida.insertBebida(dados)
    
    
                if (resultNovaBebida) {
                    return { status: 201, message: MESSAGE_SUCCESS.INSERT_ITEM}
                }else{
                    return {status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB}
                }
   
            } else{

                const novaPizza = require('../model/DAO/bebida.js')
                const resultNovaPizza = await novaPizza.insertPizza(dados)
        
                if (resultNovaPizza) {
                    return { status: 201, message: MESSAGE_SUCCESS.INSERT_ITEM}
                }else{
                    return {status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB}
                }
            }
        } 
    }       
}

module.exports = {

    novoProduto

}