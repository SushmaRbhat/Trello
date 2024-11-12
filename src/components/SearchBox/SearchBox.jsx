import React, { useEffect, useState } from "react";
import "./SearchBox.css";
import { MdSearch } from "react-icons/md";
import useDebounce from "../../hooks/usedebounce";

const SearchBox = ({ taskList, suggestionItemHandler }) => {
  const [query, setQuery] = useState("");
  const [suggestionList, setSuggestionList] = useState([]);

  useEffect(() => {
    if (query.length > 1) {
      debouncedSearch();
    } else {
      setSuggestionList([]);
    }
  }, [query]);

  const handleSearch = (e) => {
    if (query === "") return;
    const suggestions = [];
    taskList.forEach((ele) => {
      ele.tasks.forEach((y) => {
        if (y?.title?.toLowerCase().includes(query?.toLowerCase())) {
          suggestions.push(y);
        }
      });
    });
    setSuggestionList(suggestions);
  };
  const debouncedSearch = useDebounce(handleSearch, 500);

  const handleSuggestionItemClick = (value) => {
    suggestionItemHandler(value);
    setQuery("");
    setSuggestionList([]);
  };
  return (
    <div className="search-box">
      <div className="input-container">
        <div className="icon">
          <MdSearch fontSize={20} />
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search"
        />
      </div>
      <ul className="suggestions">
        {suggestionList &&
          suggestionList.map((x) => (
            <li
              key={x.id}
              className="suggestion-item"
              onClick={() => handleSuggestionItemClick(x)}
            >
              {x.title}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default SearchBox;
