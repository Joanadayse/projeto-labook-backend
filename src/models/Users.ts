export enum USER_ROLES {
    NORMAL = "NORMAL",
    ADMIN = "ADMIN"
  }

  export interface TokenPayload {
    id: string,
    name: string,
    role: USER_ROLES
}
//   para o banco de dados
  export interface UserDB {
    id: string,
    name: string,
    email: string,
    password: string,
    role: USER_ROLES,
    created_at: string
  }
  
  // é o modelo de User que o front receberá (sem password e createdAt camelCase)
//   para business -front 
  export interface UserModel {
    id: string,
    name: string,
    email: string,
    role: USER_ROLES,
    createdAt: string
  }

export class Users{
    constructor(
        private id : string,
        private name: string,
        private email: string,
        private password: string,
        private role: USER_ROLES,
        private createdAt: string
    ){}

    public getId(): string{
        return this.id
    }

    public setId(value:string):void{
        this.id= value

    }
    public getName(): string{
        return this.name
    }

    public setName(value:string):void{
        this.name= value

    }
    public getEmail(): string{
        return this.email
    }

    public setEmail(value:string):void{
        this.email= value

    }
    public getPassoword(): string{
        return this.password
    }

    public setPassoword(value:string):void{
        this.password= value

    }
    public getRole(): USER_ROLES{
        return this.role
    }

    public setRole(value:USER_ROLES):void{
        this.role= value

    }
    public getCreateAt(): string{
        return this.createdAt
    }

    public setCreateAt(value:string):void{
        this.createdAt= value

    }

// apartir dos atributos da classe gerar um UserDB
    public toDBModel(): UserDB {
        return {
            id: this.id,
            name: this.name,
            email: this.email,
            password: this.password,
            role: this.role,
            created_at: this.createdAt
        }
    }
// apartir dos atributos da classe gerar um UserModel
// para facilitar nossa vida, temos o método que gera um UserModel
    public toBusinessModel(): UserModel {
        return {
            id: this.id,
            name: this.name,
            email: this.email,
            role: this.role,
            createdAt: this.createdAt
        }
    }
}