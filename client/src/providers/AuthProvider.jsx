import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { checkCurrentUser } from "../apicalls/auth";
import { setUser } from "../store/slices/userSlice";

const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getCurrentUser = async () => {
    try {
      const response = await checkCurrentUser();
      if (response.isSuccess) {
        // console.log(response);
        dispatch(setUser(response.userDoc));
      } else {
        navigate("/");
        throw new Error(response.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    getCurrentUser();
  }, []);
  return <section>{children}</section>;
};

export default AuthProvider;
