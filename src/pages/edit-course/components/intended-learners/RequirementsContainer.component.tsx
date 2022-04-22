import { Button, Input, Row } from "antd";
import { FiPlus } from "react-icons/fi";
import RequirementItem from "./Item.component";
import _ from "lodash";
import { FC, useEffect, useRef, useState } from "react";
import { ICourse } from "../../../../layouts/instructor-course.layout";
import {
  FieldValues,
  UseFormGetValues,
  UseFormSetValue,
} from "react-hook-form";
import {
  iniArrIntendedItems,
  IntendedItem,
  IntendedItems,
  onChangeItem,
  onRemoveItem,
} from "../../utils/method";
import { EventInput } from "./OutcomeContainer.component";

interface ContainerProps {
  course: ICourse;
  formMethod: {
    getValues: UseFormGetValues<FieldValues>;
    setValue: UseFormSetValue<FieldValues>;
  };
}

const RequirementsContainer: FC<ContainerProps> = ({ course, formMethod }) => {
  const { course_requirements } = course;
  const { setValue, getValues } = formMethod;
  const minItems = 1;

  const iniArrItems = iniArrIntendedItems(course_requirements, minItems);

  const [countItem, setCountItem] = useState<number>(iniArrItems.length);
  const [allowRemoveItem, setAllowRemoveItem] = useState<boolean>(false); // ít nhất 1 items
  const [inputFields, setInputFields] = useState<IntendedItems>(iniArrItems);
  const allTextInputRef = useRef<Input[]>([]);

  useEffect(() => {
    const handleSetAllowRemoveItem = (amount: number) => {
      const allowRemoveItem = amount > minItems ? true : false;
      setAllowRemoveItem(allowRemoveItem);
    };

    handleSetAllowRemoveItem(countItem);
  }, [countItem]);

  function handleChangeValueItem(e: EventInput, order: number) {
    const { value } = e.target as HTMLInputElement;
    const data = { order, description: value };
    onChangeItem(data, "course_requirements", getValues, setValue);
  }

  function handleIncreaseItem() {
    setCountItem((amount) => amount + 1);
  }

  function handleDecreaseItem() {
    setCountItem((amount) => amount - 1);
  }

  function handleRemoveItem(order: number) {
    const values = {
      order,
      array_update: "course_requirements",
      array_order_delete: "delete_course_requirements_order",
    };

    onRemoveItem(values, getValues, setValue);

    handleDecreaseItem();
  }

  function addItemInputFields() {
    const newfield = (order: number): IntendedItem => ({
      description: "",
      order,
    });

    setInputFields((currentState) => {
      console.log(currentState);
      const { order: maxOrder } = _.maxBy(
        currentState,
        "order"
      ) as IntendedItem;
      console.log(maxOrder);

      const order = maxOrder + 1;
      return [...currentState, newfield(order)];
    });
  }

  function handleAddItem() {
    const hasEmptyItem = allTextInputRef.current
      .filter((r) => r) // lọc các ref null(item bị xóa)
      .some((input) => input.state.value === "");

    if (!hasEmptyItem) {
      // kiểm tra item mới & cũ not empty => tạo item mới
      handleIncreaseItem();
      addItemInputFields();
    }
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
                  handleChangeValueItem(e, order)
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
