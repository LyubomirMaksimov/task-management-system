export interface UserRequestData {
  message: string;
  nUser: number;
  userType: number;
  userFirstName: string;
  userSecondName: string;
  userLastName: string;
  userWorkerType: number;
  userBULSTAT: string;
  userFirmName: string;
  userEmail: string;
  accToken: string;
  refreshToken: string;
  expiresIn: string;
}

export interface UserType {
  nUser: number;
  userType: number;
  userFullName: string;
  userWorkerType: number;
  userBULSTAT: string;
  userEmail: string;
  accToken: string;
  refreshToken: string;
  expiresIn: string;
  isAuthenticated: boolean;
}
