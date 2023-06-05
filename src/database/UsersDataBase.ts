import { UserDB } from "../models/Users";
import { BaseDataBase } from "./BaseDatabase";

export class UsersDataBase extends BaseDataBase{
    public static TABLE_USERS= "users";

    public async findUsersById(id:string ){
        const result: UserDB[] | undefined= await BaseDataBase.connection(UsersDataBase.TABLE_USERS).where({id});
        return result
    }

    public async insertUser(newUser: UserDB):Promise<void>{
        await BaseDataBase.connection(UsersDataBase.TABLE_USERS).insert(newUser)
    }

    public async findByEmail(email:string):Promise<UserDB | undefined>{
        const [result]: UserDB[] | undefined[]= await BaseDataBase.connection(UsersDataBase.TABLE_USERS).select().where({email})
        return result
    }

   
}