import { useEffect, useRef, useState } from 'react';
import style from './comments.module.scss';
import { userList } from '../../../../../api/hooks/user';
import { Avatar, Button, IconButton, Tooltip, Zoom } from '@mui/material';
import {
  DotsThreeOutlineVertical,
  Eraser,
  FloppyDisk,
  Heart,
  Image,
  Pencil,
  SealCheck,
  Trash,
  XCircle,
} from '@phosphor-icons/react';

import CodeEditor from '@uiw/react-textarea-code-editor';
import Modal from '../../Modal/modal';
import {
  deleteComment,
  updateComment,
  likesComment
} from '../../../../../api/hooks/posts';

interface IComment {
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
  comment: {
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
  };
  idPost: number;
  notifyPost: (
    message: string,
    type: 'error' | 'warning' | 'info' | 'success',
  ) => void;
  updateFeed: () => void;
}

function Comments({
  currentUser,
  comment,
  notifyPost,
  idPost,
  updateFeed,
}: IComment) {
  const [usersList, setUsersList] = useState([]);
  const [randomColor, setRandomColor] = useState('');
  const [userName, setUserName] = useState('');
  const [dropdown, setDropdown] = useState(false);
  const [editPost, setEditPost] = useState(false);
  const [languageName] = useState(comment.body.language);
  const [code, setCode] = useState(comment.body.code);
  const [selectedImage, setSelectedImage] = useState<string | null>(
    comment.body.image,
  );
  const [textAreaHeight, setTextAreaHeight] = useState('auto');
  const [textAreaValue, setTextAreaValue] = useState<string | null>(
    comment.body.text,
  );
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [likeState, setLikeState] = useState(false);

  useEffect(() => {
    getUserList();
    generateRandomColor();
  }, []);

  useEffect(() => {
    const userName = findUserPostInUserList(comment.idAuthorComment, usersList);
    if (userName) {
      setUserName(userName.name);
    }
  }, [comment.idAuthorComment, usersList]);

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

  const findUserPostInUserList = (userId: number, usersList: any[]) => {
    const user = usersList.find((user) => user.id === userId);
    return user;
  };

  const authorUserPost = findUserPostInUserList(
    comment.idAuthorComment,
    usersList,
  );

  const generateRandomColor = () => {
    const hue = Math.floor(Math.random() * 360);
    const saturation = 60;
    const lightness = 50;

    const color = `hsl(${hue}, ${saturation}%, ${lightness}%)`;

    setRandomColor(color);
  };

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

  const cancelEditComment = () => {
    setTextAreaValue(comment.body.text);
    setCode(comment.body.code);
    setSelectedImage(comment.body.image);

    setEditPost(false);
  };

  const dataUpdateComment = () => {
    if (!textAreaValue) {
      notifyPost('A caixa de texto não pode estar vazia!', 'warning');
      setOpenModalDelete(true);
      return;
    }

    const data = {
      bodyComment: {
        text: textAreaValue,
        code,
        language: languageName ? languageName : '',
        image: selectedImage ? selectedImage : '',
      },
    };
    console.log(data);
    console.log(comment.id);
    console.log(idPost);

    updateComment(comment.id, idPost, data)
      .then((response) => {
        setEditPost(false);
        notifyPost('Comentário atualizado com sucesso!', 'success');
        updateFeed();
      })
      .catch((error) => {
        console.log(error);
        notifyPost('Erro ao atualizar comentário!', 'error');
      });

    setEditPost(false);
  };

  const commentDelete = () => {
    deleteComment(comment.id, idPost)
      .then((response) => {
        setOpenModalDelete(false);
        notifyPost('Comentário excluído com sucesso!', 'success');
        updateFeed();
      })
      .catch((error) => {
        console.log(error);
        notifyPost('Erro ao excluir comentário!', 'error');
      });
  };

  const handleLike = () => {
    likesComment(comment.id, idPost, !likeState)
      .then((response) => {
        setLikeState(!likeState);
        updateFeed();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className={style.container}>
      <div className={style.comment}>
        <div className={style.commentHeader}>
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
                  <SealCheck color="var(--primary)" size={18} weight="fill" />
                </Tooltip>
              ) : null}
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
                    onClick={() => cancelEditComment()}
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
                    onClick={() => dataUpdateComment()}
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
                    onClick={() => setOpenModalDelete(true)}
                    sx={{ background: 'var(--background)', zIndex: 999 }}
                  >
                    <Trash size={20} />
                  </IconButton>
                </div>
              )}
            </div>
          ) : null}
        </div>
        <div className={style.commentBody}>
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
        <div className={style.commentFooter}>
          <div className={style.like}>
            <IconButton
              color={likeState ? 'error' : 'primary'}
              onClick={handleLike}
            >
              <Heart weight={likeState ? 'fill' : 'bold'} />
            </IconButton>
            <span>{comment.likes} likes</span>
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
            <Button variant="contained" size="small" onClick={commentDelete}>
              Excluir
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default Comments;
