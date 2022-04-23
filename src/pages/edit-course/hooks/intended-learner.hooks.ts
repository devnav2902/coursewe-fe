import { MutableRefObject, useEffect, useRef, useState } from "react";
import { IntendedItem, IntendedItems } from "../utils/instructor-course.types";
import _ from "lodash";
import { Input } from "antd";

type DataInputFields = {
  handleDecreaseItem: () => void;
  inputFields: IntendedItems;
  allowRemoveItem: boolean;
  addItemInputFields: () => void;
  countItem: number;
  allTextInputRef: MutableRefObject<Input[]>;
  handleAddItem: () => void;
};

const useInputFields = (
  iniArrItems: IntendedItems,
  minItems: number
): DataInputFields => {
  const [inputFields, setInputFields] = useState<IntendedItems>(iniArrItems);
  const [countItem, setCountItem] = useState<number>(iniArrItems.length);
  const [allowRemoveItem, setAllowRemoveItem] = useState<boolean>(false); // ít nhất 1 items
  const allTextInputRef = useRef<Input[]>([]);

  useEffect(() => {
    const handleSetAllowRemoveItem = (amount: number) => {
      const allowRemoveItem = amount > minItems ? true : false;
      setAllowRemoveItem(allowRemoveItem);
    };

    handleSetAllowRemoveItem(countItem);
  }, [countItem, minItems]);

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

  function addItemInputFields() {
    const newfield = (order: number): IntendedItem => ({
      description: "",
      order,
    });

    setInputFields((currentState) => {
      const { order: maxOrder } = currentState.length
        ? (_.maxBy(currentState, "order") as IntendedItem)
        : { order: 0 };
      console.log("max current", maxOrder);

      const order = maxOrder + 1;
      return [...currentState, newfield(order)];
    });
  }

  function handleIncreaseItem() {
    setCountItem((amount) => amount + 1);
  }

  function handleDecreaseItem() {
    setCountItem((amount) => amount - 1);
  }

  const data: DataInputFields = {
    handleDecreaseItem,
    inputFields,
    allowRemoveItem,
    addItemInputFields,
    countItem,
    handleAddItem,
    allTextInputRef,
  };

  return data;
};

export { useInputFields };
