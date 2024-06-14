import { useEffect, useState } from 'react';
import style from './chat.module.scss';
import Conversation from './Conversation/Conversation';
import { getListFriendsUser } from '../../../../api/hooks/friendship';
import { Avatar, Button } from '@mui/material';

interface IFriends {
  User: {
    id: number;
    name: string;
    email: string;
    birthDate: string;
    skills: string[];
    jobs: string[];
    imageIconProfile: string;
  };
}

function Chat({ User }: IFriends) {
  const [friendsList, setFriendsList] = useState<any[]>([]);
  const [conversationId, setConversationId] = useState<number | null>(null);
  const [idFriendship, setIdFriendship] = useState<number | null>(null);
  const [nameFriend, setNameFriend] = useState<string | null>(null);

  useEffect(() => {
    getFriendsList();
  }, []);

  const getFriendsList = () => {
    getListFriendsUser(User.id)
     .then((response) => {
        setFriendsList(response[0].content);
        if (response[0].content.length > 0) {
          const firstFriend = response[0].content[0];
          setConversationId(firstFriend.id);
          setIdFriendship(firstFriend.friendshipId);
          setNameFriend(firstFriend.name);
        }
      })
     .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className={style.container}>
      <div className={style.menu}>
        <span className={style.textHeader}>Amigos</span>
        <div className={style.friends}>
          {friendsList.map((friend) => (
            <Button
              key={friend.id}
              variant="contained"
              fullWidth
              size="small"
              onClick={() => {
                setConversationId(friend.id);
                setIdFriendship(friend.friendshipId);
                setNameFriend(friend.name);
              }}
              sx={{
                display: 'flex',
                justifyContent: 'flex-start',
                padding: 'var(--padding-lt)',
                gap: 'var(--gap-lg)',
                paddingInline: 'var(--padding-sm)',
                color: 'var(--text-l)',
                fontWeight: 'var(--fnt-wg-lg)',
                fontSize: 'var(--fnt-sz-sm)',
                borderRadius: 'var(--bd-rds-lt)',
                backgroundColor: idFriendship === friend.friendshipId ? 'var(--primary)' : 'var(--background)',
                boxShadow: 'none',
                '&:hover': {
                  backgroundColor: 'var(--primary)',
                  color: 'var(--text-d)',
                },
              }}
            >
              <Avatar
                color="primary"
                sx={{
                  backgroundColor: 'var(--background)',
                  padding: friend.imageIconProfile ? '0' : 'var(--padding-md)',
                  borderRadius: 'var(--bd-rds-xl)',
                  minWidth: '48px',
                  minHeight: '48px',
                }}
              >
                {friend.imageIconProfile ? (
                  <img
                    src={`${friend.imageIconProfile}`}
                    alt="User Icon"
                    style={{
                      borderRadius: 'var(--bd-rds-xl)',
                      minHeight: '28px',
                    }}
                  />
                ) : (
                  <span
                    style={{
                      color: 'var(--primary)',
                      fontWeight: 'var(--fnt-wg-lg)',
                    }}
                  >
                    {friend.name && friend.name.substring(0, 2).toUpperCase()}
                  </span>
                )}
              </Avatar>
              <span className={style.nameUser}>{friend.name}</span>
            </Button>
          ))}
        </div>
      </div>
      <div className={style.chat}>
        <Conversation
          conversationId={conversationId}
          friendshipId={idFriendship}
          nameFriend={nameFriend}
          currentUserId={User.id}
        />
      </div>
    </div>
  );
}

export default Chat;
