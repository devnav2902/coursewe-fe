import { DesktopOutlined, VideoCameraOutlined } from "@ant-design/icons";
import { FC, useEffect, useState } from "react";
import { BiInfinite } from "react-icons/bi";
import { CustomCourse } from "../../../../api/course.api";
import ButtonContainer from "./ButtonContainer.component";
import Nav from "./Nav.component";
import Price from "./Price.component";
import Video from "./Video.component";

type SidebarProps = {
  course: CustomCourse;
};

const Sidebar: FC<SidebarProps> = ({ course }) => {
  const { title, lecture, price, thumbnail, section_count, lecture_count } =
    course;
  const { video_demo } = course;

  const [offset, setOffset] = useState(0);
  useEffect(() => {
    const onScroll = () => setOffset(window.pageYOffset);
    // clean up code
    window.removeEventListener("scroll", onScroll);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const resource_count = lecture.reduce(
    (total, item) => (total += item.resource_count),
    0
  );

  const navProps = {
    title,
  };

  return (
    <>
      <Nav navProps={navProps} offset={offset} />
      <div className={`head-sidebar${offset >= 400 ? " fixed" : ""}`}>
        <div className="widget-content">
          <Video thumbnail={thumbnail} title={title} video_demo={video_demo} />

          <Price price={price} />

          <div className="infor-course">
            <h4>Khóa học này bao gồm:</h4>
            {!resource_count ? null : (
              <li className="d-flex align-items-center">
                {resource_count} tài liệu học tập
              </li>
            )}
            <li className="d-flex align-items-center">
              <VideoCameraOutlined className="mr-1" /> {section_count} chương
              học
            </li>
            <li className="d-flex align-items-center">
              <DesktopOutlined className="mr-1" /> {lecture_count} bài giảng
            </li>
            <li className="d-flex align-items-center">
              <BiInfinite className="mr-1" /> Học online trọn đời
            </li>
          </div>
          <ButtonContainer />
        </div>
      </div>
    </>
  );
};

export default Sidebar;
