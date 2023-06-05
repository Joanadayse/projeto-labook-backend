import {
  POST_LIKE,
  PostDBWithCreatorName,
  likeOrDislikeDB,
} from "../models/Post";
import { PostsDB } from "../types";
import { BaseDataBase } from "./BaseDatabase";
import { UsersDataBase } from "./UsersDataBase";

export class PostDataBase extends BaseDataBase {
  public static TABLE_POST = "post";
  public static TABLE_LIKS_DISLIKES = "likes_dislikes";

  public getPostEndCreatorName = async (): Promise<PostDBWithCreatorName[]> => {
    const result = await BaseDataBase.connection(PostDataBase.TABLE_POST)
      .select(
        `${PostDataBase.TABLE_POST}.id`,
        `${PostDataBase.TABLE_POST}.creator_id`,
        `${PostDataBase.TABLE_POST}.content`,
        `${PostDataBase.TABLE_POST}.likes`,
        `${PostDataBase.TABLE_POST}.dislikes`,
        `${PostDataBase.TABLE_POST}.create_at`,
        `${PostDataBase.TABLE_POST}.updated_at`,
        `${UsersDataBase.TABLE_USERS}.name as creator_name`
      )
      .join(
        `${UsersDataBase.TABLE_USERS}`,
        `${PostDataBase.TABLE_POST}.creator_id`,
        "=",
        `${UsersDataBase.TABLE_USERS}.id`
      );
    return result as PostDBWithCreatorName[];
  };

  public getPostById = async (id: string) => {
    const postsDB: PostsDB[] | undefined = await BaseDataBase.connection(
      PostDataBase.TABLE_POST
    ).where({ id });
    return postsDB;
  };

  public findPostById = async (id: string): Promise<PostsDB | undefined> => {
    const [result] = await BaseDataBase.connection(PostDataBase.TABLE_POST)
      .select()
      .where({ id });
    return result as PostsDB | undefined;
  };

  public insertPost = async (newPost: PostsDB): Promise<void> => {
    await BaseDataBase.connection(PostDataBase.TABLE_POST).insert(newPost);
  };
  public updatePost = async (PostsDB: PostsDB): Promise<void> => {
    await BaseDataBase.connection(PostDataBase.TABLE_POST)
      .update(PostsDB)
      .where({ id: PostsDB.id });
  };

  public deletePostById = async (id: string): Promise<void> => {
    await BaseDataBase.connection(PostDataBase.TABLE_POST)
      .delete()
      .where({ id });
  };

  public findPostWithCreatorDBById = async (
    id: string
  ): Promise<PostDBWithCreatorName | undefined> => {
    const [result] = await BaseDataBase.connection(PostDataBase.TABLE_POST)
      .select(
        `${PostDataBase.TABLE_POST}.id`,
        `${PostDataBase.TABLE_POST}.creator_id`,
        `${PostDataBase.TABLE_POST}.content`,
        `${PostDataBase.TABLE_POST}.likes`,
        `${PostDataBase.TABLE_POST}.dislikes`,
        `${PostDataBase.TABLE_POST}.create_at`,
        `${PostDataBase.TABLE_POST}.updated_at`,
        `${UsersDataBase.TABLE_USERS}.name as creator_name`
      )
      .join(
        `${UsersDataBase.TABLE_USERS}`,
        `${PostDataBase.TABLE_POST}.creator_id`,
        "=",
        `${UsersDataBase.TABLE_USERS}.id`
      )
      .where({ [`${PostDataBase.TABLE_POST}.id`]: id });
    return result as PostDBWithCreatorName | undefined;
  };

  public findLikeDislike = async (
    likeOrDislikeDB: likeOrDislikeDB
  ): Promise<POST_LIKE | undefined> => {
    const [result] = await BaseDataBase.connection(
      PostDataBase.TABLE_LIKS_DISLIKES
    )
      .select()
      .where({
        user_id: likeOrDislikeDB.user_id,
        post_id: likeOrDislikeDB.post_id,
      });

    if (result === undefined) {
      return undefined;
    } else if (result.like === 1) {
      return POST_LIKE.ALREADY_LIKED;
    } else {
      return POST_LIKE.ALREADY_DISLIKED;
    }
  };

  public removeLikeDislike = async (
    likeOrDislikeDB: likeOrDislikeDB
  ): Promise<void> => {
    await BaseDataBase.connection(PostDataBase.TABLE_LIKS_DISLIKES)
      .delete()
      .where({
        user_id: likeOrDislikeDB.user_id,
        post_id: likeOrDislikeDB.post_id,
      });
  };

  public updateLikeDislike = async (
    likeOrDislikeDB: likeOrDislikeDB
  ): Promise<void> => {
    await BaseDataBase.connection(PostDataBase.TABLE_LIKS_DISLIKES)
      .update(likeOrDislikeDB)
      .where({
        user_id: likeOrDislikeDB.user_id,
        post_id: likeOrDislikeDB.post_id,
      });
  };
  public insertLikeDislike = async (
    likeOrDislikeDB: likeOrDislikeDB
  ): Promise<void> => {
    await BaseDataBase.connection(PostDataBase.TABLE_LIKS_DISLIKES).insert(
      likeOrDislikeDB
    );
  };
}
