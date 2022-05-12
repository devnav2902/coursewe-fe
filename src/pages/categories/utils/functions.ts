type Slug = undefined | string;
type SlugParams = { slug: Slug; sub: Slug; topic: Slug };

export function getCategorySlug(params: SlugParams) {
  const keys = Object.keys(params).filter(
    (key) => params[key as keyof SlugParams]
  );
  const categorySlug = params[keys.at(-1) as keyof SlugParams];

  return categorySlug;
}

export function isNumberStringWithCommas(string: string) {
  return /^(\d+,)*\d+$/.test(string);
}

export function isStringWithCommas(string: string) {
  return /^([a-z]+,)*[a-z]+$/.test(string);
}

export function convertToArrayFromParam(
  param: string,
  type: "number" | "string"
) {
  if (type === "number") {
    const isNumber =
      typeof Number(param) === "number" && !isNaN(parseInt(param));

    return isNumberStringWithCommas(param)
      ? param.split(",").map((param) => parseInt(param))
      : isNumber
      ? [parseInt(param)]
      : undefined;
  }
  if (type === "string")
    return isStringWithCommas(param)
      ? param.split(",")
      : param
      ? [param]
      : undefined;
}
