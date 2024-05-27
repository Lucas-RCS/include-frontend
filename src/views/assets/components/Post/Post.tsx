import { useEffect, useState } from 'react';
import style from './post.module.scss';
import { IconButton } from '@mui/material';
import {
  ChatCircleDots,
  DotOutline,
  Heart,
  SealCheck,
} from '@phosphor-icons/react';
import moment from 'moment';
import { userList } from '../../../../api/hooks/user';

import CodeEditor from '@uiw/react-textarea-code-editor';

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
  post: {
    id: number;
    author: number;
    body: {
      text: string;
      code: string;
      language: string;
      image: string;
    };
    date: string;
    updateDate: string;
    likes: number;
    comments: [];
    images: [];
    likesIdUser: [];
  };
}

function Post({ currentUser, post }: IPost) {
  const [likeState, setLikeState] = useState(false);
  const [randomColor, setRandomColor] = useState('');
  const [usersList, setUsersList] = useState([]);
  const [userName, setUserName] = useState('');
  const [languageName] = useState(post.body.language);
  const [code, setCode] = useState(post.body.code);
  const [selectedImage] = useState<string | null>(
    post.body.image,
  );

  useEffect(() => {
    getUserList();
    generateRandomColor();
  }, []);

  const getUserList = () => {
    userList()
      .then((response) => {
        const users = response[0].content;
        setUsersList(users);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const findUserNameById = (userId: number, usersList: any[]) => {
    const user = usersList.find((user) => user.id === userId);
    return user ? user.name : '';
  };

  useEffect(() => {
    const userName = findUserNameById(post.author, usersList);
    setUserName(userName);
  }, [post.author, usersList]);

  // Função para gerar uma cor aleatória
  const generateRandomColor = () => {
    const hue = Math.floor(Math.random() * 360);
    const saturation = 60;
    const lightness = 50;

    const color = `hsl(${hue}, ${saturation}%, ${lightness}%)`;

    setRandomColor(color);
  };

  const handleLike = () => {
    setLikeState(!likeState);
  };

  const image = '';
  // 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==';

  const formatDateForMoment = (updateDate: string) => {
    const formattedDate = moment(updateDate, 'DD/MM/YYYY').format('YYYY-MM-DD');
    return formattedDate;
  };

  moment.locale('pt-br');
  const datePost = moment(formatDateForMoment(post.updateDate))
    .startOf('days')
    .fromNow();

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
                      currentUser?.name !== userName
                        ? randomColor
                        : 'var(--primary)',
                  }}
                >
                  {userName && userName.substring(0, 2).toUpperCase()}
                </span>
              )}
            </IconButton>
          </div>
          <div className={style.userInfo}>
            <div className={style.userName}>
              {userName}
              <SealCheck color="var(--primary)" size={18} weight="fill" />
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
          <p>{post.body.text}</p>
        </div>
        <div className={style.body}>
        {code ? (
          <CodeEditor
            value={code}
            language={languageName}
            readOnly
            onChange={(evn) => setCode(evn.target.value)}
            style={{
              width: '100%',
              height: '100%',
              maxHeight: '30dvh',
              borderRadius: 'var(--bd-rds-lt)',
              backgroundColor: 'var(--background)',
              overflowY: 'auto',
            }}
          />
        ) : null}
        {selectedImage ? (
          <img
            src={selectedImage}
            alt="Post"
            style={{
              width: '100%',
              height: '100%',
              maxHeight: '30dvh',
              borderRadius: 'var(--bd-rds-lt)',
              objectFit: 'cover',
            }}
          />
        ) : null}
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
          <span>{post.likes} likes</span>
        </div>
        <div className={style.comments}>
          <IconButton color="default">
            <ChatCircleDots weight="regular" />
          </IconButton>
          <span>{post.comments.length} comentarios</span>
        </div>
      </div>
    </div>
  );
}

export default Post;
