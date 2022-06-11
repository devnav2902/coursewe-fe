import _ from "lodash";
import { FC, useEffect, useState } from "react";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";
import { AiOutlinePlus } from "react-icons/ai";
import { useParams } from "react-router-dom";
import LectureApi from "../../../api/lecture.api";
import SectionApi from "../../../api/section.api";
import Loading from "../../../components/Loading/Loading.component";
import { useAppDispatch, useTypedSelector } from "../../../hooks/redux.hooks";
import {
  getSections,
  openCreateSection,
  updateSection,
  updateSections,
} from "../../../redux/slices/curriculum.slice";
import { LectureItems, SectionItems } from "../../../ts/types/course.types";
import { openNotification } from "../../../utils/functions";
import FormEditTitle from "../components/curriculum/FormEditTitle.component";
import SectionItem from "../components/curriculum/SectionItem.component";

const CurriculumPage: FC = () => {
  const dispatch = useAppDispatch();
  const { id: courseId } = useParams() as { id: string };

  const {
    sections: { data: sections, loaded: loadedSections },
    displayCreateSection,
  } = useTypedSelector((state) => state.curriculum);

  const [sectionOrderIsUpdating, setSectionOrderIsUpdating] = useState({
    state: false,
    error: false,
  });
  const [lectureOrderIsUpdating, setLectureOrderIsUpdating] = useState({
    state: false,
    error: false,
  });

  useEffect(() => {
    dispatch(getSections(courseId));
  }, [dispatch, courseId]);

  const handleDisplayCreateSection = () => {
    dispatch(openCreateSection());
  };

  const reorder = (
    list: LectureItems | SectionItems,
    startIndex: number,
    endIndex: number
  ) => {
    const result = [...list];
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  const droppedOnSamePosition = ({ destination, source }: DropResult) =>
    destination?.droppableId === source.droppableId &&
    destination.index === source.index;

  const droppedOutsideList = (result: DropResult) => !result.destination;

  function onDragEnd(result: DropResult) {
    if (droppedOutsideList(result) || droppedOnSamePosition(result)) return;

    if (result.destination && result.type === "SECTIONS") {
      const items = reorder(
        sections,
        result.source.index,
        result.destination.index
      ) as SectionItems;

      const sectionReordered = items.map(({ id }, index) => ({
        id,
        order: index + 1,
      }));

      // Nếu lỗi sẽ kh lưu trên dtb, UI vẫn update
      dispatch(updateSections(items));

      if (sectionOrderIsUpdating.error)
        openNotification(
          "error",
          "Lỗi trong quá trình cập nhật lại thứ tự chương học!"
        );
      else {
        setSectionOrderIsUpdating((data) => ({ ...data, state: true }));

        SectionApi.reorder({
          courseId,
          data: sectionReordered,
        })
          .then((res) => {
            setSectionOrderIsUpdating((data) => ({ ...data, state: false }));
          })
          .catch(() => {
            setSectionOrderIsUpdating(() => ({ error: true, state: false }));

            openNotification(
              "error",
              "Lỗi trong quá trình cập nhật lại thứ tự chương học!"
            );
          });
      }

      return;
    }

    const sectionIdRegex = result.destination?.droppableId.match(
      /droppable-section-(\d+)/
    );

    if (sectionIdRegex) {
      const sectionId = sectionIdRegex[1];

      const section = sections.find(
        (section) => section.id === parseInt(sectionId)
      );
      const lecture = section?.lecture;

      if (lecture?.length && result.destination && section) {
        const reorderedLecture = reorder(
          lecture,
          result.source.index,
          result.destination.index
        ) as LectureItems;

        const reorderedData = reorderedLecture.map(({ id }, index) => ({
          id,
          order: index + 1,
        }));

        const updatedLecture = _.cloneDeep(section);
        updatedLecture.lecture = reorderedLecture;

        dispatch(updateSection(updatedLecture));

        if (lectureOrderIsUpdating.error)
          openNotification(
            "error",
            "Lỗi trong quá trình cập nhật lại thứ tự chương học!"
          );
        else {
          setLectureOrderIsUpdating((data) => ({ ...data, state: true }));
          LectureApi.reorder({
            courseId,
            sectionId: sectionId,
            data: reorderedData,
          })
            .then((res) => {
              setLectureOrderIsUpdating((data) => ({ ...data, state: false }));
            })
            .catch(() => {
              setLectureOrderIsUpdating(() => ({ error: true, state: false }));
              openNotification(
                "error",
                "Lỗi trong quá trình cập nhật lại thứ tự bài giảng!"
              );
            });
        }
      }
    }
  }

  if (!loadedSections) return <Loading />;

  return (
    <div className="edit-course-section">
      <h6>Chương trình học tập</h6>

      <div className="edit-course-form">
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="sections" type="SECTIONS">
            {(provided) => (
              <div
                className="curriculum-list"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {sections.map((sectionItem, i) => (
                  <Draggable
                    isDragDisabled={lectureOrderIsUpdating.state ? true : false}
                    draggableId={`section-${sectionItem.id}`}
                    index={i} // Must be unique within a <Droppable /> (no duplicates) Must be consecutive. [0, 1, 2] and not [1, 2, 8]
                    key={`section-${sectionItem.id}`}
                  >
                    {(provided) => (
                      <SectionItem
                        lectureOrderIsUpdating={lectureOrderIsUpdating.state}
                        nthSection={i + 1}
                        innerRef={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        sectionItem={sectionItem}
                      />
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}

                {!sections.length && (
                  <div className="curriculum-item curriculum-list__section curriculum-item__add">
                    <div className="curriculum-content section-content section-editor">
                      <FormEditTitle title="" type="section" edit={false} />
                    </div>
                  </div>
                )}

                {displayCreateSection && (
                  <FormEditTitle title="" type="section" edit={false} />
                )}
              </div>
            )}
          </Droppable>
        </DragDropContext>

        {sections.length > 0 && !displayCreateSection && (
          <div className="wrapper-section">
            <div className="curriculum-add-item">
              <button
                type="button"
                onClick={handleDisplayCreateSection}
                className="add-item"
                data-curriculum="section"
              >
                <AiOutlinePlus />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default CurriculumPage;
