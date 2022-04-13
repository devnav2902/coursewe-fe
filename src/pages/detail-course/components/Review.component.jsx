import { DislikeOutlined, LikeOutlined } from "@ant-design/icons";
import Rating from "../../../components/Rating/Rating.component";
import { BE_URL } from "../../../utils/constants";
import { isUrl } from "../../../utils/functions";

const Review = ({ reviews }) => {
  return (
    <div className="review-comments-box">
      {/* && $course->count_progress */}

      {/* {!hasCommented && hasPurchased && (
        <>
          <div id="message-comment"></div>
          <form
            action="{{ route('rating') }}"
            className="form"
            id="comment-form"
            method="POST"
          >
            <input type="hidden" name="course_id" value="{{ $course->id }}" />
            <div className="user-comment">
              <p>Bạn đánh giá khóa học này thế nào?</p>
              <b>Để lại đánh giá cho khóa học này nhé!</b>
              <div className="star-rating">
                <input type="hidden" value="5" name="rating" id="user_rating" />
              </div>

              <div className="form-input">
                <span id="alert-message"></span>
                <textarea
                  placeholder="Để lại bình luận..."
                  name="content"
                  maxlength="512"
                  id="comment"
                  cols="30"
                  rows="5"
                ></textarea>

                <button type="submit" className="btn-style-two">
                  Submit Review
                </button>
              </div>
            </div>
          </form>
        </>
      )} */}

      {reviews && (
        <>
          <h6>Reviews</h6>

          <div className="comment-box">
            {reviews.map((review, i) => {
              const {
                content,
                user: { fullname, avatar },
                rating,
                created_at,
              } = review;

              return (
                <div key={i} className="reviewer-comment-box">
                  <div className="user-img">
                    <img
                      src={isUrl(avatar) ? avatar : BE_URL + "/" + avatar}
                      alt={fullname}
                    />
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
                      <li className="report">Report</li>
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
