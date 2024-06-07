interface IComment {
  post: {
    id: number;
    author: number;
    body: {
      text: string;
      code: string;
      language: string;
      image: string;
    };
    date: string;
    updateDate: string;
    likes: number;
    comments: [];
    images: [];
    likesIdUser: [];
  };
}

function Comments({ post }: IComment) {
  return <span>teste</span>;
}

export default Comments;
