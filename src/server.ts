import express, { Request, Response, NextFunction } from 'express'
import 'express-async-errors' // essa lib sempre fica importada como 2°
import cors from 'cors'
import path from 'path'

import { router } from './routes'

const app = express()
app.use(express.json())
app.use(cors()) // passando assim, qualquer URL qualquer ip conseguir fazer requisição no meu back end

app.use(router)

app.use(
    '/files', // qual será a rota

    // criando rota estática, onde vou passar a rota(/files), com o nome da foto conforma informado abaixo 
    express.static(path.resolve(__dirname, '..', 'tmp'))
)

// todas as rotas passarão por esse 
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    
    if(err instanceof Error){
        // se for uma instancia do tipo error
        return res.status(400).json({
            error: err.message
        })
    }

    // esse 500 eu vi no insomnia quando testei o erro na rota 
    return res.status(500).json({
        status: 'error',
        message: 'Internal server error.'
    })

})

app.listen(process.env.PORT, () => console.log('server online!!'))