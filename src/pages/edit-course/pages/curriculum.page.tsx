import { FC, useCallback } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { AiOutlinePlus } from "react-icons/ai";
import { CourseResponse } from "../../../api/instructor.api";
import Loading from "../../../components/Loading/Loading.component";
import { useAppDispatch, useTypedSelector } from "../../../hooks/redux.hooks";
import { openCreateSection } from "../../../redux/slices/curriculum.slice";
import FormEditTitle from "../components/curriculum/FormEditTitle.component";
import SectionItem from "../components/curriculum/SectionItem.component";

const CurriculumPage: FC = () => {
  const dispatch = useAppDispatch();
  const { displayCreateSection } = useTypedSelector(
    (state) => state.curriculum
  );
  const {
    course: { data: courseData, loaded: loadedCourse },
  } = useTypedSelector((state) => state.instructorCourse);

  const handleDisplayCreateSection = () => {
    dispatch(openCreateSection());
  };

  const onDragEnd = useCallback(() => {
    // the only one that is required
  }, []);

  if (!loadedCourse) return <Loading />;

  const { section } = courseData as CourseResponse;
  return (
    <div className="edit-course-section">
      <h6 className="">Chương trình học tập</h6>

      <div className="edit-course-form">
        {section.length && (
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="sections" type="SECTIONS">
              {(provided) => (
                <div
                  className="curriculum-list"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {section.map((sectionItem, i) => (
                    <Draggable
                      draggableId={`section-${sectionItem.id}`}
                      index={i} // Must be unique within a <Droppable /> (no duplicates) Must be consecutive. [0, 1, 2] and not [1, 2, 8]
                      key={`section-${sectionItem.id}`}
                    >
                      {(provided) => (
                        <SectionItem
                          sectionIndex={i}
                          innerRef={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          sectionItem={sectionItem}
                        />
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}

                  {!section.length && (
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
        )}

        {section.length && !displayCreateSection && (
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
