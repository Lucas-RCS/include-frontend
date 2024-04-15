import style from './home.module.scss';
import NewPost from '../NewPost/newpost';
function Home() {
  return (
    <div className={style.container}>
      <NewPost />
    </div>
  );
}

export default Home;
