import axios from "axios";
import { userService } from "../services/urls";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Logout = () => {
  const navigate = useNavigate();

  console.log("In logout");
  useEffect(() => {
    const logout = async () => {
      try {
        const cookies = new Cookies();
        cookies.remove('accesstoken', { path: '/' });

        const response = await axios.get(userService.logout);
        navigate("/login");
      } catch (error) {
        console.log(error);
        navigate("/login");
      }
    };

    logout(); 
  }, []); 

  return null;
};

export default Logout;
