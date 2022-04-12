function getCategorySlug(params) {
  const keys = Object.keys(params).filter((key) => params[key]);
  const categorySlug = params[keys.at(-1)];

  return categorySlug;
}

export { getCategorySlug };
