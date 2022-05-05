import { Cascader, ConfigProvider, Empty, Spin } from "antd";
import { SingleValueType } from "rc-cascader/lib/Cascader";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CategoriesApi from "../../api/categories.api";
import { routesWithParams } from "../../utils/constants";

const Categories = () => {
  const navigate = useNavigate();

  const [displayCascader, setDisplayCascader] = useState(false);
  const [categoriesData, setCategoriesData] = useState({
    loaded: false,
    data: [],
  });

  function onChangeCascader(value: SingleValueType) {
    setDisplayCascader(false);

    const arrParams = value as string[];
    const slug = arrParams.reduce((result, cur) => (result += `${cur}/`), "");

    slug && navigate(routesWithParams.categories(slug));
  }

  useEffect(() => {
    CategoriesApi.get().then((res) => {
      const {
        data: { categories },
      } = res;
      setCategoriesData((state) => ({
        ...state,
        data: categories,
        loaded: true,
      }));
    });
  }, []);

  return (
    <ConfigProvider
      renderEmpty={() =>
        !categoriesData.loaded ? (
          <div className="d-flex align-items-center justify-content-center">
            <Spin />
          </div>
        ) : (
          categoriesData.loaded &&
          !categoriesData.data.length && (
            <Empty description="Chưa có danh mục nào" />
          )
        )
      }
    >
      <Cascader
        changeOnSelect={true}
        bordered={false}
        options={categoriesData.data}
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
