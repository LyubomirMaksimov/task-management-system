import React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

interface PaginationProps {
  activePage: number;
  pagesCount: number;
  setPage: (page: number) => void;
}

const PageNavigation: React.FC<PaginationProps> = ({
  activePage,
  pagesCount,
  setPage,
}) => {
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    event.preventDefault();
    setPage(value);
  };

  return (
    <Stack spacing={2}>
      <Pagination
        count={pagesCount}
        color="primary"
        page={activePage}
        onChange={handleChange}
      />
    </Stack>
  );
};

export default PageNavigation;
