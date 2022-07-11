import axiosClient from "../utils/axios";
import { User, User as UserType } from "../ts/types/user.types";
import { Pagination } from "../ts/types/pagination.types";

export interface IInstructor extends User {
  course_count: number;
  revenue: number;
  totalStudents: number;
}
export interface InstructorManagementResponse {
  items: Pagination<IInstructor[]>;
}
export interface IUser extends User {
  course_bill_count: number;
}
export interface UserManagementResponse {
  items: Pagination<IUser[]>;
}

class UserManagement {
  instructorManagement = async () => {
    return axiosClient.get<InstructorManagementResponse>(
      "/admin/management-instructor"
    );
  };
  userManagement = async () => {
    return axiosClient.get<UserManagementResponse>("/admin/management-user");
  };
}
const UserManagementApi = new UserManagement();
export default UserManagementApi;
