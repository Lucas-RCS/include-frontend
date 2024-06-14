import Connection from '../Connection';
import setting from '../settings/chat';

export const getChat = (friendshipId: number, conversationId: number) => {
  const config = setting.getChat(friendshipId, conversationId);
  return Connection.getApiResult(...config);
};

export const sendMessage = (friendshipId: number, data: any) => {
  const config = setting.sendMessage(friendshipId, data);
  return Connection.getApiResult(...config);
}

export default getChat;
