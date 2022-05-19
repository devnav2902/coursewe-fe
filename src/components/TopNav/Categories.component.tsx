import { Cascader, ConfigProvider, Empty, Spin } from "antd";
import { DefaultOptionType, SingleValueType } from "rc-cascader/lib/Cascader";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useTypedSelector } from "../../hooks/redux.hooks";
import { getCategories } from "../../redux/slices/categories.slice";
import { routesWithParams } from "../../utils/constants";

const Categories = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [displayCascader, setDisplayCascader] = useState(false);
  const { loaded, data: categoriesData } = useTypedSelector(
    ({ categories }) => categories.categories
  );

  useEffect(() => {
    !loaded && dispatch(getCategories());
  }, [dispatch, loaded]);

  function onChangeCascader(
    value: SingleValueType,
    selectOptions: DefaultOptionType[]
  ) {
    setDisplayCascader(false);

    const arrParams = value as string[];
    const slug = arrParams.reduce((result, cur) => (result += `${cur}/`), "");

    slug &&
      navigate(routesWithParams.categories(slug), {
        state: { categoryData: selectOptions },
      });
  }

  return (
    <ConfigProvider
      renderEmpty={() =>
        !loaded ? (
          <div className="d-flex align-items-center justify-content-center">
            <Spin />
          </div>
        ) : (
          loaded &&
          !categoriesData.length && <Empty description="Chưa có danh mục nào" />
        )
      }
    >
      <Cascader
        changeOnSelect={true}
        bordered={false}
        options={categoriesData}
        expandTrigger="hover"
        dropdownClassName="categories-dropdown"
        onChange={onChangeCascader}
        value={[]}
        loadingIcon
        allowClear={false}
        onMouseEnter={() => setDisplayCascader(true)}
        onMouseLeave={() => setDisplayCascader(false)}
        placeholder="Danh mục"
        suffixIcon={null}
        open={displayCascader}
        getPopupContainer={(e) => e}
        fieldNames={{
          label: "name",
          value: "slug",
          children: "subcategory",
        }}
      />
    </ConfigProvider>
  );
};

export default Categories;
