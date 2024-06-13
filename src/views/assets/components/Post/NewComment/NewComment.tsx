import { useRef, useState } from 'react';
import style from './newcomment.module.scss';
import {
  Avatar,
  Button,
  IconButton,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  Theme,
  useTheme,
} from '@mui/material';
import { Code, Eraser, Image } from '@phosphor-icons/react';

import CodeEditor from '@uiw/react-textarea-code-editor';

interface INewComment {
  User: {
    id: number;
    name: string;
    email: string;
    birthDate: string;
    skills: string[];
    jobs: string[];
    imageIconProfile: string;
  };
  sendNewCommentData: (post: any) => void;
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

function NewComments({ User, sendNewCommentData }: INewComment) {
  const theme = useTheme();
  const [textAreaHeight, setTextAreaHeight] = useState('auto');
  const [textAreaValue, setTextAreaValue] = useState<string | null>('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [languageName, setLanguageName] = useState<string[]>([]);
  const [code, setCode] = useState(``);
  const [addCode, setAddCode] = useState(false);

  const createNewComment = () => {
    const data = {
      bodyComment: {
        text: textAreaValue,
        code: code,
        language: languageName[0],
        image: selectedImage,
      },
    };
    sendNewCommentData(data);
    setTextAreaValue('');
    setCode('');
    setLanguageName([]);
    setSelectedImage(null);
    setAddCode(false);
  };

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

  return (
    <div className={style.container}>
      <div className={style.header}>
        <Avatar
          color="primary"
          sx={{
            backgroundColor: 'var(--background)',
            padding: User && User.imageIconProfile ? '0' : 'var(--padding-md)',
            borderRadius: 'var(--bd-rds-xl)',
            minWidth: '48px',
            minHeight: '48px',
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
        <textarea
          className={style.textArea}
          maxLength={300}
          rows={1}
          value={textAreaValue || ''}
          style={{ height: textAreaHeight }}
          onInput={handleTextAreaChange}
        ></textarea>
      </div>
      <div className={style.actions}>
        <div className={style.buttons}>
          <IconButton
            color="primary"
            onClick={() => {
              setAddCode(!addCode);
              setCode('');
              setLanguageName([]);
            }}
            sx={{
              backgroundColor: 'var(--background)',
            }}
          >
            <Code weight="bold" color="var(--primary)" />
          </IconButton>
          <IconButton
            color="success"
            onClick={HandleUserImg}
            sx={{
              backgroundColor: 'var(--background)',
            }}
          >
            <Image weight="fill" color="var(--success)" />
          </IconButton>
          <>
            <input
              type="file"
              id="images"
              style={{ display: 'none' }}
              accept="image/png, image/jpeg"
              ref={iptRef}
              onChange={handleImageChange}
            />
          </>
        </div>
        <Button variant="contained" color="primary" onClick={createNewComment}>
          Responder
        </Button>
      </div>
      {addCode ? (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            gap: 'var(--gap-lt)',
          }}
        >
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
                return <em>Selecione uma Linguagem</em>;
              }

              return selected.join(', ');
            }}
            MenuProps={MenuProps}
          >
            <MenuItem disabled value="">
              <em style={{ color: 'var(--text-g)' }}>Selecione uma Linguagem</em>
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
          <CodeEditor
            value={code}
            language={languageName[0]}
            placeholder="... Digite seu código aqui ..."
            onChange={(evn) => setCode(evn.target.value)}
            style={{
              width: '100%',
              height: '18dvh',
              borderRadius: 'var(--bd-rds-lt)',
              backgroundColor: 'var(--background)',
              fontSize: 'var(--fnt-sz-sm)',
              overflowY: 'auto',
            }}
          />
        </div>
      ) : null}
      {selectedImage ? (
        <div className={style.imgComment}>
          <img src={selectedImage} alt="Post Image" />
          <div
            style={{
              position: 'absolute',
              top: '1dvh',
              right: '1dvw',
            }}
          >
            <IconButton
              color="error"
              onClick={() => setSelectedImage(null)}
              sx={{
                backgroundColor: 'var(--background)',
              }}
            >
              <Eraser weight="fill"/>
            </IconButton>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default NewComments;
