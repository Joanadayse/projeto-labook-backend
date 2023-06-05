export interface UsersDB{
    id: string,
    name:string,
    email:string,
    password: string,
    created_at: string

}

export interface UserDBPost {
    id: string,
    name: string,
    email: string,
    password: string
}


export interface PostsDB{
    id: string,
    creator_id: string,
    content: string,
    likes: number,
    dislikes: number,
    create_at: string,
    updated_at: string
}

export interface LikesDislikesDB{
    user_id: string,
    post_id: string,
    like: number
}