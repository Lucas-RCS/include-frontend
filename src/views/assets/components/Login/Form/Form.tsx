import TextField from '@mui/material/TextField';

interface IFormLogin {
  switchStage?: boolean;
}

export default function FormLogin({ switchStage }: IFormLogin) {
  return (
    <TextField
      fullWidth
      label="Nome"
      variant="outlined"
      color={switchStage ? 'secondary' : 'primary'}
    />
  );
}
