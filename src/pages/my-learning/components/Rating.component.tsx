import { Button, Modal, Rate, Row } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { Dispatch, FC, SetStateAction, useState } from "react";
import RatingApi, { Rate as IRate } from "../../../api/rating.api";
import { RatingWrapper } from "../../../components/Rating/Rating.component";
import { openNotification } from "../../../utils/functions";

type Props = {
  getCourses: () => void;
  courseId: string | number;
  isModalVisible: boolean;
  setIsModalVisible: Dispatch<SetStateAction<boolean>>;
};

const Rating: FC<Props> = ({
  isModalVisible,
  setIsModalVisible,
  courseId,
  getCourses,
}) => {
  const desc = [
    "Chất lượng kém",
    "Không hấp dẫn",
    "Bình thường",
    "Hay",
    "Tuyệt vời",
  ];

  const [value, setValue] = useState(5);
  const [saving, setSaving] = useState(false);
  const [content, setContent] = useState("");

  function handleRate() {
    setSaving(true);

    RatingApi.rate({
      course_id: courseId,
      rating: value as IRate["rating"],
      content,
    })
      .then((res) => {
        setSaving(false);
        setIsModalVisible(false);
        getCourses();
        openNotification("success", "Đánh giá khóa học thành công!");
      })
      .catch((error) => {
        setSaving(false);
        setIsModalVisible(false);
        openNotification("error", "Lỗi trong quá trình đánh giá khóa học!");
      });
  }

  return (
    <Modal
      visible={isModalVisible}
      closable={!saving}
      onCancel={() => setIsModalVisible(false)}
      footer={
        <Row justify="end">
          <Button
            loading={saving}
            htmlType="button"
            type="default"
            className="btn-primary"
            onClick={handleRate}
          >
            Lưu và tiếp tục
          </Button>
        </Row>
      }
    >
      <h2 className="center mb-3">Bạn thấy khóa học này thế nào?</h2>
      <Row justify="center" className="mb-2">
        <RatingWrapper size="30px">
          <Rate tooltips={desc} onChange={setValue} value={value} />
        </RatingWrapper>
      </Row>

      <TextArea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Viết nhận xét về chất lượng của khóa học..."
        autoSize={{ minRows: 4, maxRows: 6 }}
      />
    </Modal>
  );
};

export default Rating;
