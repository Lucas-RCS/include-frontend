import React, { useState } from 'react';
import {
  Button,
  IconButton,
  Theme,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  useTheme,
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
    userImg: string;
  };
}

const language = [
  'abap',
  'aes',
  'apex',
  'azcli',
  'bat',
  'bicep',
  'brainfuck',
  'c',
  'cameligo',
  'clike',
  'clojure',
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
  'flow9',
  'freemarker2',
  'fsharp',
  'graphql',
  'handlebars',
  'hcl',
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
  'pla',
  'plaintext',
  'postiats',
  'powerquery',
  'powershell',
  'proto',
  'pug',
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
  'vbscript',
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

function NewPost({ User }: INewPost) {
  const theme = useTheme();
  const [textAreaHeight, setTextAreaHeight] = useState('auto');
  const [openModal, setOpenModal] = useState(false);
  const [languageName, setLanguageName] = React.useState<string[]>([]);
  const [code, setCode] = useState(``);

  console.log(code);

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

  const handleOpen = () => setOpenModal(true);
  const handleClose = () => {
    setOpenModal(false);
    setLanguageName([]);
    setCode(``); // TIRAR ISSO DEPOIS, ELE SÓ PODE LIMPAR O CAMPO QUANDO ENVIAR O POST
  };

  const handleChangeLanguage = (
    event: SelectChangeEvent<typeof languageName>,
  ) => {
    const {
      target: { value },
    } = event;
    setLanguageName(typeof value === 'string' ? value.split(',') : value);
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
