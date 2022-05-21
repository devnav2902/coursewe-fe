export type User = {
  id: number;
  fullname: string;
  slug: string;
  avatar: string;
  email: string;
  role: {
    id: string | number;
    name: "user" | "admin";
  };
  headline?: string;
  bio?: string;
  website?: string;
  youtube?: string;
  facebook?: string;
  linkedin?: string;
  twitter?: string;
};
