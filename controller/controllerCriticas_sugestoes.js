/*
//////////////// DOCUMENTAÇÃO \\\\\\\\\\\\\\\\\\\\\
Objetivo : Arquivo responsável pela manipulação de recebimento, tratamento e retorno de dados
entre a API e a model
Autor : HeitorPontieri
Data_criação : 28/11/2022
Versão : 1.0
*/

const {MESSAGE_ERROR, MESSAGE_SUCCESS} = require('../modulo/config.js')

const novaCritica = async (dados) => {

    if (dados.critica == '' || dados.critica == undefined) {
        
        return {status: 400, message: MESSAGE_ERROR.REQUIRED_FIELDS}

    } else{

        const novaCritica = require('../model/DAO/criticas_sugestoes.js')

        const resultNovaCritica = await novaCritica.insertCritica(dados)
        
        if (resultNovaCritica) {
            
            return { status: 201, message: MESSAGE_SUCCESS.INSERT_ITEM}

        }else{

            return {status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB}

        }

    }
        
}

module.exports = {

    novaCritica

}
