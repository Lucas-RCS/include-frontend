import Connection from '../Connection';
import setting from '../settings/user';

export const getUser = (id: number) => {
  const config = setting.userList(id);
  return Connection.getApiResult(...config);
};

export const updateUser = (id: number, data: Object) => {
  const config = setting.userUpdate(id, data);
  return Connection.getApiResult(...config);
}

export default getUser;
