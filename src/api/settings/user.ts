// Request Settings for API calls
const apiSettings = {
  userList: (data: any): [Object, Object | null] => [
    {
      url: '/user/list',
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json:charset=UTF-8',
      },
      data: JSON.stringify(data),
    },
    null,
  ],
};

export default apiSettings;
