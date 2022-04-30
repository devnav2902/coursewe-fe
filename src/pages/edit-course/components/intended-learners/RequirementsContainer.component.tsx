import { Button, Input, Row } from "antd";
import { FC } from "react";
import { FiPlus } from "react-icons/fi";
import { ICourse } from "../../../../layouts/instructor-course.layout";
import { useInputFields } from "../../hooks/intended-learner.hooks";
import { HookForm, IDataRemove } from "../../utils/instructor-course.types";
import { IntendedItem } from "../../../../ts/types/course.types";
import {
  iniArrIntendedItems,
  onChangeItem,
  onRemoveItem,
} from "../../utils/method";
import RequirementItem from "./Item.component";
import { EventInput } from "./OutcomeContainer.component";
interface ContainerProps {
  course: ICourse;
  formMethod: HookForm;
}

const RequirementsContainer: FC<ContainerProps> = ({ course, formMethod }) => {
  const { course_requirements } = course;
  const { setValue, getValues } = formMethod;

  const minItems = 0;
  const iniArrItems = iniArrIntendedItems(course_requirements, minItems);

  const {
    handleDecreaseItem,
    handleAddItem,
    allowRemoveItem,
    inputFields,
    allTextInputRef,
  } = useInputFields(iniArrItems, minItems); // custom hook

  console.log("re-render requirement");

  function handleChangeValueItem(value: string, order: number) {
    const data: IntendedItem = { order, description: value };
    onChangeItem(data, "requirement_items", getValues, setValue);
  }

  function handleRemoveItem(order: number) {
    const values: IDataRemove = {
      order,
      array_update: "requirement_items",
      array_order_delete: "delete_course_requirements_order",
    };

    onRemoveItem(values, getValues, setValue);
    handleDecreaseItem();
  }

  return (
    <div className="requirements-wrapper">
      <Row gutter={[0, 15]}>
        {inputFields
          .sort((a, b) => a.order - b.order)
          .map((item, i): JSX.Element => {
            const { order, description } = item;
            return (
              <RequirementItem
                innerRef={(el: Input) => (allTextInputRef.current[i] = el)}
                key={order}
                order={order}
                onChangeItem={(e: EventInput) =>
                  handleChangeValueItem(e.target.value, order)
                }
                defaultValue={description}
                allowRemoveItem={allowRemoveItem}
                onRemoveItem={() => handleRemoveItem(order)}
                placeholder="Ví dụ: Không cần kinh nghiệm lập trình. Bạn sẽ học mọi thứ bạn cần biết"
              />
            );
          })}
      </Row>
      <br />
      <Button
        type="link"
        className="add-response d-flex align-items-center"
        onClick={handleAddItem}
      >
        <FiPlus />
        Thêm yêu cầu hoặc điều kiện tiên quyết của khóa học
      </Button>
    </div>
  );
};

export default RequirementsContainer;
