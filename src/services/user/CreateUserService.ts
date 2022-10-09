import prismaClient from '../../prisma'
import { hash } from 'bcryptjs' // para criptografar senha

interface UserRequest {
    name: string;
    email: string;
    password: string;
}

class CreateUserService {
    // assim informa que precisa fornecer essas infos(name, email, password)
    async createUser( {name, email, password} : UserRequest ){
        if (!email){
            throw new Error("Email incorreto!")
        }
        // verificar se o email já existe
        const emailAlreadyExists = await prismaClient.user.findFirst({
            where: {
                email: email
            }
        })
        if(emailAlreadyExists){
            throw new Error("Já existe um usuário com o e-mail iformado!")
        }

        const passwordHash = await hash(password, 8) //o número da criptografia

        const user = await prismaClient.user.create({
            data: {
                name,
                email,
                password: passwordHash
            },
            select: { // informa o que eu quero devolver
                id: true,
                name: true,
                email: true,
                created_at: true,
                updated_at: true,
                // a senha não devolve, fica oculta
            }
        })

        return user
    }
}

export { CreateUserService }