/*
//////////////// DOCUMENTAÇÃO \\\\\\\\\\\\\\\\\\\\\
Objetivo : Arquivo responsável pela manipulação de recebimento, tratamento e retorno de dados
entre a API e a model
Autor : HeitorPontieri
Data_criação : 28/11/2022
Versão : 1.0
*/

const dao  = require('../model/dao/formulario.js')

const { MESSAGE_ERROR, MESSAGE_SUCESS } = require('../modulo/config.js')

const novoFormulario = async function(dados){

    if(dados.nome == ''|| dados.nome == undefined || dados.email == ''|| dados.email == undefined || dados.telefone == ''|| dados.telefone == undefined || dados.celular == ''|| dados.celular == undefined || dados.criticas_sugestoes == ''|| dados.criticas_sugestoes == undefined)

        return{status:400,message:MESSAGE_ERROR.REQUIRED_FIELDS}

    else{

        const novoForm = await dao.insertForm(dados)

        if(novoForm){

            return{status:201,message:MESSAGE_SUCESS.INSERT_ITEM}

        }
        else{

            return{status:500,message:MESSAGE_ERROR.INTERNAL_ERROR_DB}

        }
    }
}

module.exports={
    novoFormulario
}