import prismaClient from "../../prisma"

interface OrderRequest {
    order_id: string
}

class FinishedOrderService {
    async execute( {order_id} : OrderRequest ){
        const order = await prismaClient.order.update({
            // onde o ID for igual ao order_id
            where: {
                id: order_id
            },
            // aqui escolho o que eu quero atualizar no DB
            data: {
                status: true
            }
        })

        return order
    }
}

export { FinishedOrderService }
