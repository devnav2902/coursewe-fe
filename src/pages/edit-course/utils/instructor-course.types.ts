import {
  FieldValues,
  UseFormGetValues,
  UseFormSetError,
  UseFormSetValue,
  Control,
  UseFormWatch,
  UseFormRegister,
  UseFormClearErrors,
} from "react-hook-form";

type HookForm = {
  resetState: () => void;
  control?: Control<FieldValues, any>;
  register?: UseFormRegister<FieldValues>;
  watch?: UseFormWatch<FieldValues>;
  getValues: UseFormGetValues<FieldValues>;
  setValue: UseFormSetValue<FieldValues>;
  setError: UseFormSetError<FieldValues>;
  clearErrors: UseFormClearErrors<FieldValues>;
  errors: { [x: string]: any };
};

type IntendedItem = { description: string; order: number };

type IntendedItems = IntendedItem[];

type TypeItems = "outcome_items" | "requirement_items";

interface IDataRemove {
  array_order_delete:
    | "delete_course_outcome_order"
    | "delete_course_requirements_order";
  array_update: TypeItems;
  order: number;
}

// CURRICULUM

export type SectionType = "section";
export type LectureType = "lecture";

export type CurriculumTypes = {
  SECTION: SectionType;
  LECTURE: LectureType;
};

export { HookForm, IntendedItem, IntendedItems, IDataRemove, TypeItems };
