import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../app/Store";

interface AuthGuardProps {
  children: React.ReactElement;
}

const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const user = useSelector((state: RootState) => state.user);

  if (!user.isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default AuthGuard;
