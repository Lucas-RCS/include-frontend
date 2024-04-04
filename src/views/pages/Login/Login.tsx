import { useState } from 'react';
import style from './login.module.scss';
import FormLogin from '../../assets/components/Login/Form/Form';
import mascot from '../../../../public/Kode.svg';
import mascot2 from '../../../../public/Kode_secondary.svg';
import logo from '../../../../public/img/logo-include.png';
import { Button } from '@mui/material';

const rootStyle = getComputedStyle(document.documentElement);

const cssVariables = {
  primary: rootStyle.getPropertyValue('--primary').trim(),
  secondary: rootStyle.getPropertyValue('--secondary').trim(),
};

function Login() {
  const [isSwitchChecked, setIsSwitchChecked] = useState(false);

  const handleSwitchChange = (checked: boolean) => {
    setIsSwitchChecked(checked);
  };

  return (
    <div
      className={isSwitchChecked ? style.container_secondary : style.container}
    >
      <div className={style.content}>
        <div className={style.container_form}>
          <div className={style.content_form}>
            <FormLogin switchStage={isSwitchChecked} />
          </div>
          <div className={style.switchtype}>
            {isSwitchChecked ? (
              <span>Já tem uma conta?</span>
            ) : (
              <span>Você ainda não tem conta?</span>
            )}
            <Button
              variant="text"
              color={isSwitchChecked ? 'secondary' : 'primary'}
              onClick={() => handleSwitchChange(!isSwitchChecked)}
            >
              {isSwitchChecked ? 'Login' : 'Cadastrar'}
            </Button>
          </div>
        </div>
        <div
          className={
            isSwitchChecked
              ? style.container_shape_secondary
              : style.container_shape
          }
        >
          {isSwitchChecked ? (
            <object type="image/svg+xml" data={mascot2}></object>
          ) : (
            <object type="image/svg+xml" data={mascot}></object>
          )}
        </div>
      </div>
      <div className={style.footer}>
        <span>powered by</span>
        <img src={logo} alt="IncludeTeam" />
        <span>Include Team</span>
      </div>
    </div>
  );
}

export default Login;
