import style from './home.module.scss';
import NewPost from '../NewPost/newpost';
import Post from '../Post/Post';

import { feed, newPost } from '../../../../api/hooks/posts';
import { useEffect, useState } from 'react';
import { Alert, Snackbar, Slide } from '@mui/material';

interface IHome {
  User: {
    id: number;
    name: string;
    email: string;
    birthDate: string;
    skills: string[];
    jobs: string[];
    userImg: string;
  };
}

function Home({ User }: IHome) {
  const [feedPost, setFeedPost] = useState([]);
  const [statusPost, setStatusPost] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    getFeed();
  }, []);

  const getFeed = () => {
    feed()
      .then((response) => {
        const posts = response[0].content;
        setFeedPost(posts);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const createNewPost = (data: any) => {
    if (!data.body.text.trim()) {
      setStatusPost(false);
      setOpen(true);
      return;
    }

    newPost(data)
      .then((response) => {
        setStatusPost(true);
        setOpen(true);
        getFeed();
      })
      .catch((error) => {
        setStatusPost(false);
        setOpen(true);
        console.log(error);
      });
  };

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string,
  ) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <div className={style.container}>
      {statusPost ? (
        <Snackbar
          open={open}
          autoHideDuration={3000}
          onClose={handleClose}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          TransitionComponent={Slide}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--gap-lt)',
            }}
          >
            <Alert severity="success" color="success">
              Postagem realizada com sucesso!
            </Alert>
          </div>
        </Snackbar>
      ) : (
        <Snackbar
          open={open}
          autoHideDuration={3000}
          onClose={handleClose}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          TransitionComponent={Slide}
        >
          <Alert severity="error" color="error">
            A caixa de texto não pode estar vazia! Postagem não realizada.
          </Alert>
        </Snackbar>
      )}
      <NewPost User={User} sendNewPostData={createNewPost} />
      <div className={style.content}>
        {feedPost.map((post) => (
          <Post post={post} currentUser={User} />
        ))}
      </div>
    </div>
  );
}

export default Home;
