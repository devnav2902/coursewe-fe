import { Button, Input, Row } from "antd";
import { ChangeEvent, FC, useEffect } from "react";
import { FiPlus } from "react-icons/fi";
import { CourseResponse } from "../../../../api/instructor.api";
import { IntendedItem } from "../../../../ts/types/course.types";
import { useInputFields } from "../../hooks/intended-learner.hooks";
import { HookForm, IDataRemove } from "../../utils/instructor-course.types";
import {
  iniArrIntendedItems,
  onChangeItem,
  onRemoveItem,
  validateItemsBeforeSend,
} from "../../utils/method";
import OutcomeItem from "./Item.component";

interface ContainerProps {
  course: CourseResponse;
  formMethod: HookForm;
}

export type EventInput = ChangeEvent<HTMLInputElement>;

const OutcomeContainer: FC<ContainerProps> = ({ course, formMethod }) => {
  const { course_outcome } = course;
  const { setValue, getValues } = formMethod;
  const minItems = 4;

  // Khởi tạo mảng item theo điều kiện cho trước (ít nhất 4 item)
  const iniArrItems = iniArrIntendedItems(course_outcome, minItems);

  const {
    handleDecreaseItem,
    handleAddItem,
    allowRemoveItem,
    inputFields,
    countItem,
    allTextInputRef,
  } = useInputFields(iniArrItems, minItems);

  useEffect(() => {
    // re-render => ref update mới nhất => validate
    const dataValidate = { minItems, allInputsRef: allTextInputRef };
    validateItemsBeforeSend(dataValidate, "outcome_items", formMethod);
  }, [countItem, formMethod, allTextInputRef]);

  function handleRemoveItem(order: number) {
    const values: IDataRemove = {
      order,
      array_update: "outcome_items",
      array_order_delete: "delete_course_outcome_order",
    };

    onRemoveItem(values, getValues, setValue);
    handleDecreaseItem();
  }

  function handleChangeValueItem(value: string, order: number) {
    const data: IntendedItem = { order, description: value };
    onChangeItem(data, "outcome_items", getValues, setValue);

    const dataValidate = { minItems, allInputsRef: allTextInputRef };
    validateItemsBeforeSend(dataValidate, "outcome_items", formMethod);
  }

  return (
    <div className="goals-wrapper">
      <Row gutter={[0, 15]}>
        {inputFields
          .sort((a, b) => a.order - b.order)
          .map((item, i): JSX.Element => {
            const { order, description } = item;
            return (
              <OutcomeItem
                innerRef={(el: Input) => (allTextInputRef.current[i] = el)}
                key={order}
                order={order}
                onChangeItem={(e: EventInput) =>
                  handleChangeValueItem(e.target.value, order)
                }
                defaultValue={description}
                allowRemoveItem={allowRemoveItem}
                onRemoveItem={() => handleRemoveItem(order)}
                placeholder="Ví dụ: Có kiến thức nền tảng tốt về ngôn ngữ lập trình để có thể học cao lên sau này"
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
        Thêm câu trả lời cho những mục tiêu của khóa học
      </Button>
    </div>
  );
};

export default OutcomeContainer;
