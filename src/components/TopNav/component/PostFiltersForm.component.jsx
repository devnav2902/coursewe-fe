import { SearchOutlined } from "@ant-design/icons";
import { List } from "antd";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import SearchApi from "../../../api/search.api";
import { routesWithParams } from "../../../utils/constants";

function PostFiltersForm() {
  // const [searchTerm, setSearchTerm] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [valueSearch, setValueSearch] = useState([]);

  const typingTimeoutRef = useRef(null);

  useEffect(() => {
    if (inputValue.length < 2) {
      setValueSearch([]);
    } else {
      SearchApi.search(inputValue).then((res) => {
        setValueSearch(res.data.data);
      });
    }
  }, [inputValue]);

  function handleSearchTermChange(e) {
    const value = e.target.value;

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
  return (
    <form action="" className="search-bar">
      <div className="icon">
        <SearchOutlined style={{ fontSize: 18 }} />
      </div>

      <input
        type="text"
        placeholder="Chào bạn! hôm nay bạn muốn học gì?"
        autoComplete="off"
        className="input-search"
        name="input-search"
        defaultValue={inputValue}
        onChange={handleSearchTermChange}
      />

      <div
        className={valueSearch.length && inputValue ? "search show" : "search"}
      >
        <div className="search-result">
          <div className="result-search">
            {!valueSearch.length ? null : (
              <List
                itemLayout="horizontal"
                dataSource={valueSearch}
                renderItem={(item) => (
                  <List.Item onClick={handCleanInput} className="result-item">
                    {
                      <Link to={routesWithParams.detail_course(item.slug)}>
                        <div class="img">
                          <img src={item.thumbnail} alt="" />
                        </div>
                        <div className="title">{item.title}</div>
                      </Link>
                    }
                  </List.Item>
                )}
              />
            )}
          </div>
        </div>
      </div>
    </form>
  );
}

export default PostFiltersForm;
