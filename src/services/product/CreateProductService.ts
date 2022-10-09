import prismaClient from "../../prisma"

interface ProductRequest {
    name: string;
    price: string;
    description: string;
    banner: string;
    category_id: string;
}

class CreateProductService {
    async execute( {name, price, description, banner, category_id} : ProductRequest ){

        const createProduct = await prismaClient.product.create({
            data: {
                name,
                price,
                description,
                banner,
                category_id
            }
        })

<<<<<<< HEAD
        return createProduct
=======
        return createProduct 
>>>>>>> 0e9baa5f55b409ee5a029d10b8269b0f75908c77
    }
}

export { CreateProductService }
