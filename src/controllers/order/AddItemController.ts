import { Request, Response } from 'express'
import { AddItemService } from '../../services/order/AddItemService'

class AddItemController{
    async handle( req: Request, res: Response){
        // lembrar que esse order_id é o ID da mesa.
        // o número da mesa que está abrindo o pedido
        const { order_id, product_id, amount } = req.body
        
        const addItem = new AddItemService()

        const order = await addItem.execute({
            order_id,
            product_id,
            amount
        })

        return res.json(order)
    }
}

export { AddItemController }