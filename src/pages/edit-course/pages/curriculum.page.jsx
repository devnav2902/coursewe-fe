import React from "react";
import LectureItem from "../components/LectureItem.component";
import { AiOutlinePlus } from "react-icons/ai";
import { FaPencilAlt, FaTrash } from "react-icons/fa";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { GoChevronDown } from "react-icons/go";

const CurriculumPage = ({ course }) => {
  const { section } = course;
  console.log(section);
  return (
    <div className="edit-course-section">
      <h6 className="">Chương trình học tập</h6>

      <div className="edit-course-form">
        <div className="curriculum-list">
          {!section.length && (
            <div className="curriculum-item curriculum-list__section curriculum-item__add">
              <div
                data-section=""
                className="curriculum-content section-content section-editor"
              >
                <form className="section-form">
                  <div className="section-form__title">
                    <span className="section-form-txt">Thêm chương học</span>
                    <input
                      maxlength="80"
                      name="title"
                      placeholder="Enter a Title"
                      type="text"
                      value=""
                    />
                    {/* <input name="id" type="hidden" value="">
                            <input name="course" type="hidden" value="1"> */}
                  </div>
                  <div className="section-form__footer">
                    <button type="button">Cancel</button>
                    <button type="button" className="add-section">
                      Thêm chương học
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {section.map((sectionItem) => (
            <div
              key={sectionItem.id}
              className="curriculum-item curriculum-list__section"
            >
              <div
                data-section=""
                className="curriculum-content section-content section-editor"
              >
                <div className="section-content__title">
                  <span className="section">Chương {sectionItem.order}:</span>
                  <span className="curriculum-title">
                    <i className="fas fa-file-alt"></i>
                    <span>{sectionItem.title}</span>
                  </span>
                  <button
                    type="button"
                    className="item-icon-button section-edit-btn"
                  >
                    <FaPencilAlt />
                  </button>
                  <button
                    type="button"
                    className="item-icon-button section-delete-btn"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>

              <ul className="lecture-wrapper">
                {sectionItem.lecture.map((lectureItem) => {
                  return (
                    <LectureItem key={lectureItem.id} data={lectureItem} />
                  );
                })}

                <div className="curriculum-add-item">
                  <button className="add-item" data-curriculum="lecture">
                    <AiOutlinePlus />
                  </button>
                </div>
              </ul>
            </div>
          ))}
        </div>
        {/* @if (count($course->section))
                <div className="wrapper-section">
                    <div className="curriculum-add-item">
                        <button className="add-item" data-curriculum="section">
                            <i className="fas fa-plus"></i>
                        </button>
                    </div>
                </div>
            @endif */}
      </div>
    </div>
  );
};
export default CurriculumPage;
