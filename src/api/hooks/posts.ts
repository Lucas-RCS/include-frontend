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

export const deletePost = (id: any, data: any) => {
  const config = setting.deletePost(id, data);
  return Connection.getApiResult(...config);
};

export const likes = (id: any, status: boolean) => {
  const config = setting.like(id, status);
  return Connection.getApiResult(...config);
};

export default feed;
