import Connection from '../Connection';
import setting from '../settings/login';

export const Login = (data: any) => {
  const config = setting.login(data);
  return Connection.getApiResult(...config);
};

export const Register = (data: any) => {
  const config = setting.register(data);
  return Connection.getApiResult(...config);
};

export default Login;
