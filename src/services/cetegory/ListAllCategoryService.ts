import prismaClient from "../../prisma"

class ListAllCategoryService{
    async execute(){
        // findMany para pegar todas as categorias
        const category = await prismaClient.category.findMany({ 
            select: {
                id: true,
                name: true
            }
        })
        
        return category
    }
}

export { ListAllCategoryService }
