type Slug = undefined | string;
type SlugParams = { slug: Slug; sub: Slug; topic: Slug };

export function getCategorySlug(params: SlugParams) {
  const keys = Object.keys(params).filter(
    (key) => params[key as keyof SlugParams]
  );
  const categorySlug = params[keys.at(-1) as keyof SlugParams];

  return categorySlug;
}
