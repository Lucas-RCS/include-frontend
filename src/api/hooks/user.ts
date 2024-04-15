import Connection from '../Connection';
import setting from '../settings/user';

export const getUserList = () => {
  const config = setting.userList(null);
  return Connection.getApiResult(...config);
};

export default getUserList;
