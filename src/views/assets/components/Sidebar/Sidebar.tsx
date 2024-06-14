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
  CheckCircle,
  Person,
  Trash,
  Tray,
} from '@phosphor-icons/react';
import { Link } from 'react-router-dom';

import { getInvitesUser } from '../../../../api/hooks/friendship';
import { userList } from '../../../../api/hooks/user';
import CardNotify from './card_notify/cardNotify';

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
  };
  idUser: number;
}
interface Invite {
  status: number;
  getId: number;
  getIdInviter: number;
  getIdInvited: number;
  getStatus: number;
  getChat: null;
}

function Sidebar({ onViewChange, User, idUser }: ISidebar) {
  const [activeButton, setActiveButton] = useState('home');
  const [numberNotify, setNumberNotify] = useState<number>(0);
  const [dropDown, setDropDown] = useState(false);
  const [invitationsReceived, setInvitationsReceived] = useState<Invite[]>([]);
  const [usersList, setUsersList] = useState([]);

  const handleButtonClick = (view: string) => {
    onViewChange(view);
    setActiveButton(view);
  };

  useEffect(() => {
    getInvites();
    getUserList();
  }, []);

  const getInvites = () => {
    getInvitesUser()
      .then((response) => {
        setNumberNotify(response[0].content.invitationsReceived.length);
        setInvitationsReceived(response[0].content.invitationsReceived);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getUserList = () => {
    userList()
      .then((response) => {
        const users = response[0].content;
        setUsersList(users);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const findUserById = (userId: number, usersList: any[]): any | undefined => {
    return usersList.find((user) => user.id === userId);
  };

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
        <div>
          <IconButton
            className={style.btn_icon_notify}
            onClick={() => setDropDown(!dropDown)}
          >
            <Badge badgeContent={numberNotify} color="primary">
              {numberNotify > 0 ? (
                <BellRinging weight="fill" className={style.animation_bell} />
              ) : (
                <Bell weight="fill" />
              )}
            </Badge>
          </IconButton>

          {dropDown ? (
            <div className={style.dropdown}>
              <div className={style.header_dropdown}>
                <div className={style.icon_title}>
                  <Tray weight="fill" size={30} />
                  <span>Caixa de Entrada</span>
                </div>
                <div className={style.badge}>
                  <Bell weight="fill" />
                  <div className={style.number}>
                    <span>{numberNotify}</span>
                  </div>
                </div>
              </div>
              <div className={style.body_dropdown}>
                {invitationsReceived.map((invite) => {
                  const userInviter = findUserById(
                    invite.getIdInviter,
                    usersList,
                  );
                  return <CardNotify key={invite.getId} User={userInviter} idInvite={invite.getId} updateListinvites={getInvites}/>;
                })}
              </div>
            </div>
          ) : null}
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
