import { Divider } from '../../elements/common';
import style from './perfil.module.scss';
import { IconButton } from '@mui/material';
import { Pencil } from '@phosphor-icons/react';

function Perfil() {
  const User = {
    name: 'Lucas Ribeiro',
    email: 'LucasRibeiro@gmail.com',
    birth: '31/08/2002',
    skills: ['React', 'Node', 'TypeScript', 'JavaScript', 'HTML', 'CSS'],
  };

  const skillColors = {
    React: 'var(--react)',
    Node: 'var(--node)',
    TypeScript: 'var(--typescript)',
    JavaScript: 'var(--javascript)',
    HTML: 'var(--html)',
    CSS: 'var(--css)',
  };

  return (
    <div className={style.container}>
      <div className={style.header}>
        <div className={style.imgUser}>
          <img src="../img/logo-include-primary.png" alt="Perfil" />
        </div>
        <div className={style.nameUser}>
          <span>{User.name}</span>
          <IconButton>
            <Pencil weight="fill" />
          </IconButton>
        </div>
      </div>
      <div className={style.content}>
        <div className={style.form}>
          <div className={style.field}>
            <span className={style.title}>Nome</span>
            <span className={style.text}>{User.name}</span>
          </div>
          <div className={style.field}>
            <span className={style.title}>Email</span>
            <span className={style.text}>{User.email}</span>
          </div>
          <div className={style.field}>
            <span className={style.title}>Data de Nascimento</span>
            <span className={style.text}>{User.birth}</span>
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
                    skillColors[skill as keyof typeof skillColors] ||
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
