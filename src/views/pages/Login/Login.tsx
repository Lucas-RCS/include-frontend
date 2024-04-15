import { useState, useEffect } from 'react';
import style from './login.module.scss';
import FormLogin from '../../assets/components/Login/Form/Form';
import mascot from '../../../../public/Kode.svg';
import mascot2 from '../../../../public/Kode_secondary.svg';
import logo from '../../../../public/img/logo-include.png';
import { Button } from '@mui/material';

import loginAPI from '../../../api/hooks/login';
import getUserList from '../../../api/hooks/user';

function Login() {
  const [isSwitchState, setIsSwitchState] = useState(false);

  const handleSwitchChange = (checked: boolean) => {
    setIsSwitchState(checked);
  };

  // const data = {
  //   email: 'lucas@gmail.com',
  //   password: '123',
  // };

  // useEffect(() => {
  //   loginAPI(data)
  //     .then(([data]) => {
  //       console.log(data);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }, [data]);

   useEffect(() => {
    getUserList()
      .then(([data]) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  },);

  return (
    <div
      className={isSwitchState ? style.container_secondary : style.container}
    >
      <div className={style.content}>
        <div className={style.container_form}>
          <div className={style.content_form}>
            <FormLogin switchState={isSwitchState} />
          </div>
          <div className={style.switchtype}>
            {isSwitchState ? (
              <span>Já tem uma conta?</span>
            ) : (
              <span>Você ainda não tem conta?</span>
            )}
            <Button
              variant="text"
              color={isSwitchState ? 'secondary' : 'primary'}
              onClick={() => handleSwitchChange(!isSwitchState)}
            >
              {isSwitchState ? 'Login' : 'Cadastrar'}
            </Button>
          </div>
        </div>
        <div
          className={
            isSwitchState
              ? style.container_shape_secondary
              : style.container_shape
          }
        >
          {isSwitchState ? (
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
