import { DollarCircleOutlined } from "@ant-design/icons";
import { Modal, Spin, Typography } from "antd";
import { FC, useState } from "react";
import { BsFileRichtext, BsInfoCircle } from "react-icons/bs";
import { FaLaptopHouse } from "react-icons/fa";
import { IoMdPricetags } from "react-icons/io";
import { RiBookmark3Line } from "react-icons/ri";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import PublishCourseApi, {
  MissingPublishRequirements,
} from "../../api/publish-course.api";
import { routesWithParams } from "../../utils/constants";

type PagesAndRequirementsItem = {
  url: string;
  items: string[];
  missing: string[];
};

type PagesAndRequirements = {
  [key: string]: PagesAndRequirementsItem;
};

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
      console.log(missingPublishRequirements);

      if (!missingPublishRequirements) {
      } else {
        const pagesAndRequirements: PagesAndRequirements = {
          "Thông tin khóa học": {
            url: routesWithParams.course_basics(id),
            items: ["title", "subtitle", "description", "categories_count"],
            missing: [],
          },
          "Hình ảnh & video giới thiệu": {
            url: routesWithParams.image_and_preview_video(id),
            items: ["thumbnail", "video_demo"],
            missing: [],
          },
          "Mục tiêu & yêu cầu khóa học": {
            url: routesWithParams.intended_learners(id),
            items: ["course_outcome_count"],
            missing: [],
          },
          "Chương trình học": {
            url: routesWithParams.curriculum(id),
            items: ["lecture_count"],
            missing: [],
          },
          "Giá khóa học": {
            url: routesWithParams.price(id),
            missing: [],
            items: [],
          },
          "Khuyến mại": {
            url: routesWithParams.promotions(id),
            missing: [],
            items: [],
          },
        };

        for (const key in missingPublishRequirements) {
          const name = key as keyof MissingPublishRequirements;
          const element = missingPublishRequirements[name]; // array
          console.log(name, element);

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
    <div className="sidebar">
      <div className="navbar">
        <strong>Tạo nội dung khóa học</strong>

        <button
          type="button"
          className="navbar-link"
          onClick={() => handleRedirect(routesWithParams.course_basics(id))}
        >
          <BsInfoCircle />
          <span>Thông tin khóa học</span>
        </button>
        <button
          type="button"
          className="navbar-link"
          onClick={() =>
            handleRedirect(routesWithParams.image_and_preview_video(id))
          }
        >
          <BsFileRichtext />
          <span>Hình ảnh & video giới thiệu</span>
        </button>
        <button
          type="button"
          className="navbar-link"
          onClick={() => handleRedirect(routesWithParams.intended_learners(id))}
        >
          <RiBookmark3Line />
          <span>Mục tiêu & yêu cầu khóa học</span>
        </button>
        <button
          type="button"
          className="navbar-link"
          onClick={() => handleRedirect(routesWithParams.curriculum(id))}
        >
          <FaLaptopHouse />
          <span>Chương trình học</span>
        </button>

        <Link className="navbar-link" to={routesWithParams.price(id)}>
          <DollarCircleOutlined />
          <span>Giá khóa học</span>
        </Link>
        <button
          type="button"
          className="navbar-link"
          onClick={() => handleRedirect(routesWithParams.promotions(id))}
        >
          <IoMdPricetags />
          <span>Khuyến mại</span>
        </button>
      </div>
      <div>
        <button type="button" onClick={submitForReview} className="submit">
          Yêu cầu xem xét
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
            "Bạn chưa thể gửi yêu cầu xem xét khóa học này!"
          }
          visible={visiblePublishRequirements}
          onCancel={handleCancel}
        >
          {!pagesAndRequirements.loaded ? (
            <Spin />
          ) : (
            <>
              <p>
                Bạn gần như đã sẵn sàng để gửi yêu cầu xem xét khóa học của
                mình. Dưới đây là một số thông tin của khóa học bạn cần hoàn
                thành.
              </p>
              {pagesAndRequirements.data &&
                Object.keys(pagesAndRequirements.data).map((key, index) => {
                  const pageName = key;
                  const data =
                    pagesAndRequirements.data as PagesAndRequirements;
                  const { missing, url } = data[
                    key
                  ] as PagesAndRequirementsItem;

                  console.log(missing);

                  return !missing.length ? null : (
                    <div key={index}>
                      <ul>
                        <li>
                          Tại <Link to={url}>{pageName}:</Link>
                        </li>
                        <li
                          style={{
                            listStyleType: "disc",
                            listStylePosition: "inside",
                          }}
                          className="pd-l-2"
                        >
                          {missing}
                        </li>
                      </ul>
                    </div>
                  );
                })}
            </>
          )}
        </Modal>
      </div>
    </div>
  );
};
