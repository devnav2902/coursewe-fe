import { AiOutlinePlus } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { openCreateSection } from "../../../redux/actions/curriculum.actions";
import FormEditTitle from "../components/FormEditTitle.component";
import SectionItem from "../components/SectionItem.component";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const CurriculumPage = ({ course }) => {
  const { section } = course;
  const dispatch = useDispatch();
  const { displayCreateSection } = useSelector((state) => state.curriculum);

  const handleDisplayCreateSection = () => {
    dispatch(openCreateSection());
  };

  return (
    <div className="edit-course-section">
      <h6 className="">Chương trình học tập</h6>

      <div className="edit-course-form">
        {section.length && (
          <DragDropContext>
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
                      index={i}
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
