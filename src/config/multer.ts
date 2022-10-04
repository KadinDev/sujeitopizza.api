import crypto from 'crypto' // esse já vem com o Node
import {extname, resolve} from 'path' // esse tbm já vem com o Node

import multer from 'multer'

export default {
    upload( folder: string ){ //tipando a informação de onde que quero salvar as imagens

        return {
            storage: multer.diskStorage({

                //__dirname, é o diretório que a gente tá(no caso aqui na pasta config)
                // ae vc informa para onde quer mandar as imagens
                destination: resolve(__dirname, '..', '..', folder ), // a que tipei
                
                // criando nome único para minha imagem
                filename: ( request, file, callback ) => {
                    const fileMash = crypto.randomBytes(16).toString("hex")
                    const fileName = `${fileMash}-${file.originalname}`

                    // 1° params é error(eu deixo como null pois não quero tratar)
                    return callback(null, fileName)
                }
            })
        }

    }
}