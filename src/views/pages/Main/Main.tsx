import { useState } from 'react';
import Sidebar from '../../assets/components/Sidebar/Sidebar';
import style from './main.module.scss';
import Home from '../../assets/components/Home/home';
import Friends from '../../assets/components/Friends/friends';
import Chat from '../../assets/components/Chat/chat';
import Perfil from '../../assets/components/Perfil/perfil';
import { useLocation } from 'react-router-dom';
import Modal from '../../assets/components/Modal/modal';

function Main() {
  const [currentView, setCurrentView] = useState('home');

  const handleViewChange = (view: string) => {
    setCurrentView(view);
  };

  const location = useLocation();
  const fistLogin = location.state?.active;

  return (
    <div className={style.container}>
      {fistLogin && (
        <Modal
          className={style.modalContainer}
          open={fistLogin}
          onClose={() => {}}
          setOpen={() => {}}
        >
          <div className={style.modalContent}>
            <div className={style.header}>
              <h1>Seja bem vindo(a)!</h1>
              <p>Para começar a usar o aplicativo, preencha seu perfil.</p>
            </div>
          </div>
        </Modal>
      )}
      <div className={style.sidebar}>
        <Sidebar onViewChange={handleViewChange} />
      </div>
      <div className={style.content}>
        {currentView === 'home' && <Home />}
        {currentView === 'friends' && <Friends />}
        {currentView === 'chat' && <Chat />}
        {currentView === 'perfil' && <Perfil />}
      </div>
    </div>
  );
}

export default Main;
