import { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import apiClient from "../service/service";
import { endLoader, startLoader } from "../store/loaderSlice";

const   PublicContainer = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const [previousPath, setPreviousPath] = useState("");

  useEffect(() => {
    setPreviousPath(location.pathname);
    return 
  }, [location.pathname]);

  useEffect(() => {
    checkAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    return
  }, []);
  console.log("previousPath", previousPath, location.pathname);
  const checkAuth = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      if (token) {
        const userData = jwtDecode(localStorage.getItem("accessToken"));

        // eslint-disable-next-line no-debugger
        dispatch(startLoader());
        const user = await apiClient().get(`/user/${userData?._id}`);
        dispatch(endLoader());
        console.log('suer',user)
        if (user) {
          navigate("/");
        }
      }
    } catch (error) {
      dispatch(endLoader());
      console.log("error in ROUTE", error);
    }
  };

  return (
    <>
      {children}      
    </>
  );
};

export default PublicContainer;
