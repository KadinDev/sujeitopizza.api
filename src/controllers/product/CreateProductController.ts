import { Request, Response } from 'express'

import { CreateProductService } from '../../services/product/CreateProductService'

class CreateProductController{
    async handle(req: Request, res: Response){

        const {
            name,
            price,
            description,
            category_id
        } = req.body

        const createProductService = new CreateProductService()

        // esse file é o nome que dei para informar que irei receber a foto por ele
        // configurado em routes.ts
        if(!req.file){
            throw new Error("error upload file")
        } else {
            // assim renomeio o nome da imagem para banner
            const { originalname, filename: banner } = req.file

            const product = await createProductService.execute({
                name,
                price,
                description,
                category_id,
                banner
            })

            return res.json(product)
        }
    }
}

export { CreateProductController }