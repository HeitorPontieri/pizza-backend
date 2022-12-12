/*

//////////////// DOCUMENTAÇÃO \\\\\\\\\\\\\\\\\\\\\
Objetivo : API responsável pela manipulação de dados do back-End
    (GET, POST , PUT, DELETE)
Autor : HeitorPontieri & LusCamilo
Data_criação : 28/11/2022
Versão : 1.0

*/

const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const { application } = require('express')
const { json } = require('body-parser')



const button = require('./controller/controllerBotoes.js')
const servicos = require('./controller/controllerServicos.js')
const colab = require('./controller/controllerColaboradores.js')
const formulario = require('./controller/controllerFormulario.js')
const favoritos = require('./controller/ControllerFavoritos.js')
const produtos = require('./controller/controllerProduto.js')
const { MESSAGE_ERROR, MESSAGE_SUCESS } = require('./modulo/config.js')


const app = express()

app.use((request, response, next) => {

    response.header('Acess-Control-Allow-Origin', '*')
    response.header('Acess-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    app.use(cors())
    next()

})

const jsonParser = bodyParser.json()


// Adicionar um novo formulario
app.post('/v1/formulario', cors(), jsonParser, async function (request, response) {

    let statusCode
    let message
    let headerContentType

    //recebe o tipo de content-type que foi enviado no header da aquisicao  
    headerContentType = request.headers['content-type']

    //validar se content type é do tipo  

    if (headerContentType == 'application/json') {

        //recebe do corpo da mensagem conteudo
        let dadosBody = request.body

        if (JSON.stringify(dadosBody) != '{}') {

            const forms = require('./controller/controllerFormulario.js')
            //encaminha os dados do body
            const novoforms = await forms.novoFormulario(dadosBody)


            statusCode = novoforms.status
            message = novoforms.message

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
// Retornar os botoes da pagina inicial
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



// Traz todos os serviços já criados no banco
app.get('/v1/servicos', cors(), async function (request, response) {

    let statusCode
    let message

    const allServices = await servicos.ExibirServicos()

    if (allServices) {

        statusCode = 200
        message = allServices

    } else {

        statusCode = 400
        message = MESSAGE_ERROR.NOT_FOUND_DB

    }

    response.status(statusCode)
    response.json(message)

})

// Aumenta o valor do status_favorito
app.put('/v1/favorito/atualizar/:id', cors(), jsonParser, async function (request, response) {


    let statusCode
    let message
    let headerContentType

    headerContentType = request.headers['content-type']

    if (headerContentType == 'application/json') {

        let dadosBody = request.body

        if (JSON.stringify(dadosBody) != '{}') {

            let id = request.params.id

            if (id != '' && id != undefined) {

                dadosBody.id = id

                const fav = await favoritos.atualizarFavorito(dadosBody)

                statusCode = fav.status
                message = fav.message

            }
        }
        else {

            statusCode = 404
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

// Traz todas as pizzas
app.get('/v1/pizzas', cors(), async function (request, response) {

    let statusCode
    let message

    const trazerPizzas = await produtos.ExibirPizzas()

    if (trazerPizzas) {

        statusCode = trazerPizzas.status
        message = trazerPizzas.message
    }
    else {

        statusCode = 400
        message = MESSAGE_ERROR.NOT_FOUND_DB

    }

    response.status(statusCode)
    response.json(message)


})

// Traz todas as bebidas
app.get('/v1/bebidas', cors(), async function (request, response) {

    let statusCode
    let message

    const trazerBebidas = await produtos.ExibirBebidas()

    if (trazerBebidas) {

        statusCode = trazerBebidas.status
        message = trazerBebidas.message
    }
    else {

        statusCode = 400
        message = MESSAGE_ERROR.NOT_FOUND_DB

    }

    response.status(statusCode)
    response.json(message)


})
app.get('/v1/allprodutos', cors(), async function(request, response){

    let statusCode
    let message

    const trazerProdutos = await produtos.ExibirProdutos()

    if (trazerProdutos) {

        statusCode = trazerProdutos.status
        message = trazerProdutos.message
    }
    else {

        statusCode = 400
        message = MESSAGE_ERROR.NOT_FOUND_DB

    }

    response.status(statusCode)
    response.json(message)


})



app.listen(8080, function () {

    console.log('Servidor aguardando requisições')

}) 
