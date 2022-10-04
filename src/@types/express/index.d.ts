/* Criando minha própria tipagem, estou adicionando uma nova tipagem no meu Request,
informando que além de ter o req, ele terá tbm um user_id */

// agora muda no tsconfig.json deixando assim:
/*
    "types": [
        "./src/@types"
    ],
*/

declare namespace Express{
    export interface Request{
        user_id: string;
    }
}