import { roundsTheNumber } from "../../../utils/functions";
import Rating from "../../../components/Rating/Rating.component";
import { RatingArray } from "../../../api/course.api";
import { FC } from "react";
import { StyledStudentReviewBox } from "../styles/detail-course.styles";

interface Props {
  rating_avg_rating: string;
  graph: RatingArray;
}

const RatingGraph: FC<Props> = ({ rating_avg_rating, graph }) => {
  const graphReverse = [...graph].reverse();

  return (
    <StyledStudentReviewBox>
      <div className="rating-column">
        <div className="inner-column">
          {rating_avg_rating && (
            <div className="total-rating">
              {roundsTheNumber(rating_avg_rating, 1)}
            </div>
          )}
          <div className="rating">
            <Rating value={rating_avg_rating} />
          </div>
          <div className="title">Điểm đánh giá</div>
        </div>
      </div>

      <div className="graph-column">
        <div className="skills">
          {graphReverse.map((item) => {
            const { percent, rating } = item;
            return (
              <div key={rating} className="skill-item">
                <div className="skill-bar">
                  <div className="bar-inner">
                    <div
                      className="bar progress-line"
                      style={{ width: roundsTheNumber(percent, 1) + "%" }}
                    />
                  </div>

                  <div className="rating">
                    <div className="stars">
                      <Rating value={rating} size="16px" />
                    </div>
                    <span>{roundsTheNumber(percent, 1)}%</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </StyledStudentReviewBox>
  );
};
export default RatingGraph;
