import { StarOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Slider from "react-slick";
import styled from "styled-components";
import CategoriesApi from "../../../api/categories.api";
import Rating from "../../../components/Rating/Rating.component";
import { routesWithParams } from "../../../utils/constants";
import { linkThumbnail } from "../../../utils/functions";
import SkeletonInstructors from "../../home/utils/component.utils";
import { settings } from "../../home/utils/slick.utils";
import { getCategorySlug } from "../utils/functions";
const StyledInstructor = styled.div`
  &.authors {
    position: relative;
    .slick-list {
      padding: 10px 0;
    }
    .nav .btnLeft,
    .nav .btnRight {
      z-index: 50;
      position: absolute;
      top: 50%;
    }
  }

  .inner-box {
    text-align: center;
    padding: var(--spacing-3) var(--spacing-2) var(--spacing-3);
    display: flex;
    flex-direction: column;
    box-shadow: 0 0 2px rgba(77, 77, 77, 0.212);
    position: relative;

    background-color: var(--color-white);
    .image {
      position: relative;
      width: 10rem;
      height: 10rem;
      margin: 0 auto;
      margin-bottom: var(--spacing-2);
      box-shadow: 0 0 5px rgb(220, 219, 219);
      border-radius: 50%;
      background-color: #fff;
      z-index: 2;
      &::before {
        z-index: -1;
        content: "";
        position: absolute;
        width: 4rem;
        height: 4rem;
        border-radius: 50%;
        background-color: rgb(215, 230, 244);
        left: 1rem;
        bottom: -1rem;
      }
      &::after {
        width: 3px;
        height: 3px;
        content: "";
        position: absolute;
        z-index: -1;
        right: 2rem;
        top: -2rem;
        box-shadow: rgb(177, 205, 252) 0px 0px 0px 0px,
          rgb(177, 205, 252) -25px 25px 0px 0px,
          rgb(177, 205, 252) -10px 25px 0px 0px,
          rgb(177, 205, 252) 5px 25px 0px 0px,
          rgb(177, 205, 252) 20px 25px 0px 0px,
          rgb(177, 205, 252) 20px 40px 0px 0px,
          rgb(177, 205, 252) 5px 40px 0px 0px,
          rgb(177, 205, 252) -10px 40px 0px 0px,
          rgb(177, 205, 252) 5px 55px 0px 0px,
          rgb(177, 205, 252) 20px 55px 0px 0px,
          rgb(177, 205, 252) 20px 70px 0px 0px;
      }
      img {
        border-radius: 50%;
        object-fit: cover;
        width: 100%;
        height: 100%;
      }
    }
    .name {
      position: relative;
      color: var(--color-dark);
      font-size: 1.4rem;
      font-weight: 700;
      font-family: "Roboto", sans-serif;
    }
    .text {
      position: relative;
      color: var(--color-blue);
      font-size: 1.3rem;
      font-weight: 500;
      margin-top: auto;
    }
    .course {
      color: var(--color-muted);
      margin-bottom: var(--spacing-1);
      margin-top: var(--spacing-1);
      -webkit-line-clamp: 2;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
    .course span {
      font-weight: 500;
      color: var(--color-dark);
    }
  }
  .content-wrapper {
    padding: 5rem 0 8rem;
    justify-content: center;
    > div {
      max-width: 40rem;
      margin-left: 9.6rem;
    }
    h3 {
      font-family: Georgia, "Times New Roman", Times, serif;
      font-weight: 700;
      font-size: 3.2rem;
      line-height: 1.25;
    }
    .content {
      line-height: 1.4;
      font-size: 1.9rem;
      margin-bottom: 1.6rem;
    }
    .link {
      a {
        display: inline-block;
      }
    }
  }

  .author-box {
    &__footer {
      padding-top: 20px;
      color: rgb(61, 61, 61);
      // .num {
      //     margin-right: 5px;
      // }
    }
  }
`;
const PopularInstructors = () => {
  const { slug, sub, topic } = useParams();

  const [dataPopularInstructors, setDataPopularInstructors] = useState([]);
  const [loadedInstructors, setLoadedInstructors] = useState(false);
  // console.log(slug);
  useEffect(() => {
    const params = { slug, sub, topic };

    const slugCategory = getCategorySlug(params);
    console.log(slugCategory);
    CategoriesApi.getPopularInstructors(slugCategory).then((res) => {
      setDataPopularInstructors(res.data.avgRating);
      setLoadedInstructors(true);
    });
  }, [slug, sub, topic]);

  return (
    <div>
      <StyledInstructor className="authors list-items">
        <h2 className="title">Giảng viên tiêu biểu</h2>
        <div className="container_wrap">
          <div className="nav">
            <i className="fas btn fa-chevron-left btnLeft"></i>
            <i className="fas btn fa-chevron-right btnRight"></i>
          </div>
          <div className="author-box">
            {!loadedInstructors ? (
              <SkeletonInstructors />
            ) : (
              <Slider {...settings}>
                {dataPopularInstructors.map((author) => {
                  const {
                    infoAuthor: { id, slug, avatar, fullname },
                    avgRating,
                    amountSudents,
                    totalCourses,
                  } = author;
                  return (
                    <Link
                      key={id}
                      className="inner-box"
                      to={routesWithParams.instructor_bio(slug)}
                    >
                      <div className="image">
                        <img src={linkThumbnail(avatar)} alt="" />
                      </div>
                      <div className="name">{fullname}</div>

                      <div className="author-box__footer">
                        <div className="num_students">
                          <span className="num fw-bold">
                            {avgRating + " "}
                            <Rating count={1} value={1} />
                          </span>
                        </div>
                      </div>
                      <div className="author-box__footer">
                        <div className="num_students">
                          <span className="num fw-bold">
                            {amountSudents} học viên
                          </span>
                        </div>
                        <div className="num_courses">
                          <span className="num fw-bold">
                            {totalCourses + " "} khóa học
                          </span>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </Slider>
            )}
          </div>
        </div>
      </StyledInstructor>
    </div>
  );
};

export default PopularInstructors;
