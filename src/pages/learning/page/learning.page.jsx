import { Skeleton } from "antd";
import { useSelector } from "react-redux";
import { linkThumbnail } from "../../../utils/functions";
import Sidebar from "../components/Sidebar/Sidebar.component";

const LearningPage = () => {
  const { dataCourse } = useSelector((state) => state.learning);
  // console.log(dataCourse);

  const courseDestructuring = (() => {
    const { course } = dataCourse;

    if (course) {
      const { author, description } = course;

      return { author, description };
    }
    return {};
  })();

  return (
    <main className="main-content-wrapper">
      <div className="open-course-content">
        <button>
          <i className="fas fa-arrow-left"></i>
          <span>Nội dung khóa học</span>
        </button>
      </div>
      <div className="learning-content">
        <div className="video-content">
          <div className="video-player">
            <video controls>
              <source src="{{ asset($course->section[0]->lecture[0]->src) }}" />
            </video>
          </div>
        </div>
        <Sidebar />
      </div>

      <div className="content-footer">
        {!dataCourse.loadedCourse ? (
          <Skeleton active />
        ) : (
          <>
            <div className="bar">
              <ul>
                <li className="is-current">Tổng quan</li>
                {/* <li>Notes</li> */}
              </ul>
            </div>
            <div className="content-footer__data">
              <div className="container">
                <div className="container__content">
                  <div className="title">Giới thiệu khóa học</div>
                  <div className="row">
                    <p className="title">Thông tin khóa học</p>
                    <div className="course-description">
                      {
                        <div
                          dangerouslySetInnerHTML={{
                            __html: courseDestructuring.description,
                          }}
                        />
                      }
                    </div>
                  </div>

                  <div className="row">
                    <p className="title">Giảng viên</p>
                    <div className="instructor-profile">
                      <div className="header">
                        <img
                          src={linkThumbnail(courseDestructuring.author.avatar)}
                          alt={courseDestructuring.author.fullname}
                        />
                        <div className="profile-title">
                          <a href="route(instructor slug)">
                            {courseDestructuring.author.fullname}
                          </a>
                          <div className="headline">
                            {courseDestructuring.bio?.headline}
                          </div>
                        </div>
                      </div>
                      <div className="profile-social-links">
                        {/* @if (!empty($author->bio->linkedin))
                  <div className="socical-link">
                    <div className="my-link">
                      <a href="{{ $author->bio->linkedin }}"><i className="fab fa-linkedin">
                        </i></a>
                    </div>
                  </div>
                @endif
                @if (!empty($author->bio->twitter))
                  <div className="socical-link">
                    <div className="my-link">
                      <a href="{{ $author->bio->twitter }}"><i className="fab fa-twitter">
                        </i>
                      </a>
                    </div>
                  </div>
                @endif
                @if (!empty($author->bio->facebook))
                  <div className="socical-link">
                    <div className="my-link">
                      <a href="{{ $author->bio->facebook }}"><i className="fab fa-facebook">
                        </i></a>
                    </div>
                  </div>
                @endif
                @if (!empty($author->bio->youtube))
                  <div className="socical-link">
                    <div className="my-link">
                      <a href="{{ $author->bio->youtube }}"><i className="fab fa-youtube">
                        </i></a>
                    </div>
                  </div>
                @endif */}
                      </div>
                      <div className="profile-description">
                        {/* {!! $author->bio->bio !!} */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </main>
  );
};
export default LearningPage;
