export type Role = "user" | "admin" | "quality_review";

export type User = {
  id: number;
  fullname: string;
  slug: string;
  avatar: string;
  email: string;
  role: {
    id: string | number;
    name: Role;
  };
  headline?: string;
  bio?: string;
  website?: string;
  youtube?: string;
  facebook?: string;
  linkedin?: string;
  twitter?: string;
};
