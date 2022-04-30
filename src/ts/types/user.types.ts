export type User = {
  id: number;
  fullname: string;
  slug: string;
  avatar: string;
  bio?: Biography;
  email: string;
  role: {
    id: string | number;
    name: string;
  };
};

export type Biography = {
  headline: string;
  bio: string;
  website: string;
  youtube: string;
  facebook: string;
  linkedin: string;
  twitter: string;
};
