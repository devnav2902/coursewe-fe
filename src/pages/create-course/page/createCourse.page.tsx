import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import CourseApi from "../../../api/course.api";
import { ROUTES } from "../../../utils/constants";

const CreateCoursePage = () => {
  const { register, handleSubmit } = useForm({ defaultValues: { title: "" } });
  const navigate = useNavigate();

  const onSubmit = handleSubmit((data) => {
    const { title } = data;

    CourseApi.createCourse(title).then(({ data }) => {
      navigate(ROUTES.course_basics(data.id));
    });
  });

  return (
    <form className="create-course" onSubmit={onSubmit}>
      <div>
        <h1>Nhập tiêu đề cho khóa học</h1>
        <p>Bạn có thể thay đổi tiêu đề ở phần chỉnh sửa khóa học.</p>
      </div>

      <div className="create-course__input">
        <div className="title">
          <input
            placeholder="e.g. Learn Photoshop CS6 from Scratch"
            maxLength={60}
            {...register("title")}
          />
        </div>
      </div>

      <div className="create-course__footer">
        <Link to={ROUTES.INSTRUCTOR_COURSES} className="btn-style-two">
          Trở về
        </Link>
        <button type="submit" className="btn-style-two">
          Tạo khóa học
        </button>
      </div>
    </form>
  );
};
export default CreateCoursePage;
