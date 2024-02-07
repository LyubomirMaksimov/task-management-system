export interface UserRequestData {
  message: string;
  nUser: number;
  userType: number;
  userWorkerType: number;
  userFirstName: string;
  userSecondName: string;
  userLastName: string;
  userBULSTAT: string;
  userFirmName: string;
  userEmail: string;
  accToken: string;
  refreshToken: string;
  expiresIn: string;
}

export interface UserType {
  isAuthenticated: boolean;
  nUser: number;
  userType: number;
  userFullName: string;
  userWorkerType: number;
  userBAZAWorkerType: number;
  userAccToken: string;
  userRefreshToken: string;
  expiresIn: string;
}
