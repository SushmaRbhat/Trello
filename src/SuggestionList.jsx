import React from "react";

const SuggestionList = ({ suggestionList, handleSuggestionClick }) => {
  return (
    <div>
      {suggestionList &&
        suggestionList.map((item) => (
          <div
            style={{ cursor: "pointer" }}
            key={item.id}
            onClick={() => handleSuggestionClick(item.firstName)}
          >
            {item.firstName}
          </div>
        ))}
    </div>
  );
};

export default SuggestionList;
