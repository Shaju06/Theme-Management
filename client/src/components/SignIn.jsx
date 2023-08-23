import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import axios from 'axios'
import {  useNavigate } from "react-router-dom";
import { useAppContext } from '../ContextStore'

export default function SignIn() {
  const {isLoggedIn, setContextState } = useAppContext()
  const [isLoginFailed, setIsLoginFailed] = React.useState(false)


  const navigate = useNavigate()

React.useEffect(()=> {

  if(isLoggedIn) {
    return navigate('/')
  }

},[isLoggedIn])


console.log(isLoginFailed)


  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const payload = {
      userName: data.get('userName'),
      password: data.get('password'),
    } 

    console.log(process.env, 'sfsdfsd')

    try {
      const response = await axios.post('http://localhost:5000/api/login', payload);
 
      // Storing the token in sessionStorage for now
      sessionStorage.setItem('token', response.data.token);
      sessionStorage.setItem('primaryColor', response.data.primaryColor);
      console.log(response, 'response')
      setContextState((prev) => {
        return {...prev, token: response.data.token, isLoggedIn: true, primaryColor: response.data.primaryColor}
      })
      setIsLoginFailed(false)
      return navigate("/");
    } catch(err) {
      console.log(err);
      if(err?.request?.status === 401) {
        setIsLoginFailed(true)
      }
    } 
  };

  return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
         {isLoginFailed ? <Typography
          sx={{
            color: 'red'
          }}
          >
            Invalid user/password
          </Typography>
        : null  
        }
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="userName"
              label="Username"
              name="userName"
              autoComplete="userName"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
          </Box>
        </Box>
      </Container>
  );
}