import style from './home.module.scss';
import NewPost from '../NewPost/newpost';
import Post from '../Post/Post';

import { feed, newPost } from '../../../../api/hooks/posts';
import { useEffect } from 'react';

interface IHome {
  User: {
    id: number;
    name: string;
    email: string;
    birthDate: string;
    skills: string[];
    jobs: string[];
    userImg: string;
  };
}

function Home({ User }: IHome) {
  useEffect(() => {
    getFeed();
  }, []);

  const getFeed = () => {
    feed()
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const createNewPost = (data: any) => {
    console.log(data);
    // newPost(data)
    //   .then((response) => {
    //     console.log(response);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  };

  return (
    <div className={style.container}>
      <NewPost User={User} sendNewPostData={createNewPost} />
      <div className={style.content}>
        <Post currentUser={User} />
        <Post currentUser={User} />
        <Post currentUser={User} />
        <Post currentUser={User} />
        <Post currentUser={User} />
      </div>
    </div>
  );
}

export default Home;
