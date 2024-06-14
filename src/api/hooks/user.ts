import Connection from '../Connection';
import setting from '../settings/user';

export const getUser = (id: number) => {
  const config = setting.getUser(id);
  return Connection.getApiResult(...config);
};

export const updateUser = (id: number, data: Object) => {
  const config = setting.userUpdate(id, data);
  return Connection.getApiResult(...config);
}

export const userList = () => {
  const config = setting.userList();
  return Connection.getApiResult(...config);
};

export const getUserLogged = () => {
  const config = setting.getUserLogged();
  return Connection.getApiResult(...config);
};

export default getUser;
