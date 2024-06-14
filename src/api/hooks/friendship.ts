import Connection from '../Connection';
import setting from '../settings/friendship';

export const getInvitesUser = () => {
  const config = setting.getInvitesUser();
  return Connection.getApiResult(...config);
};

export const getListFriendsUser = (id: number) => {
  const config = setting.getListFriendsUser(id);
  return Connection.getApiResult(...config);
};

export const sendInvite = (id: number) => {
  const config = setting.sendInvite(id);
  return Connection.getApiResult(...config);
};

export const acceptInvite = (id: number) => {
  const config = setting.acceptInvite(id);  
  return Connection.getApiResult(...config);
};

export const rejectInvite = (id: number) => {
  const config = setting.rejectInvite(id);
  return Connection.getApiResult(...config);
};


export default getInvitesUser;
