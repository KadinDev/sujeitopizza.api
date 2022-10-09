import prismaClient from "../../prisma"

interface DetailOrder {
    order_id: string
}

// Para pegar todas as informações que tem em um Pedido
class DetailsOrderService {
    async execute( {order_id} : DetailOrder ){
        const orderDetail = await prismaClient.item.findMany({
            where: {
                order_id: order_id
            },

            // para incluir nessa resposta
            include: {
                product: true, // incluir os detalhes do produto
                order: true, // incluir os detalhes do pedido
            }
        })

        return orderDetail
    }
}

export { DetailsOrderService }