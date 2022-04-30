import { Spin } from "antd";
import { FC } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { ParamsSignUp } from "../../../api/user.api";
import Input from "../../../components/Input/Input.component";
import { useAppDispatch, useTypedSelector } from "../../../hooks/redux.hooks";
import { signUp } from "../../../redux/slices/user.slice";
import { ROUTES } from "../../../utils/constants";

const SignupPage: FC = () => {
  const dispatch = useAppDispatch();
  const { register, handleSubmit } = useForm<ParamsSignUp>();
  const { loaded } = useTypedSelector((state) => state.user);

  const onSubmit: SubmitHandler<ParamsSignUp> = (data: ParamsSignUp) => {
    dispatch(signUp(data));
  };

  return (
    <div className="login container">
      <div className="login-wrap">
        <div className="login-body">
          <div className="form-body">
            <Link to="/" className="logo">
              Coursewe
            </Link>
            <p className="title">Đăng ký tài khoản</p>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="account-form"
              method="POST"
            >
              <div className="style-space">
                <div className="form-login style-space">
                  <Input
                    register={register}
                    label="Tên của bạn"
                    name="fullname"
                    required={true}
                    type="text"
                  />
                </div>
              </div>
              <div className="form-login style-space email">
                <Input
                  register={register}
                  label="Email của bạn"
                  name="email"
                  required={true}
                  type="text"
                />
              </div>
              <div className="form-login password">
                <Input
                  register={register}
                  label="Mật khẩu"
                  name="password"
                  required={true}
                  type="password"
                />
              </div>
              <div className="submit">
                {!loaded ? (
                  <Spin />
                ) : (
                  <button type="submit" className="sign-up">
                    Tạo tài khoản
                  </button>
                )}
              </div>
            </form>
            <div className="footer-content">
              <span>Đã có tài khoản? </span>
              <Link to={ROUTES.SIGN_IN} className="style-space">
                Đăng nhập ngay
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SignupPage;
