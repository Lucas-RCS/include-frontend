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

export default feed;
