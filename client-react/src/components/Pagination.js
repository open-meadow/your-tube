import React, { useState } from "react";
import { Button, ButtonGroup, DropdownButton, Dropdown } from "react-bootstrap";
import DropdownItem from "react-bootstrap/esm/DropdownItem";
import "./Pagination.css";

// create pages at the end
const Pagination = (props) => {
  const { totalPages, itemsPerPage, setCurrentPage, currentPage } = props;

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalPages); i++) {
    pageNumbers.push(i);
  }

  const generatePageLinks = () => {
    return pageNumbers.map((number) => (
      <DropdownItem
        key={number}
        onClick={() => setCurrentPage(number)}
        className="page-link"
      >
        {number}
      </DropdownItem>
    ));
  };

  return (
    <nav className="pagination">
      {totalPages && (
        <DropdownButton
          title="Pages"
          className="mb-2"
          id="bg-vertical-dropdown-1"
          variant="outline-light"
        >
          {generatePageLinks()}
        </DropdownButton>
      )}
    </nav>
  );
};

export default Pagination;
