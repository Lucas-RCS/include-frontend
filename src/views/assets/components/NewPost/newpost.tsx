import React, { useRef, useState } from 'react';
import {
  Button,
  IconButton,
  Theme,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  useTheme,
  Avatar,
} from '@mui/material';
import style from './newpost.module.scss';
import { Broom, Code, Image, PaperPlaneTilt } from '@phosphor-icons/react';
import Modal from '../Modal/modal';

import CodeEditor from '@uiw/react-textarea-code-editor';

interface INewPost {
  User: {
    id: number;
    name: string;
    email: string;
    birthDate: string;
    skills: string[];
    jobs: string[];
    imageIconProfile: string;
  };
  sendNewPostData: (post: any) => void;
}

const language = [
  'c',
  'coffeescript',
  'cpp',
  'csharp',
  'csp',
  'css',
  'dart',
  'dockerfile',
  'ecl',
  'elixir',
  'erlang',
  'fsharp',
  'graphql',
  'html',
  'ini',
  'java',
  'javascript',
  'json',
  'jsx',
  'julia',
  'kotlin',
  'less',
  'lex',
  'lexon',
  'liquid',
  'livescript',
  'lua',
  'markdown',
  'mips',
  'msdax',
  'mysql',
  'nginx',
  'objective-c',
  'pascal',
  'pascaligo',
  'perl',
  'pgsql',
  'php',
  'plaintext',
  'postiats',
  'powerquery',
  'powershell',
  'python',
  'qsharp',
  'r',
  'razor',
  'redis',
  'redshift',
  'restructuredtext',
  'ruby',
  'rust',
  'scala',
  'scheme',
  'scss',
  'shell',
  'sol',
  'sparql',
  'sql',
  'stylus',
  'swift',
  'systemverilog',
  'tcl',
  'toml',
  'tsx',
  'twig',
  'typescript',
  'verilog',
  'vue',
];

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: 48 * 4.5 + 8,
      width: 250,
    },
  },
};

function getStyles(name: string, skillName: string[], theme: Theme) {
  return {
    fontWeight:
      skillName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
    color: 'var(--text-l)',
  };
}

