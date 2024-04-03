import style from './sidebar.module.scss';

const User = {
  name: 'Lucas Ribeiro',
  id: '#LR0001',
};

function Sidebar() {
  return (
    <div className={style.container_sidebar}>
      <div className={style.sidebar_perfil}>
        <div className={style.perfil_img}>
          <img src="./img/mascot_icon.png" alt="Icon Mascot Include" />
        </div>
        <div className={style.perfil_user}>
          <span className={style.perfil_user_name}>{User.name}</span>
          <span className={style.perfil_user_id}>{User.id}</span>
        </div>
      </div>
      <div className={style.main}>
        <div className={style.topic}>
          <span>MENU</span>
        </div>
        <div className={style.actions}>
          <div className={style.option}>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
