import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { TokenPayload } from '../models/Users'

dotenv.config()

export class TokenManager {

		
    public createToken = (payload: TokenPayload): string => {
        const token = jwt.sign(
            payload,
            process.env.JWT_KEY as string,
            {
                expiresIn: process.env.JWT_EXPIRES_IN
            }
        )

        return token
    }

		
    public getPayload = (token: string): TokenPayload | null => {
        try {
            const payload = jwt.verify(
                token,
                process.env.JWT_KEY as string
            )

            return payload as TokenPayload
        
				// se a validação falhar, um erro é disparado pelo jsonwebtoken
				// nós pegamos o erro aqui e retornamos null para a Business saber que falhou
				} catch (error) {
            return null
        }
    }
}