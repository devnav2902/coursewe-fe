import { DislikeOutlined, LikeOutlined } from "@ant-design/icons";
import { Button, Skeleton } from "antd";
import moment from "moment";
import { FC, useEffect, useState } from "react";
import RatingApi from "../../../api/rating.api";
import Rating from "../../../components/Rating/Rating.component";
import { RatingPagination } from "../../../ts/types/course.types";
import { linkThumbnail } from "../../../utils/functions";
import { StyledReviewComments } from "../styles/detail-course.styles";

moment.locale("vi");

type ReviewProps = {
  courseId: string | number;
};

const Review: FC<ReviewProps> = ({ courseId }) => {
  const [reviewData, setReviewData] = useState<{
    loaded: boolean;
    value: null | RatingPagination;
  }>({ loaded: false, value: null });

  const [firstLoaded, setFirstLoaded] = useState(false);

  useEffect(() => {
    RatingApi.get(courseId).then(({ data }) => {
      setFirstLoaded(true);
      setReviewData((state) => ({
        ...state,
        loaded: true,
        value: data.rating,
      }));
    });
  }, [courseId]);

  function onChangePage(page: number) {
    setReviewData((state) => ({
      ...state,
      loaded: false,
    }));

    RatingApi.get(courseId, page).then(({ data }) => {
      setReviewData((state) => ({
        ...state,
        loaded: true,
        value: {
          ...data.rating,
          data: [
            ...(state.value as RatingPagination).data,
            ...data.rating.data,
          ],
        },
      }));
    });
  }

  return (
    <StyledReviewComments>
      <>
        <h6>Đánh giá và nhận xét</h6>

        {!firstLoaded ? (
          <Skeleton avatar paragraph={{ rows: 3 }} active />
        ) : !reviewData?.value?.total ? (
          <p>Hiện chưa có bất kỳ đánh giá nào!</p>
        ) : (
          <>
            <div className="comment-box">
              {reviewData.value?.data.map((review, i) => {
                const {
                  content,
                  user: { fullname, avatar },
                  rating,
                  created_at,
                } = review;

                return (
                  <div key={i} className="reviewer-comment-box">
                    <div className="user-img">
                      <img src={linkThumbnail(avatar)} alt={fullname} />
                    </div>
                    <div className="comment_content">
                      <h4>{fullname}</h4>
                      <div className="rating d-flex align-items-center">
                        <Rating value={rating} size="14px" />

                        <span>{moment(created_at).fromNow()}</span>
                      </div>
                      <div className="text">{content}</div>
                      <div className="helpful">
                        Bình luận này hữu ích với bạn?
                      </div>
                      <ul className="like-option">
                        <li className="icon">
                          <LikeOutlined />
                        </li>
                        <li className="icon">
                          <DislikeOutlined />
                        </li>
                      </ul>
                    </div>
                  </div>
                );
              })}
            </div>
            {reviewData.value.current_page !== reviewData.value.last_page && (
              <Button
                onClick={() =>
                  onChangePage(
                    (reviewData.value as RatingPagination).current_page + 1
                  )
                }
                type="default"
                loading={!reviewData.loaded}
                className="w-100 btn border-btn show-more-review-button text-center"
              >
                Xem thêm đánh giá
              </Button>
            )}
          </>
        )}
      </>
    </StyledReviewComments>
  );
};

export default Review;
