/*
//////////////// DOCUMENTAÇÃO \\\\\\\\\\\\\\\\\\\\\
Objetivo : Implementacao do JWT no projeto
Autor : HeitorPontieri
Data_criação : 12/12/2022
Versão : 1.0

*/

// Import da biblioteca
const jwt = require('jsonwebtoken')
// Chave secreta para criacao do JWT
const SECRET = 'a1b2c3'
// Tempo para validar o token do JWT (é em segundos)
const EXPIRES = 120


const createJWT = async function(payLoad){

    // Gera o token
        // payLoad - a identificacao do usuario autenticado
        // SECRET - a chave secreta 
        // expiresIn - tempo de expiracao do token
    const token = jwt.sign({userID : payLoad}, SECRET,{expiresIn : EXPIRES})
    
    return token

}

const validateJWT = async function(token){
   let status

    // Valida a autenticidade do token
    jwt.verify(token,SECRET,async function(err,decode){
        if(err){
            status = false
        }
        else{
            status = true
        }
        
    })
    return status
    
}

module.exports={
    createJWT,
    validateJWT
}