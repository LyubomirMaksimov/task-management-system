import React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { makeStyles } from "@mui/material";

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

  // const useStyles = makeStyles(() => ({
  //   ul: {
  //     "& .MuiPaginationItem-root": {
  //       color: "#fff",
  //     },
  //   },
  // }));

  // const classes = useStyles();

  return (
    <Stack spacing={2}>
      <Pagination
        // classes={{ ul: classes.ul }}
        count={pagesCount}
        color="primary"
        page={activePage}
        onChange={handleChange}
      />
    </Stack>
  );
};

export default PageNavigation;
