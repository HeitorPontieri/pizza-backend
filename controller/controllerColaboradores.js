/*
//////////////// DOCUMENTAÇÃO \\\\\\\\\\\\\\\\\\\\\
Objetivo : Arquivo responsável pela manipulação de recebimento, tratamento e retorno de dados
entre a API e a model
Autor : HeitorPontieri
Data_criação : 28/11/2022
Versão : 1.0
*/

const dao = require('../model/dao/colaboradores.js')
const jwt = require('../middleware/jwt.js')

const { MESSAGE_ERROR, MESSAGE_SUCESS } = require('../modulo/config.js')

const novoColaborador = async function (dados) {

    if (dados.nome_usuario == '' || dados.nome_usuario == undefined || dados.senha == '' || dados.senha == undefined)
        return { status: 400, message: MESSAGE_ERROR.REQUIRED_FIELDS }

    else {
        const novoColab = await dao.insertColaborador(dados)

        if (novoColab) {
            return { status: 201, message: MESSAGE_SUCESS.INSERT_ITEM }
        }
        else {
            return { status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB }
        }
    }
}

const listarColaborador = async function (dados) {

    if (dados.nome_usuario == '' || dados.nome_usuario == undefined || dados.senha == '' || dados.senha == undefined)
        return { status: 400, message: MESSAGE_ERROR.REQUIRED_FIELDS }

    else {
        const listarColab = await dao.selectColaborador(dados)
    
        if (listarColab) {
            return listarColab
        }
        else {
            return { status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB }
        }

    }

}

const validarColaborador = async function(dados){
    
    if (dados.nome_usuario == '' || dados.nome_usuario == undefined || dados.senha == '' || dados.senha == undefined)
        return { status: 400, message: MESSAGE_ERROR.REQUIRED_FIELDS }

    else{
        const validacao = await dao.validateColaborador(dados)
        let tokenUser = await jwt.createJWT(validacao.id)
        validacao.token = tokenUser
        console.log(validacao);

        if (validacao) {
            return validacao.token
        }
        else {
            return { status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB }
        }

    }

}






module.exports = {
    novoColaborador,
    listarColaborador,
    validarColaborador
}