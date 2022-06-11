import { Button } from "antd";
import axios from "axios";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../../components/Input/Input.component";
import { useAppDispatch } from "../../../hooks/redux.hooks";
import { login } from "../../../redux/slices/user.slice";
import { BE_URL, ROUTES } from "../../../utils/constants";
import { openNotification } from "../../../utils/functions";
const bgr = require("../../../assets/images/login.jpg");

const SigninPage = () => {
  const dispatch = useAppDispatch();

  const { handleSubmit, register } = useForm();

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<FieldValues> = ({ password, email }) => {
    // initialize CSRF protection
    setLoading(true);

    axios.get(`${BE_URL}/sanctum/csrf-cookie`).then((res) => {
      dispatch(login({ password, email }))
        .unwrap()
        .then((res) => {
          setLoading(false);

          res.role.name === "admin"
            ? navigate(ROUTES.home("admin"))
            : navigate(-1);
        })
        .catch((error) => {
          setLoading(false);

          openNotification("error", "Lỗi trong quá trình đăng nhập!");
        });
    });
  };

  return (
    <div
      className="login container"
      style={{ background: `url(${bgr}) center/cover` }}
    >
      <div className="login-wrap">
        <div className="login-body">
          <div className="form-body">
            <Link to={ROUTES.home("user")} className="logo">
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
                <Button
                  loading={loading}
                  htmlType="submit"
                  className="btn sign-in"
                  type="default"
                >
                  Đăng nhập
                </Button>
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
