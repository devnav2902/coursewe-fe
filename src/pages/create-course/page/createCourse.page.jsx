import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { createCourse } from "../../../redux/actions/course.actions";
import { ROUTES, routesWithParams } from "../../../utils/constants";

const CreateCoursePage = () => {
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    const { title } = data;
    dispatch(createCourse(title));
  };
  const { idNewCourse } = useSelector((state) => state.course);
  const navigate = useNavigate();
  console.log(idNewCourse);

  useEffect(() => {
    idNewCourse && navigate(routesWithParams.course_basics(idNewCourse));
  }, [idNewCourse]);
  return (
    <form method="POST" class="create-course" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <h1>Nhập tiêu đề cho khóa học</h1>
        <p>Bạn có thể thay đổi tiêu đề ở phần chỉnh sửa khóa học.</p>
      </div>

      <div class="create-course__input">
        <div class="title">
          <input
            placeholder="e.g. Learn Photoshop CS6 from Scratch"
            maxlength="60"
            {...register("title")}
          />
        </div>
      </div>

      <div class="create-course__footer">
        <Link to={ROUTES.INSTRUCTOR_COURSES} class="btn-style-two">
          Exit
        </Link>
        <button type="submit" class="btn-style-two">
          Tạo khóa học
        </button>
      </div>
    </form>
  );
};
export default CreateCoursePage;
