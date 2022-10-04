import prismaClient from "../../prisma"

class DetailUserService{
    async detailUser( user_id: string ){

        // buscar no banco o id do usuário
        const user = await prismaClient.user.findFirst({
            where: {
                id: user_id
            },
            select: {
                id: true,
                name: true,
                email: true
            }
        })

        return user
    }
}

export { DetailUserService }