import style from './chat.module.scss';
import Conversation from './Conversation/Conversation';

function Chat() {
  return (
    <div className={style.container}>
      <div className={style.menu}>

      </div>
      <div className={style.chat}>
        <Conversation />
      </div>
    </div>
  );
}

export default Chat;
