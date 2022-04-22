import {
  UseFormGetValues,
  FieldValues,
  UseFormSetValue,
} from "react-hook-form";
// Thay đổi value coure outcome & requirements
type Type = "course_outcome" | "course_requirements";
type IntendedItem = { description: string; order: number };
type IntendedItems = IntendedItem[];

const onChangeItem = (
  values: IntendedItem,
  type: Type,
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

interface IData {
  array_order_delete: string;
  array_update: string;
  order: number;
}
const onRemoveItem = (
  values: IData,
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
    const arrEmptyOutcome: IntendedItems = Array.from({
      length: minItems - lengthArr,
    }).map((_, i) => ({
      description: "",
      order: lengthArr + 1 + i,
    }));

    return [...arrItems, ...arrEmptyOutcome];
  } else {
    return Array.from({ length: minItems }).map<IntendedItem>((_, i) => ({
      description: "",
      order: i + 1,
    }));
  }
};

export {
  onChangeItem,
  onRemoveItem,
  iniArrIntendedItems,
  IntendedItem,
  IntendedItems,
};
