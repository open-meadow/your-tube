import React, { useState } from "react";

const Pagination = (props) => {
  const { totalPages, itemsPerPage, setCurrentPage, currentPage } = props;

  console.log("total items: ", totalPages);
  console.log("items per page: ", itemsPerPage);

  // const [currentPage, setCurrentPage] = useState(1);
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPages); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className="pagination">
      <div className="page-div">Poopoo</div>
      <ul>
        {pageNumbers.map((number) => (
          <li key={number}>
            <button onClick={() => setCurrentPage(number)} className="page-link">
              {number}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
