"use strict";
// ESSE MIDDLEWARE VAMOS USAR PARA TODAS AS ROTAS ONDE EU QUERO QUE O USER
// ESTEJA LOGADO PARA PODER TER ACESSO A ELAS
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthenticated = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
function isAuthenticated(req, res, next) {
    // Receber o token do usuário logado
    // o token vem dentro de req.headers.authorization 
    const authToken = req.headers.authorization;
    if (!authToken) { // se não veio o token
        return res.status(401).end();
    }
    /* o token vem duas info, uma info vem antes do token. passando assim: [, token]
    estou informando que quero somente a segunda info que é o token, e chamo ela de token.
    utilizando o split do javascript para pegar o que tem entre espaço */
    const [, token] = authToken.split(" "); // assim pego somente o TOKEN
    try {
        // validar esse TOKEN
        const { sub } = (0, jsonwebtoken_1.verify)(// sub = onde tenho o ID do usuário
        token, process.env.JWT_SECRET // a que criei no .env
        ); // vai devolver o tipo PayLoad, interface que criei
        // recuperar o id do token e colocar dentro de uma variavel user_id
        // dentro do request. foi criado uma tipagem no @types para funcionar
        req.user_id = sub;
        return next(); // processeguir
    }
    catch (error) {
        return res.status(401).end();
    }
}
exports.isAuthenticated = isAuthenticated;
