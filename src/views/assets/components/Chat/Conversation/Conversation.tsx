import { Avatar, IconButton, TextField } from '@mui/material';
import style from './conversation.module.scss';
import { PaperPlaneTilt } from '@phosphor-icons/react';

function Conversation() {
  return (
    <div className={style.container}>
      <div className={style.header}>
        <div className={style.infoUser}>
          <Avatar />
          <span>Nome do Usuário</span>
        </div>
      </div>
      <div className={style.messages}></div>
      <div className={style.newMessage}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Digite uma mensagem..."
          size="small"
          color="primary"
          inputProps={{ maxLength: 250 }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
            }
          }}
          sx={{
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderRadius: '12px ',
              },
              borderRadius: '12px ',
              color: 'var(--text-l)',
              '&:hover fieldset': {
                borderColor: 'var(--primary)',
              },
            },
          }}
        />
        <IconButton
          color="primary"
          sx={{
            backgroundColor: 'var(--primary)',
            color: 'var(--texl-l)',
            '&:hover': {
              backgroundColor: 'var(--intermediary)',
            },
          }}
        >
          <PaperPlaneTilt color="var(--text-l)" weight="fill" />
        </IconButton>
      </div>
    </div>
  );
}

export default Conversation;
