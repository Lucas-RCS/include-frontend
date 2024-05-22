import { useEffect, useState } from 'react';
import style from './post.module.scss';
import { IconButton } from '@mui/material';
import {
  ChatCircleDots,
  DotOutline,
  Heart,
  UserCircle,
} from '@phosphor-icons/react';
import moment from 'moment';

interface IPost {
  currentUser: {
    id: number;
    name: string;
    email: string;
    birthDate: string;
    skills: string[];
    jobs: string[];
    userImg: string;
  };
}

function Post({ currentUser }: IPost) {
  const [likeState, setLikeState] = useState(false);
  const [randomColor, setRandomColor] = useState('');

  // Função para gerar uma cor aleatória
  const generateRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    setRandomColor(color);
  };

  useEffect(() => {
    generateRandomColor();
  }, []);

  const handleLike = () => {
    setLikeState(!likeState);
  };

  const image = '';
  // 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==';
  const name = 'User Name';

  moment.locale('pt-br');
  const datePost = moment('2024-05-21T11:30:00').startOf('minute').fromNow();

  return (
    <div className={style.container}>
      <div className={style.header}>
        <div className={style.user}>
          <div className={style.userAvatar}>
            <IconButton
              color="primary"
              sx={{
                backgroundColor: 'var(--background)',
                borderRadius: 'var(--bd-rds-sm)',
                padding: 'var(--padding-lt)',
              }}
            >
              {image ? (
                <img src={`${image}`} alt="User Icon" />
              ) : (
                <span
                  style={{
                    color:
                      currentUser?.name !== name
                        ? randomColor
                        : 'var(--primary)',
                  }}
                >
                  {name && name.substring(0, 2).toUpperCase()}
                </span>
              )}
            </IconButton>
          </div>
          <div className={style.userInfo}>
            <div className={style.userName}>
              {name}
              <UserCircle color="var(--primary)" weight="fill" />
            </div>
            <div className={style.userDate}>
              <DotOutline weight="fill" size={26} />
              {datePost}
            </div>
          </div>
        </div>
      </div>
      <div className={style.content}>
        <div className={style.textPost}>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
            vehicula, nisl sed tincidunt fermentum, nunc justo fringilla nunc,
            quis ultricies justo mi et nunc. Nullam vehicula, nisl sed tincidunt
            fermentum, nunc justo fringilla nunc, quis ultricies justo mi et
            nunc.
          </p>
        </div>
      </div>
      <div className={style.footer}>
        <div className={style.like}>
          <IconButton
            color={likeState ? 'error' : 'primary'}
            onClick={handleLike}
          >
            <Heart weight={likeState ? 'fill' : 'bold'} />
          </IconButton>
          <span>100 likes</span>
        </div>
        <div className={style.comments}>
          <IconButton color="default">
            <ChatCircleDots weight="regular" />
          </IconButton>
          <span>100 comentarios</span>
        </div>
      </div>
    </div>
  );
}

export default Post;
