import { User } from "./user.types";

export type Resource = {
  original_filename: string;
  id: number;
  filesize: string;
  lecture_id: number;
};
export type ResourceItems = Resource[];
export type Progress = {
  progress: boolean;
  lecture_id: number;
};
export type Lecture = {
  id: number;
  title: string;
  resource: ResourceItems;
  resource_count?: number;
  src: string;
  original_filename: string;
  updated_at: string;
  order: number;
  playtime_seconds: string;
  playtime_string: string;
  progress?: Progress;
};

export type Section = {
  order: number;
  title: string;
  id: number;
  lecture: LectureItems;
  lecture_count: number;
  progress_in_lectures_count?: number;
};
export type LectureItems = Lecture[];
export type SectionItems = Section[];
export type Price = {
  id: number;
  format_price: string;
  original_price: string;
};
export type LearningProgress = {
  total: number;
  data_progress?: [];
  complete: number;
};
export type Rating = {
  course_id: number;
  user_id: number;
  content: string;
  rating: number;
  user: User;
};
export type Ratings = Rating[];
export type IntendedItem = { description: string; order: number; id?: number };
export type IntendedItems = IntendedItem[];
export type CourseOutcome = IntendedItem & { id: number };
export type CourseRequirements = IntendedItem & { id: number };
export type InstructionalLevel = { id: number; level: string };
export type Course = {
  id: number;
  title: string;
  slug: string;
  author_id: 2;
  thumbnail: string;
};

export type Courses = Course[];
export type CoursesPagination<C> = {
  current_page: number;
  data: C;
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  next_page_url: string;
  per_page: number;
  prev_page_url: string;
  to: number;
  total: number;
};
