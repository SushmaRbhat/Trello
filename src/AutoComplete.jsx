import React, { useCallback, useEffect, useState } from "react";
import SuggestionList from "./SuggestionList";

const AutoComplete = ({ fetchSuggestons }) => {
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [suggestionList, setSuggestionList] = useState([]);

  useEffect(() => {
    if (inputValue.length > 1) debounced(inputValue);
    else {
      setSuggestionList([]);
    }
  }, [inputValue]);

  const getSuggestions = async (query) => {
    setLoading(true);
    try {
      const res = await fetchSuggestons(query);
      setSuggestionList(res);
    } catch (err) {
      console.log("err", err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const debounce = (func, time) => {
    let timer;
    console.log("calli");
    return function (...args) {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func(...args);
      }, time);
    };
  };
  const debounced = debounce(getSuggestions, 1000);
  const handleSuggestionClick = (value) => {
    setInputValue(value);
  };

  return (
    <div>
      <input type="text" value={inputValue} onChange={handleChange} />
      <div>
        {loading ? <div>Loading...</div> : null}
        <SuggestionList
          suggestionList={suggestionList}
          handleSuggestionClick={handleSuggestionClick}
        />
      </div>
    </div>
  );
};

export default AutoComplete;
