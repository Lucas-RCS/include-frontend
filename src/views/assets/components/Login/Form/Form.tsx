import { useState } from 'react';
import { TextField, Button, Tooltip, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import style from './form.module.scss';
import { Login, Register } from '../../../../../api/hooks/login';
import { Eye, EyeSlash, Info } from '@phosphor-icons/react';

interface IFormLogin {
  switchState?: boolean;
  onToastChange: (open: boolean) => void;
}

export default function FormLogin({ switchState, onToastChange }: IFormLogin) {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: switchState ? '' : undefined,
  });

  const hasSpecialCharacters = (password: string) => {
    const regex = /^(?=.*[@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/;
    return regex.test(password);
  };

  const handleButtonClick = () => {
    switchState
      ? Register(formData)
          .then((data) => {
            navigate('/main', { state: { active: switchState, data } });
          })
          .catch((error) => {
            console.log(error);
            onToastChange(true);
            setTimeout(() => {
              onToastChange(false);
            }, 2000);
          })
      : Login(formData)
          .then((data) => {
            navigate('/main', { state: { active: switchState, data } });
          })
          .catch((error) => {
            console.log(error);
            onToastChange(true);
            setTimeout(() => {
              onToastChange(false);
            }, 2000);
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
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleButtonClick();
              }
            }}
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
          label="E-mail"
          variant="outlined"
          size="small"
          color={switchState ? 'secondary' : 'primary'}
          inputProps={{ maxLength: 30 }}
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleButtonClick();
            }
          }}
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
        <div className={style.contentPassword}>
          <TextField
            fullWidth
            type={showPassword ? 'text' : 'password'}
            label="Senha"
            size="small"
            variant="outlined"
            color={switchState ? 'secondary' : 'primary'}
            inputProps={{ maxLength: 20 }}
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleButtonClick();
              }
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderRadius: '12px ',
                },
                width: 'calc(100% + 3dvw)',
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
          <div className={style.eyeBtn}>
            <IconButton
              onClick={() => {
                setShowPassword(!showPassword);
              }}
            >
              {showPassword ? (
                <EyeSlash
                  size={22}
                  weight="regular"
                  color={switchState ? 'var(--secondary)' : 'var(--primary)'}
                />
              ) : (
                <Eye
                  size={22}
                  weight="regular"
                  color={switchState ? 'var(--secondary)' : 'var(--primary)'}
                />
              )}
            </IconButton>
          </div>
          <Tooltip
            title="Sua senha deve conter pelo menos 8 caracteres, incluindo letras maiúsculas e minúsculas, números e caracteres especiais."
            arrow
            placement="right"
          >
            <Info
              size={24}
              weight="regular"
              color={switchState ? 'var(--secondary)' : 'var(--primary)'}
            />
          </Tooltip>
        </div>
      </div>
      <Button
        size="medium"
        variant="contained"
        color={switchState ? 'secondary' : 'primary'}
        disabled={switchState && !hasSpecialCharacters(formData.password)}
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
