import { useState } from 'react';
import style from './login.module.scss';
import FormLogin from '../../assets/components/Login/Form/Form';
import mascot from '../../../../public/Kode.svg';
import mascot2 from '../../../../public/Kode_secondary.svg';
import logo from '../../../../public/img/logo-include.png';
import { Button, Alert, Snackbar, Slide } from '@mui/material';

function Login() {
  const [isSwitchState, setIsSwitchState] = useState(false);
  const [openToast, setOpenToast] = useState(false);

  const handleSwitchChange = (checked: boolean) => {
    setIsSwitchState(checked);
  };

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string,
  ) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenToast(false);
  };

  return (
    <div
      className={isSwitchState ? style.container_secondary : style.container}
    >
      {openToast && (
        <Snackbar
          open={openToast}
          autoHideDuration={3000}
          onClose={handleClose}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          TransitionComponent={Slide}
        >
          <Alert severity="error" color="error">
            Ocorreu um erro, por favor tente novamente!
          </Alert>
        </Snackbar>
      )}
      <div className={style.content}>
        <div className={style.container_form}>
          <div className={style.content_form}>
            <FormLogin
              switchState={isSwitchState}
              onToastChange={setOpenToast}
            />
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
