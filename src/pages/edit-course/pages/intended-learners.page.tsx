import { FC } from "react";
import { useTypedSelector } from "../../../hooks/redux.hooks";
import { ChildrenProps } from "../../../layouts/instructor-course.layout";
import OutcomeContainer from "../components/intended-learners/OutcomeContainer.component";
import RequirementsContainer from "../components/intended-learners/RequirementsContainer.component";

const IntendedLearnersPage: FC<ChildrenProps> = (props) => {
  const { data: course } = useTypedSelector(
    (state) => state.instructorCourse.course
  );

  const { resetState, setValue, getValues, setError, errors } = props;
  const { clearErrors } = props;
  const formMethod = {
    resetState,
    setValue,
    getValues,
    setError,
    errors,
    clearErrors,
  };

  if (!course) return null;

  return (
    <div className="edit-course-section">
      <div className="inner-column">
        <h6 className="">Mục tiêu và yêu cầu của khóa học</h6>
        <div className="edit-course-form">
          <p style={{ marginBottom: "40px" }}>
            Các mô tả sau đây sẽ được hiển thị công khai trên trang giới thiệu
            khóa học của bạn và sẽ có tác động trực tiếp đến hiệu suất khóa học
            của bạn. Những mô tả này sẽ giúp người học quyết định xem khóa học
            của bạn có phù hợp với họ hay không.
          </p>

          <section>
            <b className="mb-1 d-inline-block">
              Học viên sẽ học được gì trong khóa học của bạn?
            </b>

            <p>
              Bạn phải nhập ít nhất 4 mục tiêu hoặc kết quả học tập mà người học
              có thể mong đợi đạt được sau khi hoàn thành khóa học của bạn.
            </p>

            <OutcomeContainer course={course} formMethod={formMethod} />
          </section>
          <section>
            <b className="mb-1 d-inline-block">
              Các yêu cầu hoặc điều kiện tiên quyết để tham gia khóa học của bạn
              là gì?
            </b>

            <p>
              Liệt kê các kỹ năng, kinh nghiệm, công cụ hoặc thiết bị cần thiết
              mà người học phải có trước khi tham gia khóa học của bạn. Nếu
              không có yêu cầu nào, bạn có thể sử dụng không gian này như một cơ
              hội để hạ thấp rào cản với những người mới bắt đầu.
            </p>

            <RequirementsContainer course={course} formMethod={formMethod} />
          </section>
        </div>
      </div>
    </div>
  );
};

export default IntendedLearnersPage;
