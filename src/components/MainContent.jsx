import React, { useCallback, useState } from "react";

import SearchBar from "./SearchBar";
import CoinsTable from "./CoinsTable";

import { Box, Container, Typography } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";

const MainContent = (props) => {
  const tablet = useMediaQuery("(min-width:700px)");
  const [search, setSearch] = useState();

  const searchHandler = useCallback((inputSearch) => {
    setSearch(inputSearch);
  }, []);

  return (
    <Container maxWidth="100%" sx={{ bgcolor: "primary.main" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography
          variant={tablet ? "h3" : "h4"}
          mt={"1.5rem"}
          textAlign={"center"}
        >
          Cryptocurrency Ordered by Market Cap
        </Typography>
        <SearchBar searchHandler={searchHandler} />
        <CoinsTable
          coins={props.coins}
          search={search}
          isLoading={props.isLoading}
        />
      </Box>
    </Container>
  );
};

export default MainContent;
