import React, { useState } from "react";
import Pagination from "react-js-pagination";

import '../styles/Pagination/Paging.scss';

const Paging = ({pageNum, countPerPage, totalItems, handlePage}) => {

    const handlePageChange = (page) => {
        handlePage(page);
        console.log(page);
    };

    return (
        <Pagination
            activePage={pageNum}
            itemsCountPerPage={countPerPage}
            totalItemsCount={totalItems}
            pageRangeDisplayed={5}
            prevPageText={"‹"}
            nextPageText={"›"}
            onChange={handlePageChange}
        />
    );
};

export default Paging;