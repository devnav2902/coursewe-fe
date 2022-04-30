import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { IoIosArrowBack } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ProfileApi from "../api/profile.api";
import Footer from "../components/Footer/Footer.component";
import { getCurrentUser } from "../redux/actions/account.actions";

export const ProfileLayout = ({ children }) => {
  const [valueChanged, setValueChanged] = useState(false);
  const {
    profile: { bio, fullname },
  } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { watch, register, control, getValues, handleSubmit } = useForm({
    defaultValues: { ...bio, fullname },
  });
  console.log(getValues());
  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      !valueChanged && handleValueChanged(true);
      console.log(value, name, type);
    });
    return () => {
      subscription.unsubscribe();
    };
  }, [watch, valueChanged, handleValueChanged]);

  function handleValueChanged(boolValue) {
    setValueChanged(boolValue);
  }

  function resetState() {
    handleValueChanged(false);
  }
  function onSubmit(data) {
    ProfileApi.updateProfile(data).then((res) => {
      dispatch(getCurrentUser());
      setValueChanged(false);
    });
  }
  return (
    <form className="wrapper instructor-page" onSubmit={handleSubmit(onSubmit)}>
      <nav className="nav">
        <div className="nav-content">
          <div className="nav-top-profile">
            <Link to="/" className="d-flex align-items-center">
              <IoIosArrowBack />
              <span className="back">Trở về trang khóa học</span>
            </Link>

            {
              <button
                disabled={valueChanged ? false : true}
                type="submit"
                className="save"
              >
                Lưu thay đổi
              </button>
            }
          </div>
        </div>
      </nav>
      <main>
        {children({
          register,
          resetState,
          valueChanged,
          handleValueChanged,
          control,
        })}
      </main>
      <Footer />
    </form>
  );
};
export default ProfileLayout;
