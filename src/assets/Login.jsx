import React, { useEffect, useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from "axios"

const Login = () => {
  const[email,setEmail] = useState('');
  const[password,setPassword] = useState('');
  const[error,setError] = useState('');
  const navigate = useNavigate();

  async function handleSubmit(e){
    e.preventDefault();
    if(!email||!password){
      setError("Both feilds are required");
      return;
    }
    try{
      const response = await axios.post("https://reqres.in/api/login",{email:email, password:password});
      localStorage.setItem("token",response.data.token)
      navigate("/user")
    }
    catch(err){
      setError("invalid email or password");
    }
  }
  
  return (
    <Box sx={{ maxWidth: 400, margin: 'auto', padding: 3 }}>
      <Typography variant="h5" gutterBottom>
        Login Page
      </Typography>
      <form>
        <TextField
          fullWidth
          label="Email"
          name="email"
          value={email}
          onChange={(e)=>{setEmail(e.target.value)}}
          margin="normal"
        />
        <TextField
          fullWidth
          label="password"
          name="password"
          value={password}
          onChange={(e)=>{setPassword(e.target.value)}}
          margin="normal"
        />
        {error&&<Typography color='error'>{error}</Typography>}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ marginTop: 2 }}
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </form>
    </Box>
  );
};

export default Login;
