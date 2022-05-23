import { FC, memo, useState } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { AiOutlinePlus } from "react-icons/ai";
import { BsPlusCircleFill } from "react-icons/bs";
import SectionApi from "../../../../api/section.api";
import {
  useAppDispatch,
  useTypedSelector,
} from "../../../../hooks/redux.hooks";
import {
  cancelCreateLecture,
  hideOption,
  openCreateLecture,
  setDisplayCreateLecture,
  updateSection,
} from "../../../../redux/slices/curriculum.slice";
import { Section } from "../../../../ts/types/course.types";
import { LectureProvider } from "../../hooks/curriculum.hooks";
import { CURRICULUM_TYPES } from "../../utils/constants";
import FormEditTitle from "./FormEditTitle.component";
import LectureItem from "./LectureItem.component";
import SectionTitle from "./SectionTitle.component";

type SectionItemProps = {
  sectionItem: Section;
  innerRef: (element: HTMLDivElement) => any;
  nthSection: number;
  lectureOrderIsUpdating: boolean;
};

const SectionItem: FC<SectionItemProps> = (props) => {
  const {
    sectionItem,
    innerRef,
    nthSection,
    lectureOrderIsUpdating,
    ...restProps
  } = props;

  const { elementDisplay, displayCreateLecture, displayOption } =
    useTypedSelector((state) => state.curriculum);
  const dispatch = useAppDispatch();

  const { id, lecture, title } = sectionItem;
  const [updatedTitle, setUpdatedTitle] = useState(title); // kh cần gửi request lên server

  const isDisplayEditTitle =
    elementDisplay.id === id &&
    elementDisplay.type === CURRICULUM_TYPES.SECTION;

  const isWorkingOn = displayOption.sectionId === id;

  function createLecture() {
    dispatch(setDisplayCreateLecture(true));
  }

  function handleAddItem() {
    dispatch(openCreateLecture(id));
  }

  function handleHideOption() {
    dispatch(hideOption());
  }

  // Sau khi tạo bài giảng sẽ gửi request cập nhật lại UI
  function getLatestSection() {
    isWorkingOn &&
      SectionApi.getSectionById(id).then(({ data }) => {
        dispatch(updateSection(data.section));
        dispatch(cancelCreateLecture());
        handleHideOption();
      });
  }

  return (
    <div
      {...restProps}
      ref={innerRef}
      className="curriculum-item curriculum-list__section"
    >
      <div className="curriculum-content section-content section-editor">
        {isDisplayEditTitle ? (
          <FormEditTitle
            setUpdatedTitle={setUpdatedTitle}
            title={updatedTitle}
            type={CURRICULUM_TYPES.SECTION}
          />
        ) : (
          <SectionTitle
            nthSection={nthSection}
            data={sectionItem}
            updatedTitle={updatedTitle}
          />
        )}
      </div>

      <Droppable
        droppableId={`droppable-section-${id}`}
        type={"section-" + nthSection}
      >
        {(provided) => (
          <ul
            className="lecture-wrapper"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {lecture.map((lectureItem, i) => {
              return (
                <Draggable
                  isDragDisabled={lectureOrderIsUpdating ? true : false}
                  draggableId={lectureItem.id.toString()}
                  index={i}
                  key={lectureItem.id}
                >
                  {(provided) => (
                    <LectureProvider lecture={lectureItem} nthLecture={i + 1}>
                      <LectureItem
                        innerRef={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      />
                    </LectureProvider>
                  )}
                </Draggable>
              );
            })}
            {provided.placeholder}

            <div className="lecture-wrapper__handle">
              {!isWorkingOn ? null : displayCreateLecture ? (
                <FormEditTitle
                  title=""
                  edit={false}
                  type={CURRICULUM_TYPES.LECTURE}
                  sectionId={id}
                  getLatestSection={getLatestSection}
                />
              ) : (
                <li className="menu-items d-flex align-items-center">
                  <button
                    type="button"
                    onClick={createLecture}
                    className="curriculum-option d-flex align-items-center"
                  >
                    <BsPlusCircleFill />
                    <span>Bài giảng</span>
                  </button>
                  {/* <button
                    type="button"
                    className="curriculum-option d-flex align-items-center"
                  >
                    <BsPlusCircleFill />
                    <span>Quiz</span>
                  </button> */}
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
export default memo(SectionItem);
