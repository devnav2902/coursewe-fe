import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../hooks/redux.hooks";
import { logout } from "../../../redux/slices/user.slice";
import { ROUTES } from "../../../utils/constants";

const SignoutPage = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(logout()).then((value) => {
      navigate(ROUTES.SIGN_IN);
    });
  }, [dispatch, navigate]);

  return null;
};

export default SignoutPage;
