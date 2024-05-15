import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface UserDataState {
  isLogin: boolean;
  token: string;
}

const initialState: UserDataState = {
  isLogin: false,
  token: "",
};

export const userDataSlice = createSlice({
  name: "userData",
  initialState,
  reducers: {
    updateIsLogin: (state, action: PayloadAction<UserDataState["isLogin"]>) => {
      state.isLogin = action.payload;
    },
    setUserData: (state, action: PayloadAction<UserDataState["token"]>) => {
      state.token = action.payload;
    },
  },
});

export const { setUserData, updateIsLogin } = userDataSlice.actions;

export default userDataSlice.reducer;
