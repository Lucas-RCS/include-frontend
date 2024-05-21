import style from './home.module.scss';
import NewPost from '../NewPost/newpost';
import Post from '../Post/Post';

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
  return (
    <div className={style.container}>
      <NewPost User={User}/>
      <div className={style.content}>
        <Post />
      </div>
    </div>
  );
}

export default Home;
