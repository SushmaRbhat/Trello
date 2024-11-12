import React from "react";
import "./Header.css";
import SearchBox from "../SearchBox/SearchBox";
import { BsPersonWorkspace } from "react-icons/bs";

const Header = ({ taskList, handleSuggestionClick }) => {
  return (
    <div className="header">
      <div className="logo-container">
        <BsPersonWorkspace fontSize={30} />
        <h2>Trello</h2>
      </div>
      <SearchBox
        taskList={taskList}
        suggestionItemHandler={handleSuggestionClick}
      />
    </div>
  );
};

export default Header;
