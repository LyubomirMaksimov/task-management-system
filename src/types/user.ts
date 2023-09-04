export interface UserRequestData {
  message: string;
  nUser: number;
  userType: number;
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
  nUser: number;
  userType: number;
  userFullName: string;
  userBULSTAT: string;
  userEmail: string;
  accToken: string;
  refreshToken: string;
  expiresIn: string;
  isAuthenticated: boolean;
}
