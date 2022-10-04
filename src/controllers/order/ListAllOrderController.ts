import {Request, Response} from 'express'
import { ListOrdersService } from '../../services/order/ListOrdersService'

class ListAllOrderController {
    async handle( req: Request, res: Response ){
        const selectAllOrders = new ListOrdersService()

        const orders = await selectAllOrders.execute()

        return res.json(orders)
    }
}

export { ListAllOrderController }