import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { ticketBasicInfo } from "../../modules/ticket/types/ticket";

const initialState: ticketBasicInfo = {
  id: 0,
  nomID: 0,
  cobjUniqueRow: 0,
  cobjTicketUser: 0,
  cobjTicket: 0,
  EIK: "",
  contragent: "",
  dateCreated: "",
  ticketTask: "",
  ticketBegDate: "",
  ticketEndDate: "",
  ticketStatus: 0,
};

export const activeTicketSlice = createSlice({
  name: "activeTicket",
  initialState,
  reducers: {
    update: (state, action: PayloadAction<ticketBasicInfo>) => {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
});

export const { update } = activeTicketSlice.actions;

export default activeTicketSlice.reducer;
