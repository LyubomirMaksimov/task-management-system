import auth from "../modules/user/services/authService.ts";
import { UserType } from "../modules/user/types/user.ts";

interface IDictionary {
  [index: string]: Promise<UserType>;
}

export const SERVICES: IDictionary = {
  LOGIN: auth.login,
};

const SERVICE_NAMES: IDictionary = {};

Object.keys(SERVICES).forEach((key: string) => {
  SERVICE_NAMES[key.toLowerCase()] = SERVICES[key];
});

export default SERVICE_NAMES;
