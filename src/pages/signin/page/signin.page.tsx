import { Spin } from "antd";
import axios from "axios";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Input from "../../../components/Input/Input.component";
import { useAppDispatch, useTypedSelector } from "../../../hooks/redux.hooks";
import { login } from "../../../redux/slices/user.slice";
import { BE_URL, ROUTES } from "../../../utils/constants";
import { openNotification } from "../../../utils/functions";

const SigninPage = () => {
  const dispatch = useAppDispatch();
  const { loaded } = useTypedSelector((state) => state.user);

  const { handleSubmit, register } = useForm();

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<FieldValues> = ({ password, email }) => {
    // initialize CSRF protection
    axios.get(`${BE_URL}/sanctum/csrf-cookie`).then((res) => {
      dispatch(login({ password, email }))
        .unwrap()
        .then((res) => {
          navigate(-1);
        })
        .catch((error) => {
          openNotification("error", error);
        });
    });
  };

  return (
    <div className="login container">
      <div className="login-wrap">
        <div className="login-body">
          <div className="form-body">
            <Link to="/" className="logo">
              Coursewe
            </Link>

            <form onSubmit={handleSubmit(onSubmit)} className="signin-form">
              <div className="form-login style-space">
                <Input
                  type="email"
                  name="email"
                  label="Email của bạn"
                  required={true}
                  register={register}
                />
              </div>
              <div className="form-login password">
                <Input
                  type="password"
                  name="password"
                  label="Mật khẩu"
                  required={true}
                  register={register}
                />
              </div>
              <p className="form-login style-space quiz password">
                <Link to="/">Quên mật khẩu?</Link>
              </p>

              <div className="checkbox-container d-flex">
                <input
                  id="remember"
                  name="remember"
                  defaultChecked
                  type="checkbox"
                />
                <label htmlFor="remember">Remember me</label>
              </div>

              <div className="submit">
                {!loaded ? (
                  <Spin />
                ) : (
                  <button type="submit" className="sign-in">
                    Đăng nhập
                  </button>
                )}
              </div>
            </form>
            <div className="style-space-page OR">
              <span>Hoặc</span>
            </div>
            <div>
              <span>Chưa có tài khoản? </span>
              <Link to={ROUTES.SIGN_UP} className="style-space">
                Đăng ký ngay
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SigninPage;
