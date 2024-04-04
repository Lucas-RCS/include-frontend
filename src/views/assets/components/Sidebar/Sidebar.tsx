import { useState } from 'react';
import { Button } from '@mui/material';
import style from './sidebar.module.scss';
import {
  CaretRight,
  Compass,
  SignOut,
  UsersThree,
  WechatLogo,
} from '@phosphor-icons/react';
import { Link } from 'react-router-dom';

const User = {
  name: 'Lucas Ribeiro',
  id: '#LR0001',
};

interface ISidebar {
  onViewChange: (view: string) => void;
}

function Sidebar({ onViewChange }: ISidebar) {
  const [activeButton, setActiveButton] = useState('home');

  const handleButtonClick = (view: string) => {
    onViewChange(view);
    setActiveButton(view);
  };

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
            <Button
              fullWidth
              variant="contained"
              startIcon={<Compass weight="fill" />}
              endIcon={<CaretRight weight="fill" />}
              sx={{
                padding: 'var(--padding-sm)',
                display: 'flex',
                justifyContent: 'space-around',
                backgroundColor:
                  activeButton === 'home'
                    ? 'var(--primary)'
                    : 'var(--components)',
                boxShadow: 'none',
              }}
              onClick={() => handleButtonClick('home')}
            >
              Descobrir
            </Button>
            <Button
              fullWidth
              variant="contained"
              startIcon={<UsersThree weight="fill" />}
              endIcon={<CaretRight weight="fill" />}
              sx={{
                padding: 'var(--padding-sm)',
                display: 'flex',
                justifyContent: 'space-around',
                backgroundColor:
                  activeButton === 'friends'
                    ? 'var(--primary)'
                    : 'var(--components)',
                boxShadow: 'none',
              }}
              onClick={() => handleButtonClick('friends')}
            >
              Amigos
            </Button>

            <Button
              fullWidth
              variant="contained"
              startIcon={<WechatLogo weight="fill" />}
              endIcon={<CaretRight weight="fill" />}
              sx={{
                padding: 'var(--padding-sm)',
                display: 'flex',
                justifyContent: 'space-around',
                backgroundColor:
                  activeButton === 'chat'
                    ? 'var(--primary)'
                    : 'var(--components)',
                boxShadow: 'none',
              }}
              onClick={() => handleButtonClick('chat')}
            >
              Chat
            </Button>
          </div>
        </div>
        <Link to="/login">
          <div className={style.footer}>
            <Button
              fullWidth
              variant="contained"
              color="error"
              startIcon={<SignOut weight="fill" />}
              sx={{
                padding: 'var(--padding-lt) var(--padding-lg)',
                display: 'flex',
                justifyContent: 'flex-start',
                gap: 'var(--gap-md)',
                backgroundColor: 'var(--components)',
                boxShadow: 'none',
              }}
            >
              Logout
            </Button>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Sidebar;
