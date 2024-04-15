import Connection from '../Connection';
import setting from '../settings/login';

export const makeLogin = (data: any) => {
  console.log(data);

  const config = setting.login(data);
  return Connection.getApiResult(...config);
};

export default makeLogin;
