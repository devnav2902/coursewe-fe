import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import CourseApi from "../../../api/course.api";
import ErrorBanner from "../../../components/ErrorBanner/ErrorBanner.component";
import { ROUTES } from "../../../utils/constants";
import { StyledWrapper } from "../styles/create-course.styles";

const CreateCoursePage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: { title: "" } });
  const navigate = useNavigate();

  const onSubmit = handleSubmit((data) => {
    const { title } = data;

    CourseApi.createCourse(title).then(({ data }) => {
      navigate(ROUTES.course_basics(data.id));
    });
  });

  return (
    <StyledWrapper className="create-course" onSubmit={onSubmit}>
      <div>
        <h1>Nhập tiêu đề cho khóa học</h1>
        <p>Bạn có thể thay đổi tiêu đề ở phần chỉnh sửa khóa học.</p>
      </div>

      <div className="create-course__input">
        <div className="title">
          <input
            placeholder="Ví dụ: Học photoshop cơ bản"
            maxLength={60}
            {...register("title", {
              required: "Bạn chưa nhập tiêu đề cho khóa học!",
            })}
          />

          {errors.title?.message && (
            <ErrorBanner error={errors.title.message} />
          )}
        </div>
      </div>

      <div className="create-course__footer">
        <Link
          to={ROUTES.INSTRUCTOR_COURSES}
          className="btn-primary btn-default"
        >
          Trở về
        </Link>
        <button type="submit" className="btn-primary">
          Tạo khóa học
        </button>
      </div>
    </StyledWrapper>
  );
};
export default CreateCoursePage;
