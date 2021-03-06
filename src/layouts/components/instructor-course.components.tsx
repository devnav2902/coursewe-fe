import { DollarCircleOutlined } from "@ant-design/icons";
import { Modal, Spin } from "antd";
import axios from "axios";
import { FC, useState } from "react";
import { BsFileRichtext, BsInfoCircle } from "react-icons/bs";
import { FaLaptopHouse } from "react-icons/fa";
import { IoMdPricetags } from "react-icons/io";
import { RiBookmark3Line } from "react-icons/ri";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import PublishCourseApi, {
  MissingPublishRequirements,
} from "../../api/publish-course.api";
import { ROUTES } from "../../utils/constants";
import { openNotification } from "../../utils/functions";

type PagesAndRequirementsItem = {
  url: string;
  items: string[];
  missing: string[];
};

type PagesAndRequirements = {
  [key: string]: PagesAndRequirementsItem;
};

const StyledSidebar = styled.div`
  padding-top: 5rem;
  width: var(--width-sidebar);
  z-index: 1000;
  background: var(--color-white);
  padding-left: 3rem;
  padding-right: 3rem;
  padding-bottom: 5rem;
  .navbar {
    position: relative;
    display: flex;
    flex-direction: column;
  }
  li {
    padding-bottom: 2rem;
  }
  .navbar li .navbar-link {
    cursor: pointer;
    display: flex;
    flex-direction: column;
  }
  strong {
    margin-bottom: 2.5rem;
    display: inline-block;
    font-size: 2rem;
  }
  .icon {
    background-color: rgba(255, 255, 255, 0.04);
    width: 4rem;
    color: var(--color-dark);
    height: 4rem;
    text-align: center;
    font-size: 1.5rem;
    line-height: 4rem;
    position: relative;
    display: inline-block;
  }
  .navbar-link {
    padding-bottom: 2rem;
    display: flex;
    align-items: center;
    color: var(--color-dark);
    position: relative;
    z-index: 10;
    background-color: transparent;

    svg {
      font-size: 1.5rem;
      margin-right: 1rem;
    }

    &.active {
      background-color: var(--color-muted);
      color: #fff;
      i {
        color: #fff;
      }
    }
  }

  .submit {
    min-width: 260px;
    width: 100%;
    white-space: normal;
    color: #fff;
    background-color: #a435f0;
    border: 1px solid transparent;
    padding: 16px 10px;
    font-size: 15px;
    line-height: 1.35135;
    &:hover {
      background-color: rgba(155, 44, 230, 0.8);
    }
  }
`;

