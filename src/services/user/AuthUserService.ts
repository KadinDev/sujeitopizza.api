import prismaClient from '../../prisma'
import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken' // para criar tokens

interface AuthRequestUser {
    email: string;
    password: string;
}

class AuthUserService {
    async loginUser( {email, password} : AuthRequestUser ){
        // verificar se o email existe
        const user = await prismaClient.user.findFirst({
            where: {
                email: email
            }
        })

        if(!user) {
            throw new Error("Usuário incorreto!")
        }

        // verificar se a senha está correta
        // password = a info que estou mandando pelo body
        // user.password = minha senha cadastrada no banco de dados
        const checkPassword = await compare(password, user.password)

        if (!checkPassword){
            throw new Error("Senha está incorreta!")
        }

        // gerar um token JWT e devolver os dados do usuário como id, name, email
        // token gerado com base no nome e email
        // toda vez que o user fizer login, vai gerar um novo token para ele
        const token = sign(
            {
                name: user.name,
                email: user.email
            },
            
            //variavel de ambiente que fiz em .env na raiz do projeto
            /* no tsconfig.json, você deixa o strict como false "strict": false,  
            para o process.env.JWT_SECRET não da erro
            */
            process.env.JWT_SECRET,
            {
                subject: user.id,
                expiresIn: '30d' //quando vai expirar esse token
            }
        )
        
        return {
            id: user.id,
            name: user.name,
            email: user.email,
            token
        }
    }
}

export { AuthUserService }