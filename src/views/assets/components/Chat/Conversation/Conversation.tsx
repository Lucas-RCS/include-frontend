import { useEffect, useState } from 'react';
import { Avatar, IconButton, TextField } from '@mui/material';
import style from './conversation.module.scss';
import { PaperPlaneTilt } from '@phosphor-icons/react';
import { getChat, sendMessage } from '../../../../../api/hooks/chat';
import moment from 'moment';

interface IConversationProps {
  conversationId: number | null;
  friendshipId: number | null;
  nameFriend: string | null;
  currentUserId: number;
}

function Conversation({
  conversationId,
  friendshipId,
  nameFriend,
  currentUserId,
}: IConversationProps) {
  const [messagesList, setMessagesList] = useState<any[]>([]);
  const [message, setMessage] = useState<string>('');

  useEffect(() => {
    getMessages();
  }, [conversationId, friendshipId, nameFriend]);

  const getMessages = () => {
    if (
      conversationId !== null &&
      friendshipId !== null &&
      nameFriend !== null
    ) {
      getChat(friendshipId!, conversationId!)
        .then((response) => {
          setMessagesList(response[0].content.reverse());
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const sendNewMessage = () => {
    const data = {
      bodyMessage: {
        text: message,
      },
    };

    sendMessage(friendshipId!, data)
      .then((response) => {
        getMessages();
        setMessage('');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className={style.container}>
      <div className={style.header}>
        <div className={style.infoUser}>
          <Avatar />
          <span>{nameFriend}</span>
        </div>
      </div>
      <div className={style.messages}>
        {messagesList.map((message) => (
            <div
              className={style.cardMessage}
              key={`${message.id}-${message.date}`}
              style={{
                alignSelf:
                  message.idAuthorMessage === currentUserId ? 'flex-end' : 'flex-start',
              }}
            >
              <span>{message.body.text}</span>
            </div>
          ))}
      </div>
      <div className={style.newMessage}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Digite uma mensagem..."
          size="small"
          color="primary"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              sendNewMessage();
            }
          }}
          inputProps={{ maxLength: 250 }}
          sx={{
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderRadius: '12px ',
              },
              borderRadius: '12px ',
              color: 'var(--text-l)',
              '&:hover fieldset': {
                borderColor: 'var(--primary)',
              },
            },
          }}
        />
        <IconButton
          color="primary"
          onClick={sendNewMessage}
          sx={{
            backgroundColor: 'var(--primary)',
            color: 'var(--texl-l)',
            '&:hover': {
              backgroundColor: 'var(--intermediary)',
            },
          }}
        >
          <PaperPlaneTilt color="var(--text-l)" weight="fill" />
        </IconButton>
      </div>
    </div>
  );
}

export default Conversation;
