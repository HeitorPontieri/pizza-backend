
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

module.exports={
    ExibirFavoritos
}