export interface ticketBasicInfo {
  id: number;
  nomID: number;
  cobjUniqueRow: number;
  cobjTicketUser: number;
  cobjTicket: number;
  EIK: string;
  contragent: string;
  dateCreated: string;
  ticketTask: string;
  ticketBegDate: string;
  ticketEndDate: string;
  ticketStatus: number;
}

export interface ticketType extends ticketBasicInfo {
  ticketHelpersAll: number;
  ticketHelpersWorking: number;
  ticketHelpersRevision: number;
  ticketPMSPlannedHours: number;
}

export interface otchet {
  otchetID: number;
  otchetDate: string;
  otchetText: string;
  otchetTime: string;
  otchetCharacter: number;
}

export interface helper {
  nHelperRow: number;
  nHelperName: string;
  helperTask: string;
  helperTaskEndDate: string;
  helperTaskStatus: number;
  helperTaskSumTime: string;
}

export interface RequestTicketsData {
  brTickets: number;
  activeTicket: ticketBasicInfo;
  tickets: ticketType[];
  message: string;
}

export interface ticketFullInfo {
  nomID: number;
  cobjUniqueRow: number;
  cobjTicket: number;
  eik: string;
  contragent: string;
  dateCreated: string;
  ticketTask: string;
  ticketBegDate: string;
  ticketEndDate: string;
  ticketStatus: number;
  ticketStatusFinishedDate: number;
  ticketStatusFinishedFrom: string;
  ticketLevel: number;
  ticketTaskLeader: string;
  ticketPMSPriority: number;
  ticketPMSDogName: string;
  ticketPMSProjName: string;
  ticketPMSTaskName: string;
  ticketPMSTOName: string;
  ticketPMSPlannedHours: number;
  ticketPMSTrader: string;
  ticketPMSDeinostManager: string;
  ticketPMSObject: string;
  ticketPMSPlaceLocation: string;
  ticketPMSContactPerson: string;
  ticketPMSContactPhone: string;
  ticketStartWorkDate: string;
  ticketTeam: string;
  otcheti: otchet[];
  helpers: helper[];
}
