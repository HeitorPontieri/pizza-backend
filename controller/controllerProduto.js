/*
//////////////// DOCUMENTAÇÃO \\\\\\\\\\\\\\\\\\\\\
Objetivo : Arquivo responsável pela manipulação de recebimento, tratamento e retorno de dados
entre a API e a model
Autor : HeitorPontieri
Data_criação : 28/11/2022
Versão : 1.0
*/
const { MESSAGE_SUCESS, MESSAGE_ERROR } = require('../modulo/config.js')
const novoProd = require('../model/DAO/produto.js')
const novaBebida = require('../model/DAO/bebida.js')
const novaPizza = require('../model/dao/pizza.js')
const novosIngredientes = require('../model/dao/ingredientes')

const novoProduto = async (dados) => {

    if (dados.nome == '' || dados.nome == undefined || dados.imagem == undefined || dados.imagem == '' || dados.status_promocao == undefined || dados.status_promocao == '' || dados.preco == undefined || dados.preco == '') {

        return { status: 400, message: MESSAGE_ERROR.REQUIRED_FIELDS }

    } else {

        const resultNovoProduto = await novoProd.insertProduto(dados)


        if (resultNovoProduto) {

            if (dados.teor_alcoolico != undefined && dados.volume != undefined) {

                const resultNovaBebida = await novaBebida.insertBebida(dados)

                if (resultNovaBebida) {
                    return { status: 201, message: MESSAGE_SUCESS.INSERT_ITEM }
                } else {
                    return { status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB }
                }

            }
            else {
                
                
                if (dados.ingrediente_principal != undefined && dados.acompanhamentos != undefined) {
                    
                    const resultNovaPizza = await novaPizza.insertPizza(dados)

                    const resultNovoIngred = await novosIngredientes.insertIngred(dados)
                    
                    if (resultNovoIngred && resultNovaPizza) {
                        return { status: 201, message: MESSAGE_SUCESS.INSERT_ITEM }
                    } else {
                        return { status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB }
                    }
                }
                else{
                    return { status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB }
                }
            }
        }
    }
}

module.exports = {
    novoProduto

}