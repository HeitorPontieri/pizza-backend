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
const { MESSAGE_ERROR, MESSAGE_SUCESS } = require('./modulo/config.js')
const { response } = require('express')

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

app.listen(8080, function () {
    console.log('Servidor aguardando requisições')
}) 