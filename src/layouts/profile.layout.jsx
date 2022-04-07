import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { IoIosArrowBack } from "react-icons/io";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Footer from "../components/Footer/Footer.component";

export const ProfileLayout = ({ children }) => {
  const [valueChanged, setValueChanged] = useState(false);
  const {
    profile: { bio, fullname },
  } = useSelector((state) => state.user);

  const { watch, register, control, getValues } = useForm({
    defaultValues: { ...bio, fullname },
  });
  console.log(getValues());
  useEffect(() => {});

  const handleValueChanged = (boolValue) => {
    setValueChanged(boolValue);
  };

  const resetState = () => {
    handleValueChanged(false);
  };

  return (
    <form
      className="wrapper instructor-page"
      // onSubmit={handleSubmit(onSubmit)}
    >
      <nav className="nav">
        <div className="nav-content">
          <div className="nav-top-profile">
            <Link to="/" className="d-flex align-items-center">
              <IoIosArrowBack />
              <span className="back">Trở về trang khóa học</span>
            </Link>

            {
              //   isRouteWithButtonSave &&
              <button
                //   disabled={valueChanged ? false : true}
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
