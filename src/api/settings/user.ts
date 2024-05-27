// Request Settings for API calls
const apiSettings = {
  getUser: (id: number): [Object, Object | null] => [
    {
      url: '/user/' + id,
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json:charset=UTF-8',
      },
      data: [],
    },
    null,
  ],
  userUpdate: (id: number, data: Object): [Object, Object | null] => [
    {
      url: '/user/edit/' + id,
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json:charset=UTF-8',
      },
      data: data,
    },
    null,
  ],
  userList: (): [Object, Object | null] => [
    {
      url: '/user/list',
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json:charset=UTF-8',
      },
      data: [],
    },
    null,
  ],
};

export default apiSettings;
