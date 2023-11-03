import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { UserType } from "../../modules/user/types/user";

const initialState: UserType = {
  nUser: 0,
  userType: 0,
  userWorkerType: 0,
  userFullName: "",
  userBULSTAT: "",
  userEmail: "",
  accToken: "",
  refreshToken: "",
  expiresIn: "",
  isAuthenticated: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<UserType>) => {
      return {
        ...state,
        ...action.payload,
      };
    },
    logout: () => {
      return initialState;
    },
  },
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
