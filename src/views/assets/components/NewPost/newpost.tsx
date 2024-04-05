import React, { useState } from 'react';
import { Box, Button, IconButton, Modal } from '@mui/material';
import style from './newpost.module.scss';
import { PaperPlaneTilt } from '@phosphor-icons/react';
import MonacoEditor from 'react-monaco-editor';

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

  const styleModal = {
    display: 'flex',
    flexDirection: 'row',
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: '64dvw',
    height: '64dvh',
    p: 'var(--padding-md)',
    border: '2px solid var(--components)',
    borderRadius: 'var(--bd-rds-lt)',
    bgcolor: 'var(--background)',
    transform: 'translate(-50%, -50%)',
  };

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
          sx={{
            border: '1px solid var(--primary)',
            borderRadius: 'var(--bd-rds-md)',
            paddingInline: 'var(--padding-md)',
            backgroundColor: 'var(--background)',
          }}
        >
          Adicionar código
        </Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={styleModal}>
            <MonacoEditor
              width="70%"
              height="56dvh"
              theme="vs-dark"
              value={code}
              options={{ selectOnLineNumbers: true }}
              onChange={onChange}
              editorDidMount={editorDidMount}
            />
          </Box>
        </Modal>
      </div>
    </div>
  );
}

export default NewPost;
