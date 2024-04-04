import { useState } from 'react';
import Sidebar from '../../assets/components/Sidebar/Sidebar';
import style from './main.module.scss';
import Home from '../../assets/components/Home/home';
import Friends from '../../assets/components/Friends/friends';
import Chat from '../../assets/components/Chat/chat';

function Main() {
  const [currentView, setCurrentView] = useState('home');

  const handleViewChange = (view: string) => {
    setCurrentView(view);
  };

  return (
    <div className={style.container}>
      <div className={style.sidebar}>
        <Sidebar onViewChange={handleViewChange}/>
      </div>
      <div className={style.content}>
        {currentView === 'home' && <Home />}
        {currentView === 'friends' && <Friends />}
        {currentView === 'chat' && <Chat />}
      </div>
    </div>
  );
}

export default Main;
