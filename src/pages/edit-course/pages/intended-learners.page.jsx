import { useState } from "react";
import { Button, Col, Input, Row } from "antd";
import { FiPlus } from "react-icons/fi";
import { ImBin } from "react-icons/im";
import { Space } from "antd";

const IntendedLearnersPage = ({ course }) => {
  return (
    <div className="edit-course-section">
      <form method="POST" id="form-course" action="">
        <div className="inner-column">
          <h6 className="">Mục tiêu và yêu cầu của khóa học</h6>
          <div className="edit-course-form">
            <p style={{ marginBottom: "40px" }}>
              Các mô tả sau đây sẽ được hiển thị công khai trên trang giới thiệu
              khóa học của bạn và sẽ có tác động trực tiếp đến hiệu suất khóa
              học của bạn. Những mô tả này sẽ giúp người học quyết định xem khóa
              học của bạn có phù hợp với họ hay không.
            </p>

            <section>
              <b className="mb-1 d-inline-block">
                Học viên sẽ học được gì trong khóa học của bạn?
              </b>

              <p>
                Bạn phải nhập ít nhất 4 mục tiêu hoặc kết quả học tập mà người
                học có thể mong đợi đạt được sau khi hoàn thành khóa học của
                bạn.
              </p>

              <div className="goals-wrapper">
                <Row gutter={[0, 15]}>
                  {Array.from({ length: 4 }).map((_, i) => (
                    <Col key={i} span={24}>
                      <Row gutter={10}>
                        <Col span={20}>
                          <Input
                            id="subtitle"
                            name="subtitle"
                            showCount
                            maxLength={160}
                            placeholder="Ví dụ: Có kiến thức nền tảng tốt về ngôn ngữ lập trình để có thể học cao lên sau này"
                            // value={title}
                          />
                        </Col>
                        <Col span={4}>
                          <Button className="btn-remove h-100 d-flex align-items-center">
                            <ImBin />
                          </Button>
                        </Col>
                      </Row>
                    </Col>
                  ))}
                </Row>
                <br />
                <Button
                  type="link"
                  className="add-response d-flex align-items-center"
                >
                  <FiPlus />
                  Thêm câu trả lời cho những mục tiêu của khóa học
                </Button>
              </div>
            </section>
            <section>
              <b className="mb-1 d-inline-block">
                Các yêu cầu hoặc điều kiện tiên quyết để tham gia khóa học của
                bạn là gì?
              </b>

              <p>
                Liệt kê các kỹ năng, kinh nghiệm, công cụ hoặc thiết bị cần
                thiết mà người học phải có trước khi tham gia khóa học của bạn.
                Nếu không có yêu cầu nào, bạn có thể sử dụng không gian này như
                một cơ hội để hạ thấp rào cản với những người mới bắt đầu.
              </p>

              <div className="requirements-wrapper">
                <Row gutter={[0, 15]}>
                  {Array.from({ length: 4 }).map((_, i) => (
                    <Col key={i} span={24}>
                      <Row gutter={10}>
                        <Col span={20}>
                          <Input
                            id="subtitle"
                            name="subtitle"
                            showCount
                            maxLength={160}
                            placeholder="Ví dụ: Không cần kinh nghiệm lập trình. Bạn sẽ học mọi thứ bạn cần biết"
                            // value={title}
                          />
                        </Col>
                        <Col span={4}>
                          <Button className="btn-remove h-100 d-flex align-items-center">
                            <ImBin />
                          </Button>
                        </Col>
                      </Row>
                    </Col>
                  ))}
                </Row>
                <br />
                <Button
                  type="link"
                  className="add-response d-flex align-items-center"
                >
                  <FiPlus />
                  Thêm yêu cầu hoặc điều kiện tiên quyết của khóa học
                </Button>
              </div>
            </section>
          </div>
        </div>
      </form>
    </div>
  );
};

export default IntendedLearnersPage;
