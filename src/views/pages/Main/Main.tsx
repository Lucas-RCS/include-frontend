import Sidebar from '../../assets/components/Sidebar/Sidebar';
import style from './main.module.scss';

interface IMain {
  children?: any;
}

function Main({ children }: IMain) {
  return (
    <div className={style.container}>
      <div className={style.sidebar}>
        <Sidebar />
      </div>
      <div className={style.content}>{children}</div>
    </div>
  );
}

export default Main;
