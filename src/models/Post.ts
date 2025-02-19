export interface PostDB{
    id: string,
    creator_id:string
    content: string,
    likes: number,
    dislikes:number,
    create_at:string,
    updated_at:string
    
}

export interface PostDBWithCreatorName{
    id: string,
    creator_id:string
    content: string,
    likes: number,
    dislikes:number,
    created_at:string,
    update_at:string,
    creator_name:string
}

export enum POST_LIKE{
    ALREADY_LIKED= "ALREADY LIKED",
    ALREADY_DISLIKED= "ALREADY DISLIKED",
}

export interface likeOrDislikeDB{
    user_id: string,
    post_id: string,
    like:number
}

export interface PostModel {
    id: string,
    creatorId:string,
    content: string,
    likes: number,
    dislikes: number,
    createAt: string,
    updatedAt: string,
    creator: {
      id: string,
      name: string
    }
  }

export class Posts{
    constructor(
        private id: string,
        private creatorId: string,
        private content: string,
        private likes:number,
        private dislikes: number,
        private createAt: string,
        private updateAt: string,
        private creatorName:string,
      
        
    ){}

    public getId(): string{
        return this.id
    }

    public setId(value:string):void{
        this.id= value

    }
    public getName(): string{
        return this.creatorName
    }

    public setName(value:string):void{
        this.creatorName= value

    }

    public getCreatorId(): string{
        return this.creatorId
    }

    public setCreatorId(value:string):void{
        this.creatorId= value

    }

    public getContent(): string{
        return this.content
    }

    public seTcontent(value:string):void{
        this.content= value

    }
    public getLikes(): number{
        return this.likes
    }

    public setLikes(value:number):void{
        this.likes= value

    }
    public addLike():void{
        this.likes++

    }
    public removeLike():void{
        this.likes--

    }
    public addDisLike():void{
        this.dislikes++

    }
    public removeDisLike():void{
        this.dislikes--

    }


    public getCreateAt(): string{
        return this.createAt
    }

    public setCreateAt(value:string):void{
        this.createAt= value

    }
    public getDislikes(): number{
        return this.dislikes
    }

    public setDislikes(value:number):void{
        this.dislikes= value 

    }
    public getUpdateAt(): string{
        return this.updateAt
    }

    public setUpdateAt(value:string):void{
        this.updateAt= value

    }

    public toDBModel(): PostDB{
        return {
            id: this.id,
            creator_id: this.creatorId,
            content: this.content,
            likes: this.likes,
            dislikes:this.dislikes,
            create_at:this.createAt,
            updated_at:this.updateAt
        }
      }



    public toBusinessModel(): PostModel{
        return{
            id:this.id,
            creatorId:this.creatorId,
            content: this.content,
            likes: this.likes,
            dislikes:this.dislikes,
            createAt:this.createAt,
            updatedAt:this.updateAt,
            creator:{
                id: this.creatorId,
                name:this.creatorName
            }

        }
    }
       
}