import { Avatar, Button } from '@mui/material';
import style from './cardUsers.module.scss';
import { useState } from 'react';

import { sendInvite } from '../../../../../api/hooks/friendship';

interface ICardUsers {
  User: {
    id: number;
    name: string;
    email: string;
    birthDate: string;
    skills: string[];
    jobs: string[];
    imageIconProfile: string;
  };
  friend?: boolean;
  notifyPost: (
    message: string,
    type: 'error' | 'warning' | 'info' | 'success',
  ) => void;
}

function CardUsers({ User, notifyPost, friend }: ICardUsers) {
  const [btnValue, setBtnValue] = useState('Solicitar Amizade');

  const sendFriendRequest = () => {
    if (btnValue === 'Solicitar Amizade') {
      sendInvite(User.id)
        .then((response) => {
          btnValue === 'Solicitar Amizade'
            ? setBtnValue('Convite Enviado')
            : setBtnValue('Solicitar Amizade');
          notifyPost('Convite de amizade Enviado com sucesso!', 'success');
        })
        .catch((error) => {
          notifyPost('Falha ao enviar convite de amizade', 'error');
        });
    }
  };

  return (
    <div className={style.container}>
      <div className={style.header}>
        <div className={style.userAvatar}>
          <Avatar
            color="primary"
            sx={{
              backgroundColor: 'var(--background)',
              padding:
                User && User.imageIconProfile ? '0' : 'var(--padding-md)',
              borderRadius: 'var(--bd-rds-xl)',
              minWidth: '82px',
              minHeight: '82px',
              boxShadow: '0 0 8px 0 rgba(0, 0, 0, 0.1)',
            }}
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
              <span
                style={{
                  color: 'var(--primary)',
                  fontWeight: 'var(--fnt-wg-lg)',
                }}
              >
                {User && User.name.substring(0, 2).toUpperCase()}
              </span>
            )}
          </Avatar>
        </div>
      </div>

      <div className={style.body}>
        <div className={style.infoUser}>
          <span className={style.userName}>{User && User.name}</span>
          <div className={style.userJobs}>
            {User && User.jobs && <span>{User.jobs.join(', ')}</span>}
          </div>

          <div className={style.actions}>
            {!friend && (
              <Button
                variant={
                  btnValue === 'Solicitar Amizade' ? 'contained' : 'outlined'
                }
                color="primary"
                size="small"
                onClick={() => sendFriendRequest()}
                sx={{
                  borderRadius: 'var(--bd-rds-md)',
                  fontWeight: 'var(--fnt-wg-lg)',
                  minWidth: '130px',
                  maxWidth: '130px',
                  color:
                    btnValue === 'Solicitar Amizade'
                      ? 'var(--primary)'
                      : 'var(--background)',
                  backgroundColor:
                    btnValue === 'Solicitar Amizade'
                      ? 'var(--background)'
                      : 'var(--primary)',
                  '&:hover': {
                    backgroundColor: 'var(--primary)',
                    color: 'var(--background)',
                  },
                }}
              >
                {btnValue}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardUsers;
