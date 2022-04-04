import { Button, Row } from "antd";
import { FiPlus } from "react-icons/fi";
import OutcomeItem from "./Item.component";
import _ from "lodash";
import { useEffect, useRef, useState } from "react";

const OutcomeContainer = ({ course, formMethod }) => {
  const { course_outcome } = course;
  const { setValue, getValues } = formMethod;
  const minItems = 4;
  const iniArrItems = (() => {
    if (course_outcome.length) {
      return [...course_outcome];
    } else {
      return Array.from({ length: minItems }).map((_, i) => ({
        description: "",
        order: i + 1,
      }));
    }
  })();

  const [countItem, setCountItem] = useState(iniArrItems.length);
  const [allowRemoveItem, setAllowRemoveItem] = useState(false); // ít nhất 1 items
  const [inputFields, setInputFields] = useState(iniArrItems);
  const allTextInputRef = useRef([]);

  useEffect(() => {
    const handleSetAllowRemoveItem = (amount) => {
      const allowRemoveItem = amount > minItems ? true : false;
      setAllowRemoveItem(allowRemoveItem);
    };

    handleSetAllowRemoveItem(countItem);
  }, [countItem]);

  function onChangeItem(e) {
    const {
      value,
      dataset: { order },
    } = e.target;

    const items = getValues("course_outcome");
    let dataItems = {
      description: value,
      order: parseInt(order),
    };

    let updatedItems = [];
    if (!items) updatedItems.push(dataItems);
    else if (Array.isArray(items)) {
      updatedItems = [...items];
      const objIndex = updatedItems.findIndex(
        (item) => item.order === parseInt(order)
      );
      const existed = objIndex > -1;

      if (existed) {
        updatedItems[objIndex].description = value;
      } else {
        updatedItems.push(dataItems);
      }
    }

    setValue("course_outcome", updatedItems);
  }

  function handleIncreaseItem() {
    setCountItem((amount) => amount + 1);
  }

  function handleDecreaseItem() {
    setCountItem((amount) => amount - 1);
  }

  function onRemoveItem(order) {
    const [arr_course_outcome_order, arr_course_outcome] = getValues([
      "delete_course_outcome_order",
      "course_outcome",
    ]);

    // Update lại
    if (Array.isArray(arr_course_outcome)) {
      const filteredItems = [...arr_course_outcome].filter(
        (item) => item.order !== order
      );

      setValue("course_outcome", filteredItems);
    }

    let arrItemsOrder = [];
    // Xóa
    if (Array.isArray(arr_course_outcome_order)) {
      arrItemsOrder = [...arr_course_outcome_order];
    }

    arrItemsOrder.push(order);
    setValue("delete_course_outcome_order", arrItemsOrder);

    handleDecreaseItem();
  }

  function addItemInputFields() {
    const newfield = (order) => ({
      description: "",
      order,
    });

    setInputFields((currentState) => {
      console.log(currentState);
      const { order: maxOrder } = _.maxBy(currentState, "order");
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
    <div className="goals-wrapper">
      <Row gutter={[0, 15]}>
        {inputFields
          .sort((a, b) => a.order - b.order)
          .map((item, i) => {
            const { order, description } = item;
            return (
              <OutcomeItem
                innerRef={(el) => (allTextInputRef.current[i] = el)}
                key={order}
                order={order}
                onChangeItem={onChangeItem}
                defaultValue={description}
                allowRemoveItem={allowRemoveItem}
                onRemoveItem={onRemoveItem}
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
