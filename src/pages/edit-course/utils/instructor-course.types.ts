import { FieldValues, UseFormReturn } from "react-hook-form";

export type HookForm = UseFormReturn<FieldValues>;

export type TypeItems = "outcome_items" | "requirement_items";
export type IDataRemove = {
  array_order_delete:
    | "delete_course_outcome_order"
    | "delete_course_requirements_order";
  array_update: TypeItems;
  order: number;
};

// CURRICULUM

export type SectionType = "section";
export type LectureType = "lecture";

export type CurriculumTypes = {
  SECTION: SectionType;
  LECTURE: LectureType;
};
