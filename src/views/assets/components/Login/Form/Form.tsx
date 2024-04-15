import { TextField, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import style from './form.module.scss';
import icon from '../../../../../../public/icon.png';

interface IFormLogin {
  switchState?: boolean;
}

export default function FormLogin({ switchState }: IFormLogin) {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/main', { state: { active: switchState } });
    switchState
      ? new window.Notification('Bem-vindo!', {
          body: 'Finalize seu cadastro!',
          icon: icon,
        })
      : new window.Notification('Bem-vindo!', {
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
        {switchState ? (
          <TextField
            fullWidth
            label="Nome"
            variant="outlined"
            size="small"
            color={switchState ? 'secondary' : 'primary'}
            inputProps={{ maxLength: 30 }}
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderRadius: '12px ',
                },
                borderRadius: '12px ',
                color: 'var(--text-l)',
                '&:hover fieldset': {
                  borderColor: switchState
                    ? 'var(--secondary)'
                    : 'var(--primary)',
                },
              },
              animation: 'fadeInUp 0.5s ease-out forwards',
            }}
          />
        ) : (
          ''
        )}
        <TextField
          fullWidth
          type="email"
          label="Email"
          variant="outlined"
          size="small"
          color={switchState ? 'secondary' : 'primary'}
          inputProps={{ maxLength: 30 }}
          sx={{
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderRadius: '12px ',
              },
              borderRadius: '12px ',
              color: 'var(--text-l)',
              '&:hover fieldset': {
                borderColor: switchState
                  ? 'var(--secondary)'
                  : 'var(--primary)',
              },
            },
            animation: 'fadeInUp 0.5s ease-out forwards',
          }}
        />
        <TextField
          fullWidth
          type="password"
          label="Senha"
          size="small"
          variant="outlined"
          color={switchState ? 'secondary' : 'primary'}
          inputProps={{ maxLength: 20 }}
          sx={{
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderRadius: '12px ',
              },
              borderRadius: '12px ',
              color: 'var(--text-l)',
              '&:hover fieldset': {
                borderColor: switchState
                  ? 'var(--secondary)'
                  : 'var(--primary)',
              },
            },
            animation: 'fadeInUp 0.5s ease-out forwards',
          }}
        />
      </div>
      <Button
        size="medium"
        variant="contained"
        color={switchState ? 'secondary' : 'primary'}
        sx={{
          fontWeight: 'bold',
          animation: 'fadeInUp 0.5s ease-out forwards',
          color: 'var(--background)',
        }}
        onClick={handleButtonClick}
      >
        {switchState ? 'Cadastrar' : 'Login'}
      </Button>
    </div>
  );
}
