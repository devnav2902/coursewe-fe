import axiosClient from "../utils/axios";
type DataLastWatched = {
  lecture_id: number;
  course_id: number;
  user_id: number;
  last_watched_second: number;
  created_at: string;
  updated_at: string;
  course: {
    id: number;
    slug: string;
  };
};

type LastWatchedResponse = {
  dataLastWatched: DataLastWatched | null;
};

class ProgressLogs {
  getDataLastWatched = async (course_id: number | string) => {
    return axiosClient.get<LastWatchedResponse>(`/last-watched/${course_id}`);
  };
  getDataLastWatchedByLectureId = async (
    course_id: number | string,
    lectureId: number | string
  ) => {
    return axiosClient.get<LastWatchedResponse>(
      `/last-watched/course/${course_id}/lecture/${lectureId}`
    );
  };
}

const ProgressLogsApi = new ProgressLogs();
export default ProgressLogsApi;