export const Sidebar: FC<{
  handleRedirect: (route: string) => void;
}> = ({ handleRedirect }) => {
  const { id } = useParams() as { id: string };

  const [visiblePublishRequirements, setVisiblePublishRequirements] =
    useState(false);
  const [pagesAndRequirements, setPagesAndRequirements] = useState<{
    data: PagesAndRequirements | null;
    loaded: boolean;
  }>({ data: null, loaded: false });

  function submitForReview() {
    setVisiblePublishRequirements(true);

    PublishCourseApi.checkingPublishRequirements(id).then(({ data }) => {
      const { missingPublishRequirements } = data;

      if (!missingPublishRequirements) {
        setPagesAndRequirements((state) => ({
          ...state,
          data: null,
          loaded: false,
        }));

        PublishCourseApi.submitForReview(id)
          .then(({ data }) => {
            setVisiblePublishRequirements(false);

            if (data.success) {
              openNotification("success", data.message);

              setTimeout(() => {
                window.location.href = ROUTES.INSTRUCTOR_COURSES;
              }, 1500);
            }
          })
          .catch((error) => {
            setVisiblePublishRequirements(false);

            const txt = "L???i trong kh??a tr??nh x??t duy???t kh??a h???c!";
            if (axios.isAxiosError(error))
              openNotification("error", error.response?.data?.message ?? txt);
            else openNotification("error", txt);
          });
      } else {
        const pagesAndRequirements: PagesAndRequirements = {
          "Th??ng tin kh??a h???c": {
            url: ROUTES.course_basics(id),
            items: [
              "title",
              "subtitle",
              "description",
              "categories_count",
              "author.avatar",
              "author.bio",
            ],
            missing: [],
          },
          "H??nh ???nh & video gi???i thi???u": {
            url: ROUTES.image_and_preview_video(id),
            items: ["thumbnail", "video_demo"],
            missing: [],
          },
          "M???c ti??u & y??u c???u kh??a h???c": {
            url: ROUTES.intended_learners(id),
            items: ["course_outcome_count"],
            missing: [],
          },
          "Ch????ng tr??nh h???c": {
            url: ROUTES.curriculum(id),
            items: ["lecture_count"],
            missing: [],
          },
          "Gi?? kh??a h???c": {
            url: ROUTES.price(id),
            missing: [],
            items: [],
          },
          "Khuy???n m???i": {
            url: ROUTES.promotions(id),
            missing: [],
            items: [],
          },
        };

        for (const key in missingPublishRequirements) {
          const name = key as keyof MissingPublishRequirements;
          const element = missingPublishRequirements[name]; // array
          // console.log(name, element);

          Object.keys(pagesAndRequirements).forEach((item) => {
            const items = pagesAndRequirements[item]["items"];
            const missingItems = pagesAndRequirements[item]["missing"];

            if (items.includes(name)) {
              element?.length && missingItems.push(...element);
            }
          });
        }

        setPagesAndRequirements((state) => ({
          ...state,
          data: pagesAndRequirements,
          loaded: true,
        }));
      }
    });
  }

  function handleCancel() {
    setVisiblePublishRequirements(false);
  }

  return (
    <StyledSidebar>
      <div className="navbar">
        <strong>T???o n???i dung kh??a h???c</strong>

        <button
          type="button"
          className="navbar-link"
          onClick={() => handleRedirect(ROUTES.course_basics(id))}
        >
          <BsInfoCircle />
          <span>Th??ng tin kh??a h???c</span>
        </button>
        <button
          type="button"
          className="navbar-link"
          onClick={() => handleRedirect(ROUTES.image_and_preview_video(id))}
        >
          <BsFileRichtext />
          <span>H??nh ???nh & video gi???i thi???u</span>
        </button>
        <button
          type="button"
          className="navbar-link"
          onClick={() => handleRedirect(ROUTES.intended_learners(id))}
        >
          <RiBookmark3Line />
          <span>M???c ti??u & y??u c???u kh??a h???c</span>
        </button>
        <button
          type="button"
          className="navbar-link"
          onClick={() => handleRedirect(ROUTES.curriculum(id))}
        >
          <FaLaptopHouse />
          <span>Ch????ng tr??nh h???c</span>
        </button>

        <Link className="navbar-link" to={ROUTES.price(id)}>
          <DollarCircleOutlined />
          <span>Gi?? kh??a h???c</span>
        </Link>
        <button
          type="button"
          className="navbar-link"
          onClick={() => handleRedirect(ROUTES.promotions(id))}
        >
          <IoMdPricetags />
          <span>Khuy???n m???i</span>
        </button>
      </div>
      <div>
        <button type="button" onClick={submitForReview} className="submit">
          Y??u c???u xem x??t
        </button>
        <Modal
          footer={null}
          bodyStyle={
            pagesAndRequirements.loaded
              ? undefined
              : {
                  minHeight: 300,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }
          }
          zIndex={2000}
          title={
            pagesAndRequirements.loaded &&
            "B???n ch??a th??? g???i y??u c???u xem x??t kh??a h???c n??y!"
          }
          visible={visiblePublishRequirements}
          onCancel={handleCancel}
        >
          {!pagesAndRequirements.loaded ? (
            <Spin />
          ) : (
            <>
              <p>
                B???n g???n nh?? ???? s???n s??ng ????? g???i y??u c???u xem x??t kh??a h???c c???a
                m??nh. D?????i ????y l?? m???t s??? th??ng tin c???a kh??a h???c b???n c???n ho??n
                th??nh.
              </p>
              {pagesAndRequirements.data &&
                Object.keys(pagesAndRequirements.data).map((key, index) => {
                  const pageName = key;
                  const data =
                    pagesAndRequirements.data as PagesAndRequirements;
                  const { missing, url } = data[
                    key
                  ] as PagesAndRequirementsItem;

                  // console.log(missing);

                  return !missing.length ? null : (
                    <div key={index}>
                      <ul>
                        <li>
                          T???i <Link to={url}>{pageName}:</Link>
                        </li>
                        {missing.map((item) => {
                          return (
                            <li
                              key={item}
                              style={{
                                listStyleType: "disc",
                                listStylePosition: "inside",
                              }}
                              className="pd-l-2"
                            >
                              {item}
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  );
                })}
            </>
          )}
        </Modal>
      </div>
    </StyledSidebar>
  );
};
