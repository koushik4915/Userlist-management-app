import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import { useEffect, useState } from "react";
import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { deleteUser, setUsers } from "./UserSlice";
import { useDispatch, useSelector } from "react-redux";

export default function ActionAreaCard() {
  const [pageNum, setPageNum] = useState(1);
  const [moreUsers, setMoreUsers] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let baseUrl = "https://reqres.in/";
  const users = useSelector((state) => state.users.list);

  useEffect(() => {
    fetch(`${baseUrl}api/users?page=${pageNum}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.data.length === 0) {
          setMoreUsers(false);
        } else {
          dispatch(setUsers(data.data));
        }
      });
  }, [pageNum]);

  function handleLoad() {
    if (moreUsers) {
      setPageNum((prevPageNum) => prevPageNum + 1);
    }
  }

  function handleEdit(id) {
    navigate(`/edit/${id}`);
  }

  function handleDelete(id) {
    fetch(`${baseUrl}api/users/${id}`, {method: "DELETE"}).then((res) => {
      if (res.status === 204) {
        dispatch(deleteUser(id));
      } else {
        console.log("user not found");
      }
    });
  }

  return (
    users.length > 0 && (
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
          padding: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "center",
            gap: 1,
            padding: 1,
          }}
        >
          {users.map((user) => {
            return (
              <Card
                sx={{
                  width: "100%",
                  height: "300px",
                  maxWidth: 300,
                  margin: 5,
                }}
                key={user.id}
              >
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="140"
                    image={user.avatar}
                    alt="green iguana"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {user.first_name} {user.last_name}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "text.secondary" }}
                    >
                      {user.email}
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-around",
                  }}
                >
                  <Button
                    variant="contained"
                    color="success"
                    onClick={() => handleEdit(user.id)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => handleDelete(user.id)}
                  >
                    Delete
                  </Button>
                </Box>
              </Card>
            );
          })}
        </Box>
        {moreUsers && (
          <Box>
            <Button variant="contained" color="secondary" onClick={handleLoad}>
              Load more...
            </Button>
          </Box>
        )}
      </Box>
    )
  );
}
