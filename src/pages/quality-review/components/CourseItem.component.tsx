import {
  AntDesignOutlined,
  BarChartOutlined,
  ClockCircleOutlined,
  EllipsisOutlined,
  QuestionOutlined,
  TrophyFilled,
  TrophyOutlined,
  TrophyTwoTone,
  UserOutlined,
} from "@ant-design/icons";
import {
  Avatar,
  Button,
  Card,
  Col,
  Menu,
  Modal,
  Popover,
  Rate,
  Row,
  Skeleton,
  Space,
  Tag,
  Tooltip,
} from "antd";
import Text from "antd/lib/typography/Text";
import Title from "antd/lib/typography/Title";
import { ICourse } from "api/rating-quality.api";
import moment from "moment";
import { FC, useState } from "react";
import styled from "styled-components";
import { ROUTES } from "utils/constants";
import { linkThumbnail, roundsTheNumber } from "utils/functions";

const StyledCourseItem = styled.div`
  border-radius: 16px;
  background-color: #fff;
  box-shadow: rgb(145 158 171 / 20%) 0px 0px 2px 0px,
    rgb(145 158 171 / 12%) 0px 12px 24px -4px;
  overflow: hidden;
`;

interface IProps {
  data: ICourse;
}

const CourseItem: FC<IProps> = ({ data }) => {
  const [loading, setLoading] = useState(false);
  const [visibleRate, setVisibleRate] = useState(false);

  const showModalRate = () => {
    setVisibleRate(true);
  };

  const handleOkRate = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setVisibleRate(false);
    }, 3000);
  };

  const handleCancelRate = () => {
    setVisibleRate(false);
  };

  function handleRate() {}

  return (
    <>
      <StyledCourseItem>
        <Card
          bordered={false}
          actions={[
            <TrophyTwoTone style={{ fontSize: 18 }} onClick={showModalRate} />,
            <BarChartOutlined style={{ fontSize: 18 }} />,
            <Popover
              content={
                <Menu>
                  <Menu.Item key="1">
                    <a
                      target="_blank"
                      href={ROUTES.landing_page_draft(data.id)}
                    >
                      Trang chi tiết khóa học
                    </a>
                  </Menu.Item>
                  <Menu.Item key="2">
                    <a
                      target="_blank"
                      href={ROUTES.check_video({ course_id: data.id })}
                    >
                      Trang nội dung bài giảng
                    </a>
                  </Menu.Item>
                </Menu>
              }
              title="Xem chi tiết khóa học"
              trigger="click"
            >
              <EllipsisOutlined style={{ fontSize: 18 }} key="ellipsis" />
            </Popover>,
          ]}
        >
          <Skeleton loading={false} active>
            <Row
              justify="space-between"
              align="top"
              wrap={false}
              gutter={[5, 5]}
              className="mb-1"
            >
              <Title
                level={5}
                style={{ marginBottom: 0 }}
                ellipsis={{ rows: 2 }}
                title={data.title}
              >
                {data.title}
              </Title>
              <Space align="center" className="flex-shrink-0">
                <ClockCircleOutlined />
                <Text>
                  {moment(data.updated_at, "DD/MM/YYYY HH:mm A")
                    .locale("vi_VN")
                    .fromNow()}
                </Text>
              </Space>
            </Row>
            <Row gutter={[5, 5]} className="mb-2">
              {data.categories.map((category) => (
                <Tag key={category.category_id} style={{ borderRadius: 15 }}>
                  {category.title}
                </Tag>
              ))}
            </Row>

            <Row>
              <Col span={12}>
                <Text strong>Đánh giá chất lượng</Text>
                <Space direction="horizontal">
                  <TrophyFilled
                    style={{ marginBottom: 0, fontSize: 25, color: "#fadb14" }}
                  />

                  <Space direction="vertical">
                    <Text>
                      Đánh giá:{" "}
                      <Text strong style={{ fontSize: 17 }}>
                        {data.rating_quality_avg_rating
                          ? roundsTheNumber(data.rating_quality_avg_rating, 1)
                          : "0.0"}
                      </Text>
                      &nbsp;/&nbsp;10
                    </Text>

                    {data.rating_quality.length < 1 ? (
                      <Text>Chưa có đánh giá</Text>
                    ) : (
                      <Avatar.Group
                        maxCount={3}
                        maxPopoverTrigger="click"
                        size="small"
                        maxStyle={{
                          color: "#f56a00",
                          backgroundColor: "#fde3cf",
                          cursor: "pointer",
                        }}
                      >
                        {data.rating_quality.map((item) => (
                          <Avatar src={linkThumbnail(item.user.avatar)} />
                        ))}
                      </Avatar.Group>
                    )}
                  </Space>
                </Space>
              </Col>
              <Col span={12} style={{ textAlign: "right" }}>
                <Space direction="vertical" align="center" size={0}>
                  <Text strong>Đánh giá từ bạn</Text>
                  {!data.rated ? (
                    <Space direction="vertical" align="center" size={0}>
                      <TrophyTwoTone style={{ fontSize: 25 }} />
                      <Text>Bạn chưa đánh giá</Text>
                    </Space>
                  ) : (
                    <div>
                      <TrophyTwoTone style={{ fontSize: 25 }} />
                      &nbsp;&nbsp;
                      <Text strong>
                        {roundsTheNumber(data.rated.rating, 1)}
                      </Text>
                    </div>
                  )}
                </Space>
              </Col>
            </Row>
          </Skeleton>
        </Card>
      </StyledCourseItem>
      <Modal
        visible={visibleRate}
        onOk={handleOkRate}
        onCancel={handleCancelRate}
        width={480}
        footer={
          <Row justify="center">
            <Button
              key="submit"
              type="primary"
              loading={loading}
              onClick={handleOkRate}
              style={{ width: "80%" }}
            >
              Chấp nhận
            </Button>
          </Row>
        }
        bodyStyle={{ textAlign: "center", position: "relative" }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: "50%",
            transform: "translate(-50%,-50%)",
          }}
        >
          <QuestionOutlined
            style={{
              color: "#fff",
              position: "absolute",
              top: "40%",
              left: "50%",
              transform: "translate(-50%,-50%)",
              fontSize: 19,
            }}
          />
          <TrophyFilled style={{ fontSize: 72, color: "#5799EE" }} />
        </div>
        <Title
          level={5}
          style={{
            marginBottom: 0,
            color: "#f5c518",
            textTransform: "uppercase",
          }}
          className="mt-3"
        >
          Đánh giá khóa học
        </Title>
        <Title level={5} style={{ marginBottom: 0 }}>
          Học lập trình C++ từ cơ bản đến nâng cao
        </Title>

        <Rate
          count={10}
          character={<TrophyOutlined />}
          style={{ fontSize: 26 }}
        />
      </Modal>
    </>
  );
};

export default CourseItem;
