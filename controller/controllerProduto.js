/*
//////////////// DOCUMENTAÇÃO \\\\\\\\\\\\\\\\\\\\\
Objetivo : Arquivo responsável pela manipulação de recebimento, tratamento e retorno de dados
entre a API e a model
Autor : HeitorPontieri
Data_criação : 28/11/2022
Versão : 1.0
*/
const { MESSAGE_SUCESS, MESSAGE_ERROR } = require('../modulo/config.js')
const model = require('../model/DAO/produto.js')
const Bebidas = require('../model/DAO/bebida.js')
const Pizza = require('../model/dao/pizza.js')
const pizza_ing = require('../model/dao/ingredientes_pizza.js')
const novosIngredientes = require('../model/dao/ingredientes.js')

const novoProduto = async (dados) => {

    if (dados.nome == '' || dados.nome == undefined || dados.imagem == undefined || dados.imagem == '' || dados.status_promocao == undefined || dados.status_promocao == '' || dados.preco == undefined || dados.preco == '' || dados.tipo_produto == undefined || dados.tipo_produto == '') {

        return { status: 400, message: MESSAGE_ERROR.REQUIRED_FIELDS }

    }
    else {

        const resultNovoProduto = await model.insertProduto(dados)

        console.log(dados.tipo_produto);
        if (resultNovoProduto) {

            if (dados.tipo_produto == 'Bebida' || dados.tipo_produto == 'bebida') {

                const resultNovaBebida = await Bebidas.insertBebida(dados)

                if (resultNovaBebida) {
                    return { status: 201, message: MESSAGE_SUCESS.INSERT_ITEM }
                } else {
                    return { status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB }
                }

            }

            else {

                if (dados.tipo_produto == 'Pizza' || dados.tipo_produto == 'pizza') {

                    const resultPizza = await Pizza.insertPizza(dados)
                    
                    if (resultPizza) {
                        return { status: 201, message: MESSAGE_SUCESS.INSERT_ITEM }
                    } else {
                        return { status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB }
                    }
                }
                else {
                    return { status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB }
                }
            }
        }
    }
}

const atualizarProduto = async (dados) => {

    if (dados.nome == '' || dados.nome == undefined || dados.imagem == undefined || dados.imagem == '' || dados.status_promocao == undefined || dados.status_promocao == '' || dados.preco == undefined || dados.preco == '' || dados.tipo_produto == undefined || dados.tipo_produto == '') {

        return { status: 400, message: MESSAGE_ERROR.REQUIRED_FIELDS }
    }

    else {
        const attProduto = model.updateProduto(dados)

        if (attProduto) {
            return { status: 200, message: MESSAGE_SUCESS.UPDATE_ITEM }
        }
        else {
            return { status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB }
        }
    }

}

const excluirProduto = async (id) => {
    if (id == '' || id == undefined) {
        return { status: 400, message: MESSAGE_ERROR.REQUIRED_FIELDS }
    }
    else {
        const buscarProduto = await model.selectProdutoById(id)

        if (buscarProduto) {
            const apagarProd = await model.deleteProduto(id)

            if (apagarProd) {
                return { status: 200, message: MESSAGE_SUCESS.DELETE_ITEM }
            }
            else {
                return { status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB }
            }
        }
        else {
            return { status: 404, message: MESSAGE_ERROR.NOT_FOUND_DB }
        }
    }
}



const ExibirBebidas = async () => {

    const bebidas = await Bebidas.getAllBebidas()

    if (bebidas) {

        return { status: 201, message: bebidas }

    } else {

        return { status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB }

    }

}
const ExibirBebidaId = async (id) => {

    const ID = await Bebidas.getBebidaById(id)

    if (ID) {

        return { status: 201, message: ID }

    } else {

        return { status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB }

    }

}
const ExibirPizzas = async () => {

    const pizzas = await Pizza.getPizza()

    if (pizzas) {

        return { status: 201, message: pizzas }

    } else {

        return { status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB }

    }

}

const ExibirPizzaId = async (id) => {

    const ID = await Pizza.getPizzasById(id)

    if (ID) {

        return { status: 201, message: ID }

    } else {

        return { status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB }

    }

}
const ExibirProdutos = async () => {

    const produtos = await model.getallProdutos()
    

    if (produtos) {

        return { status: 201, message: produtos }

    } else {

        return { status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB }

    }

}







module.exports = {

    novoProduto,
    atualizarProduto,
    excluirProduto,
    ExibirBebidas,
    ExibirBebidaId,
    ExibirPizzaId,
    ExibirPizzas,
    ExibirProdutos


}