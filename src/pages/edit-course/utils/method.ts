import { Input } from "antd";
import _ from "lodash";
import { MutableRefObject } from "react";
import {
  FieldValues,
  UseFormGetValues,
  UseFormSetValue,
} from "react-hook-form";
import { HookForm, IDataRemove, TypeItems } from "./instructor-course.types";
import { IntendedItem, IntendedItems } from "../../../ts/types/course.types";

// Thay đổi value coure outcome & requirements
const onChangeItem = (
  values: IntendedItem,
  type: TypeItems,
  getValues: UseFormGetValues<FieldValues>,
  setValue: UseFormSetValue<FieldValues>
) => {
  const { order, description } = values;

  const items = getValues(type);
  let dataItems = {
    description,
    order,
  };

  let updatedItems: IntendedItems = [];
  if (!items) updatedItems.push(dataItems);
  else if (Array.isArray(items)) {
    updatedItems = [...items];
    const objIndex = updatedItems.findIndex((item) => item.order === order);
    const existed = objIndex > -1;

    if (existed) {
      updatedItems[objIndex].description = description;
    } else {
      updatedItems.push(dataItems);
    }
  }

  setValue(type, updatedItems);
};

const onRemoveItem = (
  values: IDataRemove,
  getValues: UseFormGetValues<FieldValues>,
  setValue: UseFormSetValue<FieldValues>
) => {
  const [array_order_delete, array_update] = getValues([
    values.array_order_delete,
    values.array_update,
  ]);

  // Update lại
  if (Array.isArray(array_update)) {
    const filteredItems = [...array_update].filter(
      (item) => item.order !== values.order
    );

    setValue(values.array_update, filteredItems);
  }

  let arrItemsOrder: number[] = [];
  // Xóa
  if (Array.isArray(array_order_delete)) {
    arrItemsOrder = [...array_order_delete];
  }

  arrItemsOrder.push(values.order);
  setValue(values.array_order_delete, arrItemsOrder);
};

// course outcome & course requirements
const iniArrIntendedItems = (arrItems: IntendedItems, minItems: number) => {
  const lengthArr = arrItems.length;

  if (arrItems.length) {
    const { order: maxOrder } = _.maxBy(arrItems, "order") as IntendedItem;

    const arrEmptyOutcome: IntendedItems = Array.from({
      length: minItems - lengthArr,
    }).map((_, i) => ({
      description: "",
      order: maxOrder + 1 + i,
    }));

    return [...arrItems, ...arrEmptyOutcome];
  } else {
    return Array.from({ length: minItems }).map<IntendedItem>((_, i) => ({
      description: "",
      order: i + 1,
    }));
  }
};

// check lỗi và gửi lên react hook form
type DataValidate = {
  minItems: number;
  allInputsRef: MutableRefObject<Input[]>;
};

const validateItemsBeforeSend = (
  dataValidate: DataValidate,
  type: TypeItems,
  formMethod: HookForm
) => {
  const { clearErrors, setError, errors } = formMethod;
  const { minItems, allInputsRef } = dataValidate;

  const totalInputsHasValue = allInputsRef.current
    .filter((el) => el)
    .reduce((total, el) => {
      const hasValue = el.input.value.trim() !== "";

      if (hasValue) return (total += 1);
      return total;
    }, 0);

  if (totalInputsHasValue < minItems) {
    // let message = "";
    if (type === "outcome_items") {
      const message = `Bạn cần nhập ít nhất ${minItems} mục tiêu hoặc kết quả học tập!`;

      if (!errors[`not_enough_${type}`])
        setError(`not_enough_${type}`, { type, message });
    }
  } else {
    if (errors[`not_enough_${type}`]) clearErrors(`not_enough_${type}`);
  }

  console.log(errors);
};

export {
  onChangeItem,
  onRemoveItem,
  iniArrIntendedItems,
  validateItemsBeforeSend,
};
