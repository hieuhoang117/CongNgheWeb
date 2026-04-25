import { Navigate } from "react-router-dom";
import userStore from "../store/useUserStore";

const PrivateRoute = ({ children }) => {
  const userId = userStore((state) => state.userId);

  if (!userId) {
    return <Navigate to="/" />;
  }

  return children;
};

export default PrivateRoute;