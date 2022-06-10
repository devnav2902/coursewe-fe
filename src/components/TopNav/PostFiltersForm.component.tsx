import { SearchOutlined } from "@ant-design/icons";
import { List, Select } from "antd";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SearchApi, { ArraySearchCourses } from "../../api/search.api";
import { ROUTES } from "../../utils/constants";
const { Option } = Select;
function PostFiltersForm() {
  // const [searchTerm, setSearchTerm] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [valueSearch, setValueSearch] = useState<ArraySearchCourses | []>([]);
  const typingTimeoutRef = useRef<null | ReturnType<typeof setTimeout>>(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (inputValue.length < 2) {
      setValueSearch([]);
    } else {
      SearchApi.search(inputValue).then((res) => {
        console.log(res);
        setValueSearch(res.data.data);
      });
    }
  }, [inputValue]);

  function handleSearchTermChange(value: any) {
    console.log(value);

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    typingTimeoutRef.current = setTimeout(() => {
      setInputValue(value);
    }, 300);
  }

  function handCleanInput() {
    setInputValue("");
  }
  function handleClick() {
    navigate(ROUTES.search() + "?q=" + inputValue);
  }

  // const handleSearch = (newValue: string) => {
  //   if (newValue) {
  //     fetch(newValue, setData);
  //   } else {
  //     setData([]);
  //   }
  // };

  // const handleChange = (newValue: string) => {
  //   setValue(newValue);
  // };

  const options = valueSearch.map((d) => (
    <Option key={d.id}>
      <Link to={ROUTES.detail_course(d.slug)}>
        {/* <div className="img">
          <img src={item.thumbnail} alt="" />
        </div> */}
        <div className="title">{d.title}</div>
      </Link>
    </Option>
  ));

  return (
    // <form action={ROUTES.search()} className="search-bar">
    //   <div className="icon">
    //     <SearchOutlined style={{ fontSize: 18 }} onClick={handleClick} />
    //   </div>
    <Select
      showSearch
      // placeholder={props.placeholder}
      defaultActiveFirstOption={false}
      value={inputValue}
      showArrow={false}
      filterOption={false}
      style={{ width: "45rem", zIndex: "9999 !important", margin: "1rem" }}
      onSearch={(value) => {
        handleSearchTermChange(value);
      }}
      notFoundContent={null}
    >
      {options}
    </Select>
    // {/* <input
    //   type="text"
    //   placeholder="Chào bạn! hôm nay bạn muốn học gì?"
    //   autoComplete="off"
    //   className="input-search"
    //   name="q"
    //   defaultValue={inputValue}
    //   onChange={handleSearchTermChange}
    // /> */}

    //   <div
    //     className={valueSearch.length && inputValue ? "search show" : "search"}
    //   >
    //     <div className="search-result">
    //       <div className="result-search">
    //         {!valueSearch.length ? null : (
    //           <List
    //             itemLayout="horizontal"
    //             dataSource={valueSearch}
    //             renderItem={(item) => (
    //               <List.Item onClick={handCleanInput} className="result-item">
    //                 {
    //                   <Link to={ROUTES.detail_course(item.slug)}>
    //                     <div className="img">
    //                       <img src={item.thumbnail} alt="" />
    //                     </div>
    //                     <div className="title">{item.title}</div>
    //                   </Link>
    //                 }
    //               </List.Item>
    //             )}
    //           />
    //         )}
    //       </div>
    //     </div>
    //   </div>
    // </form>
  );
}

export default PostFiltersForm;
