import { Box, Container, Typography } from "@mui/material";
import React from "react";
import { useCallback } from "react";
import { useState } from "react";
import SearchBar from "./SearchBar";
import CoinsTable from "./CoinsTable";

const MainContent = (props) => {
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
        <Typography variant="h3" mt={"1.5rem"}>
          Cryptocurrency Ordered by Market Cap
        </Typography>
        <SearchBar searchHandler={searchHandler} />
        <CoinsTable coins={props.coins} search={search} />
      </Box>
    </Container>
  );
};

export default MainContent;
