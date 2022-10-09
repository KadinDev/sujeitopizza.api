import prismaClient from "../../prisma"

interface ItemRequest {
    // lembrar que esse order_id é o ID da mesa.
    // o número da mesa que está abrindo o pedido
    order_id: string;
    product_id: string;
    amount: number;
}

class AddItemService {
    async execute( {order_id, product_id, amount} : ItemRequest ){
        const order = await prismaClient.item.create({
            data: {
                order_id,
                product_id,
                amount
            }
        })

        return order
    }
}

export { AddItemService }