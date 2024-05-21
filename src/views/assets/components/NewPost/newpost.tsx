// newpost.tsx

import React, { useState } from 'react';
import { Button, IconButton } from '@mui/material';
import style from './newpost.module.scss';
import { Code, Image, PaperPlaneTilt } from '@phosphor-icons/react';
import MonacoEditor from 'react-monaco-editor';
import Modal from '../Modal/modal';

interface INewPost {
  User: {
    id: number;
    name: string;
    email: string;
    birthDate: string;
    skills: string[];
    jobs: string[];
    userImg: string;
  };
}

function NewPost({ User }: INewPost) {
  const [textAreaHeight, setTextAreaHeight] = useState('auto');
  const [open, setOpen] = React.useState(false);
  const [code, setCode] = useState('// Insira seu código...');

  const image = '';
  // 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==';

  const handleTextAreaChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setTextAreaHeight('auto');
    const scrollHeight = event.target.scrollHeight;
    const clientHeight = event.target.clientHeight;
    if (scrollHeight > clientHeight) {
      setTextAreaHeight(`${scrollHeight}px`);
    }
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const editorDidMount = (editor: any, monaco: any) => {
    editor.focus();
  };

  const onChange = (newValue: any, e: any) => {
    console.log('code', newValue, e);
    setCode(newValue);
  };

  return (
    <>
      <div className={style.container}>
        <div className={style.msg}>
          <IconButton
            color="primary"
            sx={{
              backgroundColor: 'var(--background)',
              borderRadius: 'var(--bd-rds-sm)',
            }}
          >
            {image ? (
              <img src={`${image}`} alt="User Icon" />
            ) : (
              <span className={style.user_icon}>
                {User && User.name.substring(0, 2).toUpperCase()}
              </span>
            )}
          </IconButton>
          <textarea
            className={style.textarea}
            placeholder="Faça uma nova postagem.."
            maxLength={300}
            rows={1}
            style={{ height: textAreaHeight }}
            onInput={handleTextAreaChange}
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
            <PaperPlaneTilt weight="fill" size={20} />
          </IconButton>
        </div>
        <div className={style.options}>
          <Button
            onClick={handleOpen}
            color="primary"
            size="small"
            startIcon={<Code weight="bold" color="var(--primary)" />}
            sx={{
              borderRadius: 'var(--bd-rds-md)',
              paddingInline: 'var(--padding-md)',
              paddingBlock: 'var(--padding-xlt)',
              backgroundColor: 'var(--background)',
              color: 'var(--text-l)',
            }}
          >
            Adicionar Código
          </Button>
          <Button
            color="success"
            size="small"
            startIcon={<Image weight="fill" color="var(--success)" />}
            sx={{
              borderRadius: 'var(--bd-rds-md)',
              paddingInline: 'var(--padding-md)',
              paddingBlock: 'var(--padding-xlt)',
              backgroundColor: 'var(--background)',
              color: 'var(--text-l)',
            }}
          >
            Adicionar Imagem
          </Button>
        </div>
      </div>
      <Modal
        className={style.container_modal}
        open={open}
        onClose={handleClose}
      >
        <span>teste</span>  
      </Modal>
    </>
  );
}

export default NewPost;
