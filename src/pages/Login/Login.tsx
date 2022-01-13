import { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from 'react-router-dom';

import { Alert, Button, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, Stack } from '@mui/material';
import TextField from '@mui/material/TextField';
import { Box } from '@mui/system';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import './Login.css';
/**
 * Login component.
 */
const Login = ()  => {

  type ButtonEvent = React.MouseEvent<HTMLButtonElement>;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  const handleMouseDownPassword = (event: ButtonEvent) => {
    event.preventDefault();
  };

  /**
   * Login user.
   */
  const logIn = () => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        navigate('/home');
      })
      .catch((error) => {
        setErrorMessage(error.message);
        setShowError(true);
      });
  };

  return (
    <div className='Login'>
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
      >
        <div className='Login-inputs'>
          <TextField
            id="outlined-basic"
            label="Correo"
            variant="outlined"
            onChange={e => setEmail(e.target.value)}
            value={email}
          />
          <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={e => setPassword(e.target.value)}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowPassword(!showPassword)}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
          </FormControl>
        </div>
        <div className='Login-button'>
          <Button
            variant="contained"
            onClick={logIn}
            disabled={email === '' || password === ''}
          >
            Iniciar Sesión
          </Button>    
        </div>
      </Box>
      {
        showError && (
          <Stack sx={{ width: '100%' }} spacing={2} className='Login-alert'>
            <Alert severity="error">{errorMessage}</Alert>
          </Stack>
        )
      }
    </div>
  );
}

export default Login;