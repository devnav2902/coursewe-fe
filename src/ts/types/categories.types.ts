export type FeaturedCategories = {
  top_level_id: number;
  name: string;
}[];

export type Category = {
  category_id: number;
  parent_id: number;
  title: string;
  slug: string;
};
export type ArrayCategories = Category[];
