import { SyntheticEvent, useEffect, useState } from 'react';
import {
  IconButton,
  TextField,
  Tab,
  Tabs,
  SnackbarCloseReason,
  Snackbar,
  Slide,
  Alert,
} from '@mui/material';
import style from './friends.module.scss';
import { MagnifyingGlass, Person, UsersFour } from '@phosphor-icons/react';
import CardUsers from './Card_Users/cardUsers';
import { userList } from '../../../../api/hooks/user';

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

function Friends({ User }: IFriends) {
  const [value, setValue] = useState('allUser');
  const [usersList, setUsersList] = useState([]);

  const [toastQueue, setToastQueue] = useState<ToastMessage[]>([]);

  type ToastMessage = {
    message: string;
    type: 'error' | 'warning' | 'info' | 'success';
  };

  const showToast = (message: string, type: ToastMessage['type']) => {
    setToastQueue((prev) => [...prev, { message, type }]);
  };

  const handleToastClose = (
    event: Event | SyntheticEvent<Element, Event>,
    reason?: SnackbarCloseReason,
  ) => {
    if (reason === 'clickaway') {
      return;
    }
    setToastQueue((prev) => prev.slice(1));
  };

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  useEffect(() => {
    getUserList();
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

  console.log(usersList);
  

  return (
    <div className={style.container}>
      {toastQueue.map((toast, index) => (
        <Snackbar
          key={index}
          open={true}
          autoHideDuration={3000}
          onClose={handleToastClose}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          TransitionComponent={Slide}
          style={{ marginTop: index * 60, marginBottom: 60 }}
        >
          <Alert
            severity={toast.type}
            onClose={handleToastClose}
            sx={{ width: '100%' }}
          >
            {toast.message}
          </Alert>
        </Snackbar>
      ))}
      <div className={style.header}>
        <div className={style.seach_ipt}>
          <TextField
            fullWidth
            label="Buscar Usuários"
            variant="outlined"
            size="small"
            color={'primary'}
            inputProps={{ maxLength: 60 }}
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderRadius: 'var(--bd-rds-md)',
                  border: 'none',
                },
                borderRadius: 'var(--bd-rds-md)',
                color: 'var(--text-l)',
                '&:hover fieldset': {
                  borderColor: 'var(--primary)',
                },
              },
            }}
          />
          <IconButton className={style.iconSeach} color="primary">
            <MagnifyingGlass weight="bold" />
          </IconButton>
        </div>
      </div>
      <div className={style.body}>
        <Tabs value={value} onChange={handleChange}>
          <Tab
            value="allUser"
            label="Todos"
            icon={<UsersFour weight="fill" />}
            iconPosition="end"
          />
          <Tab
            value="friends"
            label="Amigos"
            icon={<Person weight="fill" />}
            iconPosition="end"
          />
        </Tabs>
        {value === 'allUser' ? (
          <div className={style.content}>
            {usersList && usersList.length > 0 ? (
              usersList.map((user: any) => {
                if (user.id !== User.id) {
                  return (
                    <CardUsers
                      key={user.id}
                      User={user}
                      notifyPost={showToast}
                    />
                  );
                }
                return null;
              })
            ) : (
              <span className={style.notFoundUser}>
                Usuário(s) não encontrado(s)...
              </span>
            )}
          </div>
        ) : (
          <div className={style.content}>
            <span className={style.notFoundUser}>
              Você não tem nenhum amigo adicionado...
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export default Friends;
