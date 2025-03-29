import React, { useEffect, useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateUser } from "./UserSlice";

const EditUser = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const{id} = useParams();
  let baseUrl = "https://reqres.in/";

  useEffect(()=>{
    fetch(`${baseUrl}api/users/${id}`).then((res)=>res.json()).then((data)=>{
        setFirstname(data.data.first_name);
        setLastname(data.data.last_name)
        setEmail(data.data.email);
    })
  },[id])

  async function handleSubmit(e) {
    e.preventDefault();
    const updatedUser = {
      firstname:firstname,
      lastname:lastname,
      email:email
    }
    try{
      const response = await fetch(`${baseUrl}api/users/${id}`,{
        method:"PUT",
        headers:{
          "Content-type":"application/json"
        },
        body: JSON.stringify(updatedUser)
      });
      if(!response.ok){
        throw new Error(`Error:${response.statusText}`)
      }
      dispatch(updateUser({id,updatedData:updatedUser}))
      navigate("/user")
    }catch(err){
      console.log("failed to update user",err)
    }
  }

  return (
    <Box sx={{ maxWidth: 400, margin: "auto", padding: 3 }}>
      <Typography variant="h5" gutterBottom>
        Edit user   
      </Typography>
      <form>
        <TextField
          fullWidth
          label="Firstname"
          name="Firstname"
          value={firstname}
          onChange={(e)=>setFirstname(e.target.value)}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Lastname"
          name="Lastname"
          value={lastname}
          onChange={(e)=>setLastname(e.target.value)}
          margin="normal"
        />
        <TextField
          fullWidth
          label="email"
          name="email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          margin="normal"
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ marginTop: 2 }}
          onClick={handleSubmit}
        >
          Edit user
        </Button>
      </form>
    </Box>
  );
};

export default EditUser;
