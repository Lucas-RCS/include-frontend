import { useEffect, useRef, useState } from 'react';
import style from './post.module.scss';
import {
  Avatar,
  Button,
  Divider,
  IconButton,
  Tooltip,
  Zoom,
} from '@mui/material';
import {
  ChatCircleDots,
  DotOutline,
  DotsThreeOutlineVertical,
  Eraser,
  FloppyDisk,
  Heart,
  Image,
  Pencil,
  SealCheck,
  Trash,
  X,
  XCircle,
} from '@phosphor-icons/react';
import moment from 'moment';
import { userList } from '../../../../api/hooks/user';
import { likes } from '../../../../api/hooks/posts';
import Modal from '../Modal/modal';
import {
  newComment,
  deletePost,
  updatePost,
} from '../../../../api/hooks/posts';

import CodeEditor from '@uiw/react-textarea-code-editor';
import NewComments from './NewComment/NewComment';
import Comments from './Comments/Comments';

interface IPost {
  currentUser: {
    id: number;
    name: string;
    email: string;
    birthDate: string;
    skills: string[];
    jobs: string[];
    imageIconProfile: string;
    friends: string[];
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
    comments: [
      {
        id: number;
        idAuthorComment: number;
        idPost: number;
        body: {
          text: string;
          code: string;
          language: string;
          image: string;
        };
        date: string;
        updateDate: string;
        likes: number;
        likesIdUser: [];
      },
    ];
    images: [];
    likesIdUser: [];
  };
  updateFeed: () => void;
  notifyPost: (
    message: string,
    type: 'error' | 'warning' | 'info' | 'success',
  ) => void;
}

