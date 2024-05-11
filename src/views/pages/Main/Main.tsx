import { useEffect, useState } from 'react';
import Sidebar from '../../assets/components/Sidebar/Sidebar';
import style from './main.module.scss';
import Home from '../../assets/components/Home/home';
import Friends from '../../assets/components/Friends/friends';
import Chat from '../../assets/components/Chat/chat';
import Perfil from '../../assets/components/Perfil/perfil';
import { useLocation } from 'react-router-dom';
import Modal from '../../assets/components/Modal/modal';
import { Alert, Snackbar, Slide } from '@mui/material';
import getUser from '../../../api/hooks/user';
import FormUserModal from '../../assets/components/Modal/FormUser/formUserModal';

function Main() {
  const [currentView, setCurrentView] = useState('home');
  const [open, setOpen] = useState(false);
  const [userData, setUserData] = useState<{ error: boolean; content: any }[]>(
    [],
  );

  const handleViewChange = (view: string) => {
    setCurrentView(view);
  };

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string,
  ) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const location = useLocation();
  const fistLogin = location.state?.active;
  const user = location.state?.data;
  const id_user = user[0].content.id;

  useEffect(() => {
    getUser(id_user)
      .then((response) => {
        const [data] = response;
        setUserData([data]);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id_user]);

  useEffect(() => {
    setOpen(true);
  }, []);

  const onModalClose = () => {
    console.log(userData[0].content);
  };

  const updateUserData = (newData: any) => {
    setUserData((prevData) => {
      const updatedData = [...prevData];
      updatedData[0].content = {...updatedData[0].content,...newData };
      return updatedData;
    });
  };

  const handleFormSubmit = (formData: any) => {
    updateUserData(formData);
  };

  return (
    <div className={style.container}>
      {fistLogin ? (
        <Snackbar
          open={open}
          autoHideDuration={3000}
          onClose={handleClose}
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
            <Alert severity="success" color="success">
              Cadastro realizado com sucesso!
            </Alert>
            <Alert severity="info" color="info">
              Por favor preencha os dados restantes para começar a usar o
              aplicativo.
            </Alert>
          </div>
        </Snackbar>
      ) : (
        <Snackbar
          open={open}
          autoHideDuration={3000}
          onClose={handleClose}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          TransitionComponent={Slide}
        >
          <Alert severity="success" color="success">
            Login realizado com sucesso!
          </Alert>
        </Snackbar>
      )}
      {fistLogin && (
        <Modal
          className={style.modalContainer}
          open={fistLogin}
          onClose={onModalClose}
          setOpen={() => {}}
        >
          <div className={style.modalContent}>
            <div className={style.header}>
              <h1>Seja bem vindo(a)!</h1>
              <p>Para começar a usar o aplicativo, preencha seu perfil.</p>
            </div>
            <div className={style.bodyModal}>
              <FormUserModal formData={handleFormSubmit} />
            </div>
          </div>
        </Modal>
      )}
      <div className={style.sidebar}>
        <Sidebar onViewChange={handleViewChange} idUser={id_user} />
      </div>
      <div className={style.content}>
        {currentView === 'home' && <Home />}
        {currentView === 'friends' && <Friends />}
        {currentView === 'chat' && <Chat />}
        {currentView === 'perfil' && <Perfil User={userData[0]?.content} />}
      </div>
    </div>
  );
}

export default Main;
