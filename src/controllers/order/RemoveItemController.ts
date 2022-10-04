import { Request, Response } from 'express'
import { RemoveItemService } from '../../services/order/RemoveItemService'

class RemoveItemController{
    async handle( req: Request, res: Response){
        // lembrar que esse order_id é o ID da mesa.
        // o número da mesa que está abrindo o pedido
        const item_id = req.query.item_id as string
        
        const removeItem = new RemoveItemService()

        const order = await removeItem.execute({
            item_id
        })

        return res.json(order)
    }
}

export { RemoveItemController }