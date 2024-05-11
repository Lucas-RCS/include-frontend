import Connection from '../Connection';
import setting from '../settings/user';

export const getUser = (id: number) => {
  const config = setting.userList(id);
  return Connection.getApiResult(...config);
};


export default getUser;
