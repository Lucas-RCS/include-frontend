// Request Settings for API calls
const apiSettings = {
  getInvitesUser: (): [Object, Object | null] => [
    {
      url: '/friendship/invites',
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json:charset=UTF-8',
      },
      data: [],
    },
    null,
  ],
  getListFriendsUser: (id: number): [Object, Object | null] => [
    {
      url: '/friendship/user/' + id + '/list',
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json:charset=UTF-8',
      },
      data: null,
    },
    null,
  ],
  sendInvite: (id: number): [Object, Object | null] => [
    {
      url: '/friendship/send/' + id,
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json:charset=UTF-8',
      },
      data: JSON.stringify({
        ola: 'json',
      }),
    },
    null,
  ],
  acceptInvite: (id: number): [Object, Object | null] => [
    {
      url: '/friendship/invites/' + id + '/accept',
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json:charset=UTF-8',
      },
      data: JSON.stringify({
        ola: 'json',
      }),
    },
    null,
  ],
  rejectInvite: (id: number): [Object, Object | null] => [
    {
      url: '/friendship/invites/' + id + '/reject',
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json:charset=UTF-8',
      },
      data: JSON.stringify({
        ola: 'json',
      }),
    },
    null,
  ],
};

export default apiSettings;
