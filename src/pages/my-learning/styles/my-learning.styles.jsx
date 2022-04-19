import styled from "styled-components";

const StyledCourse = styled.div`
  &.course {
    display: flex;
    flex-direction: column;
    border: 1px solid rgb(207, 207, 207);
    height: 100%;
    .profile-course {
      flex-grow: 1;
      display: flex;
      flex-direction: column;
      padding: 1rem 1.2rem 2rem;
    }
    .name-course {
      margin-bottom: 6px;
      font-size: 1.6rem;
      a {
        color: #1c1d1f;
        &:hover {
          color: #54555a;
        }
      }
    }
    .course-footer {
      margin-top: auto;
      display: flex;
      flex-direction: column;

      a {
        font-size: 1.4rem;
        margin-left: auto;
        color: #00000080;
      }
      .progress-wrapper {
        margin-bottom: 1rem;
        .count-progress {
          color: #5959ff;
        }
      }
      .course-rating {
        display: flex;
        align-items: center;
        i {
          font-size: 1.4rem;
        }
      }
    }
    .image-course {
      aspect-ratio: 16/9;
      img {
        object-fit: cover;
        width: 100%;
        height: 100%;
      }
    }

    .author {
      font-size: 1.3rem;
      color: #1c1d1f;
    }
  }
`;

export { StyledCourse };
