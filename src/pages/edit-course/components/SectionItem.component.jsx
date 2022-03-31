import LectureItem from "./LectureItem.component";
import { nanoid } from "nanoid";
import { AiOutlinePlus } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import {
  hideOption,
  openCreateLecture,
  setDisplayCreateLecture,
  setElementDisplay,
} from "../../../redux/actions/curriculum.actions";
import SectionTitle from "./SectionTitle.component";
import FormEditTitle from "./FormEditTitle.component";
import CURRICULUM from "../utils/constants";
import { BsPlusCircleFill } from "react-icons/bs";
import { Droppable, Draggable } from "react-beautiful-dnd";

const SectionItem = (props) => {
  const { sectionItem, innerRef, sectionIndex, ...restProps } = props;
  const { id, title, order, lecture } = sectionItem;

  const { elementDisplay, displayCreateLecture, displayOption } = useSelector(
    (state) => state.curriculum
  );
  const dispatch = useDispatch();

  const [displayResources, setDisplayResources] = useState(false);
  const [displayUploadResources, setDisplayUploadResources] = useState(false);
  const [displayMedia, setDisplayMedia] = useState(false);

  const handleDisplayUploadResources = () => {
    setDisplayUploadResources(true);
    setDisplayResources(false);
  };

  const handleDisplayResources = () => {
    setDisplayResources(!displayResources);
  };

  const closeUploadResources = () => {
    setDisplayUploadResources(false);
  };

  const closeUploadMedia = () => {
    setDisplayMedia(false);
  };

  const handleDisplayUploadMedia = () => {
    setDisplayMedia(true);
    setDisplayResources(false);
  };

  const onEditTitle = (id, type) => {
    dispatch(setElementDisplay({ id, type }));

    setDisplayResources(false);
    setDisplayUploadResources(false);
    setDisplayMedia(false);
  };

  const dataDisplay = {
    displayMedia,
    displayResources,
    displayUploadResources,
  };

  const closeFunc = {
    closeUploadMedia,
    closeUploadResources,
  };

  const handleFunc = {
    handleDisplayResources,
    handleDisplayUploadMedia,
    handleDisplayUploadResources,
  };

  const SectionTitleProps = {
    data: { order, title, id },
    editTitleFunc: onEditTitle,
  };

  const createLecture = () => {
    dispatch(setDisplayCreateLecture(true));
  };

  const isDisplayEditTitle =
    elementDisplay.id === id && elementDisplay.type === CURRICULUM.SECTION;

  const handleAddItem = () => {
    dispatch(openCreateLecture(id));
  };

  const handleHideOption = () => {
    dispatch(hideOption());
  };

  const isWorkingOn = displayOption.sectionId === id;

  return (
    <div
      {...restProps}
      ref={innerRef}
      className="curriculum-item curriculum-list__section"
    >
      <div className="curriculum-content section-content section-editor">
        {isDisplayEditTitle ? (
          <FormEditTitle title={title} type={CURRICULUM.SECTION} />
        ) : (
          <SectionTitle {...SectionTitleProps} />
        )}
      </div>

      <Droppable droppableId={`droppable-section-${id}`} type={sectionIndex}>
        {(provided) => (
          <ul
            className="lecture-wrapper"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {lecture.map((lectureItem, i) => {
              return (
                <Draggable
                  draggableId={`${sectionIndex}${i}`}
                  index={i}
                  key={`key${sectionIndex}${i}`}
                >
                  {(provided) => (
                    <LectureItem
                      innerRef={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      data={lectureItem}
                      handleFunc={handleFunc}
                      dataDisplay={dataDisplay}
                      closeFunc={closeFunc}
                      editTitleFunc={onEditTitle}
                    />
                  )}
                </Draggable>
              );
            })}
            {provided.placeholder}

            <div className="lecture-wrapper__handle">
              {isWorkingOn && displayCreateLecture && (
                <FormEditTitle
                  title=""
                  edit={false}
                  type={CURRICULUM.LECTURE}
                />
              )}

              {isWorkingOn && !displayCreateLecture && (
                <li className="menu-items d-flex align-items-center">
                  <button
                    onClick={createLecture}
                    className="curriculum-option d-flex align-items-center"
                  >
                    <BsPlusCircleFill />
                    <span>Bài giảng</span>
                  </button>
                  <button className="curriculum-option d-flex align-items-center">
                    <BsPlusCircleFill />
                    <span>Quiz</span>
                  </button>
                </li>
              )}

              <div
                className={`curriculum-add-item${isWorkingOn ? " option" : ""}`}
              >
                <button
                  onClick={isWorkingOn ? handleHideOption : handleAddItem}
                >
                  <AiOutlinePlus />
                </button>
              </div>
            </div>
          </ul>
        )}
      </Droppable>
    </div>
  );
};
export default SectionItem;
