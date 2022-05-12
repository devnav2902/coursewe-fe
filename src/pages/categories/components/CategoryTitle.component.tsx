import { FC, memo, useEffect } from "react";
import { useParams } from "react-router-dom";
import Skeleton from "../../../components/Skeleton/Skeleton.component";
import { useAppDispatch, useTypedSelector } from "../../../hooks/redux.hooks";
import { getBreadcrumbByCategory } from "../../../redux/slices/categories.slice";
import { getCategorySlug } from "../utils/functions";

const CategoryTitle: FC = () => {
  const { slug, sub, topic } = useParams();

  const { loaded: loadedBreadcrumb, data: breadcrumb } = useTypedSelector(
    ({ categories }) => categories.breadcrumb
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    const params = { slug, sub, topic };
    const slugCategory = getCategorySlug(params);

    if (slugCategory) dispatch(getBreadcrumbByCategory(slugCategory));
  }, [dispatch, slug, sub, topic]);

  return !loadedBreadcrumb ? (
    <Skeleton amount={1} />
  ) : (
    <div className="sec-title mt-3">
      <h1>
        Khóa học chủ đề:{" "}
        {breadcrumb?.level3_title ||
          breadcrumb?.level2_title ||
          breadcrumb?.level1_title}
      </h1>
    </div>
  );
};

export default memo(CategoryTitle);
