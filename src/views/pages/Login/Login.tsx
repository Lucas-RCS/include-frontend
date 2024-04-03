import { useState } from 'react';
import style from './login.module.scss';
import FormLogin from '../../assets/components/Login/Form/Form';
import mascot from '../../../../public/Kode.svg';
import mascot2 from '../../../../public/Kode_secondary.svg';
import logo from '../../../../public/img/logo-include.png';
import { Divider } from '../../assets/elements/common';
import { Button } from '@mui/material';

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
          <Divider $primary $width="80%" $height="2px"/>
          <div className={style.switchtype}>
            <Button variant="text"  onClick={() => handleSwitchChange(!isSwitchChecked)}>
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
