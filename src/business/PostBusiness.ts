import { PostDataBase } from "../database/PostDataBase";
import {
  CreatePostInputDTO,
  CreatePostOutputDTO,
} from "../dtos/posts/createPost.dto";
import {
  DeletePostInputDTO,
  DeletePostOutputDTO,
} from "../dtos/posts/deletePost.dto";
import {
  EditPostInputDTO,
  EditPostOutputDTO,
} from "../dtos/posts/editPost.dto";
import { GetPostsInputDTO, GetPostsOutputDTO } from "../dtos/posts/getPost.dto";
import {
  likeOrDislikePostInputDTO,
  likeOrDislikePostOutputDTO,
} from "../dtos/posts/likeOrDislikePost.dto";
import { ForbiddenError } from "../errors/ForbiddenError";
import { NotFoundError } from "../errors/NotFoundError";
import { UnauthorizedError } from "../errors/UnauthorizedError";
import {
  POST_LIKE,
  PostDBWithCreatorName,
  Posts,
  likeOrDislikeDB,
} from "../models/Post";
import { USER_ROLES } from "../models/Users";
import { TokenManager } from "../services/TokenManager";
import { IdGenerator } from "../services/idGenerator";

export class PostBusiness {
  constructor(
    public postDataBase: PostDataBase,
    public idGenerator: IdGenerator,
    public tokenManager: TokenManager
  ) {}

  public createPost = async (
    input: CreatePostInputDTO
  ): Promise<CreatePostInputDTO> => {
    const { content, token } = input;

    const payload = this.tokenManager.getPayload(token);

    if (!payload) {
      throw new UnauthorizedError();
    }

    const id = this.idGenerator.generate();

    const post = new Posts(
      id,
      payload.id,
      content,
      0,
      0,
      new Date().toISOString(),
      new Date().toISOString(),
      payload.name
    );
    const postDB = post.toDBModel();
    await this.postDataBase.insertPost(postDB);

    const output: CreatePostOutputDTO = undefined;

    return output;
  };

  public getPost = async (
    input: GetPostsInputDTO
  ): Promise<GetPostsOutputDTO> => {
    const { token } = input;

    const payload = this.tokenManager.getPayload(token);

    if (!payload) {
      throw new UnauthorizedError();
    }

    const PostEndCreatorName = await this.postDataBase.getPostEndCreatorName();

    const PostModel = PostEndCreatorName.map((post) => {
      const posts = new Posts(
        post.id,
        post.creator_id,
        post.content,
        post.likes,
        post.dislikes,
        post.created_at,
        post.update_at,
        post.creator_name
      );

      return posts.toBusinessModel();
    });

    const output: GetPostsOutputDTO = PostModel;

    return output;
  };

  public editPost = async (
    input: EditPostInputDTO
  ): Promise<EditPostOutputDTO> => {
    const { content, token, idToEdit } = input;

    const payload = this.tokenManager.getPayload(token);

    if (!payload) {
      throw new UnauthorizedError();
    }

    const postDB = await this.postDataBase.findPostById(idToEdit);

    if (!postDB) {
      throw new NotFoundError("post com esse id não existe ");
    }
    if (payload.id !== postDB.creator_id) {
      throw new ForbiddenError("somente quem criou o post pode edita-lo!");
    }

    const post = new Posts(
      postDB.id,
      postDB.creator_id,
      postDB.content,
      postDB.likes,
      postDB.dislikes,
      postDB.create_at,
      postDB.updated_at,
      payload.name
    );

    post.seTcontent(content);
    const updatePostDB = post.toDBModel();
    await this.postDataBase.updatePost(updatePostDB);

    const output: EditPostOutputDTO = undefined;

    return output;
  };
  public deletePost = async (
    input: DeletePostInputDTO
  ): Promise<DeletePostOutputDTO> => {
    const { token, idToDelete } = input;

    const payload = this.tokenManager.getPayload(token);

    if (!payload) {
      throw new UnauthorizedError();
    }

    const postDB = await this.postDataBase.findPostById(idToDelete);

    if (!postDB) {
      throw new NotFoundError("post com esse id não existe ");
    }
    if (payload.role !== USER_ROLES.ADMIN) {
      if (payload.id !== postDB.creator_id) {
        throw new ForbiddenError("somente quem criou o post pode deleta-la!");
      }
    }

    await this.postDataBase.deletePostById(idToDelete);

    const output: DeletePostOutputDTO = undefined;

    return output;
  };

  public likeOrDislikePost = async (
    input: likeOrDislikePostInputDTO
  ): Promise<likeOrDislikePostOutputDTO> => {
    const { token, postId, like } = input;

    const payload = this.tokenManager.getPayload(token);

    if (!payload) {
      throw new UnauthorizedError();
    }

    const postDBWithCreatorName =
      await this.postDataBase.findPostWithCreatorDBById(postId);

    if (!postDBWithCreatorName) {
      throw new NotFoundError("Post com esse 'id' não existe");
    }

    const post = new Posts(
      postDBWithCreatorName.id,
      postDBWithCreatorName.creator_id,
      postDBWithCreatorName.content,
      postDBWithCreatorName.likes,
      postDBWithCreatorName.dislikes,
      postDBWithCreatorName.created_at,
      postDBWithCreatorName.update_at,
      postDBWithCreatorName.creator_name
    );

    const likeSQL = like ? 1 : 0;

    const likeDislike: likeOrDislikeDB = {
      user_id: payload.id,
      post_id: postId,
      like: likeSQL,
    };

    const likeDislikeExists = await this.postDataBase.findLikeDislike(
      likeDislike
    );

    if (likeDislikeExists === POST_LIKE.ALREADY_LIKED) {
      if (like) {
        await this.postDataBase.removeLikeDislike(likeDislike);
        post.removeLike();
      } else {
        await this.postDataBase.updateLikeDislike(likeDislike);
        post.removeLike();
        post.addDisLike();
      }
    } else if (likeDislikeExists === POST_LIKE.ALREADY_DISLIKED) {
      if (like === false) {
        await this.postDataBase.removeLikeDislike(likeDislike);
        post.removeDisLike();
      } else {
        await this.postDataBase.updateLikeDislike(likeDislike);
        post.removeDisLike();
        post.addLike();
      }
    } else {
      await this.postDataBase.insertLikeDislike(likeDislike);
      like ? post.addLike() : post.addDisLike();
    }
    const updatePostDB = post.toDBModel();
    await this.postDataBase.updatePost(updatePostDB);

    const output: likeOrDislikePostOutputDTO = undefined;

    return output;
  };
}