function Post({ currentUser, post, updateFeed, notifyPost }: IPost) {
  const [likeState, setLikeState] = useState(false);
  const [randomColor, setRandomColor] = useState('');
  const [usersList, setUsersList] = useState([]);
  const [userName, setUserName] = useState('');
  const [languageName] = useState(post.body.language);
  const [code, setCode] = useState(post.body.code);
  const [selectedImage, setSelectedImage] = useState<string | null>(
    post.body.image,
  );
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
    if (!data.bodyComment.text) {
      notifyPost(
        'A caixa de texto não pode estar vazia! Comentário não enviado!',
        'warning',
      );
      return;
    }
    newComment(post.id, data)
      .then((response) => {
        updateFeed();
        notifyPost('Comentário realizado com sucesso!', 'success');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const postDelete = () => {
    deletePost(post.id)
      .then((response) => {
        setOpenModalDelete(false);
        updateFeed();
        notifyPost('Postagem excluído com sucesso!', 'success');
      })
      .catch((error) => {
        console.log(error);
        notifyPost('Erro ao excluir postagem!', 'error');
      });
  };

  const dataUpdatePost = () => {
    if (!textAreaValue) {
      notifyPost('A caixa de texto não pode estar vazia!', 'warning');
      setOpenModalDelete(true);
      return;
    }

    const data = {
      body: {
        text: textAreaValue,
        code,
        language: languageName ? languageName : '',
        image: selectedImage ? selectedImage : '',
      },
    };

    updatePost(post.id, data)
      .then((response) => {
        setEditPost(false);
        updateFeed();
        notifyPost('Postagem atualizado com sucesso!', 'success');
      })
      .catch((error) => {
        console.log(error);
        notifyPost('Erro ao atualizar postagem!', 'error');
      });

    setEditPost(false);
  };

  const cancelEditPost = () => {
    setTextAreaValue(post.body.text);
    setCode(post.body.code);
    setSelectedImage(post.body.image);

    setEditPost(false);
  };

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

  const authorUserPost = findUserPostInUserList(post.author, usersList);

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

  const iptRef = useRef<HTMLInputElement>(null);

  const HandleUserImg = () => {
    if (iptRef.current) {
      iptRef.current.click();
    }
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const fileSize = event.target.files[0].size / (1024 * 1024);
      if (fileSize > 8) {
        alert(
          'O arquivo de imagem é muito grande. Por favor, selecione uma imagem de até 5 MB.',
        );
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
      };
      reader.readAsDataURL(event.target.files[0]);
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
                    padding:
                      authorUserPost && authorUserPost.imageIconProfile
                        ? '0'
                        : 'var(--padding-md)',
                    borderRadius: 'var(--bd-rds-xl)',
                    minWidth: '48px',
                    minHeight: '48px',
                  }}
                >
                  {authorUserPost && authorUserPost.imageIconProfile ? (
                    <img
                      src={`${authorUserPost.imageIconProfile}`}
                      alt="User Icon"
                      style={{
                        borderRadius: 'var(--bd-rds-xl)',
                        minHeight: '28px',
                      }}
                    />
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
                  {authorUserPost &&
                  authorUserPost.jobs.length > 0 &&
                  authorUserPost.skills.length > 0 &&
                  authorUserPost.birthDate &&
                  authorUserPost.imageIconProfile ? (
                    <Tooltip
                      title="Usuário verificado"
                      placement="top"
                      TransitionComponent={Zoom}
                      arrow
                    >
                      <SealCheck
                        color="var(--primary)"
                        size={18}
                        weight="fill"
                      />
                    </Tooltip>
                  ) : null}
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
                      startIcon={<XCircle size={20} weight="fill" />}
                      sx={{
                        borderRadius: 'var(--bd-rds-md)',
                        background: 'var(--background)',
                        border: '0',
                        paddingInline: 'var(--padding-sm)',
                        '&:hover': {
                          border: '0',
                        },
                      }}
                      onClick={() => cancelEditPost()}
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
                      startIcon={<FloppyDisk size={20} weight="fill" />}
                      onClick={() => dataUpdatePost()}
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
            {!editPost ? (
              <p
                style={{
                  color: 'var(--text-l)',
                  fontSize: 'var(--fnt-sz-sm)',
                }}
              >
                {textAreaValue}
              </p>
            ) : (
              <textarea
                className={editPost ? style.textArea : style.textAreaDefault}
                maxLength={300}
                {...(editPost ? { readOnly: false } : { readOnly: true })}
                value={textAreaValue || ''}
                style={{ height: textAreaHeight }}
                onInput={handleTextAreaChange}
              ></textarea>
            )}
          </div>
          <div className={style.body}>
            {code ? (
              <CodeEditor
                value={code}
                language={languageName}
                {...(editPost ? { readOnly: false } : { readOnly: true })}
                onChange={(evn) => setCode(evn.target.value)}
                style={{
                  width: '100%',
                  height: '100%',
                  minHeight: editPost ? '10dvh' : '6dvh',
                  maxHeight: '30dvh',
                  borderRadius: 'var(--bd-rds-lt)',
                  backgroundColor: 'var(--background)',
                  overflowY: 'auto',
                }}
              />
            ) : null}
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%',
                width: '100%',
                position: 'relative',
              }}
            >
              {selectedImage ? (
                <>
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
                  <input
                    type="file"
                    id="images"
                    style={{ display: 'none' }}
                    accept="image/png, image/jpeg"
                    ref={iptRef}
                    onChange={handleImageChange}
                  />
                </>
              ) : null}
              {editPost && selectedImage ? (
                <div className={style.editImagePost}>
                  <IconButton
                    color="error"
                    onClick={() => setSelectedImage(null)}
                    sx={{
                      background: 'var(--background)',
                      '&:hover': {
                        background: 'var(--components)',
                      },
                    }}
                  >
                    <Eraser size={20} weight="fill" />
                  </IconButton>
                  <IconButton
                    color="success"
                    onClick={HandleUserImg}
                    sx={{
                      background: 'var(--background)',
                      '&:hover': {
                        background: 'var(--components)',
                      },
                    }}
                  >
                    <Image size={20} weight="fill" />
                  </IconButton>
                </div>
              ) : null}
            </div>
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
                    padding:
                      authorUserPost && authorUserPost.imageIconProfile
                        ? '0'
                        : 'var(--padding-md)',
                    borderRadius: 'var(--bd-rds-xl)',
                    minWidth: '48px',
                    minHeight: '48px',
                  }}
                >
                  {authorUserPost && authorUserPost.imageIconProfile ? (
                    <img
                      src={`${authorUserPost.imageIconProfile}`}
                      alt="User Icon"
                      style={{
                        borderRadius: 'var(--bd-rds-xl)',
                        minHeight: '28px',
                      }}
                    />
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
                    {authorUserPost &&
                    authorUserPost.jobs.length > 0 &&
                    authorUserPost.skills.length > 0 &&
                    authorUserPost.birthDate &&
                    authorUserPost.imageIconProfile ? (
                      <Tooltip
                        title="Usuário verificado"
                        placement="top"
                        TransitionComponent={Zoom}
                        arrow
                      >
                        <SealCheck
                          color="var(--primary)"
                          size={18}
                          weight="fill"
                        />
                      </Tooltip>
                    ) : null}
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
            <Divider />
            {post && post.comments.length > 0 ? (
              post.comments.map((comment: any) => (
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 'var(--gap-lt)',
                  }}
                >
                  <Comments
                    key={`${comment.id}-${comment.date}`}
                    comment={comment}
                    currentUser={currentUser}
                    notifyPost={notifyPost}
                    idPost={post.id}
                    updateFeed={updateFeed}
                  />
                  <Divider />
                </div>
              ))
            ) : (
              <span className={style.noComments}>Nenhum comentário...</span>
            )}
          </div>
        </div>
      </Modal>
    </>
  );
}

export default Post;
