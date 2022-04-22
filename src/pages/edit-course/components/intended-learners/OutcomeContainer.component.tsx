import { Button, Input, Row } from "antd";
import _ from "lodash";
import { ChangeEvent, FC, useEffect, useRef, useState } from "react";
import {
  FieldValues,
  UseFormGetValues,
  UseFormSetValue,
} from "react-hook-form";
import { FiPlus } from "react-icons/fi";
import { ICourse } from "../../../../layouts/instructor-course.layout";
import {
  iniArrIntendedItems,
  IntendedItem,
  IntendedItems,
  onChangeItem,
  onRemoveItem,
} from "../../utils/method";
import OutcomeItem from "./Item.component";

interface ContainerProps {
  course: ICourse;
  formMethod: {
    getValues: UseFormGetValues<FieldValues>;
    setValue: UseFormSetValue<FieldValues>;
  };
}

export type EventInput = ChangeEvent<HTMLInputElement>;

const OutcomeContainer: FC<ContainerProps> = ({ course, formMethod }) => {
  const { course_outcome } = course;
  const { setValue, getValues } = formMethod;
  const minItems = 4;

  // Khởi tạo mảng item theo điều kiện cho trước (ít nhất 4 item)
  const iniArrItems = iniArrIntendedItems(course_outcome, minItems);

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

  function handleIncreaseItem() {
    setCountItem((amount) => amount + 1);
  }

  function handleDecreaseItem() {
    setCountItem((amount) => amount - 1);
  }

  function handleRemoveItem(order: number) {
    const values = {
      order,
      array_update: "course_outcome",
      array_order_delete: "delete_course_outcome_order",
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
      console.log("max order current:", maxOrder);

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

  function handleChangeValueItem(e: EventInput, order: number) {
    const { value } = e.target as HTMLInputElement;
    const data = { order, description: value };
    onChangeItem(data, "course_outcome", getValues, setValue);
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
                  handleChangeValueItem(e, order)
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
        onClick={() => handleAddItem()}
      >
        <FiPlus />
        Thêm câu trả lời cho những mục tiêu của khóa học
      </Button>
    </div>
  );
};

export default OutcomeContainer;