function NewPost({ User, sendNewPostData }: INewPost) {
  const theme = useTheme();
  const [textAreaHeight, setTextAreaHeight] = useState('auto');
  const [textAreaValue, setTextAreaValue] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [languageName, setLanguageName] = React.useState<string[]>([]);
  const [code, setCode] = useState(``);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleTextAreaChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const value = event.target.value;
    setTextAreaValue(value);
    setTextAreaHeight('auto');
    const scrollHeight = event.target.scrollHeight;
    const clientHeight = event.target.clientHeight;
    if (scrollHeight > clientHeight) {
      setTextAreaHeight(`${scrollHeight}px`);
    }
  };

  const handleOpen = () => setOpenModal(true);
  const handleClose = () => {
    setOpenModal(false);
  };

  const handleChangeLanguage = (
    event: SelectChangeEvent<typeof languageName>,
  ) => {
    const {
      target: { value },
    } = event;
    setLanguageName(typeof value === 'string' ? value.split(',') : value);
  };

  const iptRef = useRef<HTMLInputElement>(null);

  const HandleUserImg = () => {
    if (iptRef.current) {
      iptRef.current.click();
    }
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const fileSize = event.target.files[0].size / (1024 * 1024);
      if (fileSize > 8) {
        alert(
          'O arquivo de imagem é muito grande. Por favor, selecione uma imagem de até 5 MB.',
        );
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  const newPost = () => {
    const post = {
      body: {
        text: textAreaValue,
        code,
        language: languageName[0] ? languageName[0] : '',
        image: selectedImage ? selectedImage : '',
      },
    };
    sendNewPostData(post);

    setTextAreaValue('');
    setCode('');
    setLanguageName([]);
    setSelectedImage(null);
    if (iptRef.current) {
      iptRef.current.value = '';
    }
  };

  return (
    <>
      <div className={style.container}>
        <div className={style.msg}>
          <Avatar
            color="primary"
            sx={{
              backgroundColor:
                User && User.imageIconProfile ? '' : 'var(--background)',
              padding: User && User.imageIconProfile ? '' : 'var(--padding-md)',
              borderRadius: 'var(--bd-rds-xl)',
            }}
          >
            {User && User.imageIconProfile ? (
              <img src={`${User.imageIconProfile}`} alt="User Icon" />
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
          <textarea
            className={style.textarea}
            placeholder="Faça uma nova postagem.."
            maxLength={300}
            rows={1}
            value={textAreaValue}
            style={{ height: textAreaHeight }}
            onInput={handleTextAreaChange}
          ></textarea>
          <IconButton
            onClick={newPost}
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
            onClick={HandleUserImg}
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
          <input
            type="file"
            id="images"
            style={{ display: 'none' }}
            accept="image/png, image/jpeg"
            ref={iptRef}
            onChange={handleImageChange}
          />
          <IconButton
            onClick={() => {
              setTextAreaValue('');
              setCode('');
              setLanguageName([]);
              setSelectedImage(null);
              if (iptRef.current) {
                iptRef.current.value = '';
              }
            }}
            sx={{
              backgroundColor: 'var(--background)',
              borderRadius: '12px',
            }}
          >
            <Broom weight="fill" size={20} />
          </IconButton>
        </div>
        <div className={style.contentPost}>
          {code ? (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
              }}
            >
              <CodeEditor
                value={code}
                language={languageName[0]}
                readOnly
                onChange={(evn) => setCode(evn.target.value)}
                style={{
                  width: '100%',
                  height: '100%',
                  maxHeight: '30dvh',
                  borderRadius: 'var(--bd-rds-lt)',
                  backgroundColor: 'var(--background)',
                  overflowY: 'auto',
                }}
              />
            </div>
          ) : null}
          {selectedImage ? (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
              }}
            >
              <img src={selectedImage} alt="Post Image" />
            </div>
          ) : null}
        </div>
      </div>
      <Modal
        className={style.container_modal}
        open={openModal}
        onClose={handleClose}
        btnText="Adicionar Código"
        iconBtn={<Code weight="bold" />}
      >
        <div className={style.editor_container}>
          <div className={style.language}>
            <label htmlFor="language">Selecione a Linguagem</label>
            <Select
              id="language"
              displayEmpty
              fullWidth
              size="small"
              value={languageName}
              onChange={handleChangeLanguage}
              input={
                <OutlinedInput
                  sx={{
                    color: 'var(--text-l)',
                    borderColor: 'var(--primary)',
                  }}
                />
              }
              renderValue={(selected) => {
                if (selected.length === 0) {
                  return <em>Linguagem</em>;
                }

                return selected.join(', ');
              }}
              MenuProps={MenuProps}
            >
              <MenuItem disabled value="">
                <em style={{ color: 'var(--text-g)' }}>Linguagem</em>
              </MenuItem>
              {language.map((job) => (
                <MenuItem
                  key={job}
                  value={job}
                  style={getStyles(job, languageName, theme)}
                >
                  {job}
                </MenuItem>
              ))}
            </Select>
          </div>
          <CodeEditor
            value={code}
            language={languageName[0]}
            placeholder="... Digite seu código aqui ..."
            onChange={(evn) => setCode(evn.target.value)}
            style={{
              width: '100%',
              height: '50dvh',
              borderRadius: 'var(--bd-rds-lt)',
              backgroundColor: 'var(--components)',
              fontSize: 'var(--fnt-sz-sm)',
              overflowY: 'auto',
            }}
          />
          <IconButton
            onClick={() => setCode('')}
            sx={{
              position: 'absolute',
              top: '26%',
              right: '20%',
              backgroundColor: 'var(--primary)',
              borderRadius: '12px',
              '&:hover': {
                backgroundColor: 'var(--intermediary)',
              },
            }}
          >
            <Broom weight="fill" size={20} />
          </IconButton>
        </div>
      </Modal>
    </>
  );
}

export default NewPost;
