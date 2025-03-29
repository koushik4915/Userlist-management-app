import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    list: [],
    originalList:[],
  },
  reducers: {
    setUsers: (state, action) => {
        const newUsers = action.payload.filter((newUser)=>{
            return !state.originalList.some((existingUser)=>existingUser.id===newUser.id)
        })
      state.list = [...state.list,...newUsers];
      state.originalList = [...state.originalList,...newUsers];

    },
    deleteUser: (state, action) => {
      state.list = state.list.filter((user) => user.id !== action.payload);
      state.originalList = state.originalList.filter((user) => user.id !== action.payload);
    },
    updateUser: (state, action) => {
      const { id, updatedData } = action.payload;
      state.list = state.list.map((user) => 
        user.id === id ? { ...user, ...updatedData } : user
      );
      state.originalList = state.originalList.map((user) => 
        user.id === id ? { ...user, ...updatedData } : user
      );
    },
    filterUser:(state,action)=>{
      const searchUser = action.payload.toLowerCase();
      if(!searchUser){
        state.list = [...state.originalList]
      }else{
        state.list = state.originalList.filter((user)=>{
          return user.first_name.toLowerCase().includes(searchUser)||
          user.last_name.toLowerCase().includes(searchUser)||
          user.email.toLowerCase().includes(searchUser)
        })
      }
    }
  },
});

export const { setUsers, deleteUser,updateUser,filterUser } = userSlice.actions;
export default userSlice.reducer;


