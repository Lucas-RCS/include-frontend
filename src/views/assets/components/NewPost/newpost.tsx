// newpost.tsx

import React, { useState } from 'react';
import { Button, IconButton } from '@mui/material';
import style from './newpost.module.scss';
import { PaperPlaneTilt } from '@phosphor-icons/react';
import MonacoEditor from 'react-monaco-editor';
import Modal from '../Modal/modal';

function NewPost() {
  const [textAreaHeight, setTextAreaHeight] = useState('auto');
  const [open, setOpen] = React.useState(false);
  const [code, setCode] = useState('// Insira seu código...');

  // Textarea auto resize
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

  // Modal functions
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Monaco Editor functions
  const editorDidMount = (editor: any, monaco: any) => {
    editor.focus();
  };

  const onChange = (newValue: any, e: any) => {
    console.log('code', newValue, e);
    setCode(newValue);
  };

  return (
    <div className={style.container}>
      <div className={style.msg}>
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
          size="small"
          sx={{
            border: '1px solid var(--primary)',
            borderRadius: 'var(--bd-rds-md)',
            paddingInline: 'var(--padding-md)',
            backgroundColor: 'var(--background)',
          }}
        >
          Adicionar código
        </Button>
        <Modal closeButton open={open} onClose={handleClose} setOpen={setOpen}>
          <span>teste</span>
        </Modal>
      </div>
    </div>
  );
}

export default NewPost;
