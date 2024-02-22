import { useContext } from "react";
import { AuthContext } from "../components/wrappers/AuthWrapper";

const useAuthContext = () => {
  return useContext(AuthContext);
};

export default useAuthContext;
