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
  updatePost: (id: number, data: any): [Object, Object | null] => [
    {
      url: 'post/' + id + '/edit',
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json:charset=UTF-8',
      },
      data,
    },
    null,
  ],
  deletePost: (id: number, data: any): [Object, Object | null] => [
    {
      url: 'post/' + id + '/edit',
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json:charset=UTF-8',
      },
      data,
    },
    null,
  ],
  like: (id: number, status: boolean): [Object, Object | null] => [
    {
      url: '/feed/post/' + id + '/like',
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json:charset=UTF-8',
      },
      data: JSON.stringify({
        statusLike: status,
      }),
    },
    null,
  ],
  newComment: (id: number, data: any): [Object, Object | null] => [
    {
      url: '/post/' + id + '/comment/publish',
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
