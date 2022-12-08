
const dao = require('../model/dao/favoritos.js')
const { MESSAGE_ERROR, MESSAGE_SUCESS } = require('../modulo/config.js')


const ExibirFavoritos = async (status_favorito) =>{
    
   if(status_favorito == ''|| status_favorito == undefined){

    return{status:400,message:MESSAGE_ERROR.REQUIRED_FIELDS}

   }
    else{

        const favoritos = await dao.getFavoritos(status_favorito)
       
       
        if(favoritos){

          return {status:200,message:favoritos}

        }
        else{

            return{status:500,message:MESSAGE_ERROR.INTERNAL_ERROR_DB}

        }
    }
}

const atualizarFavorito = async (dados) =>{
 
    if(dados.id == '' || dados.id == undefined || dados.id == 0){
        return{status:400,message:MESSAGE_ERROR.REQUIRED_FIELDS}

    }   
    else{
        const att = dao.updateFavoritos(dados)

        if (att) {
            return { status: 200, message: MESSAGE_SUCESS.UPDATE_ITEM }
        }
        else {
            return { status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB }
        }
    }
}



module.exports={
    ExibirFavoritos,
    atualizarFavorito
}