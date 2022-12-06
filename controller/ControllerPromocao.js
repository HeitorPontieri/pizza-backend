
const dao = require('../model/dao/promocao.js')
const { MESSAGE_ERROR, MESSAGE_SUCESS } = require('../modulo/config.js')


const ExibirPromocao = async (status_promocao) =>{
    
    if(status_promocao){
        const promocao = await dao.getPromocao(status_promocao)

        if(promocao){
            return{status:201,message:MESSAGE_SUCESS.INSERT_ITEM}
        }
        else{
            return{status:500,message:MESSAGE_ERROR.INTERNAL_ERROR_DB}
        }
    }
}

module.exports={
    ExibirPromocao
}