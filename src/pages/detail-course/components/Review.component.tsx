import { DislikeOutlined, LikeOutlined } from "@ant-design/icons";
import { FC, useEffect, useState } from "react";
import RatingApi from "../../../api/rating.api";
import Rating from "../../../components/Rating/Rating.component";
import { RatingPagination } from "../../../ts/types/course.types";
import { linkThumbnail } from "../../../utils/functions";

type ReviewProps = {
  courseId: string | number;
};

const Review: FC<ReviewProps> = ({ courseId }) => {
  const [reviewData, setReviewData] = useState<{
    loaded: boolean;
    value: null | RatingPagination;
  }>({ loaded: false, value: null });

  useEffect(() => {
    RatingApi.get(courseId).then(({ data }) => {
      setReviewData((state) => ({
        ...state,
        loaded: true,
        value: data.rating,
      }));
    });
  }, [courseId]);

  return (
    <div className="review-comments-box">
      {reviewData?.value?.data.length && (
        <>
          <h6>Reviews</h6>

          <div className="comment-box">
            {reviewData.value.data.map((review, i) => {
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

                      <span>{created_at}</span>
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
                      {/* <li className="report">Report</li> */}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default Review;
