import { InfoCircleFilled } from "@ant-design/icons";
import { Col, Popover, Select } from "antd";
import { FC, useEffect, useRef, useState } from "react";
import { Category, Subcategory, Topic } from "../../../../api/categories.api";
import ErrorBanner from "../../../../components/ErrorBanner/ErrorBanner.component";
import {
  useAppDispatch,
  useTypedSelector,
} from "../../../../hooks/redux.hooks";
import { getCategories } from "../../../../redux/slices/categories.slice";
import { HookForm } from "../../utils/instructor-course.types";

type Props = {
  formHandler: HookForm;
};

const Categories: FC<Props> = ({ formHandler }) => {
  const dispatch = useAppDispatch();
  const {
    setValue,
    formState: { errors },
  } = formHandler;

  const { data: categories, loaded: loadedCategories } = useTypedSelector(
    ({ categories }) => categories.categories
  );
  const { data: course, loaded: loadedCourse } = useTypedSelector(
    (state) => state.instructorCourse.course
  );

  const [subcategory, setSubcategory] = useState<Subcategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number>();
  const [topic, setTopic] = useState<Topic[]>();
  const [selectedTopic, setSelectedTopic] = useState<number[]>([]);
  const [selectedSubcategory, setSelectedSubcategory] = useState<number>();

  useEffect(() => {
    !loadedCategories && dispatch(getCategories());
  }, [dispatch, loadedCategories]);

  useEffect(() => {
    let parentId: number | null = null; // Lấy 1 parent id(subcategory) để tìm category => vì tất cả parent id đều thuộc 1 category
    let subcategory: Subcategory | null = null; // categories trong khóa học có thể là subcategory(nếu kh có topic) hoặc topic

    const topicId = course?.categories.map((category) => {
      if (!parentId) parentId = category.parent_id;

      return category.category_id;
    });

    const category = categories.find((category) => {
      const parentIsSubcategory = category.subcategory.find(
        (sub) => sub.id === parentId
      );

      if (parentIsSubcategory) {
        subcategory = parentIsSubcategory;
        return true;
      }

      const parentIsCategory = category.id === parentId;
      return parentIsCategory;
    });

    if (category?.id) {
      setSelectedCategory(category.id);
      setSubcategory(category.subcategory);

      if (!subcategory) topicId?.length && setSelectedSubcategory(topicId[0]);
      else {
        const typedSubcategory = subcategory as Subcategory;
        const subCategoryId = subcategory["id"];
        setSelectedSubcategory(subCategoryId);
        setTopic(typedSubcategory.subcategory);
        setSelectedTopic(topicId ?? []);
      }
    }
  }, [course?.categories, categories]);

  function onCategoryChange(value: number) {
    setSelectedCategory(value);
    setSelectedSubcategory(undefined);
    setSelectedTopic([]);
    setValue("topic", []);

    const category = categories.find(
      (category) => category.id === value
    ) as Category;

    setSubcategory(category?.subcategory);
  }

  function onSubcategoryChange(value: number) {
    setSelectedSubcategory(value);
    setSelectedTopic([]);

    const subcategoryItem = subcategory.find((item) => item.id === value);
    if (subcategoryItem?.subcategory) {
      setTopic(subcategoryItem.subcategory);
      setValue("topic", []);
    } else {
      setTopic([]);
      setValue("topic", value); // Nếu không có topic => lấy subcategory
    }
  }

  function onTopicChange(value: number[]) {
    if (selectedTopic.length < 3) {
      setSelectedTopic(value);
      setValue("topic", value);
    }
  }

  function deselectTopic(value: any) {
    const rest = selectedTopic.filter((id) => id !== value);

    setSelectedTopic(rest);
    setValue("topic", rest);
  }

  if (!loadedCategories || !loadedCourse) return null;

  return (
    <>
      <Col span={8}>
        <Select
          value={selectedCategory}
          onChange={onCategoryChange}
          options={categories}
          fieldNames={{ label: "name", value: "id" }}
          placeholder="-- Chọn danh mục --"
          style={{ width: "100%" }}
        />
      </Col>
      {selectedCategory && (
        <Col span={8}>
          <Select
            onChange={onSubcategoryChange}
            style={{ width: "100%" }}
            options={subcategory}
            placeholder="-- Danh mục con --"
            fieldNames={{ label: "name", value: "id" }}
            value={selectedSubcategory}
          />
        </Col>
      )}

      {topic && topic.length > 0 && selectedSubcategory && (
        <Col span={16} offset={8}>
          <span className="d-block" style={{ padding: "8px 0px 5px" }}>
            Những nội dung chính bạn dạy trong khóa học này?
            <Popover
              className="ml-1"
              overlayStyle={{ whiteSpace: "break-spaces" }}
              overlayInnerStyle={{ width: "250px" }}
              content={
                <div>
                  Mỗi chủ đề bạn chọn phải mô tả chính xác chủ đề bạn dạy trong
                  khóa học.
                  <br />
                  Bạn có thể chọn tối đa <b>3</b> chủ đề cho khóa học của bạn.
                </div>
              }
            >
              <InfoCircleFilled />
            </Popover>
          </span>

          <Select
            allowClear={false}
            onDeselect={deselectTopic}
            value={selectedTopic}
            onChange={onTopicChange}
            listHeight={150}
            filterOption
            fieldNames={{ label: "name", value: "id" }}
            options={topic}
            mode="tags"
            style={{ width: "100%" }}
            placeholder="Nhập chủ đề. Vd: Nhiếp ảnh,..."
          />

          {selectedTopic.length === 3 && (
            <ErrorBanner
              error={
                "Bạn đã chọn tối đa 3 chủ đề. Để thay thế chủ đề đã chọn, nhấp vào nút xóa chủ đề."
              }
            />
          )}
        </Col>
      )}

      <ErrorBanner span={16} offset={8} error={errors.topic} />
    </>
  );
};

export default Categories;
