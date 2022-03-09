import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../../redux/actions/account.actions";
import { useForm } from "react-hook-form";
import Input from "../../../components/Input/Input.component";
import { Link } from "react-router-dom";
import { Spin } from "antd";
import { BE_URL, ROUTES } from "../../../utils/constants";

const SigninPage = () => {
  const dispatch = useDispatch();
  const { handleSubmit, register } = useForm();
  const { loaded } = useSelector((state) => state.user);

  const onSubmit = (data) => {
    const { password, email } = data;

    // initialize CSRF protection
    axios.get(`${BE_URL}/sanctum/csrf-cookie`).then((res) => {
      dispatch(login({ password, email }));
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
