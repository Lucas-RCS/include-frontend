// Request Settings for API calls
const apiSettings = {
  getChat: (
    friendshipId: number,
    conversationId: number,
  ): [Object, Object | null] => [
    {
      url:
        '/chat/friendship/' + friendshipId + '/listMessage/' + conversationId,
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json:charset=UTF-8',
      },
      data: null,
    },
    null,
  ],
  sendMessage: (friendshipId: number, data: any): [Object, Object | null] => [
    {
      url: '/chat/friendship/' + friendshipId + '/message/send',
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json:charset=UTF-8',
      },
      data: data,
    },
    null,
  ],
};

export default apiSettings;
