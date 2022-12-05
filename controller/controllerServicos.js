/*
//////////////// DOCUMENTAÇÃO \\\\\\\\\\\\\\\\\\\\\
Objetivo : Arquivo responsável pela manipulação de recebimento, tratamento e retorno de dados
entre a API e a model
Autor : HeitorPontieri
Data_criação : 28/11/2022
Versão : 1.0
*/

const dao = require('../model/dao/servicos.js')
const { MESSAGE_ERROR, MESSAGE_SUCESS } = require('../modulo/config.js')

const novoServico = async (dados) =>{
    if(dados.nome == '' || dados.nome == undefined){
        return { status: 400, message: MESSAGE_ERROR.REQUIRED_FIELDS }
    }
    else{
        const novoServico = await dao.insertService(dados)

        if(novoServico){
            return{status:201,message:MESSAGE_SUCESS.INSERT_ITEM}
        }
        else{
            return{status:500,message:MESSAGE_ERROR.INTERNAL_ERROR_DB}
        }
    }
}

module.exports={
    novoServico
}