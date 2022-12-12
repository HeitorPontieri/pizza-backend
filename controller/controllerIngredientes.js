/*
//////////////// DOCUMENTAÇÃO \\\\\\\\\\\\\\\\\\\\\
Objetivo : Arquivo responsável pela manipulação de recebimento, tratamento e retorno de dados
entre a API e a model
Autor : HeitorPontieri
Data_criação : 28/11/2022
Versão : 1.0
*/

const dao  = require('../model/dao/ingredientes.js')
const pizza_ing = require('../model/dao/ingredientes_pizza.js')

const { MESSAGE_ERROR, MESSAGE_SUCESS } = require('../modulo/config.js')


const novosIngredientes = async function(dados){
    if(dados.ingrediente_principal == '' || dados.ingrediente_principal == undefined || dados.acompanhamentos == '' || dados.acompanhamentos == undefined){
        return{status:400,message:MESSAGE_ERROR.REQUIRED_FIELDS}
    }
    else{
        const novosIng = await dao.insertIngred(dados)
        const resultPizza_Ingred = await pizza_ing.insertPizzaIngrediente()
        
        if(novosIng && resultPizza_Ingred){
            
            return{status:201,message:MESSAGE_SUCESS.INSERT_ITEM}
        }
        else{
            return{status:500,message:MESSAGE_ERROR.INTERNAL_ERROR_DB}
        }
    }

}



module.exports={
    novosIngredientes
}