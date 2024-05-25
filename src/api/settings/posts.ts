// Request Settings for API calls
const apiSettings = {
  feed: (): [Object, Object | null] => [
    {
      url: '/feed',
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json:charset=UTF-8',
      },
      data: [],
    },
    null,
  ],
  newPost: (data: any): [Object, Object | null] => [
    {
      url: '/post/publish',
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json:charset=UTF-8',
      },
      data,
    },
    null,
  ],
};

export default apiSettings;
