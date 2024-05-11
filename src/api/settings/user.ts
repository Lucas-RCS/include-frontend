// Request Settings for API calls
const apiSettings = {
  userList: (id: number): [Object, Object | null] => [
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
};

export default apiSettings;
