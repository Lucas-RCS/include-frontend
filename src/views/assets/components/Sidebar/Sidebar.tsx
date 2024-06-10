import { useEffect, useState } from 'react';
import { Avatar, Badge, Button, IconButton } from '@mui/material';
import style from './sidebar.module.scss';
import {
  CaretRight,
  Compass,
  SignOut,
  UsersThree,
  WechatLogo,
  UserCircle,
  Bell,
  BellRinging,
} from '@phosphor-icons/react';
import { Link } from 'react-router-dom';

interface ISidebar {
  onViewChange: (view: string) => void;
  User: {
    id: number;
    name: string;
    email: string;
    birthDate: string;
    skills: string[];
    jobs: string[];
    imageIconProfile: string;
    friends: string[];
  };
}

function Sidebar({ onViewChange, User }: ISidebar) {
  const [activeButton, setActiveButton] = useState('home');
  const [numberNotify, setNumberNotify] = useState<number>(2);

  const handleButtonClick = (view: string) => {
    onViewChange(view);
    setActiveButton(view);
  };

  useEffect(() => {
    if (activeButton !== 'friends') {
      setNumberNotify(Math.floor(Math.random() * 10));
    } else {
      setNumberNotify(0);
    }
  }, [activeButton]);

  return (
    <div className={style.container_sidebar}>
      <div className={style.sidebar_perfil}>
        <Avatar
          color="primary"
          sx={{
            backgroundColor: 'var(--components)',
            borderRadius: 'var(--bd-rds-xl)',
            cursor: 'pointer',
          }}
          onClick={() => handleButtonClick('perfil')}
        >
          {User && User.imageIconProfile ? (
            <img
              src={`${User.imageIconProfile}`}
              alt="User Icon"
              style={{
                borderRadius: 'var(--bd-rds-xl)',
                minHeight: '28px',
              }}
            />
          ) : (
            <span className={style.user_icon}>
              {User && User.name.substring(0, 2).toUpperCase()}
            </span>
          )}
        </Avatar>
        <div className={style.perfil_user}>
          <span className={style.perfil_user_name}>
            {User && User.name ? User.name : 'Carregando...'}
          </span>
          <span className={style.perfil_user_job}>
            {User && User.jobs && User.jobs.length > 0
              ? User.jobs.join(', ')
              : 'Aprendendo...'}
          </span>
        </div>
        <IconButton
          className={style.btn_icon_notify}
          onClick={() => handleButtonClick('friends')}
        >
          <Badge badgeContent={numberNotify} color="primary">
            {numberNotify > 0 ? (
              <BellRinging weight="fill" className={style.animation_bell} />
            ) : (
              <Bell weight="fill" />
            )}
          </Badge>
        </IconButton>
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
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: 'var(--padding-sm)',
                  paddingInline: 'var(--padding-md)',
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
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: 'var(--padding-sm)',
                  paddingInline: 'var(--padding-md)',
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
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: 'var(--padding-sm)',
                  paddingInline: 'var(--padding-md)',
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
              display: 'flex',
              justifyContent: 'space-between',
              padding: 'var(--padding-sm)',
              paddingInline: 'var(--padding-md)',
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
