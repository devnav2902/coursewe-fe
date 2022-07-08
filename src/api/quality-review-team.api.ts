import { Pagination } from "../ts/types/pagination.types";
import { User } from "../ts/types/user.types";
import axiosClient from "../utils/axios";

export interface IQualityReviewTeam extends User {
  quality_review_team: {
    user_id: number;
    category_id: number;
    created_at: string;
    updated_at: string;
    category: {
      category_id: number;
      parent_id: number;
      title: string;
      slug: string;
      created_at: string;
      updated_at: string;
    };
  };
}

export interface GetQualityReviewTeamResponse {
  items: Pagination<IQualityReviewTeam[]>;
}

export interface QualityReviewTeamPayload {
  fullname: string;
  email: string;
  categories: { category_id: number }[];
}

export interface StatisticResponse {
  data: {
    title: string;
    data: {
      title: string;
      id: number;
      numberOfPeople: number;
      people: { category_id: number; user_id: number }[];
    }[];
  }[];
}

class QualityReviewTeam {
  statistic = async () => {
    return axiosClient.get<StatisticResponse>("/quality-review-team/statistic");
  };

  get = async () => {
    return axiosClient.get<GetQualityReviewTeamResponse>(
      "/quality-review-team"
    );
  };

  create = async (data: QualityReviewTeamPayload) => {
    return axiosClient.post("/quality-review-team/create", data);
  };
}

const QualityReviewTeamApi = new QualityReviewTeam();

export default QualityReviewTeamApi;
