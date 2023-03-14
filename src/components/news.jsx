import React, { useState, useEffect, useRef } from "react";
import Grid from "@mui/material/Grid";

import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import NewsCard from "./NewsCard";
import Progress from "./Progress";

const News = () => {
  const [isLoading, setIsLoading] = useState("false");
  const [error, setError] = useState("");
  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchNewsHandler = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(
          "https://api.coinmarketcap.com/content/v3/news?page=6&size=9",
          {
            method: "GET",
            mode: "cors",
            headers: {
              "User-Agent":
                "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Something went Wrong");
        }

        const newsData = await response.json();

        const recentNews = newsData.data.map((news) => {
          return {
            id: news.meta.id,
            date: news.createdAt,
            title: news.meta.title,
            description: news.meta.subtitle,
            image: news.cover,
            url: news.meta.sourceUrl,
          };
        });

        setNews(recentNews);
        setIsLoading(false);
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
        console.log(error);
      }
    };
    fetchNewsHandler();
  }, []);

  return (
    <Box
      sx={{
        backgroundColor: "primary.main",
        paddingTop: "5rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
      id="news"
    >
      <Typography variant="h4" mb="2rem" sx={{ color: "text.terciary" }}>
        Crypto News
      </Typography>
      {isLoading ? (
        <Progress />
      ) : (
        <Container
          maxWidth="xl"
          sx={{ backgroundColor: "primary.main", mb: "3rem" }}
        >
          <Grid container spacing={4}>
            {news.map((post) => (
              <NewsCard key={post.title} post={post} />
            ))}
          </Grid>
        </Container>
      )}
    </Box>
  );
};

export default News;
