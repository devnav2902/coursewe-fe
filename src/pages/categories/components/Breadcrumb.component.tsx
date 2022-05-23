import { FC, memo } from "react";
import { Breadcrumb as BreadcrumbType } from "../../../api/categories.api";
import { ROUTES } from "../../../utils/constants";
import { Breadcrumb } from "antd";
import { StyledBreadcrumb } from "../styles/categories.styles";
import { useTypedSelector } from "../../../hooks/redux.hooks";

const BreadcrumbItem: FC = () => {
  const { loaded: loadedBreadcrumb, data: breadcrumb } = useTypedSelector(
    ({ categories }) => categories.breadcrumb
  );
  console.log(breadcrumb);

  return !loadedBreadcrumb ? null : (
    <StyledBreadcrumb>
      <Breadcrumb separator=">">
        <Breadcrumb.Item href="/">Trang chủ</Breadcrumb.Item>
        <Breadcrumb.Item>Danh mục</Breadcrumb.Item>
        {breadcrumb &&
          (Object.keys(breadcrumb) as (keyof BreadcrumbType)[]).map(
            (key, i) => {
              const topLevelSlug = breadcrumb["level1_slug"];
              const subcategorySlug = breadcrumb["level2_slug"];
              const topicSlug = breadcrumb["level3_slug"];

              const topLevelTitle = breadcrumb["level1_title"];
              const subcategoryTitle = breadcrumb["level2_title"];
              const topicTitle = breadcrumb["level3_title"];

              if (key === "category_id") {
                return (
                  <Breadcrumb.Item
                    key={i}
                    href={ROUTES.categories(topLevelSlug)}
                  >
                    {topLevelTitle}
                  </Breadcrumb.Item>
                );
              } else if (key === "subcategory_id" && subcategorySlug) {
                return (
                  <Breadcrumb.Item
                    key={i}
                    href={ROUTES.subcategories({
                      slug: topLevelSlug,
                      sub: subcategorySlug,
                    })}
                  >
                    {subcategoryTitle}
                  </Breadcrumb.Item>
                );
              } else if (key === "topic_id" && topicSlug && subcategorySlug) {
                return (
                  <Breadcrumb.Item
                    key={i}
                    href={ROUTES.topics({
                      slug: topLevelSlug,
                      sub: subcategorySlug,
                      topic: topicSlug,
                    })}
                  >
                    {topicTitle}
                  </Breadcrumb.Item>
                );
              }
            }
          )}
      </Breadcrumb>
    </StyledBreadcrumb>
  );
};

export default memo(BreadcrumbItem);
