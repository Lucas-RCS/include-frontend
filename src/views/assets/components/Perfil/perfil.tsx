import React from 'react';
import { Divider } from '../../elements/common';
import style from './perfil.module.scss';
import {
  Select,
  Theme,
  useTheme,
  SelectChangeEvent,
  MenuItem,
  IconButton,
  OutlinedInput,
  Snackbar,
  Slide,
  Alert,
} from '@mui/material';
import { FloppyDisk, Pencil } from '@phosphor-icons/react';
import { colorsLanguages } from '../../../../utils/colorsLanguages';
import { useState } from 'react';
import Modal from '../Modal/modal';
import logoInclude from '../../../../../public/img/logo-include-primary.png';
import { updateUser } from '../../../../api/hooks/user';

interface IPerfil {
  User: {
    id: number;
    name: string;
    email: string;
    birthDate: string;
    skills: string[];
    jobs: string[];
    userImg: string;
  };
  onUpdateRequest: () => void;
}

function getStyles(name: string, skillName: string[], theme: Theme) {
  return {
    fontWeight:
      skillName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
    color: 'var(--text-l)',
  };
}

function Perfil({ User, onUpdateRequest }: IPerfil) {
  const [openModalUser, setOpenModalUser] = useState(false);
  const theme = useTheme();

  const [skillName, setSkillName] = React.useState<string[]>(User.skills);
  const [jobsName, setJobsName] = React.useState<string[]>(User.jobs);
  const [nameUser, setNameUser] = React.useState<string>(User.name);
  const [emailUser, setEmailUser] = React.useState<string>(User.email);
  const [birthDate, setBirthDate] = React.useState<string>(
    formatDate(User.birthDate),
  );
  const [alertUserUpdate, setAlertUserUpdate] = useState(false);
  const [alertUserUpdateError, setAlertUserUpdateError] = useState(false);

  const openModal = () => {
    setOpenModalUser(true);
  };

  const closeModal = () => {
    const [day, month, year] = birthDate.split('/');
    const formattedBirthDate = `${year}-${month}-${day}`;

    let userData = { ...User };
    userData.name = nameUser;
    userData.email = emailUser;
    userData.birthDate = new Date(formattedBirthDate).toLocaleDateString(
      'pt-BR',
    );
    userData.skills = skillName;
    userData.jobs = jobsName;
    console.log(userData);
    updateUser(userData.id, userData)
      .then((response) => {
        setAlertUserUpdate(true);
        setOpenModalUser(false);
        onUpdateRequest();
        setTimeout(() => {
          setAlertUserUpdate(false);
        }, 3000);
      })
      .catch((error) => {
        console.log(error);
        setAlertUserUpdateError(true);
        setOpenModalUser(false);
        setTimeout(() => {
          setAlertUserUpdateError(false);
        }, 3000);
      });

    setAlertUserUpdate(false);
  };

  const skills = [
    'Apollo',
    'AntDesign',
    'Bootstrap',
    'CSharp',
    'CSS',
    'Dart',
    'Docker',
    'Elixir',
    'Emotion',
    'Flutter',
    'Git',
    'GitHub',
    'GitLab',
    'Go',
    'GraphQL',
    'HTML',
    'Java',
    'Jenkins',
    'JavaScript',
    'JQuery',
    'Jira',
    'Kotlin',
    'Kubernetes',
    'LESS',
    'Lua',
    'Materialize',
    'MaterialUI',
    'MobX',
    'Node',
    'Perl',
    'PHP',
    'Python',
    'React',
    'ReactNative',
    'Redux',
    'REST',
    'Ruby',
    'R',
    'Rust',
    'SASS',
    'SCSS',
    'Shell',
    'SocketIO',
    'SQL',
    'Stylus',
    'Swift',
    'StyledComponents',
    'Tailwind',
    'TypeScript',
    'WebSockets',
  ];

  const jobs = [
    'Analista',
    'Front-End',
    'Back-End',
    'Full-Stack',
    'DevOps',
    'Mobile',
    'Designer',
    'UX/UI',
    'Product Owner',
    'Scrum Master',
    'PO/SM',
    'Gerente de Projetos',
    'Analista de Testes',
    'QA',
    'Analista de Requisitos',
    'Analista de Sistemas',
    'Analista de Suporte',
    'Analista de Infraestrutura',
    'Analista de Dados',
    'Analista de BI',
    'Analista de Marketing',
    'Analista de SEO',
    'Analista de Redes',
    'Analista de Segurança',
    'Analista de Qualidade',
  ];

  const handleChangeSkill = (event: SelectChangeEvent<typeof skillName>) => {
    const {
      target: { value },
    } = event;
    setSkillName(value instanceof Array ? value : value.split(','));
  };

  const handleChangeJobs = (event: SelectChangeEvent<typeof jobsName>) => {
    const {
      target: { value },
    } = event;
    setJobsName(typeof value === 'string' ? value.split(',') : value);
  };

  const handleBirthDateChange = (event: any) => {
    const date = event.target.value;
    setBirthDate(date);
  };

  function formatDate(dateString: string): string {
    const [day, month, year] = dateString.split('/');
    return `${year}-${month}-${day}`;
  }

  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: 48 * 4.5 + 8,
        width: 250,
      },
    },
  };

  return (
    <div className={style.container}>
      <Snackbar
        open={alertUserUpdate}
        autoHideDuration={3000}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        TransitionComponent={Slide}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--gap-lt)',
          }}
        >
          <Alert severity="info" color="info">
            Dados atualizados com sucesso!
          </Alert>
        </div>
      </Snackbar>
      <Snackbar
        open={alertUserUpdateError}
        autoHideDuration={3000}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        TransitionComponent={Slide}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--gap-lt)',
          }}
        >
          <Alert severity="error" color="error">
            Erro ao atualizar os dados!
          </Alert>
        </div>
      </Snackbar>
      <Modal
        className={style.modalContainer}
        open={openModalUser}
        onClose={closeModal}
        btnText='Salvar'
        iconBtn={<FloppyDisk weight="fill" />}
      >
        <div className={style.headerModal}>
          <span>Atualize os seus dados!</span>
        </div>
        <div className={style.bodyModal}>
          <div className={style.sectionModal}>
            <div className={style.inputContainer}>
              <label htmlFor="userName">Nome</label>
              <input
                id="userName"
                type="text"
                className={style.defaultInput}
                value={nameUser}
                onChange={(e) => setNameUser(e.target.value)}
              />
            </div>
            <div className={style.inputContainer}>
              <label htmlFor="userEmail">E-mail</label>
              <input
                id="userEmail"
                type="text"
                className={style.defaultInput}
                value={emailUser}
                onChange={(e) => setEmailUser(e.target.value)}
              />
            </div>
          </div>
          <div className={style.sectionModal}>
            <div className={style.inputContainer}>
              <label htmlFor="birthDate">Data de Nascimento</label>
              <input
                id="birthDate"
                type="date"
                className={style.defaultInput}
                value={birthDate}
                onChange={handleBirthDateChange}
              />
            </div>
            <div style={{ width: '50%' }}>
              <label htmlFor="skills">Skills</label>
              <Select
                id="skills"
                multiple
                displayEmpty
                fullWidth
                size="small"
                value={skillName}
                onChange={handleChangeSkill}
                input={
                  <OutlinedInput
                    className={style.ipts}
                    sx={{
                      color: 'var(--text-l)',
                      borderColor: 'var(--primary)!important',
                    }}
                  />
                }
                renderValue={(selected) => {
                  if (selected.length === 0) {
                    return <em>Skills</em>;
                  }
                  return selected.join(', ');
                }}
                MenuProps={MenuProps}
              >
                <MenuItem disabled value="">
                  <em style={{ color: 'var(--text-g)' }}>Skills</em>
                </MenuItem>
                {skills.map((skill) => (
                  <MenuItem
                    key={skill}
                    value={skill}
                    style={getStyles(skill, skillName, theme)}
                  >
                    {skill}
                  </MenuItem>
                ))}
              </Select>
            </div>
          </div>
          <div>
            <label htmlFor="jobs">Jobs</label>
            <Select
              id="jobs"
              multiple
              displayEmpty
              fullWidth
              size="small"
              value={jobsName}
              onChange={handleChangeJobs}
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
                  return <em>Jobs</em>;
                }

                return selected.join(', ');
              }}
              MenuProps={MenuProps}
            >
              <MenuItem disabled value="">
                <em style={{ color: 'var(--text-g)' }}>Jobs</em>
              </MenuItem>
              {jobs.map((job) => (
                <MenuItem
                  key={job}
                  value={job}
                  style={getStyles(job, jobsName, theme)}
                >
                  {job}
                </MenuItem>
              ))}
            </Select>
          </div>
        </div>
      </Modal>
      <div className={style.header}>
        <div className={style.imgUser}>
          {User.userImg ? (
            <img src={`${User.userImg}`} alt="Perfil" />
          ) : (
            <img src={logoInclude} alt="Perfil" />
          )}
        </div>
        <div className={style.nameUser}>
          <span>{User.name}</span>
          <IconButton>
            <Pencil weight="fill" onClick={openModal} />
          </IconButton>
        </div>
      </div>
      <div className={style.content}>
        <div className={style.form}>
          <div className={style.field}>
            <span className={style.title}>NOME</span>
            <span className={style.text}>{User.name}</span>
          </div>
          <div className={style.field}>
            <span className={style.title}>E-MAIL</span>
            <span className={style.text}>{User.email}</span>
          </div>
          <div className={style.field}>
            <span className={style.title}>DATA DE NASCIMENTO</span>
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
          <div className={style.skillsTag}>
            <span>Skills</span>
          </div>
          <div className={style.contentSkills}>
            {Array.isArray(User.skills) && User.skills.length > 0 ? (
              User.skills.length > 24 ? (
                <>
                  {User.skills.slice(0, 24).map((skill, index) => (
                    <div
                      key={index}
                      className={style.skills}
                      style={{
                        borderColor:
                          colorsLanguages[
                            skill as keyof typeof colorsLanguages
                          ] || 'var(--primary)',
                      }}
                    >
                      <span>{skill}</span>
                    </div>
                  ))}
                  <span className={style.spanSkillsAmount}>
                    <b>{User.skills.length - 24}</b>
                  </span>
                </>
              ) : (
                User.skills.map((skill, index) => (
                  <div
                    key={index}
                    className={style.skills}
                    style={{
                      borderColor:
                        colorsLanguages[
                          skill as keyof typeof colorsLanguages
                        ] || 'var(--primary)',
                    }}
                  >
                    <span>{skill}</span>
                  </div>
                ))
              )
            ) : (
              <>
                <span className={style.spanSkills}>
                  Nenhuma Skill atribuída
                </span>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Perfil;
