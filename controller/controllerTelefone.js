/*
//////////////// DOCUMENTAÇÃO \\\\\\\\\\\\\\\\\\\\\
Objetivo : Arquivo responsável pela manipulação de recebimento, tratamento e retorno de dados
entre a API e a model
Autor : HeitorPontieri
Data_criação : 28/11/2022
Versão : 1.0
*/

const {MESSAGE_ERROR, MESSAGE_SUCCESS} = require('../modulo/config.js')

const novoTelefone = async (dados) => {

    if (dados.ddd == '' || dados.ddd == undefined || dados.numero == undefined|| dados.numero == '') {
        
        return {status: 400, message: MESSAGE_ERROR.REQUIRED_FIELDS}

    } else{

        const novotelefone = require('../model/DAO/telefone.js')

        const resultNovotelefone = await novotelefone.insertTelefone(dados)
        
        if (resultNovotelefone) {
            
            return { status: 201, message: MESSAGE_SUCCESS.INSERT_ITEM}

        }else{

            return {status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB}

        }

    }
        
}

module.exports = {

    novoTelefone

}