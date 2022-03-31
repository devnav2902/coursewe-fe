import { Button, Row } from "antd";
import { FiPlus } from "react-icons/fi";
import OutcomeItem from "./Item.component";
import _ from "lodash";
import { useEffect, useRef, useState } from "react";

const OutcomeContainer = ({ course, formMethod }) => {
  const { course_outcome } = course;
  const { resetState, setValue, getValues } = formMethod;
  const minItems = 4;
  const iniArrOutcome = (() => {
    if (course_outcome.length) {
      return [...course_outcome];
    } else {
      return Array.from({ length: minItems }).map((_, i) => ({
        description: "",
        order: i + 1,
      }));
    }
  })();

  const [countOutcome, setCountOutcome] = useState(iniArrOutcome.length);
  const [allowRemoveOutcome, setAllowRemoveOutcome] = useState(false); // ít nhất 4 items
  const [outcomeInputFields, setOutcomeInputFields] = useState(iniArrOutcome);
  const allTextInputRef = useRef([]);

  useEffect(() => {
    const handleSetAllowOutcome = (amount) => {
      const allowOutcome = amount > minItems ? true : false;
      setAllowRemoveOutcome(allowOutcome);
    };

    handleSetAllowOutcome(countOutcome);
  }, [countOutcome]);

  function onChangeOutcome(e) {
    const {
      value,
      dataset: { order },
    } = e.target;

    const outcome = getValues("course_outcome");
    let dataOutcome = {
      description: value,
      order: parseInt(order),
    };

    let updatedOutcome = [];
    if (!outcome) updatedOutcome.push(dataOutcome);
    else if (Array.isArray(outcome)) {
      updatedOutcome = [...outcome];
      const objIndex = updatedOutcome.findIndex(
        (item) => item.order === parseInt(order)
      );
      const existed = objIndex > -1;

      if (existed) {
        updatedOutcome[objIndex].description = value;
      } else {
        updatedOutcome.push(dataOutcome);
      }
    }

    setValue("course_outcome", updatedOutcome);

    // su dung object
    // const dataOutcome = JSON.stringify({
    //   ...outcome,
    //   [name]: {
    //     description: value,
    //     course_id: id,
    //     order,
    //   },
    // });

    // console.log(outcome);
  }

  function handleIncreaseOutcome() {
    setCountOutcome((amount) => amount + 1);
  }

  function handleDecreaseOutcome() {
    setCountOutcome((amount) => amount - 1);
  }

  function onRemoveOutcomeItem(order) {
    const [arr_course_outcome_order, arr_course_outcome] = getValues([
      "delete_course_outcome_order",
      "course_outcome",
    ]);

    // Update lại outcome
    if (Array.isArray(arr_course_outcome)) {
      const filteredOutcome = [...arr_course_outcome].filter(
        (outcome) => outcome.order !== order
      );

      setValue("course_outcome", filteredOutcome);
    }

    let arrOutcomeOrder = [];
    // Xóa outcome
    if (Array.isArray(arr_course_outcome_order)) {
      arrOutcomeOrder = [...arr_course_outcome_order];
    }

    arrOutcomeOrder.push(order);
    setValue("delete_course_outcome_order", arrOutcomeOrder);

    handleDecreaseOutcome();
  }

  function addOutcomeInputFields() {
    const newfield = (order) => ({
      description: "",
      order,
    });

    setOutcomeInputFields((currentState) => {
      console.log(currentState);
      const { order: maxOrder } = _.maxBy(currentState, "order");
      console.log(maxOrder);

      const order = maxOrder + 1;
      return [...currentState, newfield(order)];
    });
  }

  function handleAddOutcomeItem() {
    const hasEmptyItem = allTextInputRef.current
      .filter((r) => r) // lọc các ref null(outcome bị xóa)
      .some((input) => input.state.value === "");

    if (!hasEmptyItem) {
      // kiểm tra item mới & cũ not empty => tạo item mới
      handleIncreaseOutcome();
      addOutcomeInputFields();
      console.log(getValues("course_outcome"));
    }
  }

  return (
    <div className="goals-wrapper">
      <Row gutter={[0, 15]}>
        {outcomeInputFields
          .sort((a, b) => a.order - b.order)
          .map((outcome, i) => {
            const { order, description } = outcome;
            return (
              <OutcomeItem
                innerRef={(el) => (allTextInputRef.current[i] = el)}
                key={order}
                order={order}
                onChangeItem={onChangeOutcome}
                defaultValue={description}
                allowRemoveItem={allowRemoveOutcome}
                onRemoveItem={onRemoveOutcomeItem}
                placeholder="Ví dụ: Có kiến thức nền tảng tốt về ngôn ngữ lập trình để có thể học cao lên sau này"
              />
            );
          })}
      </Row>
      <br />
      <Button
        type="link"
        className="add-response d-flex align-items-center"
        onClick={() => handleAddOutcomeItem()}
      >
        <FiPlus />
        Thêm câu trả lời cho những mục tiêu của khóa học
      </Button>
    </div>
  );
};

export default OutcomeContainer;
