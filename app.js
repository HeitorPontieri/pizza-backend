/*

//////////////// DOCUMENTAÇÃO \\\\\\\\\\\\\\\\\\\\\
Objetivo : API responsável pela manipulação de dados do back-End
    (GET, POST , PUT, DELETE)
Autor : HeitorPontieri & LusCamilo
Data_criação : 28/11/2022
Versão : 1.0

*/


const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const { json } = require('body-parser')
const colab = require('./controller/controllerColaboradores.js')
const produtos = require('./controller/controllerProduto.js')
const { MESSAGE_ERROR, MESSAGE_SUCESS } = require('./modulo/config.js')
const {response} = require('express')

const app = express()

app.use((request, response, next) => {
    response.header('Acess-Control-Allow-Origin', '*')
    response.header('Acess-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    app.use(cors())
    next()
})

const jsonParser = bodyParser.json()

// Adicionar um novo colaborador
app.post('/v1/colaborador', cors(), jsonParser, async function (request, response){

    let statusCode
    let message
    let headerContentType

    headerContentType = request.headers['content-type']

    if (headerContentType == 'application/json') {
        let dadosBody = request.body
        if (JSON.stringify(dadosBody) != '{}') {
            const novoColab = await colab.novoColaborador(dadosBody)
            statusCode = novoColab.status
            message = novoColab.message
        }
        else {
            statusCode = 400
            message = MESSAGE_ERROR.EMPTY_BODY
        }
    }
    else {
        statusCode = 415
        message = MESSAGE_ERROR.CONTENT_TYPE
    }

    response.status(statusCode)
    response.json(message)

})
// Retorna o colaborador 
app.get('/v1/colaborador/login', cors(), async function(request,response){

    let statusCode
    let message
    

    let dados = request.body

    if(JSON.stringify(dados) != '{}'){
        const dadosColab = await colab.listarColaborador(dados)

        if(dadosColab){
            statusCode = 200
            message = dadosColab
        }
        else{
            statusCode = 404
            message = MESSAGE_ERROR.NOT_FOUND_DB
        }
    }
    else{
        statusCode = 400
        message = MESSAGE_ERROR.REQUIRED_FIELDS
    }

    response.status(statusCode)
    response.json(message)
 
})
app.post('/v1/produto'), cors(), async function (request, response) {

    let statusCode
    let message
    let headerContentType = request.headers['content-type']

    if (headerContentType == 'application/json') {
        
        let dadosBody = request.body

        if (JSON.stringify(dadosBody)!= '{}') {
            
            const ControllerProduto = await produtos.novoProduto(dadosBody)

            statusCode = ControllerProduto.status
            message = ControllerProduto.message

        }else {

            statusCode = 404
            message = MESSAGE_ERROR.EMPTY_BODY

        }

    } else {

        statusCode = 415
        message = MESSAGE_ERROR.CONTENT_TYPE

    }
    
}

app.listen(8080, function () {
    console.log('Servidor aguardando requisições')
}) 