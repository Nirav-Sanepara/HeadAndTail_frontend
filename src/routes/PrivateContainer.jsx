import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import apiClient from "../service/service";
import { endLoader, startLoader } from "../store/loaderSlice";

const PrivateContainer = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    checkAuth();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return () => {}

  }, []);

  // checkAuth check token
  const checkAuth = async () => {
    try {
      const userData = jwtDecode(localStorage.getItem("accessToken"));
      dispatch(startLoader());
      const getUserData = await apiClient().get(`/user/${userData?._id}`);
      dispatch(endLoader());

      const user = getUserData?.data;
      if (user) {
        setIsAuthenticated(true);
      }
      // eslint-disable-next-line no-debugger
    } catch (e) {
      dispatch(endLoader());
      navigate("/login");
      console.log("error: ", e);
    }
  };

  return isAuthenticated ? (
    <>
      {children}
    </>
  ) : (
    <div style={{ position: "absolute", left: "50%", top: "50%" }}>
      
    </div>
  );
};

export default PrivateContainer;
