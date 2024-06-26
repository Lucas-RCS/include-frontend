import Connection from '../Connection';
import setting from '../settings/posts';

export const feed = () => {
  const config = setting.feed();
  return Connection.getApiResult(...config);
};

export const newPost = (data: any) => {
  const config = setting.newPost(data);
  return Connection.getApiResult(...config);
};

export const updatePost = (id: any, data: any) => {
  const config = setting.updatePost(id, data);
  return Connection.getApiResult(...config);
};

export const deletePost = (id: any) => {
  const config = setting.deletePost(id);
  return Connection.getApiResult(...config);
};

export const likes = (id: any, status: boolean) => {
  const config = setting.like(id, status);
  return Connection.getApiResult(...config);
};

export const newComment = (id: any, data: any) => {
  const config = setting.newComment(id, data);
  return Connection.getApiResult(...config);
};

export const updateComment = (id: any, idPost: any, data: any) => {
  const config = setting.updateComment(id, idPost, data);
  return Connection.getApiResult(...config);
};

export const deleteComment = (id: any, idPost: any) => {
  const config = setting.deleteComment(id, idPost);
  return Connection.getApiResult(...config);
};

export const likesComment = (id: any, idPost: any, status: boolean) => {
  const config = setting.likesComment(id, idPost, status);
  return Connection.getApiResult(...config);
}

export default feed;
