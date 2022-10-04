// listando produtos por categoria

import prismaClient from "../../prisma"

interface ProductRequest {
    category_id: string;
}

class ListByCategoryService {
    async execute( {category_id} : ProductRequest ){
        // id da categoria 
        const findByCategory = await prismaClient.product.findMany({
            // busca todos os produtos onde o category_id é igual ao
            // category_id mandado pelo parâmetro
            where: {
                category_id: category_id
            }            
        })

        return findByCategory
    }
}
export { ListByCategoryService }