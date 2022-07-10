import {
  Avatar,
  Checkbox,
  Col,
  Comment,
  Rate,
  Row,
  Select,
  Tooltip,
} from "antd";
import Paragraph from "antd/lib/typography/Paragraph";
import Text from "antd/lib/typography/Text";
import Title from "antd/lib/typography/Title";
import ReviewFilterApi, {
  Params,
  ReviewFilterResponse,
} from "api/review-filter.api";
import Loading from "components/Loading/Loading.component";
import moment from "moment";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { linkThumbnail } from "utils/functions";

const { Option } = Select;

const StyledComment = styled.div`
  background-color: #fff;
  padding: 0 15px;
  border-radius: 16px;
  box-shadow: rgb(145 158 171 / 50%) 0px 0px 2px 0px,
    rgb(145 158 171 / 20%) 0px 12px 24px -4px;
`;

const ReviewFilterPage = () => {
  const [params, setParams] = useState<Params>({
    has_a_comment: null,
    rating: null,
    sort_by: null,
  });
  const [reviewFilterData, setReviewFilterData] = useState<{
    loaded: boolean;
    data: ReviewFilterResponse["ratingData"]["data"];
  }>({ loaded: false, data: [] });

  useEffect(
    function getReviewFilter() {
      setReviewFilterData((state) => ({ ...state, loaded: false }));

      ReviewFilterApi.get(params)
        .then(({ data }) => {
          setReviewFilterData({ loaded: true, data: data.ratingData.data });
        })
        .catch((_) => {
          setReviewFilterData({ loaded: true, data: [] });
        });
    },
    [params]
  );

  return (
    <div>
      <h2>Học viên đánh giá khóa học</h2>
      <Row align="middle" gutter={[15, 15]} className="mb-3">
        <Col span={8}>
          <Checkbox
            checked={!!params.has_a_comment}
            disabled={!reviewFilterData.loaded}
            value={params.has_a_comment ? 1 : ""}
            onChange={(e) => {
              setParams((state) => ({
                ...state,
                has_a_comment: e.target.checked ? 1 : null,
              }));
            }}
          >
            Đánh giá có nhận xét
          </Checkbox>
        </Col>
        <Col span={8}>
          <span style={{ fontSize: 14 }}>Đánh giá</span>
          <Select
            style={{ width: 100 }}
            bordered={false}
            allowClear
            size="small"
            placeholder="Tùy chọn"
            disabled={!reviewFilterData.loaded}
            value={params.rating}
            onChange={(val) =>
              setParams((state) => ({
                ...state,
                rating: val,
              }))
            }
          >
            {Array.from({ length: 5 }).map((_, i) => (
              <Option key={i} value={i + 1}>
                {i + 1} sao
              </Option>
            ))}
          </Select>
        </Col>
        <Col span={8}>
          <span style={{ fontSize: 14 }}>Sắp xếp</span>
          <Select
            style={{ width: 140 }}
            bordered={false}
            allowClear
            size="small"
            placeholder="Tùy chọn"
            disabled={!reviewFilterData.loaded}
            value={params.sort_by}
            onChange={(val) =>
              setParams((state) => ({
                ...state,
                sort_by: val,
              }))
            }
          >
            <Option value="new">Đánh giá mới nhất</Option>
            <Option value="old">Đánh giá cũ nhất</Option>
          </Select>
        </Col>
      </Row>
      {!reviewFilterData.loaded ? (
        <Loading />
      ) : reviewFilterData.data.length < 1 ? (
        <div className="center pd-2">Không tìm thấy đánh giá nào!</div>
      ) : (
        <div className="pd-2">
          <Row gutter={[25, 25]}>
            {reviewFilterData.data.map((item) => (
              <Col span={12}>
                <StyledComment>
                  <Comment
                    key={item.user_id}
                    author={<a>{item.user.fullname}</a>}
                    avatar={
                      <Avatar
                        src={
                          item.user.avatar
                            ? linkThumbnail(item.user.avatar)
                            : ""
                        }
                        alt={item.user.fullname}
                      >
                        {item.user.fullname[0].toUpperCase()}
                      </Avatar>
                    }
                    content={
                      <div>
                        <Title level={5}>Khóa học: {item.course.title}</Title>
                        <div className="mb-1">
                          <Rate
                            value={item.rating}
                            count={5}
                            disabled
                            style={{ fontSize: 14 }}
                          />
                        </div>
                        <Text>
                          <div className="d-flex">
                            <span className="flex-shrink-0">Nhận xét:</span>
                            &nbsp;
                            <Tooltip title={item.content}>
                              <Paragraph
                                ellipsis={{ rows: 2 }}
                                style={{ marginBottom: 0 }}
                              >
                                {item.content}
                              </Paragraph>
                            </Tooltip>{" "}
                          </div>
                        </Text>
                      </div>
                    }
                    datetime={
                      <Tooltip
                        title={moment(item.created_at).format(
                          "DD-MM-YYYY HH:mm:ss"
                        )}
                      >
                        <span>{moment(item.created_at).fromNow()}</span>
                      </Tooltip>
                    }
                  />
                </StyledComment>
              </Col>
            ))}
          </Row>
        </div>
      )}
    </div>
  );
};

export default ReviewFilterPage;
