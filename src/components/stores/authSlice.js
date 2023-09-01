import { createSlice } from "@reduxjs/toolkit";

const initialState = {

  user: null,
  token: null,
  lists:null,
  selectedList:null
 
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // reducers stores functions (setMode, setLogin, etc) that modifies the state

    setLogin: (state, action) => {
      // setLogin: (current state, action object dispatched to trigger the reducer)
      state.user = action.payload.user; // updates the user state with the payload value
      state.lists=action.payload.lists
      state.token = action.payload.token; // updates the token state with the payload value
      console.log("setLogin User:", state.user);
      console.log("setLogin Token:", state.token);
      console.log("User Lists :", state.lists)
    },
    setLogout: (state) => {
      // logging out does not require any specific data, therefore payload is not required. thus action is not required.
      state.user = null;
      state.token = null;
      state.lists=null
      state.selectedList=null
    },
    selectList: (state, action) => {
      
      state.selectedList = action.payload.selectedList;
      console.log('Selected List :', state.selectedList_id)
    },

    getUsers: (state, action) => {
      state.users = action.payload.users;
    },

    setAllPosts: (state, action) => {
      state.posts = [action.payload.posts];
      console.log("Setting All Posts:", state.posts);
    },

    addPost: (state, action) => {
      console.log("Adding Post:", action.payload.post);
      state.posts.push(action.payload.post);
    },

    updatePost: (state, action) => {
      console.log("Updating Post:", action.payload);
      const updatedPosts = state.posts.map((post) => {
        if (post._id === action.payload._id) return action.payload;
        return post;
      });
      state.posts = updatedPosts;
    },
  },
});

export const {
  setMode,
  setLogin,
  setLogout,
  selectList,
  setAllPosts,
  updatePost,
  addPost,
  getUsers,
} = authSlice.actions;
// exporting reducer property as default allows us to use it directly in store config without having to access authSlice
export default authSlice.reducer;