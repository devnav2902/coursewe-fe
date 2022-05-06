import { CurriculumTypes } from "./instructor-course.types";

const CURRICULUM_TYPES: CurriculumTypes = {
  SECTION: "section",
  LECTURE: "lecture",
} as const;

export { CURRICULUM_TYPES };
