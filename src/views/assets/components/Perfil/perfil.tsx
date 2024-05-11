import { Divider } from '../../elements/common';
import style from './perfil.module.scss';
import { IconButton } from '@mui/material';
import { Pencil } from '@phosphor-icons/react';
import { colorsLanguages } from '../../../../utils/colorsLanguages';

interface IPerfil {
  User: {
    id: number;
    nome: string;
    email: string;
    birthDate: string;
    skills: string[];
  };
}

function Perfil({ User }: IPerfil) {
  const image = '';
  // 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==';

  User.skills = ['JavaScript', 'HTML', 'CSS', 'PHP', 'Ruby', 'Node']

  return (
    <div className={style.container}>
      <div className={style.header}>
        <div className={style.imgUser}>
          {image ? (
            <img src={`${image}`} alt="Perfil" />
          ) : (
            <img src="../img/logo-include-primary.png" alt="Perfil" />
          )}
        </div>
        <div className={style.nameUser}>
          <span>{User.nome}</span>
          <IconButton>
            <Pencil weight="fill" />
          </IconButton>
        </div>
      </div>
      <div className={style.content}>
        <div className={style.form}>
          <div className={style.field}>
            <span className={style.title}>Nome</span>
            <span className={style.text}>{User.nome}</span>
          </div>
          <div className={style.field}>
            <span className={style.title}>Email</span>
            <span className={style.text}>{User.email}</span>
          </div>
          <div className={style.field}>
            <span className={style.title}>Data de Nascimento</span>
            <span className={style.text}>{User.birthDate}</span>
          </div>
        </div>
        <Divider
          $width="2px"
          $height="100%"
          $colorBG={'var(--background)'}
          $radius="20px"
        />
        <div className={style.infos}>
          <div className={style.skills}>
            <span>Skills</span>
          </div>
          <div className={style.contentSkills}>
            {User.skills.map((skill, index) => (
              <div
                key={index}
                className={style.skills}
                style={{
                  borderColor:
                    colorsLanguages[skill as keyof typeof colorsLanguages] ||
                    'var(--primary)',
                }}
              >
                <span>{skill}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Perfil;
