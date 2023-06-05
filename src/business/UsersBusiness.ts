import { UsersDataBase } from "../database/UsersDataBase";
import { GetUsersInputDTO, GetUsersOutputDTO } from "../dtos/users/getUsers.dto";
import { loginInputDTO, loginOuntputDTO } from "../dtos/users/login.dto";
import { signupInputDTO, signupOuntputDTO } from "../dtos/users/signup.dto";
import { BadRequestError } from "../errors/BadRequestError";
import { NotFoundError } from "../errors/NotFoundError";
import { TokenPayload, USER_ROLES, Users } from "../models/Users";
import { HashManager } from "../services/HashManager";
import { TokenManager} from "../services/TokenManager";
import { IdGenerator } from "../services/idGenerator";

export class UsersBusiness{
    constructor(
        private usersDataBase: UsersDataBase,
        private tokenManager: TokenManager,
        private idGenerator: IdGenerator, 
        private hashManager: HashManager
    ){}

    public getUsers = async (
      input: GetUsersInputDTO
    ): Promise<GetUsersOutputDTO> => {
      const { q, token } = input
  
      const payload= this.tokenManager.getPayload(token)
  
      if (payload === null) {
        throw new BadRequestError("token inválido")
    }
  
    if (payload.role !== USER_ROLES.ADMIN) {
      throw new BadRequestError("somente admins podem acessar esse recurso")
    }
  
      const usersDB = await this.usersDataBase.findUsersById(q)
  
      const users = usersDB.map((userDB) => {
        const user = new Users(
          userDB.id,
          userDB.name,
          userDB.email,
          userDB.password,
          userDB.role,
          userDB.created_at
        )
  
        return user.toBusinessModel()
      })
  
      const output: GetUsersOutputDTO = users
  
      return output
    }

    public signup =async(input:signupInputDTO):Promise<signupOuntputDTO>=>{
        const {name, email, password}= input

        console.log(email)

      const userDBExist= await this.usersDataBase.findByEmail(email);
        if (userDBExist) {
            throw new BadRequestError("'email' já existe")
          }

          const id= this.idGenerator.generate()

        	const hashedPassword = await this.hashManager.hash(password)

          const newUser = new Users(
          id,
          name,
          email,
          hashedPassword,
          USER_ROLES.NORMAL,
          new Date().toISOString()
       
          );

          const newUsers= newUser.toDBModel()
          await this.usersDataBase.insertUser(newUsers)

          const payload: TokenPayload= {
            id:newUser.getId(),
            name:newUser.getName(),
            role:newUser.getRole(),
          
          }

          const token= this.tokenManager.createToken(payload)


          const output : signupOuntputDTO={
            token
          }

          return output



    }

    public login=async(input: loginInputDTO): Promise<loginOuntputDTO>=>{
      const {email, password}= input

      const userDB= await this.usersDataBase.findByEmail(email)

      if(!userDB){
        throw new BadRequestError("'email' e/ou 'senha' invalidos")
      }


  const user= new Users(
    userDB.id,
    userDB.name,
    userDB.email,
    userDB.password,
    userDB.role,
    userDB.created_at
  )

  const hashedPassword= user.getPassoword()
  const isPasswordCorret= await this.hashManager.compare(password,hashedPassword)

  if (!isPasswordCorret) {
    throw new BadRequestError("'email' e/ou 'senha' invalidos")
  }

  const playload: TokenPayload={
    id: user.getId(),
    name: user.getName(),
    role:user.getRole()
  }

  const token= this.tokenManager.createToken(playload)

  const output: loginOuntputDTO={
    token
  }

  return output

    }


}