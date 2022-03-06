import React from "react";

const CreateCoursePage = () => {
  return (
    <form method="POST" class="create-course">
      <div>
        <h1>Nhập tiêu đề cho khóa học</h1>
        <p>Bạn có thể thay đổi tiêu đề ở phần chỉnh sửa khóa học.</p>
      </div>

      <div class="create-course__input">
        <div class="title">
          <input
            name="title"
            type="text"
            placeholder="e.g. Learn Photoshop CS6 from Scratch"
            maxlength="60"
          />
        </div>
      </div>

      <div class="create-course__footer">
        <a href="{{ route('instructor-courses') }}" class="btn-style-two">
          Exit
        </a>
        <button type="submit" class="btn-style-two">
          Tạo khóa học
        </button>
      </div>
    </form>
  );
};
export default CreateCoursePage;
