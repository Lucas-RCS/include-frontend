import { TextField, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import style from './form.module.scss';
import icon from '../../../../../../public/icon.png';
import icon2 from '../../../../../../public/icon_secondary.png';

interface IFormLogin {
  switchStage?: boolean;
}

export default function FormLogin({ switchStage }: IFormLogin) {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/main');
    new window.Notification('Bem-vindo!', {
      body: 'Você está logado!',
      icon: icon,
    });
  };

  return (
    <div className={style.container}>
      <div className={style.logo}>
        <span>Bem Vindo(a)!!</span>
      </div>
      <div className={style.container_inputs}>
        <TextField
          fullWidth
          label="Nome"
          variant="outlined"
          size="small"
          color={switchStage ? 'secondary' : 'primary'}
          inputProps={{ maxLength: 20 }}
          sx={{
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderRadius: '12px ',
              },
              borderRadius: '12px ',
              color: 'var(--text-l)',
            },
            animation: 'fadeInUp 0.5s ease-out forwards',
          }}
        />
        {switchStage ? (
          <TextField
            fullWidth
            type="email"
            label="Email"
            size="small"
            variant="outlined"
            inputProps={{ maxLength: 32 }}
            color={switchStage ? 'secondary' : 'primary'}
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderRadius: '12px ',
                },
                borderRadius: '12px ',
                color: 'var(--text-l)',
              },
              animation: 'fadeInUp 0.5s ease-out forwards',
            }}
          />
        ) : (
          ''
        )}
        <TextField
          fullWidth
          type="password"
          label="Senha"
          size="small"
          variant="outlined"
          color={switchStage ? 'secondary' : 'primary'}
          inputProps={{ maxLength: 20 }}
          sx={{
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderRadius: '12px ',
              },
              borderRadius: '12px ',
              color: 'var(--text-l)',
            },
            animation: 'fadeInUp 0.5s ease-out forwards',
          }}
        />
      </div>
      <Button
        size="medium"
        variant="contained"
        color={switchStage ? 'secondary' : 'primary'}
        sx={{
          borderRadius: '12px ',
          fontWeight: 'bold',
          animation: 'fadeInUp 0.5s ease-out forwards',
          color: 'var(--background)',
        }}
        onClick={handleButtonClick}
      >
        {switchStage ? 'Cadastrar' : 'Login'}
      </Button>
    </div>
  );
}
