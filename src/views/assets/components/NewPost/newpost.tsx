import { IconButton } from '@mui/material';
import style from './newpost.module.scss';
import { PaperPlaneTilt } from '@phosphor-icons/react';

function NewPost() {
  return (
    <div className={style.container}>
      <div className={style.msg}>
        <textarea
          className={style.textarea}
          placeholder="Faça uma nova postagem.."
          maxLength={300}
        ></textarea>
        <IconButton
          sx={{
            backgroundColor: 'var(--primary)',
            borderRadius: '12px',
            '&:hover': {
              backgroundColor: 'var(--intermediary)',
            },
          }}
        >
          <PaperPlaneTilt weight="fill" />
        </IconButton>
      </div>
    </div>
  );
}

export default NewPost;
