import { useState, useEffect } from 'react';
import { Button, IconButton } from '@mui/material';
import style from './sidebar.module.scss';
import {
  CaretRight,
  Compass,
  SignOut,
  UsersThree,
  WechatLogo,
  UserCircle,
} from '@phosphor-icons/react';
import { Link } from 'react-router-dom';
import getUser from '../../../../api/hooks/user';

interface ISidebar {
  onViewChange: (view: string) => void;
  idUser: number;
}

function Sidebar({ onViewChange, idUser }: ISidebar) {
  const [activeButton, setActiveButton] = useState('home');
  const [userData, setUserData] = useState<{ error: boolean; content: any }[]>(
    [],
  );

  const handleButtonClick = (view: string) => {
    onViewChange(view);
    setActiveButton(view);
  };

  useEffect(() => {
    getUser(idUser)
      .then((response) => {
        const [data, status] = response;
        setUserData([data]);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [idUser]);

  const dataUser = userData[0]?.content;

  const image = '';
  // 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==';

  return (
    <div className={style.container_sidebar}>
      <div className={style.sidebar_perfil}>
        <IconButton
          color="primary"
          sx={{
            backgroundColor: 'var(--components)',
            borderRadius: 'var(--bd-rds-xl)',
            padding: 'var(--padding-lt)',
          }}
          onClick={() => handleButtonClick('perfil')}
        >
          {image ? (
            <img src={`${image}`} alt="User Icon" />
          ) : (
            <span className={style.user_icon}>
              {dataUser && dataUser.nome.substring(0, 2).toUpperCase()}
            </span>
          )}
        </IconButton>
        <div className={style.perfil_user}>
          <span className={style.perfil_user_name}>
            {dataUser && dataUser.nome ? dataUser.nome : 'Carregando...'}
          </span>
          <span className={style.perfil_user_job}>
            {dataUser && dataUser.job ? dataUser.job : 'Carregando...'}
          </span>
        </div>
      </div>
      <div className={style.main}>
        <div className={style.content}>
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
          <div className={style.topic}>
            <span>USUÁRIO</span>
          </div>
          <Button
            fullWidth
            variant="contained"
            startIcon={<UserCircle weight="fill" />}
            endIcon={<CaretRight weight="fill" />}
            sx={{
              padding: 'var(--padding-sm)',
              display: 'flex',
              justifyContent: 'space-around',
              backgroundColor:
                activeButton === 'perfil'
                  ? 'var(--primary)'
                  : 'var(--components)',
              boxShadow: 'none',
            }}
            onClick={() => handleButtonClick('perfil')}
          >
            Perfil
          </Button>
        </div>
        <div className={style.footer}>
          <Link to="/login">
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
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
