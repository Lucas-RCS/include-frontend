import { useEffect, useState } from 'react';
import style from './post.module.scss';
import { Avatar, Button, Divider, IconButton } from '@mui/material';
import {
  ChatCircleDots,
  DotOutline,
  DotsThreeOutlineVertical,
  FloppyDisk,
  Heart,
  Pencil,
  SealCheck,
  Trash,
  X,
} from '@phosphor-icons/react';
import moment from 'moment';
import { userList } from '../../../../api/hooks/user';
import { likes } from '../../../../api/hooks/posts';
import Modal from '../Modal/modal';
import { newComment, deletePost } from '../../../../api/hooks/posts';

import CodeEditor from '@uiw/react-textarea-code-editor';
import NewComments from './NewComment/NewComment';

interface IPost {
  currentUser: {
    id: number;
    name: string;
    email: string;
    birthDate: string;
    skills: string[];
    jobs: string[];
    imageIconProfile: string;
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
  updateFeed: () => void;
}

function Post({ currentUser, post, updateFeed }: IPost) {
  const [likeState, setLikeState] = useState(false);
  const [randomColor, setRandomColor] = useState('');
  const [usersList, setUsersList] = useState([]);
  const [userName, setUserName] = useState('');
  const [languageName] = useState(post.body.language);
  const [code, setCode] = useState(post.body.code);
  const [selectedImage] = useState<string | null>(post.body.image);
  const [dropdown, setDropdown] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [editPost, setEditPost] = useState(false);
  const [textAreaHeight, setTextAreaHeight] = useState('auto');
  const [textAreaValue, setTextAreaValue] = useState<string | null>(
    post.body.text,
  );

  useEffect(() => {
    getUserList();
    generateRandomColor();
  }, []);

  useEffect(() => {
    if (currentUser) {
      const isCurrentUserLiked = post.likesIdUser.some(
        (likeId) => likeId === currentUser.id,
      );
      setLikeState(isCurrentUserLiked);
    }
  }, [post, currentUser]);

  useEffect(() => {
    const userName = findUserNameById(post.author, usersList);
    setUserName(userName);
  }, [post.author, usersList]);

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

  // Função para gerar uma cor aleatória
  const generateRandomColor = () => {
    const hue = Math.floor(Math.random() * 360);
    const saturation = 60;
    const lightness = 50;

    const color = `hsl(${hue}, ${saturation}%, ${lightness}%)`;

    setRandomColor(color);
  };

  const handleLike = () => {
    likes(post.id, !likeState)
      .then((response) => {
        setLikeState(!likeState);
        updateFeed();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const createNewComment = (data: any) => {
    newComment(post.id, data)
      .then((response) => {})
      .catch((error) => {
        console.log(error);
      });
  };

  const postDelete = () => {
    deletePost(post.id)
      .then((response) => {
        setOpenModalDelete(false);
        updateFeed();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const image = '';
  // 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==';

  const formatDateForMoment = (updateDate: string) => {
    const formattedDate = moment(updateDate, 'DD/MM/YYYY HH:mm:ss').format(
      'YYYY-MM-DD HH:mm:ss',
    );
    return formattedDate;
  };

  moment.locale('pt-br');
  const datePost = moment(formatDateForMoment(post.updateDate)).fromNow();

  const findUserPostInUserList = (userId: number, usersList: any[]) => {
    const user = usersList.find((user) => user.id === userId);
    return user;
  };

  const extendDatePost = moment(formatDateForMoment(post.updateDate)).format(
    'LLLL',
  );

  const handleTextAreaChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const value = event.target.value;
    setTextAreaValue(value);
    setTextAreaHeight('auto');
    const scrollHeight = event.target.scrollHeight;
    const clientHeight = event.target.clientHeight;
    if (scrollHeight > clientHeight) {
      setTextAreaHeight(`${scrollHeight}px`);
    }
  };

  return (
    <>
      <div className={style.container}>
        <div className={style.header}>
          <div className={style.user}>
            <div className={style.contentUser}>
              <div className={style.userAvatar}>
                <Avatar
                  color="primary"
                  sx={{
                    backgroundColor: 'var(--background)',
                    padding: 'var(--padding-md)',
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
                        fontWeight: 'var(--fnt-wg-lg)',
                      }}
                    >
                      {userName && userName.substring(0, 2).toUpperCase()}
                    </span>
                  )}
                </Avatar>
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
            {currentUser?.name == userName ? (
              <div className={style.actions}>
                {editPost ? (
                  <div
                    style={{
                      display: 'flex',
                      gap: 'var(--gap-sm)',
                    }}
                  >
                    <Button
                      variant="outlined"
                      size="small"
                      color="error"
                      sx={{
                        borderRadius: 'var(--bd-rds-md)',
                        background: 'var(--background)',
                        border: '0',
                        paddingInline: 'var(--padding-sm)',
                        '&:hover': {
                          border: '0',
                        },
                      }}
                      onClick={() => setEditPost(false)}
                    >
                      Cancelar
                    </Button>
                    <Button
                      variant="outlined"
                      size="small"
                      color="primary"
                      sx={{
                        borderRadius: 'var(--bd-rds-md)',
                        background: 'var(--background)',
                        border: '0',
                        paddingInline: 'var(--padding-sm)',
                        '&:hover': {
                          border: '0',
                        },
                      }}
                      endIcon={<FloppyDisk size={20} weight='fill' />}
                      onClick={() => setEditPost(false)}
                    >
                      Salvar
                    </Button>
                  </div>
                ) : null}
                <IconButton
                  onClick={() => setDropdown(!dropdown)}
                  sx={{ background: 'var(--background)' }}
                >
                  <DotsThreeOutlineVertical weight="fill" size={20} />
                </IconButton>
                {dropdown && (
                  <div className={style.dropdown}>
                    <IconButton
                      size="large"
                      onClick={() => {
                        setEditPost(true);
                        setDropdown(false);
                      }}
                      sx={{ background: 'var(--background)', zIndex: 999 }}
                    >
                      <Pencil size={20} />
                    </IconButton>
                    <IconButton
                      size="large"
                      color="error"
                      onClick={() => {
                        setOpenModalDelete(true);
                      }}
                      sx={{ background: 'var(--background)', zIndex: 999 }}
                    >
                      <Trash size={20} />
                    </IconButton>
                  </div>
                )}
              </div>
            ) : null}
          </div>
        </div>
        <div className={style.content}>
          <div className={style.textPost}>
            <textarea
              className={editPost ? style.textArea : style.textAreaDefault}
              maxLength={300}
              rows={1}
              {...(editPost ? { readOnly: false } : { readOnly: true })}
              value={textAreaValue || ''}
              style={{ height: textAreaHeight }}
              onInput={handleTextAreaChange}
            ></textarea>
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
                  maxHeight: '60dvh',
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
            <IconButton color="default" onClick={() => setOpenModal(true)}>
              <ChatCircleDots weight="regular" />
            </IconButton>
            <span>{post.comments.length} comentarios</span>
          </div>
        </div>
      </div>
      <Modal
        className={style.container_modal_delete}
        open={openModalDelete}
        closeBtnFalse
        onClose={() => {}}
      >
        <div className={style.contentModal}>
          <span>Tem certeza que deseja excluir essa publicação?</span>
          <div className={style.modalDeleteActions}>
            <Button
              variant="contained"
              size="small"
              color="error"
              onClick={() => {
                setOpenModalDelete(false);
                setDropdown(false);
              }}
            >
              Cancelar
            </Button>
            <Button variant="contained" size="small" onClick={postDelete}>
              Excluir
            </Button>
          </div>
        </div>
      </Modal>
      <Modal
        className={style.container_modal}
        open={openModal}
        closeBtnFalse
        onClose={() => {}}
        styleCss={{
          width: selectedImage ? '90dvw' : '50dvw',
        }}
      >
        <div className={style.header}>
          <IconButton color="default" onClick={() => setOpenModal(false)}>
            <X weight="bold" />
          </IconButton>
        </div>
        <div
          className={style.left}
          style={{
            display: selectedImage ? 'flex' : 'none',
          }}
        >
          {selectedImage ? (
            <img
              src={selectedImage}
              alt="Post"
              style={{
                width: '100%',
                height: '100%',
                borderRadius: 'var(--bd-rds-lt)',
                objectFit: 'cover',
              }}
            />
          ) : null}
        </div>
        <div
          className={style.right}
          style={{
            width: selectedImage ? '30%' : '100%',
            borderRadius: selectedImage
              ? '0 var(--bd-rds-lt) var(--bd-rds-lt) 0'
              : 'var(--bd-rds-lt)',
          }}
        >
          <div className={style.modalPost}>
            <div className={style.modalPostHeader}>
              <div className={style.user}>
                <Avatar
                  color="primary"
                  sx={{
                    backgroundColor: 'var(--background)',
                    padding: 'var(--padding-md)',
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
                        fontWeight: 'var(--fnt-wg-lg)',
                      }}
                    >
                      {userName && userName.substring(0, 2).toUpperCase()}
                    </span>
                  )}
                </Avatar>
                <div className={style.contentNameUser}>
                  <div className={style.userName}>
                    <span>{userName}</span>
                    <SealCheck color="var(--primary)" size={18} weight="fill" />
                  </div>
                  <div className={style.userJob}>
                    {findUserPostInUserList(post.author, usersList)?.jobs &&
                    findUserPostInUserList(post.author, usersList)?.jobs
                      .length > 0
                      ? findUserPostInUserList(
                          post.author,
                          usersList,
                        )?.jobs.join(', ')
                      : 'Aprendendo...'}
                  </div>
                </div>
              </div>
            </div>
            <div className={style.modalPostContent}>
              <p>{post.body.text}</p>
              {code ? (
                <CodeEditor
                  value={code}
                  language={languageName}
                  readOnly
                  onChange={(evn) => setCode(evn.target.value)}
                  style={{
                    width: '100%',
                    height: '100%',
                    maxHeight: '20dvh',
                    borderRadius: 'var(--bd-rds-lt)',
                    backgroundColor: 'var(--background)',
                    overflowY: 'auto',
                  }}
                />
              ) : null}
              <div className={style.postDate}>
                <span>{extendDatePost}</span>
                <DotOutline weight="fill" size={20} />
                <span>{post.comments.length} Comentários</span>
              </div>
            </div>
          </div>
          <Divider />
          <div className={style.comments}>
            <NewComments
              User={currentUser}
              sendNewCommentData={createNewComment}
            />
          </div>
        </div>
      </Modal>
    </>
  );
}

export default Post;
