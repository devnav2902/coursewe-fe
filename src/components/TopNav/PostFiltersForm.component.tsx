import { SearchOutlined } from "@ant-design/icons";
import { Row, Select, Space, Spin } from "antd";
import CategoriesApi from "api/categories.api";
import didYouMean from "didyoumean";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import SearchApi, { ArraySearchCourses } from "api/search.api";
import { ROUTES } from "utils/constants";
import { linkThumbnail } from "utils/functions";

const { Option } = Select;

const StyledFilterResult = styled.div`
  .title {
    font-size: 16px;
    color: var(--color-dark);
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    margin-bottom: 0.5rem;
    white-space: normal;
  }
  .img {
    width: 50px;
    height: 50px;
    overflow: hidden;
    border-radius: 5px;
    flex-shrink: 0;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  .see-more {
    z-index: 400;
    display: flex;
    justify-content: center;
    align-items: center;

    padding: 1rem;
    button {
      display: flex;
      justify-content: center;
      border-top: 1px solid rgb(236, 236, 236);
      width: 100%;
      background-color: transparent;
      padding: 1rem;
      margin-top: 1rem;
    }
  }
`;

const StyledSelect = styled.div`
  .ant-select-selector {
    border-radius: 30px !important;
  }
`;

function PostFiltersForm() {
  const [inputValue, setInputValue] = useState<string | undefined>(undefined);
  const [valueSearch, setValueSearch] = useState<{
    loaded: boolean;
    items: ArraySearchCourses | [];
  }>({ items: [], loaded: false });
  const [categories, setCategories] = useState<{
    loaded: boolean;
    items: string[];
  }>({ loaded: false, items: [] });

  const typingTimeoutRef = useRef<null | ReturnType<typeof setTimeout>>(null);

  useEffect(function getCategoriesList() {
    CategoriesApi.getList().then(({ data }) => {
      setCategories({
        loaded: true,
        items: data.items.map((value) => value.title),
      });
    });
  }, []);

  useEffect(() => {
    if (inputValue && inputValue.length >= 2 && categories.loaded) {
      didYouMean.threshold = 0.5;
      const word = didYouMean(inputValue, [
        "css",
        "html",
        ...categories.items,
        "Tiếng hàn",
        "Tự học",
        "Tiếng trung",
        "Cá nhân",
        "piano",
        "guitar",
      ]);

      setValueSearch(() => ({
        items: [],
        loaded: false,
      }));

      const wordMatch = (word as string) ? (word as string) : inputValue;
      SearchApi.search(wordMatch).then((res) => {
        setValueSearch((state) => ({
          ...state,
          loaded: true,
          items: res.data.data,
        }));
      });
    }
  }, [inputValue, categories]);

  function handleSearchTermChange(value: string) {
    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);

    typingTimeoutRef.current = setTimeout(() => {
      setInputValue(value);
    }, 300);
  }

  const options = valueSearch.items.map((course) => (
    <Option key={course.id}>
      <StyledFilterResult>
        <a
          className="result-item d-flex"
          href={ROUTES.detail_course(course.slug)}
        >
          <Space align="start" size={12}>
            <div className="img">
              <img src={linkThumbnail(course.thumbnail)} alt={course.title} />
            </div>

            <div className="info">
              <div className="title">{course.title}</div>
              <div className="author">{course.author.fullname}</div>
            </div>
          </Space>
        </a>
      </StyledFilterResult>
    </Option>
  ));

  if (valueSearch.items.length) {
    options.push(
      <Option key={"more"}>
        <StyledFilterResult>
          <a
            className="result-item d-flex justify-content-center"
            href={ROUTES.search() + "?q=" + inputValue}
          >
            Xem thêm
          </a>
        </StyledFilterResult>
      </Option>
    );
  }

  return (
    <StyledSelect>
      <Select
        showSearch
        placeholder={
          <div>
            <SearchOutlined /> Chào bạn! Hôm nay bạn muốn học gì?
          </div>
        }
        defaultActiveFirstOption={false}
        value={inputValue}
        showArrow={false}
        filterOption={false}
        style={{ width: "45rem", borderRadius: 30 }}
        dropdownStyle={{ zIndex: 9901 }}
        onSearch={(value) => {
          handleSearchTermChange(value);
        }}
        notFoundContent={
          !valueSearch.loaded && inputValue?.length ? (
            <Row align="middle" justify="center">
              <Spin />
            </Row>
          ) : valueSearch.items.length ? (
            <div>Không tìm thấy khóa học phù hợp!</div>
          ) : null
        }
      >
        {options}
      </Select>
    </StyledSelect>
  );
}

export default PostFiltersForm;
