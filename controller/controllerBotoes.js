/*
//////////////// DOCUMENTAÇÃO \\\\\\\\\\\\\\\\\\\\\
Objetivo : Arquivo responsável pela manipulação de recebimento, tratamento e retorno de dados
entre a API e a model
Autor : HeitorPontieri
Data_criação : 28/11/2022
Versão : 1.0
*/

const dao = require('../model/dao/botoes.js')

const { MESSAGE_ERROR, MESSAGE_SUCESS } = require('../modulo/config.js')

const novoBotao = async function (dados) {
    if (dados.nome == '' || dados.nome == undefined || dados.img == '' || dados.img == undefined) {
        return { status: 400, message: MESSAGE_ERROR.REQUIRED_FIELDS }
    }
    else{
        const novoBotao = await dao.insertButtons(dados)

        if(novoBotao){
            return{status:201,message:MESSAGE_SUCESS.INSERT_ITEM}
        }
        else{
            return{status:500,message:MESSAGE_ERROR.INTERNAL_ERROR_DB}
        }
    }

}
const trazerBotao = async function(){
    const getButton = await dao.getButtons()

    if(getButton){
        return getButton
    }
    else{
        return{status:500,message:MESSAGE_ERROR.INTERNAL_ERROR_DB}
    }

    
   
}   

module.exports={
    novoBotao,
    trazerBotao
}