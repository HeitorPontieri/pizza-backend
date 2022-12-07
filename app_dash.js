/*

//////////////// DOCUMENTAÇÃO \\\\\\\\\\\\\\\\\\\\\
Objetivo : API responsável pela manipulação de dados do back-End
    (GET, POST , PUT, DELETE)
Autor : HeitorPontieri & LusCamilo
Data_criação : 05/12/2022
Versão : 1.0

*/

const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const { application } = require('express')
const { json } = require('body-parser')

const button = require('./controller/controllerBotoes.js')
const colab = require('./controller/controllerColaboradores.js')
const formulario = require('./controller/controllerFormulario.js')
const ingrediente = require('./controller/controllerIngredientes.js')
const hora = require('./controller/controllerHorario_de_funcionamento.js')
const servico = require('./controller/controllerServicos.js')
const produto = require('./controller/controllerProduto.js')
const { MESSAGE_ERROR, MESSAGE_SUCESS } = require('./modulo/config.js')

const app = express()

app.use((request, response, next) => {

    response.header('Acess-Control-Allow-Origin', '*')
    response.header('Acess-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    app.use(cors())
    next()

})

const jsonParser = bodyParser.json()


// Adicionar um novo colaborador
app.post('/v1/colaborador', cors(), jsonParser, async function (request, response) {

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
app.get('/v1/colaborador/:nome_usuario/:senha', cors(), async function (request, response) {
    
    let statusCode
    let message
    let nome_usuario = request.params.nome_usuario
    let senha = request.params.senha
    
    dados = {}
    
    
    dados.nome_usuario = nome_usuario
    dados.senha = senha
    
    
    if (dados != '' && dados != undefined) {
        const dadosColab = await colab.listarColaborador(dados)
        
        
        if (dadosColab) {
            statusCode = 200
            message = dadosColab
        }
        else {
            statusCode = 404
            message = MESSAGE_ERROR.NOT_FOUND_DB
        }
    }
    else {
        statusCode = 400
        message = MESSAGE_ERROR.REQUIRED_FIELDS
    }
    
    response.status(statusCode)
    response.json(message)
    
})
app.get('/v1/bebidas/:id', cors(), async function (request, response) {

    let statusCode
    let message

    let id = request.params.id
   

    if (id != '' && id != undefined) {

        const trazerBebidaId = await produto.ExibirBebidaId(id)

        if (trazerBebidaId) {

            statusCode = trazerBebidaId.status
            message = trazerBebidaId.message

        }
        else {
            statusCode = 404
            message = MESSAGE_ERROR.NOT_FOUND_DB
        }

    } else {

        statusCode = 400
        message = MESSAGE_ERROR.REQUIRED_FIELDS

    }

    response.status(statusCode)
    response.json(message)


})
app.get('/v1/pizzas/:id', cors(), async function (request, response) {

    let statusCode
    let message

    let id = request.params.id
   

    if (id != '' && id != undefined) {

        const trazerPizzaId = await produto.ExibirPizzaId(id)
        console.log(trazerPizzaId);

        if (trazerPizzaId) {

            statusCode = trazerPizzaId.status
            message = trazerPizzaId.message

        }
        else {
            statusCode = 404
            message = MESSAGE_ERROR.NOT_FOUND_DB
        }

    } else {

        statusCode = 400
        message = MESSAGE_ERROR.REQUIRED_FIELDS

    }

    response.status(statusCode)
    response.json(message)

})


// Adiciona um novo produto
app.post('/v1/produto', cors(), jsonParser, async function (request, response) {

    let statusCode
    let message
    let headerContentType

    headerContentType = request.headers['content-type']

    if (headerContentType == 'application/json') {

        let dadosBody = request.body

        if (JSON.stringify(dadosBody) != '{}') {

            const controllerProd = await produto.novoProduto(dadosBody)


            statusCode = controllerProd.status
            message = controllerProd.message

        } else {

            statusCode = 404
            message = MESSAGE_ERROR.EMPTY_BODY

        }

    } else {

        statusCode = 415
        message = MESSAGE_ERROR.CONTENT_TYPE

    }
    response.status(statusCode)
    response.json(message)

})

// Adicionar um novo botão
app.post('/v1/botoes/adicionar', cors(), jsonParser, async function (request, response) {

    let statusCode
    let message
    let headerContentType

    //recebe o tipo de content-type que foi enviado no header da aquisicao  
    headerContentType = request.headers['content-type']


    if (headerContentType == 'application/json') {


        let dadosBody = request.body

        if (JSON.stringify(dadosBody) != '{}') {

            const novobutton = await button.novoBotao(dadosBody)

            statusCode = novobutton.status
            message = novobutton.message

        } else {

            statusCode = 404
            message = MESSAGE_ERROR.EMPTY_BODY

        }

    } else {

        statusCode = 415
        message = MESSAGE_ERROR.CONTENT_TYPE

    }

    response.status(statusCode)
    response.json(message)

})
// Retorna um novo produto
app.get('/v1/botoes', cors(), async function (request, response) {

    let statusCode
    let message

    const trazerbutton = await button.trazerBotao()

    if (trazerbutton) {

        statusCode = 200
        message = trazerbutton
    }
    else {

        statusCode = 400
        message = MESSAGE_ERROR.NOT_FOUND_DB
    }

    response.status(statusCode)
    response.json(message)
})

// Adiciona um novo horario
app.post('/v1/horario/adicionar', cors(), jsonParser, async function (request, response) {

    let statusCode
    let message
    let headerContentType

    //recebe o tipo de content-type que foi enviado no header da aquisicao  
    headerContentType = request.headers['content-type']


    if (headerContentType == 'application/json') {


        let dadosBody = request.body

        if (JSON.stringify(dadosBody) != '{}') {

            const novoHour = await hora.novaHora(dadosBody)

            statusCode = novoHour.status
            message = novoHour.message

        } else {

            statusCode = 404
            message = MESSAGE_ERROR.EMPTY_BODY

        }

    } else {

        statusCode = 415
        message = MESSAGE_ERROR.CONTENT_TYPE

    }

    response.status(statusCode)
    response.json(message)

})
// Adicionar um serviço
app.post('/v1/servico/adicionar', cors(), jsonParser, async function (request, response) {

    let statusCode
    let message
    let headerContentType

    //recebe o tipo de content-type que foi enviado no header da aquisicao  
    headerContentType = request.headers['content-type']


    if (headerContentType == 'application/json') {


        let dadosBody = request.body

        if (JSON.stringify(dadosBody) != '{}') {

            const novoServico = await servico.novoServico(dadosBody)

            statusCode = novoServico.status
            message = novoServico.message

        } else {

            statusCode = 404
            message = MESSAGE_ERROR.EMPTY_BODY

        }

    } else {

        statusCode = 415
        message = MESSAGE_ERROR.CONTENT_TYPE

    }

    response.status(statusCode)
    response.json(message)

})
// Adicionar um serviço
app.post('/v1/ingrediente', cors(), jsonParser, async function (request, response) {

    let statusCode
    let message
    let headerContentType

    //recebe o tipo de content-type que foi enviado no header da aquisicao  
    headerContentType = request.headers['content-type']

    if (headerContentType == 'application/json') {
        let dadosBody = request.body

        if (JSON.stringify(dadosBody) != '{}') {
            const novoIngr = await ingrediente.novosIngredientes(dadosBody)

            statusCode = novoIngr.status
            message = novoIngr.message
        } 
        else {
            statusCode = 404
            message = MESSAGE_ERROR.EMPTY_BODY
        }
    } else {
        statusCode = 415
        message = MESSAGE_ERROR.CONTENT_TYPE
    }

    response.status(statusCode)
    response.json(message)

})

app.listen(8080, function () {

    console.log('Servidor aguardando requisições')

}) 