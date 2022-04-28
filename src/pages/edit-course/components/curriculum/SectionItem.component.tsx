import { FC, useState } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { AiOutlinePlus } from "react-icons/ai";
import { BsPlusCircleFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { Section } from "../../../../layouts/instructor-course.layout";
import {
  hideOption,
  openCreateLecture,
  setDisplayCreateLecture,
  setElementDisplay,
} from "../../../../redux/actions/curriculum.actions";
import { CURRICULUM_TYPES } from "../../utils/constants";
import { LectureType, SectionType } from "../../utils/instructor-course.types";
import FormEditTitle from "./FormEditTitle.component";
import LectureItem from "./LectureItem.component";
import SectionTitle, { SectionTitleProps } from "./SectionTitle.component";

type SectionItemProps = {
  sectionItem: Section;
  innerRef: (element: HTMLDivElement) => any;
  sectionIndex: any;
};

const SectionItem: FC<SectionItemProps> = (props) => {
  const { sectionItem, innerRef, sectionIndex, ...restProps } = props;
  const { id, title, order, lecture } = sectionItem;

  const { elementDisplay, displayCreateLecture, displayOption } = useSelector(
    (state) => state.curriculum
  );
  const dispatch = useDispatch();

  const [displayResources, setDisplayResources] = useState<boolean>(false);
  const [displayUploadResources, setDisplayUploadResources] =
    useState<boolean>(false);
  const [displayUploadMedia, setDisplayUploadMedia] = useState<boolean>(false);

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
    setDisplayUploadMedia(false);
  };

  const handleDisplayUploadMedia = () => {
    setDisplayUploadMedia(true);
    setDisplayResources(false);
  };

  const onEditTitle = (id: number, type: LectureType | SectionType) => {
    dispatch(setElementDisplay({ id, type }));

    setDisplayResources(false);
    setDisplayUploadResources(false);
    setDisplayUploadMedia(false);
  };

  const dataDisplay = {
    displayUploadMedia,
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

  const SectionTitleProps: SectionTitleProps = {
    data: sectionItem,
    editTitleFunc: onEditTitle,
  };

  const createLecture = () => {
    dispatch(setDisplayCreateLecture(true));
  };

  const isDisplayEditTitle =
    elementDisplay.id === id &&
    elementDisplay.type === CURRICULUM_TYPES.SECTION;

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
          <FormEditTitle title={title} type={CURRICULUM_TYPES.SECTION} />
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
                  type={CURRICULUM_TYPES.LECTURE}
                />
              )}

              {isWorkingOn && !displayCreateLecture && (
                <li className="menu-items d-flex align-items-center">
                  <button
                    type="button"
                    onClick={createLecture}
                    className="curriculum-option d-flex align-items-center"
                  >
                    <BsPlusCircleFill />
                    <span>Bài giảng</span>
                  </button>
                  <button
                    type="button"
                    className="curriculum-option d-flex align-items-center"
                  >
                    <BsPlusCircleFill />
                    <span>Quiz</span>
                  </button>
                </li>
              )}

              <div
                className={`curriculum-add-item${isWorkingOn ? " option" : ""}`}
              >
                <button
                  type="button"
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
