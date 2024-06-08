import { useState } from 'react';
import style from './newcomment.module.scss';
import { Avatar, Button, TextField } from '@mui/material';

interface INewComment {
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
  sendNewCommentData: (post: any) => void;
}

function NewComments({ User, sendNewCommentData }: INewComment) {
  const image = '';
  const [mensagem, setMensagem] = useState('');

  const createNewComment = () => {
    const data = {
      bodyComment: {
        text: mensagem,
      },
    };
    sendNewCommentData(data);
    setMensagem('');
  };

  return (
    <div className={style.container}>
      <Avatar
        color="primary"
        sx={{
          backgroundColor: 'var(--background)',
          padding: 'var(--padding-md)',
        }}
      >
        {image ? (
          <img src={image} alt="User Icon" />
        ) : (
          <span
            style={{
              color: 'var(--primary)',
              fontWeight: 'var(--fnt-wg-lg)',
            }}
          >
            {User?.name && User.name.substring(0, 2).toUpperCase()}
          </span>
        )}
      </Avatar>
      <TextField
        fullWidth
        size="small"
        label="Adicionar Comentário"
        variant="outlined"
        value={mensagem}
        onChange={(e) => setMensagem(e.target.value)}
        sx={{
          '& .MuiOutlinedInput-root': {
            color: 'var(--text-l)',
          },
        }}
      />
      <Button
        size="small"
        variant="contained"
        color="primary"
        onClick={createNewComment}
        sx={{
          fontSize: 'var(--fnt-sz-lt)',
          paddingInline: 'var(--padding-md)',
        }}
      >
        Responder
      </Button>
    </div>
  );
}

export default NewComments;
