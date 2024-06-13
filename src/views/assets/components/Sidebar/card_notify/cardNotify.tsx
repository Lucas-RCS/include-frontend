import { Avatar, IconButton } from '@mui/material';
import style from './cardNotify.module.scss';
import { CheckCircle, Person, Trash } from '@phosphor-icons/react';

import {
  acceptInvite,
  rejectInvite,
} from '../../../../../api/hooks/friendship';

interface ICardNotify {
  User: {
    id: number;
    name: string;
    email: string;
    birthDate: string;
    skills: string[];
    jobs: string[];
    imageIconProfile: string;
  };
  updateListinvites: () => void;
  idInvite: number;
}

function CardNotify({ User, updateListinvites, idInvite }: ICardNotify) {
  const acceptNofityInvite = (id: number) => {
    acceptInvite(id)
      .then((response) => {
        updateListinvites();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const rejectNofityInvite = (id: number) => {
    rejectInvite(id)
      .then((response) => {
        updateListinvites();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className={style.card_notify}>
      <Avatar sx={{ bgcolor: 'var(--primary)' }}>
        <Person weight="fill" color="var(--text-l)" />
      </Avatar>
      <div className={style.info}>
        <div className={style.message}>
          <span>
            <b>{User.name}</b> quer ser seu amigo.
            <b> Deseja aceitar?</b>
          </span>
        </div>
        <div className={style.actions}>
          <IconButton
            color="primary"
            onClick={() => acceptNofityInvite(idInvite)}
            sx={{
              display: 'flex',
              gap: 'var(--gap-lt)',
              borderRadius: 'var(--bd-rds-lg)',
            }}
          >
            <CheckCircle weight="fill" />
            <span>Aceitar</span>
          </IconButton>
          <IconButton
            color="error"
            onClick={() => rejectNofityInvite(idInvite)}
            sx={{
              display: 'flex',
              gap: 'var(--gap-lt)',
              borderRadius: 'var(--bd-rds-lg)',
            }}
          >
            <Trash weight="fill" />
            <span>Excluir</span>
          </IconButton>
        </div>
      </div>
    </div>
  );
}

export default CardNotify;
