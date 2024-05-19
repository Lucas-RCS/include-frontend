import React, { useEffect, useRef, useState } from 'react';
import {
  Select,
  Theme,
  useTheme,
  SelectChangeEvent,
  MenuItem,
  IconButton,
  OutlinedInput,
} from '@mui/material';
import style from './formUserModal.module.scss';
import { Image } from '@phosphor-icons/react';

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

interface IFormUserModal {
  formData: (formData: any) => void;
}

function FormUserModal(props: IFormUserModal) {
  const theme = useTheme();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [skillName, setSkillName] = React.useState<string[]>([]);
  const [jobsName, setJobsName] = React.useState<string[]>([]);
  const [birthDate, setBirthDate] = React.useState<string>('');
  const [formData, setFormData] = React.useState({
    userImg: '',
    birthDate: '',
    skills: [],
    jobs: [],
  });

  const handleFormChange = (field: any, value: any) => {
    switch (field) {
      case 'skills':
        setSkillName(value);
        break;
      case 'jobs':
        setJobsName(value);
        break;
      case 'userImg':
        setSelectedImage(value);
        break;
      default:
        setFormData((prevData) => ({
          ...prevData,
          [field]: value,
        }));
        break;
    }
  };

  useEffect(() => {

    if (
      skillName !== formData.skills ||
      jobsName !== formData.jobs ||
      birthDate !== formData.birthDate ||
      selectedImage !== formData.userImg
    ) {
      const updatedFormData = {
        ...formData,
        skills: skillName,
        jobs: jobsName,
        birthDate: birthDate,
        userImg: selectedImage,
      };
      props.formData(updatedFormData);
    }

  }, [skillName, jobsName, birthDate, selectedImage]);

  const handleChangeSkill = (event: SelectChangeEvent<typeof skillName>) => {
    const {
      target: { value },
    } = event;
    setSkillName(typeof value === 'string' ? value.split(',') : value);
    handleFormChange(
      'skills',
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  const handleChangeJobs = (event: SelectChangeEvent<typeof jobsName>) => {
    const {
      target: { value },
    } = event;
    setJobsName(typeof value === 'string' ? value.split(',') : value);
    handleFormChange(
      'jobs',
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  const handleBirthDateChange = (event: any) => {
    const birthDate = event.target.value;
    const formattedBirthDate = new Date(birthDate).toLocaleDateString('pt-BR');
    setBirthDate(formattedBirthDate);
    handleFormChange('birthDate', formattedBirthDate);
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
      if (fileSize > 5) {
        alert(
          'O arquivo de imagem é muito grande. Por favor, selecione uma imagem de até 5 MB.',
        );
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
        handleFormChange('userImg', e.target?.result as string);
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  return (
    <div className={style.container}>
      <div className={style.perfil_image}>
        <IconButton
          onClick={HandleUserImg}
          className={style.user_img_btn}
          color="primary"
        >
          {selectedImage ? (
            <img src={selectedImage} alt="User Image" />
          ) : (
            <Image size={40} />
          )}
          <input
            type="file"
            id="images"
            className={style.ipt_img}
            accept="image/png, image/jpeg"
            ref={iptRef}
            onChange={handleImageChange}
          />
        </IconButton>
        <span>Foto de Perfil</span>
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          width: '100%',
          gap: 'var(--gap-sm)',
        }}
      >
        <div className={style.birthDate}>
          <label htmlFor="birthDate">Data de Nascimento</label>
          <input
            id="birthDate"
            type="date"
            className={style.date_inpt}
            onChange={handleBirthDateChange}
          />
        </div>
        <div>
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
                sx={{ color: 'var(--text-l)', borderColor: 'var(--primary)' }}
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
    </div>
  );
}

export default FormUserModal;
