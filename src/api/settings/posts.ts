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
  deletePost: (id: number): [Object, Object | null] => [
    {
      url: 'post/' + id + '/delete',
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json:charset=UTF-8',
      },
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
  updateComment: (
    id: number,
    idPost: number,
    data: any,
  ): [Object, Object | null] => [
    {
      url: '/post/' + idPost + '/comment/' + id + '/edit',
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json:charset=UTF-8',
      },
      data,
    },
    null,
  ],
  deleteComment: (id: number, idPost: number): [Object, Object | null] => [
    {
      url: '/post/' + idPost + '/comment/' + id + '/delete',
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json:charset=UTF-8',
      },
    },
    null,
  ],
  likesComment: (
    id: number,
    idPost: number,
    status: boolean,
  ): [Object, Object | null] => [
    {
      url: '/post/' + idPost + '/comment/' + id + '/like',
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
};

export default apiSettings;
