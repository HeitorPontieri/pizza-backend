/*
//////////////// DOCUMENTAÇÃO \\\\\\\\\\\\\\\\\\\\\
Objetivo : Arquivo responsável pela manipulação de recebimento, tratamento e retorno de dados
entre a API e a model
Autor : HeitorPontieri
Data_criação : 28/11/2022
Versão : 1.0
*/
const dao = require('../model/dao/horario_de_funcionamento.js')
const { MESSAGE_ERROR, MESSAGE_SUCESS } = require('../modulo/config.js')

const novaHora = async (dados) =>{
    if(dados.abertura == '' || dados.abertura == undefined || dados.fechamento == ''|| dados.fechamento == undefined){
        return { status: 400, message: MESSAGE_ERROR.REQUIRED_FIELDS }
    }
    else{
        const novaHour = await dao.insertHour(dados)

        if(novaHour){
            return{status:201,message:MESSAGE_SUCESS.INSERT_ITEM}
        }
        else{
            return{status:500,message:MESSAGE_ERROR.INTERNAL_ERROR_DB}
        }
    }
}



module.exports={
    novaHora
}